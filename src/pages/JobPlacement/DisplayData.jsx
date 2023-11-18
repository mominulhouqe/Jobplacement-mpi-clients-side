import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaExclamation, } from 'react-icons/fa';

const DisplayData = () => {
  const [formData, setFormData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch data from the server
      const response = await axios.get('https://blogs-server-seven.vercel.app/api/forms'); // Replace with your actual API endpoint
     console.log(response);
      setFormData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="m-4">
      <h2 className="text-2xl font-semibold mb-4">Submitted Data</h2>
      <ul className="space-y-4">
        {formData.map((dataItem) => (
          <li
            key={dataItem._id}
            className="bg-white shadow-md p-4 rounded-md transition-transform transform hover:scale-105 duration-300 ease-in-out"
          >
            <div className='flex justify-end'><FaExclamation /> </div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold">Name:</span> {dataItem.name}
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold">Roll: - {dataItem.roll} </span> {dataItem.email}
            </div>
       
            {dataItem.photoURL && (
              <div className="flex items-center justify-between mb-2">
             <span className="font-bold">Desigantion: - {dataItem.designation}</span>
                <img
                  src={dataItem.photoURL}
                  alt="User"
                  className="w-16 h-16 object-cover rounded-full"
                />
              </div>
            )}
          
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DisplayData;
