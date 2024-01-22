import React, { useContext, useEffect, useState } from "react";
import img2 from "../../assets/background-imge.png";
import { AuthContext } from "../../provider/AuthProvider";

const ProfileView = () => {
  const { user, loading } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `https://userinformation.vercel.app/users?email=${user.email}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    };

    if (user && user.email) {
      fetchUserData();
    }
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="">
        {userData && (
          <div className="border rounded-lg w-full h-screen bg-slate-50">
            <div className="text-center mb-4">
              <img
                src={img2}
                alt=""
                className="w-full h-24 object-cover opacity-80"
              />
              <img
                className="rounded-full w-20 h-20 object-fill mx-auto -translate-y-1/2 border"
                src={user?.photoURL || "default-photo-url.jpg"}
                alt=""
              />
              <h4 className="mb-2 font-medium text-lg">{user?.displayName}</h4>
              <div className="text-sm text-gray-600"></div>
            </div>
            <div className="border-b border-gray-400 my-4"></div>

            <div className="p-2 overflow-y-auto whitespace-nowrap">
              <p>
                <span className="font-medium">Role:</span>{" "}
                {user?.role || "No role available"}
              </p>
              <p className="p-2 border-b">
                <span className="font-medium">Email:</span> {user?.email}
              </p>
              <p className="p-2 border-b">
                <span className="font-medium">AdditionalData:</span>{" "}
                {userData?.additionalData || "No additional data available"}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileView;
