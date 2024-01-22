import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaUser,
  FaRegAddressCard,
  FaPhone,
  FaBriefcase,
  FaBuilding,
  FaTimes,
  FaGenderless,
} from "react-icons/fa";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";

const DisplayData = () => {
  const [formData, setFormData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    fetchData();
  }, []); // Initial fetch

  useEffect(() => {
    // Filter data whenever filter changes
    const filtered = formData.filter((dataItem) => {
      const lowercaseFilter = filter.toLowerCase();
      const lowercaseDesignation = (dataItem.designation || "").toLowerCase();
      const lowercaseDepartment = (dataItem.department || "").toLowerCase();

      return (
        lowercaseDesignation.includes(lowercaseFilter) ||
        lowercaseDepartment.includes(lowercaseFilter)
      );
    });

    setFilteredData(filtered);
  }, [filter, formData]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://userinformation.vercel.app/api/forms"
      );
      
      setFormData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const openModal = (data) => {
    setSelectedData(data);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedData(null);
    setModalOpen(false);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="m-4 container mx-auto overflow-x-auto px-4">
      <h2 className="text-2xl font-semibold mb-4">Submitted Data</h2>
      <div className="md:w-1/4 my-6">
        <TextField
          label="Filter by Designation/Department"
          variant="outlined"
          fullWidth
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="mb-4 "
        />
      </div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Email
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Department
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Designation
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {currentItems.map((dataItem) => (
            <tr key={dataItem._id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="text-sm font-medium text-gray-900">
                    {dataItem.name}
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{dataItem.email}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {dataItem.department}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {dataItem.designation}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  onClick={() => openModal(dataItem)}
                  className="text-indigo-600 hover:text-indigo-900"
                >
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 flex justify-end">
        <Button
          onClick={() =>
            paginate(currentPage > 1 ? currentPage - 1 : currentPage)
          }
          className="btn btn-primary mr-2"
          disabled={currentPage === 1}
        >
          Prev
        </Button>
        <Button
          onClick={() =>
            paginate(
              currentPage < Math.ceil(formData.length / itemsPerPage)
                ? currentPage + 1
                : currentPage
            )
          }
          className="btn btn-primary"
          disabled={currentPage === Math.ceil(formData.length / itemsPerPage)}
        >
          Next
        </Button>
      </div>

      <Dialog
        open={isModalOpen}
        onClose={closeModal}
        className="max-w-md mx-auto"
      >
        <div className="bg-white rounded-lg p-6">
          <DialogTitle className="text-2xl font-bold mb-4">
            {selectedData ? `User Details for ${selectedData.name}` : ""}
          </DialogTitle>
          <DialogContent>
            {selectedData && (
              <div className="space-y-4">
                <p className="text-lg">
                  <FaUser className="mr-2" />
                  <span className="font-bold">Name:</span> {selectedData.name}
                </p>
                <p className="text-lg">
                  <FaGenderless className="mr-2" />
                  <span className="font-bold">Gender:</span>{" "}
                  {selectedData.gender}
                </p>
                <p className="text-lg">
                  <FaRegAddressCard className="mr-2" />
                  <span className="font-bold">Roll:</span> {selectedData.roll}
                </p>
                <p className="text-lg">
                  <FaRegAddressCard className="mr-2" />
                  <span className="font-bold">Session:</span>{" "}
                  {selectedData.session}
                </p>
                <p className="text-lg">
                  <FaPhone className="mr-2" />
                  <span className="font-bold">Phone:</span>{" "}
                  {selectedData.mobileNumber}
                </p>
                <p className="text-lg">
                  <FaBriefcase className="mr-2" />
                  <span className="font-bold">Job Sector:</span>{" "}
                  {selectedData.jobSector}
                </p>
                <p className="text-lg">
                  <FaBuilding className="mr-2" />
                  <span className="font-bold">Company Name:</span>{" "}
                  {selectedData.compnayName}
                </p>
                <p className="text-lg">
                  <FaBriefcase className="mr-2" />
                  <span className="font-bold">Designation:</span>{" "}
                  {selectedData.designation}
                </p>
              </div>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={closeModal} className="bg-blue-500 text-white">
              <FaTimes className="mr-2" />
              Close
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    </div>
  );
};

export default DisplayData;
