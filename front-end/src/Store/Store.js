/* eslint-disable no-undef */
import { combineReducers, createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { thunk } from "redux-thunk";
import { productListReducer } from "../reducers/productReducer";


const reducer = combineReducers({
  productList: productListReducer,
});

const initialState = {};

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;