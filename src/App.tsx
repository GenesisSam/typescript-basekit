import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Firebase from "firebase";

import Hello from "./components/Hello";

initializeFirebase();

ReactDOM.render(
  <Hello />,
  document.getElementById("root"),
);

function initializeFirebase() {
  const config = {

  };

  Firebase.initializeApp(config);
}
