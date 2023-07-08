import React from "react";
import "../styles/Cards.css";
import { NavLink, useNavigate } from "react-router-dom"

const Cards = (props) => {
  let navigate = useNavigate();

  let NavigateCard = (i) => {
    navigate(i)
  }
  return (
    //     <div className="card">
    //   <div className="card-details">
    //     <p className="text-title">{props.title}</p>
    //     <p className="text-body">{props.value}</p>
    //   </div>
    //   <a className="card-button" href="#link">View Details</a>
    // </div>
    <div className="card_" onClick={() => NavigateCard(props.link)}>
      <div className="cards_left">
        <span id="title">{props.title}</span>
        <span id="value">{props.value}</span>
        <NavLink style={{ color: "white", fontSize: "12px" }} to={props.link}>View details</NavLink>
      </div>
      <div className="cards_right">
        {/* <i className="ri-user-2-fill"></i> */}
        <i className={props.class}></i>
      </div>
    </div>
  );
};

export default Cards;
