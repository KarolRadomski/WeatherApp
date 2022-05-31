import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';

// Dodanie stanu przechowującego pola oraz funkcje obsługujące autoryzację użytkownika
// do storage utworzonego za pomocą redux
export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
