import { combineReducers } from "redux";
import reducerUser from "./components/login/reducer";
import reducerWallet from "./components/accountShow/reducer";

export const rootReducer = combineReducers({
  reducerUser,
  reducerWallet,
});
