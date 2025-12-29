'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function toggleCheckIn(bookingId: string, currentStatus: boolean) {
  const supabase = await createClient()
  
  const { error } = await supabase
    .from('bookings')
    .update({ checked_in: !currentStatus })
    .eq('id', bookingId)

  if (error) {
    console.error('Check-in Error:', error)
    return { success: false }
  }

  revalidatePath('/admin/bookings')
  revalidatePath('/admin') // Update dashboard stats if they use this info later
  return { success: true }
}
