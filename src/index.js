import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import StarsRating from "./component/StarsRating";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

{
  /* <StarsRating /> */
}
{
  /* <StarsRating maxRating={5} color='red' size={24} messages={["Terrible", "Bad", "Okay", "Good", "Amazing"]} defaultRating={3}  /> */
}
