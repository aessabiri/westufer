'use server';

import { supabase } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';

interface BookingRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  // User books EITHER a single course slot OR multiple rental items for a specific date
  slotId?: number; 
  rentalItems?: { id: number; quantity: number }[];
  rentalDate?: string; // YYYY-MM-DD
}

export async function createBooking(data: BookingRequest) {
  // 1. Basic Validation
  if (!data.email || !data.firstName || !data.lastName) {
    return { success: false, error: 'Bitte fülle alle Pflichtfelder aus.' };
  }

  try {
    const customerName = `${data.firstName} ${data.lastName}`;
    
    // --- CASE A: COURSE BOOKING ---
    if (data.slotId) {
      const { data: slot, error: slotError } = await supabase
        .from('course_slots')
        .select('booked_count, max_capacity, courses(price_cents)')
        .eq('id', data.slotId)
        .single();

      if (slotError || !slot || !slot.courses) {
        return { success: false, error: 'Termin nicht gefunden.' };
      }

      if (slot.booked_count >= slot.max_capacity) {
        return { success: false, error: 'Dieser Kurs ist leider ausgebucht.' };
      }

      const { error: insertErr } = await supabase.from('bookings').insert({
        slot_id: data.slotId,
        customer_name: customerName,
        customer_email: data.email,
        customer_phone: data.phone,
        amount_total_cents: (slot.courses as any).price_cents,
      });

      if (insertErr) throw insertErr;

      await supabase
        .from('course_slots')
        .update({ booked_count: slot.booked_count + 1 })
        .eq('id', data.slotId);

      revalidatePath('/booking/kurse');
      return { success: true };
    }

    // --- CASE B: RENTAL BOOKING ---
    if (data.rentalItems && data.rentalItems.length > 0 && data.rentalDate) {
      // 1. Validate Date (Must be today or in the future)
      const selectedDate = new Date(data.rentalDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        return { success: false, error: 'Der gewählte Termin liegt in der Vergangenheit.' };
      }

      // Process each item in the "cart"
      for (const itemRequest of data.rentalItems) {
        // 2. Validate Quantity (DoS Protection)
        if (itemRequest.quantity < 1 || itemRequest.quantity > 10) {
          return { success: false, error: 'Ungültige Anzahl (Max. 10 pro Item).' };
        }

        // 3. Get Item Info & Total Inventory
        const { data: item, error: itemErr } = await supabase
          .from('rental_items')
          .select('total_quantity, price_per_hour_cents')
          .eq('id', itemRequest.id)
          .single();

        if (itemErr || !item) {
          return { success: false, error: `Equipment mit ID ${itemRequest.id} nicht gefunden.` };
        }

        // 4. Check current bookings for this item on this date
        const { count, error: countErr } = await supabase
          .from('bookings')
          .select('*', { count: 'exact', head: true })
          .eq('rental_item_id', itemRequest.id)
          .eq('rental_date', data.rentalDate);

        const currentlyBooked = count || 0;

        // Check if there's enough room for the requested quantity
        if (currentlyBooked + itemRequest.quantity > item.total_quantity) {
          return { 
            success: false, 
            error: `Leider sind nicht mehr genug Exemplare von diesem Equipment für den gewählten Tag verfügbar.` 
          };
        }

        // 5. Insert a row for each quantity
        const inserts = Array(itemRequest.quantity).fill({
          rental_item_id: itemRequest.id,
          rental_date: data.rentalDate,
          customer_name: customerName,
          customer_email: data.email,
          customer_phone: data.phone,
          status: 'pending',
          amount_total_cents: item.price_per_hour_cents,
        });

        const { error: multiInsertErr } = await supabase.from('bookings').insert(inserts);
        if (multiInsertErr) throw multiInsertErr;
      }

      revalidatePath('/booking/verleih');
      return { success: true };
    }

    return { success: false, error: 'Ungültige Buchungsanfrage.' };

  } catch (err) {
    console.error('Booking Action Error:', err);
    return { success: false, error: 'Ein interner Fehler ist aufgetreten.' };
  }
}