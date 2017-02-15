import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Firebase from "firebase";

import { Router, browserHistory, IndexRoute, Route } from "react-router";

import Hello from './components/Hello';
import App from "./navigation";


initializeFirebase();

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Hello} />
      <Route path="home" component={Hello}/>
      <Route path="wallet" component={Hello}/>
    </Route>
  </Router>,
  document.getElementById("root"),
);

function initializeFirebase() {
  const config = {

  };

  Firebase.initializeApp(config);
}
