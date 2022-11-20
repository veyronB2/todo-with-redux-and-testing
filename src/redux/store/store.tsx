import { createStore } from "redux";
import reducers from "../reducers/combineReducers";

const store = createStore(reducers);

export default store;

export const getStore = () => createStore(reducers);
