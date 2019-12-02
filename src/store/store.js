import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import postsReducer from "./../reducers/postsReducer";

const store = createStore(postsReducer, applyMiddleware(thunk));

export default store;
