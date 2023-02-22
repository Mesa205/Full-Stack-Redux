import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import axios from "axios"

//ACCIONES ASYN QUE VA ENTRAR AL BACK

axios.defaults.baseURL = "http://localhost:4000";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
