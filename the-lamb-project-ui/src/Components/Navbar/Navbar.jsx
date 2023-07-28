import React from "react";
import { Link } from "react-router-dom";
import AboutPage from "../AboutPage/AboutPage";
import "./Navbar.css";

const Navbar = ({ likedCityCount, cities }) => {
  return (
    <div className="navbar">
      <div className="flex justify-between items-center h-24 max-w-[1240px]mx-auto px-4 text-[#015239]">
        <h1 className="w-full text-3xl font-bold text-[#015239]">
          <Link to="/">
            <div className="inline-flex">
              <img className="h-10 w-10 " src="images/sheep.png" />
              <div className="px-2">LAMB.</div>
            </div>
          </Link>
        </h1>

        <ul className="flex">
          <Link to="/matchedcitieslist">
            <span className="House">🏠</span>
          </Link>

          <span className="CityNumber">{cities.length}</span>
          <li className="p-4  text-lg ">
            <Link to="/about">About</Link>
          </li>

          <li className="p-4 text-lg ">
            <Link to="/login">Login</Link>
          </li>

          <li className="p-4 text-lg ">
            <Link to="/register">Register</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
