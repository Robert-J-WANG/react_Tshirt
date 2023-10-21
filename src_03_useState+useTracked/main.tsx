import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { SharedStateProvider } from "./context/UseCartContainer.js";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <SharedStateProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </SharedStateProvider>
);
