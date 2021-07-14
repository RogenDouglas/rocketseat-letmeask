import React from "react";
import ReactDOM from "react-dom";

import { Toaster } from "react-hot-toast";

import App from "./App";

import "./services/firebase";
import "./styles/global.scss";

ReactDOM.render(
  <React.StrictMode>
    <App />
    <Toaster position="top-right" reverseOrder={false} />
  </React.StrictMode>,
  document.getElementById("root")
);
