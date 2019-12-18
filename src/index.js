import React from "react";
import ReactDOM from "react-dom";
import * as go from "gojs";
import App from "./components/App";
import "./index.css";

const gojsKey = process.env.REACT_APP_GOJS_KEY;

if (gojsKey) {
  go.licenseKey = gojsKey;
}

ReactDOM.render(<App />, document.getElementById("root"));
