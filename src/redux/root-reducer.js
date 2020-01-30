import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
// import customStorage from "./custom-storage";

import userReducer from "./user/user.reducer";
//import cartReducer from "./cart/cart.reducer";
//import directoryReducer from "./directory/directory.reducer";
//import shopReducer from "./shop/shop.reducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"]
};

// const userPersistConfig = {
//   key: "user",
//   storage: customStorage
// };

const rootReducer = combineReducers({
  //user: persistReducer(userPersistConfig, userReducer),
  user: userReducer
  //cart: cartReducer,
  //directory: directoryReducer,
  //shop: shopReducer
});

export default persistReducer(persistConfig, rootReducer);
