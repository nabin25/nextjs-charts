import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  createTransform,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { Persistor } from "redux-persist/lib/types";
import lineChartReducer from "./line-charts/line-charts-slice";
// import { persistReducer } from "./persistReducerExtend";

const lineChartTransform = createTransform(
  (inboundState: any) => {
    return inboundState;
  },
  (outboundState) => {
    const transformedState = {
      ...outboundState,
      nonPersistentData: [],
    };
    return transformedState;
  }
  // { whitelist: ["lineCharts"] } // Optional: Apply the transformation to specific keys
);
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["lineCharts"],
  transforms: [lineChartTransform],
};

const rootReducer = combineReducers({
  lineCharts: lineChartReducer,
});

//@ts-ignore
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const makeStore = () => {
  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
export const store = makeStore();
export const persistor: Persistor = persistStore(store);
