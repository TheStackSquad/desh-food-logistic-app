// src/app/Vendor/Payout/layout.jsx
export default function PayoutLayout({ children }) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto p-6">
          {children}
        </div>
      </div>
    );
  }