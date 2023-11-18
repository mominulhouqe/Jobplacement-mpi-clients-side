import  { useEffect, useState } from 'react';
import axios from 'axios';
import { FaExclamation, } from 'react-icons/fa';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
const DisplayData = () => {
    const [formData, setFormData] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedData, setSelectedData] = useState(null);

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

    const openModal = (data) => {
        setSelectedData(data);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
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
                        <div className='flex justify-end cursor-pointer ' onClick={() => openModal(dataItem)}>
                            <FaExclamation className='text-red-500 ' />
                        </div>

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

            <Dialog open={isModalOpen} onClose={closeModal} className="max-w-md mx-auto">
                <div className="bg-white rounded-lg p-6">
                    <DialogTitle className="text-2xl font-bold mb-4">User Details</DialogTitle>
                    <DialogContent>
                        {/* Render the content of your modal using the selectedData */}
                        {selectedData && (
                            <div className="space-y-4">
                                <p className="text-lg">
                                    <span className="font-bold">Name:</span> {selectedData.name}
                                </p>
                                <p className="text-lg">
                                    <span className="font-bold">Gender:</span> {selectedData.gender}
                                </p>
                                <p className="text-lg">
                                    <span className="font-bold">Roll:</span> {selectedData.roll}
                                </p>
                                <p className="text-lg">
                                    <span className="font-bold">Session:</span> {selectedData.session}
                                </p>
                                <p className="text-lg">
                                    <span className="font-bold">Phone:</span> {selectedData.mobileNumber}
                                </p>
                                <p className="text-lg">
                                    <span className="font-bold">Job Sector:</span> {selectedData.jobSector}
                                </p>
                                <p className="text-lg">
                                    <span className="font-bold">Company Name:</span> {selectedData.compnayName}
                                </p>
                                <p className="text-lg">
                                    <span className="font-bold">Designation:</span> {selectedData.designation}
                                </p>
                            </div>
                        )}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={closeModal} className="bg-blue-500 text-white">
                            Close
                        </Button>
                    </DialogActions>
                </div>
            </Dialog>


        </div>
    );
};

export default DisplayData;
