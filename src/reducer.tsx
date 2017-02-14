import { combinedReducers } from "redux";
import * as reducers from "./components/reducer";

const AppRedux = combinedReducers({
  reducers,
});

export default AppRedux;
