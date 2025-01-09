import { configureStore } from "@reduxjs/toolkit"
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import authReducer from "@/features/auth/store/authSlice"
import { vehicleApi } from "@/features/vehicle/store/vehicleApi"
import { fuelLogApi } from "@/features/vehicle/store/fuelLogApi"
import { fuelTypeApi } from "@/features/fuel/store/fuelTypeApi"
import { categoryApi } from "@/features/expense/store/categoryApi"
import { expenseApi } from "@/features/expense/store/expenseApi"

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth']
}

const persistedReducer = persistReducer(persistConfig, authReducer)

export const store = configureStore({
  reducer: {
    auth: persistedReducer,
    [vehicleApi.reducerPath]: vehicleApi.reducer,
    [fuelLogApi.reducerPath]: fuelLogApi.reducer,
    [fuelTypeApi.reducerPath]: fuelTypeApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [expenseApi.reducerPath]: expenseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }).concat(
      vehicleApi.middleware, 
      fuelLogApi.middleware, 
      fuelTypeApi.middleware, 
      categoryApi.middleware,
      expenseApi.middleware
    ),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch 