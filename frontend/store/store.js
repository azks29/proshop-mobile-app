import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import { cartReducer } from "./reducers/cartReducers";

import {
  productDetailsReducer,
  productListReducer,
} from "./reducers/productReducers";
import {
  userLoginReducer,
  userProfileReducer,
  userRegisterReducer,
  userUpdateProfileReducer,
} from "./reducers/userReduces";
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderListMyReducer,
} from "./reducers/orderReducers";

const rootReducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userProfile: userProfileReducer,
  userUpdateProfile: userUpdateProfileReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderListMy: orderListMyReducer,
});

const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
  ImmutableStateInvariantMiddlewareOptions: false,
});

initialState = {
  // cart: { cartItems: getData.cartItemsFromStorage },
};

const store = configureStore({
  reducer: rootReducer,
  middleware: customizedMiddleware,
});

export default store;
