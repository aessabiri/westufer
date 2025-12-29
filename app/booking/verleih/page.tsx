import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { BookingWizard, BookingItem } from '@/components/features/BookingWizard';
import { getRentalItems } from '@/lib/db/queries';
import { RentalItem } from '@/lib/db/types';

// Helper to map DB items to UI styling
function mapRentalToBookingItem(item: RentalItem): BookingItem {
  const name = item.name.toLowerCase();
  
  // Logic to assign correct icons based on item name/category
  let iconName = 'shopping-bag';
  let color = 'text-purple-500';
  let bg = 'bg-purple-50 dark:bg-purple-900/20';
  let border = 'border-purple-200 dark:border-purple-800';

  if (name.includes('board') || name.includes('rigg')) {
    iconName = 'wind';
    color = 'text-blue-500';
    bg = 'bg-blue-50 dark:bg-blue-900/20';
    border = 'border-blue-200 dark:border-blue-800';
  } else if (name.includes('sup')) {
    iconName = 'waves';
    color = 'text-cyan-500';
    bg = 'bg-cyan-50 dark:bg-cyan-900/20';
    border = 'border-cyan-200 dark:border-cyan-800';
  } else if (name.includes('longboard')) {
    iconName = 'map-pin';
    color = 'text-emerald-500';
    bg = 'bg-emerald-50 dark:bg-emerald-900/20';
    border = 'border-emerald-200 dark:border-emerald-800';
  }

  return {
    id: item.id.toString(),
    category: item.category.charAt(0).toUpperCase() + item.category.slice(1),
    name: item.name,
    price: item.price_per_hour_cents / 100,
    duration: name.includes('tag') ? 'Tag' : '1 Std',
    iconName,
    color,
    bg,
    border
  };
}

export default async function RentalBookingPage() {
  const dbItems = await getRentalItems();
  const rentals = dbItems.map(mapRentalToBookingItem);

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Navbar variant="page" />
      <div className="pt-32 pb-20 container mx-auto px-6">
        <BookingWizard items={rentals} type="rental" />
      </div>
      <Footer />
    </main>
  );
}
