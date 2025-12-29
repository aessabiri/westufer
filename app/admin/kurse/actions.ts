'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function generateSlots(formData: FormData) {
  const supabase = await createClient()
  
  // 0. Explicit Auth Check
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    return { success: false, error: 'Nicht autorisiert.' }
  }
  
  const courseId = parseInt(formData.get('courseId') as string)
  const startTime = formData.get('startTime') as string // HH:mm
  const mode = formData.get('mode') as 'single' | 'range'
  const capacity = parseInt(formData.get('capacity') as string)
  
  // Get selected days (0-6)
  const selectedDays = formData.getAll('days').map(Number)

  const slots = []
  const [hours, minutes] = startTime.split(':').map(Number)

  if (mode === 'single') {
    const singleDateStr = formData.get('singleDate') as string
    if (!singleDateStr) return { success: false, error: 'Datum fehlt.' }
    
    const date = new Date(singleDateStr)
    date.setHours(hours, minutes, 0, 0)
    
    slots.push({
      course_id: courseId,
      start_time: date.toISOString(),
      max_capacity: capacity,
      booked_count: 0
    })
  } else {
    const startDate = new Date(formData.get('startDate') as string)
    const endDate = new Date(formData.get('endDate') as string)
    
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      return { success: false, error: 'Ungültiger Zeitraum.' }
    }

    let current = new Date(startDate)
    while (current <= endDate) {
      if (selectedDays.includes(current.getDay())) {
        const slotTime = new Date(current)
        slotTime.setHours(hours, minutes, 0, 0)
        
        slots.push({
          course_id: courseId,
          start_time: slotTime.toISOString(),
          max_capacity: capacity,
          booked_count: 0
        })
      }
      current.setDate(current.getDate() + 1)
    }
  }

  if (slots.length === 0) {
    return { success: false, error: 'Keine Termine generiert. Prüfe die Wochentags-Auswahl.' }
  }

  const { error } = await supabase.from('course_slots').insert(slots)

  if (error) {
    console.error('Insert Error:', error)
    return { success: false, error: `DB-Fehler: ${error.message}` }
  }

  revalidatePath('/admin/kurse')
  return { success: true }
}

export async function deleteSlot(slotId: number) {
  const supabase = await createClient()
  const { error } = await supabase.from('course_slots').delete().eq('id', slotId)
  
  if (error) return { success: false }
  revalidatePath('/admin/kurse')
  return { success: true }
}