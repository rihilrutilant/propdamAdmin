import React, { useCallback, useEffect, useState } from 'react';
import '../styles/Agentmanagement.css';
import { useNavigate } from 'react-router-dom'
import ApiConst from '../globle/ApiKeys';
import makeAPIRequest from '../globle/ApiCall';

const PropertyManagement = () => {
  const [PropertyList, setPropertyList] = useState([])
  const [searchData, setsearchData] = useState([])

  //------------------ Pagination-----------------------------
  const itemsPerPage = 15;
  const totalPages = Math.ceil(PropertyList?.length / itemsPerPage);
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

  // ------------------- fetch all property details -----------------------
  const GetAllPropertyList = useCallback(() => {
    makeAPIRequest('get', ApiConst.get_all_property_list, null, null, null).then((response) => {
      setPropertyList(response?.data?.list);
      setsearchData(response?.data?.list);
    }).catch((error) => {
      console.log(error);
    })
  }, [])

  useEffect(() => {
    GetAllPropertyList()
  }, [GetAllPropertyList])

  // ------------------- fetch all property details -----------------------


  //----------------- Navigate--------------------
  let navigate = useNavigate();
  let PropertyDetails = (id) => {
    navigate(`/property/${id}`);
  }
  //----------------- Navigate--------------------

  // --------------- Search data-----------------
  const onSearch = (e) => {
    let search = e.target.value;
    let fData = PropertyList?.filter((item) => {
      const address = item?.address1;
      if (address && typeof address === 'string') {
        return address.toLowerCase().includes(search?.toLowerCase());
      }
      return false;
    });
    setsearchData(fData);
  }
  // --------------- Search data-----------------

  return (
    <div className="agent">

      <div className="container mt-4">
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
              {/* <th>Property Id</th> */}
              <th>Property Type</th>
              <th>Property address - I</th>
              <th>Property address - II</th>
              <th>Property view</th>
              <th>Property price</th>
              <th>State</th>
              <th>Cities</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {searchData?.slice(startIndex, endIndex).map((data, index) => (
              <tr key={index} onClick={() => PropertyDetails(data._id)}>
                {/* <td>{data.id}</td> */}
                {/* <td>{index+1}</td> */}
                <td>{data.property_type}</td>
                <td>{data.address1}</td>
                <td>{data.address2}</td>
                <td>{data.view}</td>
                <td>{data.sale_price}</td>
                <td>{data.state}</td>
                <td>{data.city}</td>
                <td>{data.isSuspended ? 'Suspended' : 'Active'}</td>
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
  );
}

export default PropertyManagement;