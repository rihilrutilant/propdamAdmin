import React, { useCallback, useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import ApiConst from "../globle/ApiKeys";
import makeAPIRequest from "../globle/ApiCall";

const EnquiryByid = () => {

  const [Complain, setComplain] = useState()

  //----------------- Get Complain-------------------------
  const { id } = useParams();
  const GetConplain = useCallback(() => {
    makeAPIRequest('get', ApiConst.getComplain + id, null, null)
      .then((response) => {
        setComplain(response.data.complaint);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id])
  //----------------- Get Complain-------------------------

  useEffect(() => {
    GetConplain()
  }, [GetConplain])


  return (
    <div>
      {/* User Details Part*/}
      <div style={{ marginTop: "50px" }}>
        <div
          className="top_user_details"
          style={{
            marginTop: "50px",
            marginBottom: "30px",
            paddingLeft: "30px",
          }}
        >
          <NavLink to="/enquires" style={{ textDecoration: "none" }}>
            <h3 style={{ fontSize: "35px", fontWeight: "Bold", color: "gray" }}>
              <i className="fa-solid fa-arrow-left"></i>Property Details
            </h3>
          </NavLink>
        </div>
        <div className="container">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Field</th>
                <th>Data</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Name</td>
                <td>{Complain?.name}</td>
              </tr>
              <tr>
                <td>Mobile Number</td>
                <td>{Complain?.mobaileNumber}</td>
              </tr>
              <tr>
                <td>Email</td>
                <td>{Complain?.email}</td>
              </tr>
              <tr>
                <td>Query Message</td>
                <td>
                  {Complain?.message}
                </td>
              </tr>
              <tr>
                <td>Status</td>
                <td>{Complain?.status}</td>
              </tr>
            </tbody>
          </table>

          <div className="button-container d-flex justify-content-center mt-20">
            {/* <button className="btn btn-primary mx-2">Suspend Property</button>
            <button className="btn btn-primary mx-2">Delete Enquiry</button>
            <button className="btn btn-primary mx-2">Send Notification</button> */}
            {/* <button className="btn btn-primary mx-2">
                  Last 5 viewed properties
                </button> */}
            {/* <button className="btn btn-primary mx-2">
              Total reviews updated
            </button>
            <button className="btn btn-primary mx-2">Property History</button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnquiryByid;
