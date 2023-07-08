import React, { useCallback, useEffect, useState } from 'react'
import makeAPIRequest from '../globle/ApiCall';
import ApiConst from '../globle/ApiKeys';
import { VscCommentUnresolved } from 'react-icons/vsc'
import { MdOutlineDownloadDone } from 'react-icons/md'

const SupportManagement = () => {
  const [getData, setgetData] = useState([])
  const [searchData, setsearchData] = useState([])
  //------------------ Pagination-----------------------------
  const itemsPerPage = 15;
  const totalPages = Math.ceil(getData?.length / itemsPerPage);
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

  //------------------ Get all data------------------------
  const GetAllSMList = useCallback(() => {
    makeAPIRequest('get', ApiConst.supportManagementList, null, null, null).then((response) => {
      setgetData(response.data.sUserList);
      setsearchData(response.data.sUserList);
    }).catch((error) => {
      console.log(error);
    })
  }, [])

  useEffect(() => {
    GetAllSMList()
  }, [GetAllSMList])
  //------------------ Get all data------------------------

  //------------------ resolved the euery ------------------
  const resolveEnquery = (id) => {
    makeAPIRequest('put', ApiConst.resolveEnqueries + id, null, null, null)
      .then((response) => {
        GetAllSMList();
      }).catch((error) => {
        console.log(error);
      })
  }
  //------------------ resolved the euery ------------------

  //------------------ Search the data -----------------
  // const [search, setsearch] = useState()
  const onSearch = (e) => {
    let search = e.target.value
    let fData = getData?.filter((item) => item?.quaryToken?.toLowerCase().indexOf(search?.toLowerCase()) !== -1)
    setsearchData(fData);
  }

  //------------------ Search the data -----------------

  return (
    <div>
      <div className="title_support" style={{ marginTop: '30px', marginBottom: '30px', marginLeft: '20px' }}>
        <h3 style={{ fontWeight: 'bold', color: 'black' }}>Support Requested</h3>
      </div>
      <div className="container mt-4">
        <div className="group">
          <svg className="icon" aria-hidden="true" viewBox="0 0 24 24">
            <g>
              <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
            </g>
          </svg>
          <input placeholder="Search" onChange={onSearch}  type="search" className="input" />
        </div>
        {/* <div className="search-finance">
        </div> */}
        <table className="table table-striped table-hover">
          <thead className="thead-light">
            <tr>
              <th>Token</th>
              <th>UserName</th>
              <th>Mobile Number</th>
              <th>Email</th>
              <th>Date/time</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              searchData?.slice(startIndex, endIndex).map((data, index) => (
                <tr key={index}>
                  <td>{data?.quaryToken}</td>
                  <td>{data?.userName}</td>
                  <td>{data?.userMobile}</td>
                  <td>{data?.userEmail}</td>
                  <td>{new Date(data?.registerDate).toISOString().split('T')[0]}</td>
                  <td>{data?.isResolved ? "Resolved" : "Active"}</td>
                  <td>{data?.isResolved ? <MdOutlineDownloadDone /> : <VscCommentUnresolved onClick={() => resolveEnquery(data?._id)} />}</td>
                </tr>
              ))
            }
          </tbody>
        </table>

        {/* <div className="button_download" style={{marginTop : "30px",marginBottom : '30px',float : 'right', marginRight : "30px"}}>
        <div className="btn btn-primary">Download Data in excel</div>
      </div> */}

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
  )
}

export default SupportManagement