import React from "react";
import Btn from "../Btn";
import "./Card.css";

const Card = props => (
  <div
    className="card"
    style={{
      backgroundImage: props.image ? `url(${props.image})` : "none"
    }}
  >
    {!props.image && <i className="fa fa-spinner fa-spin" aria-hidden="true" />}
    <Btn
      style={{ opacity: props.image ? 1 : 0 }}
      onClick={props.handleBtnClick}
      data-value="Login"
    />
    <Btn
      style={{ opacity: props.image ? 1 : 0 }}
      onClick={props.handleBtnClick}
      data-value="Register"
    />
  </div>
);

export default Card;
