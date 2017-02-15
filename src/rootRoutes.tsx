import * as React from "react";
import { Router, browserHistory, IndexRoute, Route } from "react-router";

import Navigation from "./components/navigation";
import AccountShow from "./components/accountShow";
import Hello from "./components/Hello";

import Page404 from "./components/Page404";

export default class RootRoutes extends React.Component<{}, {}> {
    public render() {
      return (
        <Router history={browserHistory}>
          <Route path="/" component={Navigation}>
            <IndexRoute component={AccountShow} />
            <Route path="home" component={AccountShow} />
            <Route path="wallet" component={AccountShow} />
            <Route path="login" component={Hello} />
            <Route path="*" component={Page404} />
          </Route>
        </Router>
      );
    }
}
