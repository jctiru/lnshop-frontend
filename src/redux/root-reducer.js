import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import storage from "redux-persist/lib/storage";
import createFilter from "redux-persist-transform-filter";

// import customStorage from "./custom-storage";

import userReducer from "./user/user.reducer";
import novelReducer from "./novel/novel.reducer";
import cartReducer from "./cart/cart.reducer";
import orderReducer from "./order/order.reducer";
import { routerReducer } from "./history/history";

const saveUserSubsetFilter = createFilter("user", ["currentUser"]);

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "cart"],
  transforms: [saveUserSubsetFilter],
  stateReconciler: autoMergeLevel2
};

// const userPersistConfig = {
//   key: "user",
//   storage: customStorage
// };

const rootReducer = combineReducers({
  //user: persistReducer(userPersistConfig, userReducer),
  user: userReducer,
  novel: novelReducer,
  cart: cartReducer,
  order: orderReducer,
  router: routerReducer
});

export default persistReducer(persistConfig, rootReducer);
