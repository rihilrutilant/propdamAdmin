import React from "react";
import { NavLink, useNavigate } from 'react-router-dom'

const ApprovalDisplay = () => {
  let Navigate = useNavigate();

  let EditNavigate = () => {
    Navigate('/approval/:id/edit');
  }
  return (
    <div>
      <NavLink to="/approval" style={{ textDecoration: 'none' }}>
        <span style={{ color: "grey", fontSize: "18px", marginLeft: '20px', marginTop: '40px' }}>
          Back{" "}
          <i
            className="fa-solid fa-arrow-left"
            style={{ fontSize: "15px", marginLeft: "5px" }}
          ></i>
        </span>
      </NavLink>
      <div style={{ display: "flex", justifyContent: "center", padding: '50px 0px 50px 0' }}>
        <div
          className="approval_container"
          style={{ width: "80%", display: "flex", gap: "30px", alignItems: 'center', border: '3px solid tomato', padding: '20px', borderRadius: '20px', }}
        >
          <div className="approval_left" style={{ textAlign: 'center' }}>
            <h4 style={{ color: 'grey', marginBottom: '10px' }}>Property View</h4>
            <img src="https://tinyurl.com/23x8zmj9" alt="" />
          </div>
          <div
            className="approval_right"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <span>
              <strong>Name</strong>: JohnDoe Villa
            </span>
            <span>
              <strong>Description :</strong>Lorem ipsum dolor sit amet,
              consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
              labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo
              consequat. Duis aute irure dolor in reprehenderit in voluptate velit
              {/* esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit */}
              anim id est laborum.
            </span>
            <div className="location">
              <strong>Property Location</strong>
              <ul style={{ listStyleType: 'dotted' }}>
                <li>Delhi</li>
                <li>Uttra pradesh</li>
                <li>Madhya pradesh</li>
              </ul>
            </div>
            <span><strong>Property type : </strong>Residential</span>
            <div className="property_price" style={{ display: 'flex' }}>
              <strong>Pricing : </strong>
              <span>$200</span>
            </div>
            <div className="btn-types" style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn btn-primary" style={{ marginRight: '30px' }}>Approve</button>
              <button className="btn btn-primary" style={{ marginRight: '30px' }} onClick={EditNavigate}>Edit</button>
              <button className="btn btn-danger">Reject</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApprovalDisplay;
