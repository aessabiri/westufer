import { supabase } from '../supabase';
import { Course, CourseSlot, RentalItem } from './types';

/**
 * Fetches all courses from the database
 */
export async function getCourses() {
  const { data, error } = await supabase
    .from('courses')
    .select('*')
    .order('title', { ascending: true });

  if (error) {
    console.error('Error fetching courses:', error);
    return [];
  }
  return data as Course[];
}

/**
 * Fetches available slots for a specific course
 */
export async function getAvailableSlots(courseId: number) {
  const { data, error } = await supabase
    .from('course_slots')
    .select('*, courses(*)')
    .eq('course_id', courseId)
    .eq('is_active', true)
    .gt('start_time', new Date().toISOString())
    .order('start_time', { ascending: true });

  if (error) {
    console.error('Error fetching slots:', error);
    return [];
  }
  return data as (CourseSlot & { course: Course })[];
}

/**
 * Fetches all rental items
 */
export async function getRentalItems() {
  const { data, error } = await supabase
    .from('rental_items')
    .select('*')
    .order('name', { ascending: true });

  if (error) {
    console.error('Error fetching rental items:', error);
    return [];
  }
  return data as RentalItem[];
}
