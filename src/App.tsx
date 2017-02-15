import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Firebase from "firebase";

// Material ui
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import RootRoutes from "./rootRoutes";



initializeFirebase();

ReactDOM.render(
  <MuiThemeProvider>
    <RootRoutes />
  </MuiThemeProvider>
  ,
  document.getElementById("root"),
);

function initializeFirebase() {
  const config = {

  };

  Firebase.initializeApp(config);
}
