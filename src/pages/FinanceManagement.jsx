import React, { useCallback, useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/Financemanagement.css";
import makeAPIRequest from '../globle/ApiCall';
import ApiConst from '../globle/ApiKeys';

const FinanceManagement = () => {
  const [financeHistory, setfinanceHistory] = useState()
  const [searchData, setsearchData] = useState([])
  // Example data for the table


  //------------------ Pagination-----------------------------
  const itemsPerPage = 15;
  const totalPages = Math.ceil(financeHistory?.length / itemsPerPage);
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

  //----------------------- get all finance details --------------------
  const [income, setincome] = useState("00")
  const [agents, setagents] = useState("00")
  const [dates, setDates] = useState({
    from_date: "",
    to_date: ""
  })

  const getAllFinanceDetails = useCallback(() => {
    makeAPIRequest('post', ApiConst.getrAllFinanceDetail, null, null)
      .then((response) => {
        setfinanceHistory(response?.data?.agentList?.history)
        setsearchData(response?.data?.agentList?.history)
        setincome(response?.data?.agentList?.totalAmount)
        setagents(response?.data?.agentList?.totalAgent)
      }).catch((error) => {
        console.log(error);
      })
  }, []);


  const getFilterData = () => {

    const data = {
      startDate: dates.from_date,
      endDate: dates.to_date
    }

    makeAPIRequest('post', ApiConst.getrAllFinanceDetail, data, null, null)
      .then((response) => {
        setfinanceHistory(response?.data?.agentList?.history)
        setsearchData(response?.data?.agentList?.history)
        setincome(response?.data?.agentList?.totalAmount)
        setagents(response?.data?.agentList?.totalAgent)
      }).catch((error) => {
        console.log(error);
      })
  }

  const onDateChange = (e) => {
    setDates({ ...dates, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    getAllFinanceDetails()
  }, [getAllFinanceDetails])

  //----------------------- get all finance details --------------------


  // --------------- Search data-----------------
  const onSearch = (e) => {
    let search = e.target.value;
    let fData = financeHistory?.filter((item) => {
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
    <>
      <div className="finance">
        <div className="title_finance" style={{ marginTop: '30px', marginBottom: '30px', marginLeft: '20px' }}>
          <h3 style={{ fontWeight: 'bold', color: 'black' }}>Manage finance</h3>
        </div>
        <div className="search-finance">
          <div className="top_div">
            <span>Search by Mobile Number</span>
            <input type="number" onChange={onSearch}/>
          </div>
          <div className="bottom_div">
            <span id="filter">Filter by date Range:</span>
            <div className="right_div">
              <div className="from">
                <span>From</span>
                <input type="date" onChange={onDateChange} name="from_date" id="f_date" />
              </div>
              <div className="to">
                <span>To</span>
                <input type="date" onChange={onDateChange} name="to_date" id="t_date" />
              </div>
              <button type="button" onClick={getFilterData} className="btn btn-primary">Get Details</button>
            </div>
          </div>
          <div className="bottom_div">
            {/* <span id="filter">Filter by date Range:</span> */}
            <div className="right_div">
              <div className="from">
                <span>Total Agent :-</span>
                <input type="text" value={agents} id="date" readOnly />
              </div>
              <div className="to">
                <span>Income :-</span>
                <input type="text" value={income} id="date" readOnly />
              </div>
            </div>
          </div>
          {/* <SearchBar /> */}
        </div>
        <div className="container mt-4">
          <table className="table table-striped table-hover">
            <thead className="thead-light">
              <tr>
                <th>FullName</th>
                <th>Mobile Number</th>
                <th>Registration Date</th>
                <th>Plan Type</th>
                <th>Credit Remaining</th>
                <th>Total Property viewed</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {searchData?.slice(startIndex, endIndex).map((data, index) => (
                <tr key={index}>
                  <td>{data.userName}</td>
                  <td>{data.userMobile}</td>
                  <td>{new Date(data.StartDate).toISOString().split('T')[0]}</td>
                  <td>{data.planType}</td>
                  <td>{data.CraditRemaining}</td>
                  <td>{data.view}</td>
                  <td>{data.planStatus ? "Suspended" : "Active"}</td>
                </tr>
              ))}
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


    </>
  );
};

// export default TableComponent;


export default FinanceManagement;