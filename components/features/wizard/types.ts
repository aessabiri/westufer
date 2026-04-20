import { LucideIcon } from 'lucide-react';

export interface BookingItem {
  id: string; // Database ID as string (or mapped slug)
  dbId?: number; // Actual Database ID if known
  category: string;
  name: string;
  price: string | number;
  duration?: string;
  iconName: string;
  color: string;
  bg: string;
  border: string;
}

export interface WizardStepProps {
  items: BookingItem[];
  selectedItemIds: string[];
  onToggleItem: (id: string) => void;
  onNext: () => void;
}

export interface DateStepProps {
  selectedDateId: string;
  onSelectDate: (id: string) => void;
  onNext: () => void;
  onBack: () => void;
  selectedItemIds: string[]; // Needed to fetch slots for specific course
}
