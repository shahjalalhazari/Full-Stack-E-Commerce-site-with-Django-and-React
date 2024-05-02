/* eslint-disable no-undef */
import { combineReducers, createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { thunk } from "redux-thunk";
import { productDetailsReducer, productListReducer } from "../reducers/productReducer";
import { cartReducer } from "../reducers/cartReducer";
import { userDetailsReducer, userLoginReducer, userProfileUpdateReducer, userRegisterReducer } from "../reducers/userReducers";
import { orderCreateReducer, orderDetailsReducer } from "../reducers/orderReducer";


const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userProfileUpdate: userProfileUpdateReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
});

// get cart items from local storage
const cartItemsFromStorage = localStorage.getItem("cartItems") ?
  JSON.parse(localStorage.getItem("cartItems")) : []

// get user login info from local storage
const userInfoFromStorage = localStorage.getItem("userInfo") ?
  JSON.parse(localStorage.getItem("userInfo")) : null

// get order shipping address from local storage
const shippingAddressFromStorage = localStorage.getItem("shippingAddress") ?
  JSON.parse(localStorage.getItem("shippingAddress")) : {}


const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
  },
  userLogin: {userInfo: userInfoFromStorage}
};

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;