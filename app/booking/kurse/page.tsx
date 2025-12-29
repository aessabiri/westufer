import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { BookingWizard, BookingItem } from '@/components/features/BookingWizard';
import { getCourses } from '@/lib/db/queries';
import { Course } from '@/lib/db/types';

// Helper to map DB courses to UI styling
function mapCourseToBookingItem(course: Course): BookingItem {
  const slug = course.slug.toLowerCase();
  
  if (slug.startsWith('ws-')) {
    return {
      id: course.id.toString(), // DB uses number, UI uses string
      category: 'Windsurf',
      name: course.title,
      price: course.price_cents > 0 ? course.price_cents / 100 : 'Auf Anfrage',
      duration: course.duration_minutes >= 60 
        ? `${course.duration_minutes / 60} Std.` 
        : `${course.duration_minutes} Min.`,
      iconName: 'wind',
      color: 'text-blue-500',
      bg: 'bg-blue-50 dark:bg-blue-900/20',
      border: 'border-blue-200 dark:border-blue-800'
    };
  }
  
  if (slug.startsWith('sup-')) {
    return {
      id: course.id.toString(),
      category: 'SUP',
      name: course.title,
      price: course.price_cents > 0 ? course.price_cents / 100 : 'Auf Anfrage',
      duration: course.duration_minutes >= 60 
        ? `${course.duration_minutes / 60} Std.` 
        : `${course.duration_minutes} Min.`,
      iconName: 'waves',
      color: 'text-cyan-500',
      bg: 'bg-cyan-50 dark:bg-cyan-900/20',
      border: 'border-cyan-200 dark:border-cyan-800'
    };
  }

  if (slug.startsWith('lb-')) {
    return {
      id: course.id.toString(),
      category: 'Longboard',
      name: course.title,
      price: course.price_cents > 0 ? course.price_cents / 100 : 'Auf Anfrage',
      duration: course.duration_minutes >= 60 
        ? `${course.duration_minutes / 60} Std.` 
        : `${course.duration_minutes} Min.`,
      iconName: 'map-pin',
      color: 'text-emerald-500',
      bg: 'bg-emerald-50 dark:bg-emerald-900/20',
      border: 'border-emerald-200 dark:border-emerald-800'
    };
  }

  // Fallback
  return {
    id: course.id.toString(),
    category: 'Allgemein',
    name: course.title,
    price: course.price_cents > 0 ? course.price_cents / 100 : 'Auf Anfrage',
    duration: `${course.duration_minutes} Min.`,
    iconName: 'help-circle',
    color: 'text-slate-500',
    bg: 'bg-slate-50 dark:bg-slate-900/20',
    border: 'border-slate-200 dark:border-slate-800'
  };
}

export default async function CourseBookingPage() {
  const dbCourses = await getCourses();
  const courses = dbCourses.map(mapCourseToBookingItem);

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Navbar variant="page" />
      <div className="pt-32 pb-20 container mx-auto px-6">
        <BookingWizard items={courses} type="course" />
      </div>
      <Footer />
    </main>
  );
}
