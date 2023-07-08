import React, { useEffect, useState } from 'react'
import { DropzoneArea } from 'material-ui-dropzone';
import { FaUserAltSlash } from 'react-icons/fa'
import { CgUnblock } from 'react-icons/cg'
import '../styles/Newsletter.css'
import { useCallback } from 'react';
import makeAPIRequest from '../globle/ApiCall';
import ApiConst from '../globle/ApiKeys';

const NewsLetterManagement = () => {
  const [newsLetter, setNewsLetter] = useState()
  const [searchData, setsearchData] = useState([])

  //------------------ Pagination-----------------------------
  const itemsPerPage = 15;
  const totalPages = Math.ceil(newsLetter?.length / itemsPerPage);
  const [currentPage, setCurrentPage] = React.useState(1);

  // Calculate the start and end index of the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Helper function to generate an array of page numbers based on the current page
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPageDisplay = 10; // Maximum number of page buttons to display

    if (totalPages <= maxPageDisplay) {
      // If the total number of pages is less than or equal to the maximum display, show all page numbers
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // If the total number of pages is greater than the maximum display, show a range of page numbers
      const midPoint = Math.floor(maxPageDisplay / 2);
      let startPage = currentPage - midPoint;
      let endPage = currentPage + midPoint;

      if (startPage < 1) {
        startPage = 1;
        endPage = maxPageDisplay;
      } else if (endPage > totalPages) {
        endPage = totalPages;
        startPage = totalPages - maxPageDisplay + 1;
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
    }

    return pageNumbers;
  };

  //------------------ Pagination-----------------------------


  // ---------------- send Email --------------------
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
  // ---------------- send Email --------------------


  // ---------------- Get all newsletter -------------
  const getNewsLetter = useCallback(() => {
    makeAPIRequest('get', ApiConst.getNewsLetters, null, null)
      .then((response) => {
        setNewsLetter(response.data.agentList)
        setsearchData(response.data.agentList)
      }).catch((error) => {
        console.log(error);
      })
  }, [])

  useEffect(() => {
    getNewsLetter();
  }, [getNewsLetter])
  // ---------------- Get all newsletter -------------

  // ---------------- Block the mails ---------------
  const blockTheMAil = (id) => {
    makeAPIRequest('put', ApiConst.blockTheMail + id, null, null)
      .then((response) => {
        getNewsLetter()
      }).catch((error) => {
        console.log(error);
      })
  }
  // ---------------- Block the mails ---------------
  // --------------- Search data-----------------
  const onSearch = (e) => {
    let search = e.target.value;
    let fData = newsLetter?.filter((item) => {
      const address = item?.userMobile;
      if (address && typeof address === 'string') {
        return address.toLowerCase().includes(search?.toLowerCase());
      }
      return false;
    });
    setsearchData(fData);
  }
  // --------------- Search data-----------------
  return (
    <div>
      <div className="title_enquiry" style={{ marginTop: '30px', marginBottom: '30px', marginLeft: '20px' }}>
        <h3 style={{ fontWeight: 'bold', color: 'black' }}>Newsletter User Listed</h3>
      </div>
      <div className="agent">

        <div className="container mt-0">
          <div className="group">
            <svg className="icon" aria-hidden="true" viewBox="0 0 24 24">
              <g>
                <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
              </g>
            </svg>
            <input placeholder="Search" onChange={onSearch} type="search" className="input" />
          </div>
          <table className="table table-striped table-hover">
            <thead className="thead-light">
              <tr>
                <th>Name</th>
                <th>User Email</th>
                <th>Mobile Number</th>
                <th>Registred date</th>
                <th>Total Email sent</th>
                <th>Aciton</th>
              </tr>
            </thead>
            <tbody>
              {searchData?.slice(startIndex, endIndex).map((data, index) => (
                <tr key={index}>
                  <td>{data.userName}</td>
                  <td>{data.userEmail}</td>
                  <td>{data.userMobile}</td>
                  <td>{new Date(data.StartDate).toISOString().split('T')[0]}</td>
                  <td>{data.mailCount}</td>
                  <td>
                    {
                      data?.sendMail ? <CgUnblock onClick={() => blockTheMAil(data._id)} /> :
                        <FaUserAltSlash onClick={() => blockTheMAil(data._id)} />
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <nav>
            <ul className="pagination">
              {getPageNumbers().map((pageNumber) => (
                <li
                  key={pageNumber}
                  className={`page-item ${currentPage === pageNumber ? 'active' : ''}`}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(pageNumber)}
                  >
                    {pageNumber}
                  </button>
                </li>
              ))}
            </ul>
          </nav>


          {/* Messanger part */}
          <div className="top_user_details" style={{ marginTop: "50px", marginBottom: "30px", paddingLeft: "30px" }}      >
            <h3 style={{ fontSize: "35px", fontWeight: "Bold", color: "gray" }}>
              Send E-mail
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
                  <label htmlFor="subject">Attechments:</label>
                  <DropzoneArea
                    // onChange={(files) => console.log('Files:', files)}
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



        </div>
      </div>
    </div>
  )
}

export default NewsLetterManagement