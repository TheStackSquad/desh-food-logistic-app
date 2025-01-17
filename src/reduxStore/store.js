import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import { createLogger } from 'redux-logger';
import authReducer from '@/reduxStore/reducer/authReducer';
import vendorReducer from '@/reduxStore/reducer/vendorReducer';

// Create a storage object that wraps localStorage methods
const storage = {
  getItem: (key) => {
    if (typeof window === 'undefined') {
      return Promise.resolve(null);
    }
    return Promise.resolve(localStorage.getItem(key));
  },
  setItem: (key, item) => {
    if (typeof window === 'undefined') {
      return Promise.resolve();
    }
    return Promise.resolve(localStorage.setItem(key, item));
  },
  removeItem: (key) => {
    if (typeof window === 'undefined') {
      return Promise.resolve();
    }
    return Promise.resolve(localStorage.removeItem(key));
  }
};

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['user', 'isAuthenticated'],
};

const vendorPersistConfig = {
  key: 'vendor',
  storage,
  whitelist: ['isAuthenticated', 'vendorData'],
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedVendorReducer = persistReducer(vendorPersistConfig, vendorReducer);

// Logger setup for development mode
const logger = createLogger({ collapsed: true });
const middleware = [];
if (process.env.NODE_ENV !== 'production') {
  middleware.push(logger);
}

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    vendor: persistedVendorReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }).concat(middleware),
  devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store);