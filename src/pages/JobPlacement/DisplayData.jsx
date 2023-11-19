import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaExclamation, FaUser, FaGenderless, FaRegAddressCard, FaPhone, FaBriefcase, FaBuilding, FaTimes } from 'react-icons/fa';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, } from '@mui/material';

const DisplayData = () => {
    const [formData, setFormData] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedData, setSelectedData] = useState(null);
    const [visibleItems, setVisibleItems] = useState(10);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('https://blogs-server-seven.vercel.app/api/forms');
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
        setSelectedData(null);
        setModalOpen(false);
    };

    const loadMoreItems = () => {
        setVisibleItems((prev) => prev + 10);
    };

    return (
        <div className="m-4">
            <h2 className="text-2xl font-semibold mb-4">Submitted Data</h2>
            <ul className="space-y-4">
                {formData.slice(0, visibleItems).map((dataItem) => (
                    <li
                        key={dataItem._id}
                        className="bg-white shadow-md p-4 rounded-md transition-transform transform hover:scale-105 duration-300 ease-in-out"
                    >

                        <div className="flex justify-between cursor-pointer " onClick={() => openModal(dataItem)}>
                            <FaExclamation className='text-red-500 ' />
                            <img
                                src={dataItem.photoURL}
                                alt="User"
                                className="w-8 h-8 object-cover rounded-full"
                            />
                        </div>

                        <div className="flex items-center justify-between mb-2">
                            
                            <span className="font-bold flex items-center"><FaUser className="mr-2" /> Name:</span> {dataItem.name}
                        </div>
                        <div className="flex items-center justify-between mb-2">
                         
                            
                            <span className="font-bold flex justify-center items-center"><FaRegAddressCard className="mr-2" /> Email:</span> {dataItem.email}
                        </div>

                        {dataItem.photoURL && (
                            <div className="flex items-center justify-between mb-2">
                               
                                <span className="font-bold flex items-center"> <FaBriefcase className="mr-2" /> Designation:</span>  {dataItem.designation}


                            </div>
                        )}

                    </li>
                ))}
            </ul>
            {visibleItems < formData.length && (
                <Button onClick={loadMoreItems} className=" btn btn-primary">
                    Next
                </Button>
            )}

            <Dialog open={isModalOpen} onClose={closeModal} className="max-w-md mx-auto">
                <div className="bg-white rounded-lg p-6">
                    <DialogTitle className="text-2xl font-bold mb-4">
                        {selectedData ? `User Details for ${selectedData.name}` : ''}
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
                                    <span className="font-bold">Gender:</span> {selectedData.gender}
                                </p>
                                <p className="text-lg">
                                    <FaRegAddressCard className="mr-2" />
                                    <span className="font-bold">Roll:</span> {selectedData.roll}
                                </p>
                                <p className="text-lg">
                                    <FaRegAddressCard className="mr-2" />
                                    <span className="font-bold">Session:</span> {selectedData.session}
                                </p>
                                <p className="text-lg">
                                    <FaPhone className="mr-2" />
                                    <span className="font-bold">Phone:</span> {selectedData.mobileNumber}
                                </p>
                                <p className="text-lg">
                                    <FaBriefcase className="mr-2" />
                                    <span className="font-bold">Job Sector:</span> {selectedData.jobSector}
                                </p>
                                <p className="text-lg">
                                    <FaBuilding className="mr-2" />
                                    <span className="font-bold">Company Name:</span> {selectedData.compnayName}
                                </p>
                                <p className="text-lg">
                                    <FaBriefcase className="mr-2" />
                                    <span className="font-bold">Designation:</span> {selectedData.designation}
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
