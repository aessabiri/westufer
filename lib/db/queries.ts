import { supabase } from '../supabase';
import { Course, CourseSlot, RentalItem } from './types';

const MOCK_COURSES: Course[] = [
  { id: 1, title: 'Windsurf Einsteigerkurs', slug: 'ws-einsteiger', description: 'Lerne Windsurfen in 2 Tagen.', price_cents: 12000, duration_minutes: 360, created_at: new Date() },
  { id: 2, title: 'Stand Up Paddling Einsteigerkurs', slug: 'sup-einsteiger', description: 'Der perfekte Start auf dem Board.', price_cents: 4500, duration_minutes: 120, created_at: new Date() },
  { id: 3, title: 'Longboard Schnupperkurs', slug: 'lb-schnupper', description: 'Rollen statt Gleiten.', price_cents: 2500, duration_minutes: 90, created_at: new Date() },
];

const MOCK_RENTALS: RentalItem[] = [
  { id: 101, name: 'SUP Board & Paddel', category: 'board', total_quantity: 20, price_per_hour_cents: 1500 },
  { id: 102, name: 'Windsurf Board & Rigg', category: 'board', total_quantity: 15, price_per_hour_cents: 2500 },
];

/**
 * Fetches all courses from the database
 */
export async function getCourses() {
  try {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .order('title', { ascending: true });

    if (error) throw error;
    return data as Course[];
  } catch (err) {
    console.warn('Supabase unreachable, using mock courses');
    return MOCK_COURSES;
  }
}

/**
 * Fetches available slots for a specific course
 */
export async function getAvailableSlots(courseId: number) {
  try {
    const { data, error } = await supabase
      .from('course_slots')
      .select('*, courses(*)')
      .eq('course_id', courseId)
      .eq('is_active', true)
      .gt('start_time', new Date().toISOString())
      .order('start_time', { ascending: true });

    if (error) throw error;
    return data as (CourseSlot & { course: Course })[];
  } catch (err) {
    return [];
  }
}

/**
 * Fetches all rental items
 */
export async function getRentalItems() {
  try {
    const { data, error } = await supabase
      .from('rental_items')
      .select('*')
      .order('name', { ascending: true });

    if (error) throw error;
    return data as RentalItem[];
  } catch (err) {
    console.warn('Supabase unreachable, using mock rentals');
    return MOCK_RENTALS;
  }
}
