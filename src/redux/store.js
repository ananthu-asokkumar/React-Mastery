import { configureStore as configureToolkitStore } from "@reduxjs/toolkit";
import reduxPomiseMiddleware from "redux-promise-middleware";
import get from "lodash.get";
import rootReducer from "./reducers";
// use redux toolkit in development
const defaultMiddleware = [reduxPomiseMiddleware];

const useReduxDevTools = Boolean(
  (process.env.NODE_ENV =
    "development" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
);

// hydrate initial state , this might be loaded via local storage or caching

export function configureStore(opts = {}) {
  const initialState = get(opts, "initialState", {});
  const middlewarelist = get(opts, "middlewarelist", []);

  return configureToolkitStore({
    reducer: rootReducer,
    devTools: useReduxDevTools,
    middleware: [...defaultMiddleware, ...middlewarelist],
    preloadedState: initialState,
  });
}
