import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { combineReducers } from "redux";
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import userReducer from "./slices/userSlice";
import movieReducer from "./slices/movieSlice";
import showReducer from "./slices/showSlice";
import pageReducer from "./slices/pageSlice";
import gptReducer from "./slices/gptSlice";

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["movie", "show", "page", "gpt"],
};

const rootReducer = combineReducers({
  user: userReducer,
  movie: movieReducer,
  show: showReducer,
  page: pageReducer,
  gpt: gptReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);