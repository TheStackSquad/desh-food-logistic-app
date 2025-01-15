
// src/app/Vendor/Payout/page.jsx

import VendorPayout from '@/components/ui/vendorPayout';

export const metadata = {
  title: 'Vendor Payout | Food Logistics',
  description: 'Manage your earnings and payouts',
};

export default function PayoutPage() {
  return (
    <main>
      <VendorPayout />
    </main>
  );
}