import React from "react";
import "antd/dist/antd.css";
import ReactDOM from "react-dom";
import "./index.css";
// import from "./firebase";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// "@testing-library/jest-dom": "5.11.1",
// "@testing-library/react": "10.4.7",
// "@testing-library/user-event": "12.0.11",
// "@wojtekmaj/enzyme-adapter-react-17": "^0.6.3",
// "babel-jest": "^20.0.3",
// "enzyme": "^3.11.0",
// "enzyme-to-json": "^3.6.2",
// "jest": "^20.0.4"
