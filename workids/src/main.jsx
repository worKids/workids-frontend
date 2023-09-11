import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import React from "react";
import App from "./App";
import { RecoilRoot } from "recoil";
ReactDOM.createRoot(document.getElementById("root")).render(
  <RecoilRoot>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </RecoilRoot>
);
