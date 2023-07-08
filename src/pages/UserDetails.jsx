import React, { useState } from "react";
import "../styles/Agentmanagement.css";
import { NavLink, useNavigate } from "react-router-dom";
import makeAPIRequest from "../globle/ApiCall";
import ApiConst from "../globle/ApiKeys";

const UserDetails = () => {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubjectChange = (event) => {
    setSubject(event.target.value);
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform any necessary actions with the subject and message data
    console.log("Subject:", subject);
    console.log("Message:", message);
    // Reset the form
    setSubject("");
    setMessage("");
  };

  const storedData = JSON.parse(sessionStorage.getItem('myData'));

  const [Status, setStatus] = useState(storedData.planStatus)

  // ------------------------- Susplend plan-----------------------

  const suspendPaln = (id) => {
    makeAPIRequest('put', ApiConst.suspendPlan + id, null, null)
      .then((response) => {
        setStatus(response.data.isSuspend)
      }).catch((error) => {
        console.log(error);
      })
  }

  // ------------------------- Susplend plan-----------------------

  // ------------------------- Delete agent -----------------------
  const navigate = useNavigate()
  const deleteAgent = (id) => {
    makeAPIRequest('delete', ApiConst.deleteAgent + id, null, null)
      .then(() => {
        navigate('/agent')
      }).catch((error) => {
        console.log(error);
      })
  }
  // ------------------------- Delete agent -----------------------

  //------------------------- last 5 property --------------------  
  const [reviewData, setreviewData] = useState()
  const getLastFiveproperty = (id) => {
    makeAPIRequest('get', ApiConst.lastFiveReviews + id, null, null)
      .then((response) => {
        setreviewData(response.data.history)
      }).catch((error) => {
        console.log(error);
      })
  }
  //------------------------- last 5 property --------------------

  // ------------------------ Get all enquiries -----------------
  const [enquiries, setenquiries] = useState()
  const getEnquiries = (id) => {
    makeAPIRequest('get', ApiConst.agentComplain + id, null, null)
      .then((response) => {
        setenquiries(response.data.complaint)
      }).catch((error) => {
        console.log(error);
      })
  }
  // ------------------------ Get all enquiries -----------------
  return (
    <>
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
          <NavLink to="/agent" style={{ textDecoration: "none" }}>
            <h3 style={{ fontSize: "35px", fontWeight: "Bold", color: "gray" }}>
              <i className="fa-solid fa-arrow-left"></i>Agent Details
            </h3>
          </NavLink>
          <NavLink to="/agent/:id/activity" style={{ textDecoration: "none" }}>
            <span>
              Agent activity <i className="fa-solid fa-arrow-right"></i>
            </span>
          </NavLink>
          {/* <i className="fa-solid fa-arrow-left"></i> */}
          {/* <i className="fa-solid fa-arrow-right"></i> */}
        </div>
        <div className="container">
          <table className="table table-bordered">
            <tbody>
              <tr>
                <th>Field</th>
                <th>Data</th>
              </tr>
              <tr>
                <td>Name</td>
                <td>{storedData?.userName}</td>
              </tr>
              <tr>
                <td>Mobile Number</td>
                <td>{storedData?.userMobile}</td>
              </tr>
              <tr>
                <td>Email</td>
                <td>{storedData?.userEmail}</td>
              </tr>
              <tr>
                <td>Account</td>
                <td>Account Name</td>
              </tr>
              <tr>
                <td>Status</td>
                <td>{Status ? "Suspended" : "Active"}</td>
              </tr>
            </tbody>
          </table>

          <div className="button-container d-flex justify-content-center mt-20">
            {
              Status ?
                <button className="btn btn-primary mx-2" onClick={() => suspendPaln(storedData._id)}>Activat plan</button> :
                <button className="btn btn-primary mx-2" onClick={() => suspendPaln(storedData._id)}>Suspend plan</button>
            }

            <button className="btn btn-primary mx-2" onClick={() => deleteAgent(storedData._id)}>Delete Agent</button>
            {/* <button className="btn btn-primary mx-2">Send Message</button> */}
            <button className="btn btn-primary mx-2" onClick={() => getLastFiveproperty(storedData._id)} data-bs-toggle="modal" data-bs-target="#lastFiveReview">
              Last 5 viewed properties
            </button>
            <button className="btn btn-primary mx-2" onClick={() => getEnquiries(storedData._id)} data-bs-toggle="modal" data-bs-target="#totalEnquiryAsk">
              Total Enquiries Asked
            </button>
            {/* <button className="btn btn-primary mx-2">Activity History</button> */}
          </div>
        </div>
      </div>

      {/* Messanger part */}
      <div
        className="top_user_details"
        style={{ marginTop: "50px", marginBottom: "30px", paddingLeft: "30px" }}
      >
        <h3 style={{ fontSize: "35px", fontWeight: "Bold", color: "gray" }}>
          Send Message
        </h3>
      </div>
      <div
        className="container d-flex justify-content-center vh-100"
        style={{ maxHeight: "400px", marginTop: "50px" }}
      >
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="subject">Subject:</label>
              <input
                type="text"
                className="form-control"
                id="subject"
                value={subject}
                onChange={handleSubjectChange}
                placeholder="Enter the subject of your message"
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message:</label>
              <textarea
                className="form-control"
                id="message"
                rows="5"
                value={message}
                onChange={handleMessageChange}
                placeholder="Enter the message needed to send for the agent"
              ></textarea>
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              style={{ marginTop: "30px" }}
            >
              Send
            </button>
          </form>
        </div>
      </div>


      {/* <!-- last 5 reviews Modal --> */}
      <div className="modal fade" id="lastFiveReview" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog model_review">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Last 5 Viewed Property</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <table className="table table-striped table-hover">
                <thead className="thead-light">
                  <tr>
                    <th>Property Type</th>
                    <th>Sub Property Type</th>
                    <th>Location</th>
                    <th>Property Listing Status</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    reviewData?.map((data, index) => (
                      <tr key={index}>
                        <td>{data?.property_type}</td>
                        <td>{data?.sub_property_type}</td>
                        <td>{data?.location}</td>
                        <td>{data?.property_listing_status}</td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Total Enquiry Ask Modal --> */}
      <div className="modal fade" id="totalEnquiryAsk" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog model_enquiry">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Last 5 Viewed Property</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <table className="table table-striped table-hover">
                <thead className="thead-light">
                  <tr>
                    <th>Complain title</th>
                    <th>Message</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    enquiries?.map((item, index) => (
                      <tr key={index}>
                        <td>{item?.subject}</td>
                        <td>{item?.message}</td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default UserDetails;
