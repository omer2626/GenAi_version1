import React from "react";
import logo from "../assets/G3nAI.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="w-full h-[10vh]  py-4 flex justify-between items-center sticky top-0 z-50 backdrop-blur-sm ">
      <div className="logo w-[6.5rem] cursor-pointer ">
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
      </div>
      <div className="navitems flex gap-8 text-[14.5px] font-semibold ">
        <Link to="/products">
          <div className="navhover cursor-pointer   hover:">Products</div>
        </Link>
        <Link to="/team">
          <div className="navhover cursor-pointer hover:">Team</div>
        </Link>
      </div>
      <div className="flex gap-4">
        <div className="  cursor-pointer hover:">
          <label className="relative inline-flex items-center cursor-pointer top-[2px]">
            <input className="sr-only peer" value="" type="checkbox" />
            <div className=" font-mono text-xs w-12 h-6 rounded-full ring-0 peer duration-500 outline-none bg-gray-200 overflow-hidden before:flex before:items-center before:justify-center after:flex after:items-center after:justify-center before:content-['☀️'] before:absolute before:h-5 before:w-5 before:top-1/2 before:bg-white before:rounded-full before:left-1 before:-translate-y-1/2 before:transition-all before:duration-700 peer-checked:before:opacity-0 peer-checked:before:rotate-90 peer-checked:before:-translate-y-full shadow-lg shadow-[#9ca3af66] peer-checked:shadow-lg peer-checked:shadow-gray-700 peer-checked:bg-[#383838] after:content-['🌑'] after:absolute after:bg-[#1d1d1d] after:rounded-full after:top-[2px] after:right-1 after:translate-y-full after:w-5 after:h-5 after:opacity-0 after:transition-all after:duration-700 peer-checked:after:opacity-100 peer-checked:after:rotate-180 peer-checked:after:translate-y-0"></div>
          </label>
        </div>
        <div className=" cursor-pointer hover:">
          <a href="https://github.com/m-techy/G3n.ai" target="_blank">
            <button className="flex gap-3 cursor-pointer text-white font-semibold bg-gradient-to-r from-gray-800 to-black p-[6px] rounded-full border border-gray-600 hover:scale-105 duration-200 hover:text-gray-500 hover:border-gray-800 hover:from-black hover:to-gray-900">
              <svg
                viewBox="0 0 24 24"
                height="15"
                width="15"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="#FFFFFF"
                  d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                ></path>
              </svg>
              <span className="text-xs ml-[-7px]">Github</span>
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Header;
