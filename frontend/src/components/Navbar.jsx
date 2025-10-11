import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo.jpg";

const Navbar = () => {
  const [dropdown, setDropdown] = useState(null);

  const toggleDropdown = (menu) => {
    setDropdown(dropdown === menu ? null : menu);
  };

  return (
    <header className="bg-[#fffaf3] shadow-md px-6 py-3 flex justify-between items-center flex-wrap relative z-50">
      {/* Brand */}
      <Link to="/" className="flex items-center space-x-2">
        <img
          src={logo}
          alt="DecoStyle"
          className="h-12 w-auto rounded-md shadow-md"
        />
        <span className="text-2xl font-bold text-[#b48456]">DecoStyle</span>
      </Link>

      {/* Navigation */}
      <nav className="hidden lg:flex items-center space-x-6">
        {/* Meubles */}
        <div
          className="relative group"
          onMouseEnter={() => toggleDropdown("meubles")}
          onMouseLeave={() => toggleDropdown(null)}
        >
          <span className="cursor-pointer font-medium px-2 py-1 rounded-md hover:bg-[#fff3e5] hover:text-[#b48456]">
            Meubles
          </span>
          {dropdown === "meubles" && (
            <div className="absolute bg-[#fffaf3] rounded-lg shadow-lg flex flex-col mt-2 min-w-[180px]">
              {["Fauteuils", "Tables basses", "Canapés", "Étagères"].map(
                (item) => (
                  <NavLink
                    key={item}
                    to={`/meubles/${item.toLowerCase().replace(" ", "-")}`}
                    className="px-4 py-2 hover:bg-[#fff3e5] hover:text-[#b48456]"
                  >
                    {item}
                  </NavLink>
                )
              )}
            </div>
          )}
        </div>

        {/* Luminaires */}
        <div
          className="relative group"
          onMouseEnter={() => toggleDropdown("luminaires")}
          onMouseLeave={() => toggleDropdown(null)}
        >
          <span className="cursor-pointer font-medium px-2 py-1 rounded-md hover:bg-[#fff3e5] hover:text-[#b48456]">
            Luminaires
          </span>
          {dropdown === "luminaires" && (
            <div className="absolute bg-[#fffaf3] rounded-lg shadow-lg flex flex-col mt-2 min-w-[180px]">
              {[
                "Lampes",
                "Suspensions",
                "Appliques murales",
                "Lampadaires",
              ].map((item) => (
                <NavLink
                  key={item}
                  to={`/luminaires/${item.toLowerCase().replace(" ", "-")}`}
                  className="px-4 py-2 hover:bg-[#fff3e5] hover:text-[#b48456]"
                >
                  {item}
                </NavLink>
              ))}
            </div>
          )}
        </div>

        {/* Décoration murale */}
        <div
          className="relative group"
          onMouseEnter={() => toggleDropdown("deco")}
          onMouseLeave={() => toggleDropdown(null)}
        >
          <span className="cursor-pointer font-medium px-2 py-1 rounded-md hover:bg-[#fff3e5] hover:text-[#b48456]">
            Décoration murale
          </span>
          {dropdown === "deco" && (
            <div className="absolute bg-[#fffaf3] rounded-lg shadow-lg flex flex-col mt-2 min-w-[180px]">
              {["Tableaux abstraits", "Miroirs", "Cadres décoratifs"].map(
                (item) => (
                  <NavLink
                    key={item}
                    to={`/decoration-murale/${item
                      .toLowerCase()
                      .replace(" ", "-")}`}
                    className="px-4 py-2 hover:bg-[#fff3e5] hover:text-[#b48456]"
                  >
                    {item}
                  </NavLink>
                )
              )}
            </div>
          )}
        </div>

        {/* Textiles */}
        <div
          className="relative group"
          onMouseEnter={() => toggleDropdown("textiles")}
          onMouseLeave={() => toggleDropdown(null)}
        >
          <span className="cursor-pointer font-medium px-2 py-1 rounded-md hover:bg-[#fff3e5] hover:text-[#b48456]">
            Textiles
          </span>
          {dropdown === "textiles" && (
            <div className="absolute bg-[#fffaf3] rounded-lg shadow-lg flex flex-col mt-2 min-w-[180px]">
              {["Coussins", "Rideaux", "Tapis", "Plaids"].map((item) => (
                <NavLink
                  key={item}
                  to={`/textiles/${item.toLowerCase()}`}
                  className="px-4 py-2 hover:bg-[#fff3e5] hover:text-[#b48456]"
                >
                  {item}
                </NavLink>
              ))}
            </div>
          )}
        </div>

        {/* Objets déco */}
        <div
          className="relative group"
          onMouseEnter={() => toggleDropdown("objets")}
          onMouseLeave={() => toggleDropdown(null)}
        >
          <span className="cursor-pointer font-medium px-2 py-1 rounded-md hover:bg-[#fff3e5] hover:text-[#b48456]">
            Objets déco
          </span>
          {dropdown === "objets" && (
            <div className="absolute bg-[#fffaf3] rounded-lg shadow-lg flex flex-col mt-2 min-w-[180px]">
              {[
                "Vases",
                "Statues",
                "Bougies parfumées",
                "Cadres photo",
              ].map((item) => (
                <NavLink
                  key={item}
                  to={`/objets/${item.toLowerCase().replace(" ", "-")}`}
                  className="px-4 py-2 hover:bg-[#fff3e5] hover:text-[#b48456]"
                >
                  {item}
                </NavLink>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Actions */}
      <div className="flex items-center space-x-3">
        <input
          type="text"
          placeholder="Rechercher..."
          className="border border-gray-300 rounded-full px-3 py-1 focus:outline-none focus:ring-2 focus:ring-[#b48456]"
        />
        <Link
          to="/signup"
          className="bg-[#f0ad4e] text-white font-semibold px-4 py-1 rounded-full hover:bg-[#9a6d3c] transition"
        >
          Signup
        </Link>
      </div>
    </header>
  );
};

export default Navbar;

