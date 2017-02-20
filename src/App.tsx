import * as React from "react";
import * as ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import * as createLogger from "redux-logger";
import * as Firebase from "firebase";

// Material ui
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import RootRoutes from "./rootRoutes";

// reducers
import { rootReducer } from "./rootReducer";

const loggerMiddleWare = createLogger();

initializeFirebase();

const store = createStore(rootReducer, applyMiddleware(
    thunk, // lets us dispatch() functions
    loggerMiddleWare, // neat middleware that logs actions
));

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider>
      <RootRoutes />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById("root"),
);

function initializeFirebase() {
  const config = {

  };

  Firebase.initializeApp(config);
}
