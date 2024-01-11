/* eslint-disable no-undef */
const { combineReducers, createStore, applyMiddleware } = require("redux");
const { composeWithDevTools } = require("redux-devtools-extension");
const { thunk } = require("redux-thunk");

const reducer = combineReducers({});

const initialState = {};

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;