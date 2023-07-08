import React, { useCallback, useEffect, useState } from "react";
import "../styles/Agentmanagement.css";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import ApiConst from "../globle/ApiKeys";
import makeAPIRequest from "../globle/ApiCall";

const PropertyDetails = () => {

  const navigate = useNavigate()
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

  //-------------- fetch all details of owner ------------------
  const [OwnerList, setOwnerList] = useState()
  const { id } = useParams();
  const GetOwnerList = useCallback(() => {
    makeAPIRequest('get', ApiConst.get_details_of_owner + id, null, null)
      .then((response) => {
        setOwnerList(response.data.list);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id])


  useEffect(() => {
    GetOwnerList()
  }, [GetOwnerList])
  //-------------- fetch all details of owner ------------------


  //-------------- Delete Property ---------------------------

  // const DeleteProperty = (id) => {
  //   makeAPIRequest('delete', ApiConst.delete_the_property + id, null, null)
  //     .then((response) => {
  //       response.data.status ? navigate('/property') : alert("there is something wrong")
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }


  //-------------- Delete Property ---------------------------


  // --------------- Suspend Property -----------------------
  const suspendProperty = (id) => {
    makeAPIRequest('put', ApiConst.suspendProperties + id, null, null)
      .then((response) => {
        response.data.status ? GetOwnerList() : alert("there is something wrong")
      })
      .catch((error) => {
        console.log(error);
      });
  }
  // --------------- Suspend Property -----------------------

  // --------------- Review Property -------------------
  const [propertyHistory, setPropertyHistory] = useState([])

  const propertyReview = (id) => {
    makeAPIRequest('get', ApiConst.propertyReview + id, null, null, null)
      .then((response) => {
        setPropertyHistory(response.data.property)
      })
      .catch((error) => {
        console.log(error);
      });
  }
  // --------------- Review Property -------------------

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
          <NavLink to="/property" style={{ textDecoration: "none" }}>
            <h3 style={{ fontSize: "35px", fontWeight: "Bold", color: "gray" }}>
              <i className="fa-solid fa-arrow-left"></i>Property Details
            </h3>
          </NavLink>
          {/* <NavLink to="/property/:id" style={{ textDecoration: "none" }}>
            <span>
               Property <i className="fa-solid fa-arrow-right"></i>
            </span>
          </NavLink> */}
          {/* <i className="fa-solid fa-arrow-left"></i> */}
          {/* <i className="fa-solid fa-arrow-right"></i> */}
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
                <td>OwnerName</td>
                <td>{OwnerList?.owner_name}</td>
              </tr>
              <tr>
                <td>Mobile Number</td>
                <td>{OwnerList?.owner_number}</td>
              </tr>
              <tr>
                <td>Email</td>
                <td>example@example.com</td>
              </tr>
              <tr>
                <td>Account</td>
                <td>Account Name</td>
              </tr>
              <tr>
                <td>Status</td>
                <td>{OwnerList?.isSuspended ? 'Suspended' : 'Active'}</td>
              </tr>
            </tbody>

          </table>

          <div className="button-container d-flex justify-content-center mt-20">
            {
              OwnerList?.isSuspended ?
                <button className="btn btn-primary mx-2" onClick={() => suspendProperty(OwnerList._id)}>Activate Property</button> :
                <button className="btn btn-primary mx-2" onClick={() => suspendProperty(OwnerList._id)}>Suspend Property</button>

            }
            {/* <button className="btn btn-primary mx-2" onClick={() => DeleteProperty(id)}>Delete Property</button>4444445 */}
            {/* <button className="btn btn-primary mx-2">Send Notification</button> */}
            {/* <button className="btn btn-primary mx-2">
              Last 5 viewed properties
            </button> */}
            {/* <button className="btn btn-primary mx-2">
              Total reviews updated
            </button> */}
            <button className="btn btn-primary mx-2" data-bs-toggle="modal" data-bs-target="#propertyView" onClick={() => propertyReview(OwnerList._id)}>Property History</button>
          </div>
        </div>
      </div>

      {/* Messanger part */}
      <div className="top_user_details" style={{ marginTop: "50px", marginBottom: "30px", paddingLeft: "30px" }}      >
        <h3 style={{ fontSize: "35px", fontWeight: "Bold", color: "gray" }}>
          Send Message
        </h3>
      </div>
      <div className="container d-flex justify-content-center vh-100" style={{ maxHeight: "400px", marginTop: "50px" }}      >
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


      {/* reviewPropertyModel */}
      <div className="modal fade" id="propertyView" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog propertyView">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Review Property</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <table className="table table-striped table-hover">
                <thead className="thead-light">
                  <tr>
                    <th>Created At</th>
                    <th>Updated At</th>
                    <th>View</th>
                    <th>Is Suspended</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{propertyHistory?.date_created}</td>
                    <td>{propertyHistory?.updatedAt}</td>
                    <td>{propertyHistory?.view}</td>
                    <td>{propertyHistory?.isSuspended ? "suspended" : "Active"}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" data-bs-dismiss="modal">OK</button>
            </div>
          </div>
        </div>
      </div>
      {/* reviewPropertyModel */}

    </div>
  );
};

export default PropertyDetails;
