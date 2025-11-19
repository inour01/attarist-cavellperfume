'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { olfactoryFamilies, allNotes, sizes } from '@/lib/mock-data';
import { Filter } from 'lucide-react';

export function ProductFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string, isChecked: boolean) => {
      const params = new URLSearchParams(searchParams.toString());
      if (isChecked) {
        if (params.get(name) === value) { // If it's already selected (e.g., radio-like behavior)
          params.delete(name);
        } else {
          params.set(name, value);
        }
      } else {
        params.delete(name);
      }
      return params.toString();
    },
    [searchParams]
  );
  
  const handleClearFilters = () => {
    router.push(pathname);
  };

  const hasActiveFilters = searchParams.size > 0;

  const renderFilterOptions = (filterName: string, options: string[]) => (
    <div className="grid gap-2">
      {options.map((option) => (
        <div key={option} className="flex items-center space-x-2">
          <Checkbox
            id={`${filterName}-${option}`}
            checked={searchParams.get(filterName) === option}
            onCheckedChange={(checked) => {
              router.push(pathname + '?' + createQueryString(filterName, option, !!checked));
            }}
          />
          <Label htmlFor={`${filterName}-${option}`} className="font-normal capitalize">
            {option}
          </Label>
        </div>
      ))}
    </div>
  );

  return (
    <div className="sticky top-20 py-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-headline font-bold flex items-center gap-2">
          <Filter className="w-5 h-5" />
          Filters
        </h2>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={handleClearFilters}>
            Clear
          </Button>
        )}
      </div>
      <Accordion type="multiple" defaultValue={['family', 'notes', 'size']} className="w-full">
        <AccordionItem value="family">
          <AccordionTrigger className="font-semibold">Olfactory Family</AccordionTrigger>
          <AccordionContent>
            {renderFilterOptions('family', olfactoryFamilies)}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="notes">
          <AccordionTrigger className="font-semibold">Notes</AccordionTrigger>
          <AccordionContent>
            {renderFilterOptions('note', allNotes)}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="size">
          <AccordionTrigger className="font-semibold">Format</AccordionTrigger>
          <AccordionContent>
            {renderFilterOptions('size', sizes)}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
