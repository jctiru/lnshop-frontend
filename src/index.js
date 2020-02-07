import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { store, persistor, history } from "./redux/store";
import "./index.css";
import App from "./App";

if (process.env.NODE_ENV === "development") {
  const whyDidYouRender = require("@welldone-software/why-did-you-render");
  whyDidYouRender(React, {
    trackAllPureComponent: true,
    titleColor: "aqua",
    diffNameColor: "aqua",
    diffPathColor: "aqua"
  });
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </Router>
  </Provider>,
  document.getElementById("root")
);
