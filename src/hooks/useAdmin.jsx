import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";

const useAdmin = () => {
  const { user, loading } = useContext(AuthContext);
  const [isAdmin, setIsAdmin] = useState(null);
  const [isAdminLoading, setIsAdminLoading] = useState(true);
  const [isAdminError, setIsAdminError] = useState(null);

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!loading && user?.email) {
        try {
          const response = await fetch(
            `https://userinformation.vercel.app/users/${user.email}`
          );

          if (response.ok) {
            const data = await response.json();
            console.log("is admin response", data);
            setIsAdmin(data.isAdmin);
          } else {
            console.error("Failed to fetch admin status");
            setIsAdminError("Failed to fetch admin status");
          }
        } catch (error) {
          console.error("Error fetching admin status:", error);
          setIsAdminError("Error fetching admin status");
        } finally {
          setIsAdminLoading(false);
        }
      }
    };

    checkAdminStatus();
  }, [loading, user]);

  return [isAdmin, isAdminLoading, isAdminError];
};

export default useAdmin;
