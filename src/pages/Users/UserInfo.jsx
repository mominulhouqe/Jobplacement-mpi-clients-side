import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import img2 from "../../assets/background-imge.png";
const UserInfo = () => {
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
    return (
      <div className="flex items-center justify-center mt-24">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }
  return (
    <div className="p-6 my-14 flex justify-center items-center">
      {userData && (
        <div className="border rounded-lg bg-slate-50 text-xs">
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
          <div className="p-2  whitespace-nowrap">
            <p className="p-2 border-b">
              <span className="font-medium ">Role:</span>{" "}
              {user?.role || "No role available"}
            </p>
            <p className="p-2 border-b">
              <span className="font-medium">Email:</span> {user?.email}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
