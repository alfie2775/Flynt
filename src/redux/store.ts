import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import reducer from "./reducers";

const persistConfig = {
  key: "root",
  storage,
  whitelist: [
    "theme",
    "recentCodes",
    "lang",
    "input",
    "value",
    "isAuth",
    "savedCodes",
    "username",
    "templates",
  ],
};

const persistedReducer = persistReducer<any, any>(persistConfig, reducer);

let store = createStore(
  persistedReducer,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);
let persistor = persistStore(store);

export { store, persistor };

export type RootState = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;
