import React from "react";
import '../styles/Agentmanagement.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import {useNavigate} from "react-router-dom";

const ReviewManagement = () => {

  const tableData = [
    {
      id: 1,
      ownerName: 'John Doe',
      mobileNumber: '1234567890',
      propertyType: 'residential',
      propertyAddress: "Sector A avinashi road",
      TotalViews: 50,
      TotalReviews: 10,
      status: 'Active',
    },
    {
      id: 2,
      ownerName: 'John Doe',
      mobileNumber: '1234567890',
      propertyType: '2023-06-17',
      propertyAddress: "Sector A avinashi road",
      TotalViews: 50,
      TotalReviews: 10,
      status: 'Sold out',
    },
    {
      id: 3,
      ownerName: 'John Doe',
      mobileNumber: '1234567890',
      propertyType: 'residential',
      propertyAddress: "Sector A avinashi road",
      TotalViews: 50,
      TotalReviews: 10,
      status: 'Active',
    },
    {
      id: 4,
      ownerName: 'John Doe',
      mobileNumber: '1234567890',
      propertyType: 'residentials',
      propertyAddress: "Sector A avinashi road",
      TotalViews: 50,
      TotalReviews: 10,
      status: 'Active',
    },
    {
      id: 5,
      ownerName: 'John Doe',
      mobileNumber: '1234567890',
      propertyType: 'resenditials',
      propertyAddress: "Sector A avinashi road",
      TotalViews: 50,
      TotalReviews: 10,
      status: 'Active',
    },
    {
      id: 6,
      ownerName: 'John Doe',
      mobileNumber: '1234567890',
      propertyType: 'Residential',
      propertyAddress: "Sector A avinashi road",
      TotalViews: 50,
      TotalReviews: 10,
      status: 'Sold out',
    },
    {
      id: 7,
      ownerName: 'John Doe',
      mobileNumber: '1234567890',
      propertyType: 'Residential',
      propertyAddress: "Sector A avinashi road",
      TotalViews: 50,
      TotalReviews: 10,
      status: 'Active',
    },
    {
      id: 8,
      ownerName: 'John Doe',
      mobileNumber: '1234567890',
      propertyType: 'Residential',
      propertyAddress: "Sector A avinashi road",
      TotalViews: 50,
      TotalReviews: 10,
      status: 'Sold out',
    },
    {
      id: 9,
      ownerName: 'John Doe',
      mobileNumber: '1234567890',
      propertyType: 'Residential',
      propertyAddress: "Sector A avinashi road",
      TotalViews: 50,
      TotalReviews: 10,
      status: 'Active',
    },
    {
      id: 10,
      ownerName: 'John Doe',
      mobileNumber: '1234567890',
      propertyType: 'Residential',
      propertyAddress: "Sector A avinashi road",
      TotalViews: 50,
      TotalReviews: 10,
      status: 'Active',
    },
    {
      id: 11,
      ownerName: 'John Doe',
      mobileNumber: '1234567890',
      propertyType: 'Residential',
      propertyAddress: "Sector A avinashi road",
      TotalViews: 50,
      TotalReviews: 10,
      status: 'Active',
    },
    {
      id: 12,
      ownerName: 'John Doe',
      mobileNumber: '1234567890',
      propertyType: 'Residential',
      propertyAddress: "Sector A avinashi road",
      TotalViews: 50,
      TotalReviews: 10,
      status: 'Active',
    },
    // Add more data objects as needed
  ];
  // Pagination
  const itemsPerPage = 10;
  const totalPages = Math.ceil(tableData.length / itemsPerPage);
  const [currentPage, setCurrentPage] = React.useState(1);

  // Calculate the start and end index of the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="agent">

      <div className="container mt-4">
      <table className="table table-striped table-hover">
        <thead className="thead-light">
          <tr>
            <th>S.No</th>
            <th>OwnerName</th>
            <th>Mobile Number</th>
            <th>Property Type</th>
            <th>Property address</th>
            <th>Property view</th>
            <th>Property reviews</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {tableData.slice(startIndex, endIndex).map((data) => (
            <tr key={data.id}>
              <td>{data.id}</td>
              <td>{data.ownerName}</td>
              <td>{data.mobileNumber}</td>
              <td>{data.propertyType}</td>
              <td>{data.propertyAddress}</td>
              <td>{data.TotalViews}</td>
              <td>{data.TotalReviews}</td>
              <td>{data.status}</td>
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
              className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
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
  );
};

export default ReviewManagement;
