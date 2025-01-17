// src/app/ClientProviders.jsx
'use client';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '@/reduxStore/store';
import { ToastContainer } from '@/utils/alertManager';
import { AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { PerformanceWrapper } from '@/debugLibrary/performanceWrapper';
import { SafeHydration } from '@/components/SafeHydration';
import Loading from '@/app/hooks/loading';
import ErrorBoundary from '@/app/errorBoundary';

export default function ClientProviders({ children }) {
  const pathname = usePathname();

  // Handle server-side rendering
  if (typeof window === 'undefined') {
    return <Loading />;
  }

  return (
    <PerformanceWrapper id="ClientProviders">
      <ErrorBoundary>
        <Provider store={store}>
          <PersistGate loading={<Loading />} persistor={persistor}>
            <SafeHydration>
              <ToastContainer />
              <AnimatePresence mode="wait" initial={false}>
                <div key={pathname}>{children}</div>
              </AnimatePresence>
            </SafeHydration>
          </PersistGate>
        </Provider>
      </ErrorBoundary>
    </PerformanceWrapper>
  );
}
