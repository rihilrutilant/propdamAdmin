import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiEdit } from 'react-icons/fi'
import { MdDelete } from 'react-icons/md'
import { FaUserAltSlash } from 'react-icons/fa'
import { CgUnblock } from 'react-icons/cg'
import ApiConst from "../globle/ApiKeys";
import makeAPIRequest from "../globle/ApiCall";

const ApprovalManagement = () => {

  const ref = useRef()
  const refClose = useRef()

  const [UserList, setUserList] = useState()
  const [searchData, setsearchData] = useState([])

  //------------------ Pagination-----------------------------
  const itemsPerPage = 15;
  const totalPages = Math.ceil(UserList?.length / itemsPerPage);
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

  let Navigate = useNavigate();
  let NavigateToapproval = () => {
    Navigate('/approval/:id');
  }


  // ----------------------- Get all user's data-----------------------
  const GetAllUsers = useCallback(() => {
    makeAPIRequest('get', ApiConst.get_all_users_list, null, null)
      .then((response) => {
        setUserList(response.data.list);
        setsearchData(response.data.list);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [])
  // ----------------------- Get all user's data-----------------------

  //----------------------- Delete user -------------------------
  const DeleteUser = (id) => {
    makeAPIRequest('delete', ApiConst.delete_user + id, null, null)
      .then((response) => {
        response.data.status ? GetAllUsers() : alert('there is something wrong')
      })
      .catch((error) => {
        console.log(error);
      });
  }
  //----------------------- Delete user -------------------------


  // --------------------- Edit user -------------------------------
  const [UserInfo, setUserInfo] = useState({
    id: "",
    name: "",
    mobile: "",
    email: ""
  })

  const SetDatas = (cridentials) => {
    setUserInfo({
      id: cridentials._id,
      name: cridentials.name,
      mobile: cridentials.mobile,
      email: cridentials.email
    });
    ref.current.click()
  }

  const HeandleChange = (e) => {
    setUserInfo({ ...UserInfo, [e.target.name]: e.target.value })
  }

  const GetUserData = (e) => {
    e.preventDefault()
    UpdateUser(
      UserInfo.id,
      UserInfo.name,
      UserInfo.mobile,
      UserInfo.email,
    );
  }

  const UpdateUser = (id, name, mobile, email) => {
    let data = {
      "name": name,
      "mobile": mobile,
      "email": email
    };

    makeAPIRequest('patch', ApiConst.edit_user + id, data, null)
      .then((response) => {
        response.data.status ? GetAllUsers() : alert("There is something wrong")
        refClose.current.click()
      })
      .catch((error) => {
        console.log(error);
      });
  }
  // --------------------- Edit user -------------------------------


  //--------------------- Change Status ---------------------

  const ChangeStatus = (id) => {
    let data = {
      "status": true
    };

    makeAPIRequest('patch', ApiConst.edit_user_status + id, data, null)
      .then((response) => {
        response.data.status ? GetAllUsers() : alert("There is something wrong")
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const UnblockUser = (id) => {
    let data = {
      "status": "false"
    };

    makeAPIRequest('patch', ApiConst.unblock_user_status + id, data, null)
      .then((response) => {
        response.data.status ? GetAllUsers() : alert("There is something wrong")
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //--------------------- Change Status ---------------------

  // --------------- Search data-----------------
  const onSearch = (e) => {
    let search = e.target.value;
    let fData = UserList?.filter((item) => {
      const address = item?.mobile;
      if (address && typeof address === 'string') {
        return address.toLowerCase().includes(search?.toLowerCase());
      }
      return false;
    });
    setsearchData(fData);
  }
  // --------------- Search data-----------------
  useEffect(() => {
    GetAllUsers()
  }, [GetAllUsers])

  return (
    <>
      <div
        className="title_Approval"
        style={{ marginTop: "30px", marginBottom: "30px", marginLeft: "20px" }}
      >
        <h3 style={{ fontWeight: "bold", color: "black" }}>
          User Approval
        </h3>
      </div>
      <div className="search-finance">
      </div>
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
              <th>UserId</th>
              <th>UserName</th>
              <th>Mobile Number</th>
              <th>Email</th>
              <th>status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {searchData?.slice(startIndex, endIndex).map((data, index) => (
              <tr key={index}>
                <td onClick={NavigateToapproval}>{data?._id}</td>
                <td onClick={NavigateToapproval}>{data?.name}</td>
                <td onClick={NavigateToapproval}>{data?.mobile}</td>
                <td onClick={NavigateToapproval}>{data?.email}</td>
                <td onClick={NavigateToapproval}>{data?.status ? 'Suspend' : 'Active'}</td>
                {/* <td>{data.Password}</td> */}
                <td>
                  <FiEdit onClick={() => SetDatas(data)} /> &nbsp; <MdDelete onClick={() => DeleteUser(data._id)} /> &nbsp;
                  {
                    data?.status ? <CgUnblock onClick={() => UnblockUser(data._id)} /> :
                      <FaUserAltSlash onClick={() => ChangeStatus(data._id)} />
                  }
                </td>
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

      {/* Edite user profile user  */}
      {/* <!-- Button trigger modal --> */}
      <button type="button" style={{ display: "none" }} ref={ref} className="btn btn-primary modelbtn" data-bs-toggle="modal" data-bs-target="#editUser">
        Launch demo modal
      </button>

      {/* <!-- Modal --> */}
      <div className="modal fade" id="editUser" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit User</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form onSubmit={GetUserData}>
              <div className="modal-body">
                Name :- <input className="editUser" type="text" placeholder="Enter Name" name="name" value={UserInfo?.name} onChange={HeandleChange} /><br />
                Mobile :- <input className="editUser" type="text" placeholder="Enter Name" name="mobile" value={UserInfo?.mobile} onChange={HeandleChange} /><br />
                Email :- <input className="editUser" type="text" placeholder="Enter Name" name="email" value={UserInfo?.email} onChange={HeandleChange} />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" ref={refClose} data-bs-dismiss="modal">Close</button>
                <button type="submit" className="btn btn-primary">Save changes</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* Edite user profile user  */}
    </>
  );
};

export default ApprovalManagement;
