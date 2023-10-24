import { createStore } from "redux";
import { applyMiddleware } from "redux";
import rootReducer from "../REDUCER/index.js";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
