import React from "react";

const CompanyList = () => {
  return (
    <div className="border rounded-lg p-2 bg-slate-50 h-screen overflow-y-auto">
      <h2 className="text-base font-medium">Top Company</h2>
      <div className="flex my-4 text-xs">
        <img
          src="https://media.licdn.com/dms/image/D560BAQHKU08CTFye6Q/company-logo_100_100/0/1698850757197?e=1714003200&v=beta&t=aIdZXSb7srHbe7AtJZ56XwlzwY2PikUm_lrNz41mz2w"
          alt=""
          className="w-10 h-10 rounded-full mr-4"
        />
        <div>
          <a href="#" className="text-sm font-semibold text-gray-800">
            Google for Developers
          </a>
          <div className="flex items-center justify-center text-gray-500 mb-2">
            <span className="mr-1">Company</span>
            <div className="w-1 h-1 rounded-full bg-black"></div>
            <span className="ml-1">Computer Software</span>
          </div>
          <button className="btn btn-xs btn-outline btn-primary ">
            + Follow
          </button>
        </div>
      </div>
      <div className="flex my-4 text-xs">
        <img
          src="https://media.licdn.com/dms/image/C510BAQHg-rY8XQFs_Q/company-logo_100_100/0/1630623222992/welldevintl_logo?e=1714003200&v=beta&t=JXPo7jtEhnDb-97z4eNBUfPL75ujOnjnPQJZsP6B0K4"
          alt=""
          className="w-10 h-10 rounded-full mr-4"
        />
        <div>
          <a href="#" className="text-sm font-semibold text-gray-800">
            WellDev
          </a>
          <div className="flex items-center justify-center text-gray-500 mb-2">
            <span className="mr-1">Company</span>
            <div className="w-1 h-1 rounded-full bg-black"></div>
            <span className="ml-1">Computer Software</span>
          </div>
          <button className="btn btn-xs btn-outline btn-primary ">
            + Follow
          </button>
        </div>
      </div>
      <div className="flex my-4 text-xs">
        <img
          src="https://i.ibb.co/PDyWsr6/download-2.jpg"
          alt=""
          className="w-10 h-10 rounded-full mr-4"
        />
        <div>
          <a href="#" className="text-sm font-semibold text-gray-800">
            Ollyo
          </a>
          <div className="flex items-center justify-center text-gray-500 mb-2">
            <span className="mr-1">Company</span>
            <div className="w-1 h-1 rounded-full bg-black"></div>
            <span className="ml-1"> Software Company</span>
          </div>
          <button className="btn btn-xs btn-outline btn-primary ">
            + Follow
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompanyList;
