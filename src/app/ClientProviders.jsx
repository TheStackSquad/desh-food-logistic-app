// src/components/ClientProviders.jsx
'use client';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '@/reduxStore/store';
import { ToastContainer } from '@/utils/alertManager';
import { AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function ClientProviders({ children }) {
  // Use pathname as a unique key for AnimatePresence
  const pathname = usePathname();

  return (
    <Provider store={store}>
      <PersistGate
        loading={<div className="suspenseLoading">Loading...</div>}
        persistor={persistor}
      >
        <ToastContainer />
        <AnimatePresence mode="wait" initial={false}>
          <div key={pathname}>
            {children}
          </div>
        </AnimatePresence>
      </PersistGate>
    </Provider>
  );
}