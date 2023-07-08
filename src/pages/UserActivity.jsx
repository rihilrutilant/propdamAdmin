import React from "react";
import data from "../DummyData/UserDetails";
import SearchBar from "../ReusableComponent/SearchBar";
import { NavLink } from "react-router-dom";

const UserActivity = () => {
  // Pagination
  const itemsPerPage = 10;
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const [currentPage, setCurrentPage] = React.useState(1);

  // Calculate the start and end index of the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  //   let navigate = useNavigate();
  //   let UserDetails = () => {
  //     navigate("/agent/123");
  //   }
  return (
    <div>
      <div className="user_activity">
        <div
          className="title_activity"
          style={{
            padding: "40px 40px 0 40px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <h3 style={{ color: "grey", fontWeight: "bold" }}>Agent activity</h3>
          <NavLink to="/agent/:id" style={{ textDecoration: 'none' }}>
            <span style={{ color: "grey", fontSize: "18px" }}>
              Back{" "}
              <i
                className="fa-solid fa-arrow-left"
                style={{ fontSize: "15px", marginLeft: "5px" }}
              ></i>
            </span>
          </NavLink>
        </div>
        <SearchBar />

        <div className="container" style={{ marginTop: "80px" }}>
          <table className="table table-striped table-hover">
            <thead className="thead-light">
              <tr>
                <th>S.No</th>
                <th>Propert Name</th>
                <th>Ip Address</th>
                <th>Browser details</th>
                <th>Date/Time</th>
              </tr>
            </thead>
            <tbody>
              {data.slice(startIndex, endIndex).map((data) => (
                <tr key={data.id}>
                  <td>{data.id}</td>
                  <td>{data.Name}</td>
                  <td>{data.ipAddress}</td>
                  <td>{data.browserDetails}</td>
                  <td>{data.dateTime}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <nav>
            <ul className="pagination">
              {Array.from({ length: totalPages }, (_, index) => (
                <li
                  key={index + 1}
                  className={`page-item ${currentPage === index + 1 ? "active" : ""
                    }`}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default UserActivity;
