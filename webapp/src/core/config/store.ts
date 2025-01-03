import { configureStore, createSlice } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { createLogger } from 'redux-logger';

const isDevelopment = process.env.NODE_ENV === 'development';

// Create an initial app slice
const appSlice = createSlice({
  name: 'app',
  initialState: {
    initialized: false,
  },
  reducers: {
    setInitialized: (state, action) => {
      state.initialized = action.payload;
    },
  },
});

// Create a root reducer
export const rootReducer = {
  app: appSlice.reducer,
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    isDevelopment
      ? getDefaultMiddleware().concat(createLogger({ collapsed: true }))
      : getDefaultMiddleware(),
  devTools: isDevelopment,
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const { setInitialized } = appSlice.actions; 