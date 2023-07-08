import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import makeAPIRequest from '../globle/ApiCall';
import ApiConst from '../globle/ApiKeys';
const ContactUsEnquires = () => {
  const [Compalins, setCompalins] = useState()
  const [searchData, setsearchData] = useState([])
  //------------------ Pagination-----------------------------
  const itemsPerPage = 15;
  const totalPages = Math.ceil(Compalins?.length / itemsPerPage);
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

  let navigate = useNavigate();
  const NavigateToid = (id) => {
    navigate(`/enquires/${id}`);
  }

  // -------------------- Get all complains ------------------
  const GetAllComplains = useCallback(() => {
    makeAPIRequest('get', ApiConst.getallcomplains, null, null)
      .then((response) => {
        setCompalins(response.data.complaint); 
        setsearchData(response.data.complaint);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [])
  // -------------------- Get all complains ------------------


  // --------------- Search data-----------------
  const onSearch = (e) => {
    let search = e.target.value;
    let fData = Compalins?.filter((item) => {
      const address = item?.mobaileNumber;
      if (address && typeof address === 'string') {
        return address.toLowerCase().includes(search?.toLowerCase());
      }
      return false;
    });
    setsearchData(fData);
  }
  // --------------- Search data-----------------

  useEffect(() => {
    GetAllComplains()
  }, [GetAllComplains])
  return (
    <div>
      <div className="title_enquiry" style={{ marginTop: '30px', marginBottom: '30px', marginLeft: '20px' }}>
        <h3 style={{ fontWeight: 'bold', color: 'black' }}>Enqueries Listed</h3>
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
                {/* <th>S.No</th> */}
                <th>Name</th>
                <th>User Email</th>
                <th>Mobile Number</th>
                <th>Query Subject</th>
                <th>Data / Time</th>
              </tr>
            </thead>
            <tbody>
              {searchData?.slice(startIndex, endIndex).map((data) => (
                <tr key={data._id} onClick={() => NavigateToid(data._id)}>
                  {/* <td>{data.id}</td> */}
                  <td>{data.name}</td>
                  <td>{data.email}</td>
                  <td>{data.mobaileNumber}</td>
                  <td>{data.subject}</td>
                  <td>{new Date(data.date).toISOString().split('T')[0]}</td>
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
        </div>
      </div>
    </div>
  )
}

export default ContactUsEnquires