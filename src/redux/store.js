import { createStore, applyMiddleware } from "redux";
import { persistStore } from "redux-persist";
import logger from "redux-logger";
import createSagaMiddleware from "redux-saga";

import rootReducer from "./root-reducer";
import rootSaga from "./root-saga";

const sagaMiddleware = createSagaMiddleware();

const middllewares = [sagaMiddleware];

if (process.env.NODE_ENV === "development") {
  middllewares.push(logger);
}

export const store = createStore(rootReducer, applyMiddleware(...middllewares));

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
