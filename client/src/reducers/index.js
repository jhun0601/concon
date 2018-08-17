import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";

export default combineReducers({
  //combine reducers
  auth: authReducer,
  errors: errorReducer
});
