import CardPlaceholder from '@/components/ui/card-placeholder';
import { ReactNode } from 'react';

export default function ElectionsLayout({ children }: { children: ReactNode }) {
  return <CardPlaceholder>{children}</CardPlaceholder>;
}