import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./style/Global.css";
import "antd/dist/antd.less";
import { Provider } from "react-redux";
import store from "./store/Store";

import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
