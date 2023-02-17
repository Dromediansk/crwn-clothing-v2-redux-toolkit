import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer, PERSIST } from "redux-persist";
import storage from "redux-persist/lib/storage";
import logger from "redux-logger";

import { rootReducer } from "./root-reducer";

const middleWares = [process.env.NODE_ENV === "development" && logger].filter(
  Boolean
);

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [PERSIST],
      },
    }).concat(middleWares),
  devTools: process.env.NODE_ENV !== "production",
});

export const persistor = persistStore(store);
