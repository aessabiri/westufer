'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function updateEquipment(formData: FormData) {
  const supabase = await createClient()
  
  const id = parseInt(formData.get('id') as string)
  const quantity = parseInt(formData.get('quantity') as string)
  const price = parseFloat(formData.get('price') as string)

  const { error } = await supabase
    .from('rental_items')
    .update({ 
      total_quantity: quantity,
      price_per_hour_cents: Math.round(price * 100) 
    })
    .eq('id', id)

  if (error) {
    console.error('Update Error:', error)
    return { success: false, error: 'Fehler beim Speichern.' }
  }

  revalidatePath('/admin/equipment')
  revalidatePath('/booking/verleih')
  return { success: true }
}
