import  { useContext } from 'react';
import { AuthContext } from '../../provider/AuthProvider';
import { FaUser, FaPhone, FaBusinessTime, FaWallet, FaWindowClose } from 'react-icons/fa';

const UserInfo = () => {
    const { user,loading } = useContext(AuthContext);
    console.log(user);
    if (loading) {
        return (
            <div className="flex items-center justify-center mt-24">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }
    return (
        <div className="p-6 my-12 mt-16 flex justify-center items-center">
            <div className="bg-gray-100 shadow-md p-6 rounded-md">
                    <div className="flex justify-center items-center ">
                      <img className='rounded-full w-28 h-28' src={user.photoURL} alt="" />
                        {/* <FaUser className="text-4xl text-blue-500" /> */}
                    </div>
                <div className="flex justify-center items-center mb-4">
                    <div>
                        <h1 className="text-3xl font-bold">{user.displayName}</h1>
                        <p className="text-gray-500">{user.designation}</p>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center">
                        <FaUser className="text-2xl text-blue-500" />
                        <span className="ml-2 font-semibold">{user.gender}</span>
                    </div>
                    <div className="flex items-center">
                        <span className="ml-2">{user.email}</span>
                    </div>
                    <div className="flex items-center">
                        <FaPhone className="text-2xl text-purple-500" />
                        <span className="ml-2">{user.phoneNumber}</span>
                    </div>
                    <div className="flex items-center">
                        <FaBusinessTime className="text-2xl text-orange-500" />
                        <span className="ml-2">{user.time}</span>
                    </div>
                    <div className="flex items-center">
                        <FaWallet className="text-2xl text-indigo-500" />
                        <span className="ml-2 font-semibold">{user.designation}</span>
                    </div>
                    <div className="flex items-center">
                        <FaWindowClose className="text-2xl text-red-500" />
                        <span className="ml-2">{user.gender}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserInfo;
