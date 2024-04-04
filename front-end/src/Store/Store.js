/* eslint-disable no-undef */
import { combineReducers, createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { thunk } from "redux-thunk";
import { productDetailsReducer, productListReducer } from "../reducers/productReducer";
import { cartReducer } from "../reducers/cartReducer";
import { userLoginReducer } from "../reducers/userReducers";


const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
});

// get cart items from local storage
const cartItemsFromStorage = localStorage.getItem("cartItems") ?
  JSON.parse(localStorage.getItem("cartItems")) : []

// get user login info from local storage
const userInfoFromStorage = localStorage.getItem("userInfo") ?
  JSON.parse(localStorage.getItem("userInfo")) : null


const initialState = {
  cart: { cartItems: cartItemsFromStorage },
  userLogin: {userinfo: userInfoFromStorage}
};

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;