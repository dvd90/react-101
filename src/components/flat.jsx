import React from "react";
import "./flat.css";

const Flat = ({ flat, handler }) => {
  const { name, imageUrl, price, priceCurrency } = flat;

  const handleClick = () => {
    handler(flat);
  };

  const style = {
    backgroundImage: `url('${imageUrl}')`
  };

  const title = `${name} - ${price} ${priceCurrency}`;

  return (
    <div className="flat" onClick={handleClick}>
      <div className="flat-picture" style={style}></div>
      <div className="flat-title">{title}</div>
    </div>
  );
};

export default Flat;
