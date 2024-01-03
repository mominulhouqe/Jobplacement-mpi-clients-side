import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { BiAddToQueue, BiDotsHorizontal } from "react-icons/bi";
import { AuthContext } from "../provider/AuthProvider";
import useAdmin from "../hooks/useAdmin";


const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [isAdmin, isAdminLoading] = useAdmin();

  if (isAdminLoading) {
    return (
      <div className="flex justify-center loading-spinner">Loading...</div>
    );
  }

  return (
    <>
      <div className="drawer lg:drawer-open my-16">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <Outlet></Outlet>
          {/* Page content here */}
          <label
            htmlFor="my-drawer-2"
            className="btn btn-primary btn-sm drawer-button lg:hidden"
          >
            <BiDotsHorizontal /> open
          </label>
        </div>
        <div className="drawer-side bg-primary/40 sticky">
          <label htmlFor="my-drawer-2" className=""></label>
          <ul className="menu p-4 w-80 h-full text-black  ">
            {isAdmin ? (
              // Admin content
              <>
                <div className="mx-auto text-center w-3/4 my-10">
                  <img
                    src={user?.photoURL}
                    className="mx-auto rounded-full"
                    alt=""
                  />
                  <h3 className="text-2xl font-bold">{user.displayName}</h3>
                  <p>{user.email}</p>
                  <li>
                    <Link to="/"> Home</Link>
                  </li>
                  <li>
                    <Link to="/dashboard/add-product">
                      {" "}
                      <BiAddToQueue></BiAddToQueue> Add Product
                    </Link>
                  </li>
                  <li>
                    <Link to="/dashboard/all-product">
                      {" "}
                      <BiAddToQueue></BiAddToQueue> All Product
                    </Link>
                  </li>
                </div>
              </>
            ) : (
              // Regular user content
              <>
                <div className="mx-auto text-center w-3/4 my-10">
                  <img
                    src={user.photoURL}
                    className="mx-auto rounded-full"
                    alt=""
                  />
                  <h3 className="text-2xl font-bold">{user.displayName}</h3>
                  <p>{user.email}</p>
                </div>
                <li>
                  <Link to="/"> Home</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
