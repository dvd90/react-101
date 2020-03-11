import React from "react";
import "./marker.css";

const Marker = ({ text, selected }) => {
  const select = "selected";
  return <div className={`marker ${selected && select}`}>{text}€</div>;
};

export default Marker;
