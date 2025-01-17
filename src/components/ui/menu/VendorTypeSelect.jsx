'use client';
import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';

// Constants
const VENDOR_TYPES = [
  { value: 'all', label: 'All Vendors' },
  { value: 'Ice Cream', label: 'Ice Cream' },
  { value: 'Alcohol Beverages', label: 'Alcohol Beverages' },
  { value: 'Chinese Cuisines', label: 'Asian Cuisines' },
  { value: 'African Food', label: 'Traditional' },
  { value: 'Bakery Delight', label: 'Bakery Delight' },
];

const VendorTypeSelect = React.memo(({ onValueChange, defaultValue }) => (
  <Select onValueChange={onValueChange} defaultValue={defaultValue}>
    <SelectTrigger className="w-[200px]">
      <SelectValue placeholder="Select vendor type" />
    </SelectTrigger>
    <SelectContent>
      {VENDOR_TYPES.map((type) => (
        <SelectItem key={type.value} value={type.value}>
          {type.label}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
));

VendorTypeSelect.displayName = 'VendorTypeSelect';
export default VendorTypeSelect;
