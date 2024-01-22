import React from "react";
import { Facebook } from "@mui/icons-material";
import { FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <h6 className="text-lg font-bold mb-4">Services</h6>
            <a href="#" className="text-gray-300 block mb-2 hover:text-white">
              Job Placement
            </a>
            <a href="#" className="text-gray-300 block mb-2 hover:text-white">
              Career Counseling
            </a>
            <a href="#" className="text-gray-300 block mb-2 hover:text-white">
              Skill Development
            </a>
          </div>
          <div>
            <h6 className="text-lg font-bold mb-4">About Us</h6>
            <Link
              to="https://mpi.moulvibazar.gov.bd/"
              className="text-gray-300 mb-2"
            >
              Moulvibazar Polytechnic Institute
            </Link>
            <p className="text-gray-300 mb-2">Developed by Mominul Haque</p>
          </div>
          <div>
            <h6 className="text-lg font-bold mb-4">Contact</h6>
            <p className="text-gray-300 mb-2">
              Address: Matar kapon,Moulvibazar
            </p>
            <p className="text-gray-300 mb-2">Phone: 01875091001</p>
            <p className="text-gray-300 mb-2">
              Email: moulvibazarpolytechnic@gmail.com
            </p>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-700 py-4">
        <div className="container mx-auto flex items-center justify-between">
          <p className="text-gray-300">
            © {new Date().getFullYear()} Moulvibazar Polytechnic Institute
          </p>
          <div>
            <p className="text-gray-300">Developed by Mominul Haque</p>
            <div className="flex items-center gap-4 mt-2">
              <Link
                to="https://www.facebook.com/mominvai.fbuser/"
                target="_blank"
              >
                <Facebook className="w-10 h-10" />
              </Link>
              <Link to="https://github.com/mominulhouqe" target="_blank">
                <FaGithub className="w-6 h-6" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
