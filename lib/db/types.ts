export interface Course {
  id: number;
  slug: string;
  title: string;
  description?: string;
  duration_minutes: number;
  price_cents: number;
  created_at: Date;
}

export interface CourseSlot {
  id: number;
  course_id: number;
  start_time: Date;
  max_capacity: number;
  booked_count: number;
  is_active: boolean;
  created_at: Date;
  // Joins
  course?: Course;
}

export type BookingStatus = 'pending' | 'paid' | 'cancelled';

export interface Booking {
  id: string; // UUID
  slot_id?: number; // Optional now
  rental_item_id?: number; // New: for rentals
  rental_date?: string; // New: YYYY-MM-DD
  customer_name: string;
  customer_email: string;
  customer_phone?: string;
  status: BookingStatus;
  stripe_session_id?: string;
  payment_intent_id?: string;
  amount_total_cents: number;
  created_at: Date;
}

export interface RentalItem {
  id: number;
  name: string;
  category: 'board' | 'wetsuit' | 'other';
  total_quantity: number;
  price_per_hour_cents: number;
}
