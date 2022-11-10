import React from "react";
import "./car.css";
const Car = ({ car }) => {
  const {modelName, bodyType, modelType, imageUrl} = car;
  return (
  <>
    <div>
      <div className="card-headings">
        <p className="brand">{bodyType}</p>
        <div className="headings2">
          <h3 className="model">{modelName}</h3>
          <p className="modelType">{modelType}</p>
        </div>
      </div>
      <div className="cartImg">
        <img src={imageUrl} alt="" />
      </div>
      <div className="card-btn">
        <h3 className="btn">LEARN &gt;</h3>
        <h3 className="btn">SHOP &gt;</h3>
      </div>
    </div>
    </>
  );
};

export default Car;
