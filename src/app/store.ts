import {
  configureStore,
  combineReducers,
  ThunkAction,
  Action
} from "@reduxjs/toolkit";
import pokemonReducer from "../features/pokemon/pokemonSlice";
import authReducer from "../features/auth/authSlice";

const rootReducer = combineReducers({
  pokemon: pokemonReducer,
  auth: authReducer
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
