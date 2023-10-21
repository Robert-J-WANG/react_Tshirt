import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { SharedStateProvider } from "./context/UseCartContainer.js";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <SharedStateProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </SharedStateProvider>
);
