import { Truck } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export function HazmatWarning() {
  return (
    <Alert>
      <Truck className="h-4 w-4" />
      <AlertTitle>Shipping Restriction</AlertTitle>
      <AlertDescription>
        This item contains precious oils and ships via ground transport only.
      </AlertDescription>
    </Alert>
  );
}
