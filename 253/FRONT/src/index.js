import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./CONTAINER/App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { store } from "./REDUX/STORE/index.js";
import { UserProvider } from "../src/Context/UserContext.js";
import axios from "axios";

//axios.defaults.baseURL = "http://localhost:3001";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "https://253-production.up.railway.app/";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <UserProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </UserProvider>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
