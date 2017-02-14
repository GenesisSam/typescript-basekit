import * as React from "react";
import * as ReactDOM from "react-dom";
import { createStore } from "redux";
import AppRedux from './reducer';

import Hello from "./components/Hello";
let store = createStore(AppRedux);

ReactDOM.render(
    <Hello />,
    document.getElementById("root"),
);
