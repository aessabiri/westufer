import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { EquipmentFormRow } from '@/components/admin/EquipmentFormRow'

export default async function EquipmentAdminPage() {
  const supabase = await createClient()
  const { data: items } = await supabase
    .from('rental_items')
    .select('*')
    .order('id', { ascending: true })

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin" className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors">
          <ChevronLeft size={24} />
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Equipment Manager</h1>
          <p className="text-slate-500 text-sm">Bestand und Preise für den Verleih steuern.</p>
        </div>
      </div>

      <div className="grid gap-4">
        {items?.map((item) => (
          <EquipmentFormRow key={item.id} item={item} />
        ))}
      </div>
    </div>
  )
}
