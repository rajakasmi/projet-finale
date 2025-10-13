// import React, { useState } from "react";
// import { Link, NavLink } from "react-router-dom";
// import logo from "../assets/logo.jpg";

// const Navbar = () => {
//   const [dropdown, setDropdown] = useState(null);

//   const toggleDropdown = (menu) => {
//     setDropdown(dropdown === menu ? null : menu);
//   };

//   return (
//     <header className="bg-[#fffaf3] shadow-md px-6 py-3 flex justify-between items-center flex-wrap relative z-50">
      
//       {/* Brand */}
//       <Link to="/" className="flex items-center space-x-2">
//         <img
//           src={logo}
//           alt="DecoStyle"
//           className="h-12 w-auto rounded-md shadow-md"
//         />
//         <span className="text-2xl font-bold text-[#b48456]">DecoStyle</span>
//       </Link>

//       {/* Navigation */}
//       <nav className="hidden lg:flex items-center space-x-6">
//         {/* Meubles */}
//         <div
//           className="relative group"
//           onMouseEnter={() => toggleDropdown("meubles")}
//           onMouseLeave={() => toggleDropdown(null)}
//         >
//           <span className="cursor-pointer font-medium px-2 py-1 rounded-md hover:bg-[#fff3e5] hover:text-[#b48456]">
//             Meubles
//           </span>
//           {dropdown === "meubles" && (
//             <div className="absolute bg-[#fffaf3] rounded-lg shadow-lg flex flex-col mt-2 min-w-[180px]">
//               {["Fauteuils", "Tables basses", "Canapés", "Étagères"].map(
//                 (item) => (
//                   <NavLink
//                     key={item}
//                     to={`/meubles/${item.toLowerCase().replace(" ", "-")}`}
//                     className="px-4 py-2 hover:bg-[#fff3e5] hover:text-[#b48456]"
//                   >
//                     {item}
//                   </NavLink>
//                 )
//               )}
//             </div>
//           )}
//         </div>

//         {/* Luminaires */}
//         <div
//           className="relative group"
//           onMouseEnter={() => toggleDropdown("luminaires")}
//           onMouseLeave={() => toggleDropdown(null)}
//         >
//           <span className="cursor-pointer font-medium px-2 py-1 rounded-md hover:bg-[#fff3e5] hover:text-[#b48456]">
//             Luminaires
//           </span>
//           {dropdown === "luminaires" && (
//             <div className="absolute bg-[#fffaf3] rounded-lg shadow-lg flex flex-col mt-2 min-w-[180px]">
//               {[
//                 "Lampes",
//                 "Suspensions",
//                 "Appliques murales",
//                 "Lampadaires",
//               ].map((item) => (
//                 <NavLink
//                   key={item}
//                   to={`/luminaires/${item.toLowerCase().replace(" ", "-")}`}
//                   className="px-4 py-2 hover:bg-[#fff3e5] hover:text-[#b48456]"
//                 >
//                   {item}
//                 </NavLink>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Décoration murale */}
//         <div
//           className="relative group"
//           onMouseEnter={() => toggleDropdown("deco")}
//           onMouseLeave={() => toggleDropdown(null)}
//         >
//           <span className="cursor-pointer font-medium px-2 py-1 rounded-md hover:bg-[#fff3e5] hover:text-[#b48456]">
//             Décoration murale
//           </span>
//           {dropdown === "deco" && (
//             <div className="absolute bg-[#fffaf3] rounded-lg shadow-lg flex flex-col mt-2 min-w-[180px]">
//               {["Tableaux abstraits", "Miroirs", "Cadres décoratifs"].map(
//                 (item) => (
//                   <NavLink
//                     key={item}
//                     to={`/decoration-murale/${item
//                       .toLowerCase()
//                       .replace(" ", "-")}`}
//                     className="px-4 py-2 hover:bg-[#fff3e5] hover:text-[#b48456]"
//                   >
//                     {item}
//                   </NavLink>
//                 )
//               )}
//             </div>
//           )}
//         </div>

//         {/* Textiles */}
//         <div
//           className="relative group"
//           onMouseEnter={() => toggleDropdown("textiles")}
//           onMouseLeave={() => toggleDropdown(null)}
//         >
//           <span className="cursor-pointer font-medium px-2 py-1 rounded-md hover:bg-[#fff3e5] hover:text-[#b48456]">
//             Textiles
//           </span>
//           {dropdown === "textiles" && (
//             <div className="absolute bg-[#fffaf3] rounded-lg shadow-lg flex flex-col mt-2 min-w-[180px]">
//               {["Coussins", "Rideaux", "Tapis", "Plaids"].map((item) => (
//                 <NavLink
//                   key={item}
//                   to={`/textiles/${item.toLowerCase()}`}
//                   className="px-4 py-2 hover:bg-[#fff3e5] hover:text-[#b48456]"
//                 >
//                   {item}
//                 </NavLink>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Objets déco */}
//         <div
//           className="relative group"
//           onMouseEnter={() => toggleDropdown("objets")}
//           onMouseLeave={() => toggleDropdown(null)}
//         >
//           <span className="cursor-pointer font-medium px-2 py-1 rounded-md hover:bg-[#fff3e5] hover:text-[#b48456]">
//             Objets déco
//           </span>
//           {dropdown === "objets" && (
//             <div className="absolute bg-[#fffaf3] rounded-lg shadow-lg flex flex-col mt-2 min-w-[180px]">
//               {[
//                 "Vases",
//                 "Statues",
//                 "Bougies parfumées",
//                 "Cadres photo",
//               ].map((item) => (
//                 <NavLink
//                   key={item}
//                   to={`/objets/${item.toLowerCase().replace(" ", "-")}`}
//                   className="px-4 py-2 hover:bg-[#fff3e5] hover:text-[#b48456]"
//                 >
//                   {item}
//                 </NavLink>
//               ))}
//             </div>
//           )}
//         </div>
//       </nav>

//       {/* Actions */}
//       <div className="flex items-center space-x-3">
//         <input
//           type="text"
//           placeholder="Rechercher..."
//           className="border border-gray-300 rounded-full px-3 py-1 focus:outline-none focus:ring-2 focus:ring-[#b48456]"
//         />
//         <Link
//           to="/signup"
//           className="bg-[#f0ad4e] text-white font-semibold px-4 py-1 rounded-full hover:bg-[#9a6d3c] transition"
//         >
//           Signup
//         </Link>
//       </div>
//     </header>
//   );
// };

// export default Navbar;

import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ShoppingCart, User, Search } from "lucide-react";
import logo from "../assets/logo.jpg"; // ✅ Ton logo DecoStyle

// ✅ Menu simplifié – 3 catégories principales
export const menuItems = [
  {
    title: "Luminaires",
    key: "luminaires",
    links: [
      { to: "/luminaires/lampes", label: "Lampes" },
      { to: "/luminaires/suspensions", label: "Suspensions" },
      { to: "/luminaires/lampadaires", label: "Lampadaires" },
    ],
  },
  {
    title: "Décoration murale",
    key: "murale",
    links: [
      { to: "/decoration-murale/tableaux", label: "Tableaux décoratifs" },
      { to: "/decoration-murale/miroirs", label: "Miroirs muraux" },
      { to: "/decoration-murale/cadres", label: "Cadres élégants" },
    ],
  },
  {
    title: "Objets déco",
    key: "objets",
    links: [
      { to: "/objets/vases", label: "Vases design" },
      { to: "/objets/statues", label: "Statues d’intérieur" },
      { to: "/objets/bougies", label: "Bougies parfumées" },
    ],
  },
];

const Navbar = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const timeoutRef = useRef(null);

  // Hover (Desktop)
  const handleMouseEnter = (key) => {
    clearTimeout(timeoutRef.current);
    setOpenDropdown(key);
  };
  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 200);
  };

  // Toggle (Mobile)
  const handleToggle = (key) => {
    setOpenDropdown(openDropdown === key ? null : key);
  };

  return (
    <header className="bg-white shadow-md fixed w-full top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        {/* ✅ Logo DecoStyle */}
        <Link to="/" className="flex items-center space-x-2">
          <img
            src={logo}
            alt="DecoStyle Logo"
            className="h-10 w-10 object-cover rounded-full border-2 border-[#b48456]"
          />
          <span className="text-2xl font-bold text-gray-800">
            Deco<span className="text-[#b48456]">Style</span>
          </span>
        </Link>

        {/* ✅ Menu Desktop */}
        <nav
          className="hidden md:flex space-x-8 relative"
          onMouseLeave={handleMouseLeave}
        >
          {menuItems.map((item) => (
            <div
              key={item.key}
              onMouseEnter={() => handleMouseEnter(item.key)}
              className="relative"
            >
              <button
                className={`font-medium transition ${
                  openDropdown === item.key
                    ? "text-[#b48456]"
                    : "text-gray-700 hover:text-[#b48456]"
                }`}
              >
                {item.title}
              </button>

              {/* ✅ Dropdown */}
              {openDropdown === item.key && (
                <div
                  className="absolute left-0 mt-2 bg-white border border-gray-100 shadow-lg rounded-lg w-56 p-3 z-50"
                  onMouseEnter={() => handleMouseEnter(item.key)}
                  onMouseLeave={handleMouseLeave}
                >
                  {item.links.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      className="block px-3 py-2 text-sm text-gray-700 rounded-md hover:bg-[#b48456]/10 hover:text-[#b48456]"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* ✅ Zone droite (recherche + icônes) */}
        <div className="flex items-center space-x-4">
          {/* ✅ Barre de recherche stylée */}
          <div className="hidden md:flex items-center border border-gray-300 rounded-full px-3 py-1 focus-within:ring-2 focus-within:ring-[#b48456] transition">
            <Search size={18} className="text-gray-500" />
            <input
              type="text"
              placeholder="Rechercher..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="ml-2 w-40 outline-none text-sm text-gray-700 placeholder-gray-400"
            />
          </div>

          {/* ✅ Icônes */}
          <button className="text-gray-700 hover:text-[#b48456] relative">
            <ShoppingCart size={22} />
            <span className="absolute -top-2 -right-2 bg-[#b48456] text-white text-xs rounded-full px-1">
              2
            </span>
          </button>
          <button className="text-gray-700 hover:text-[#b48456]">
            <User size={22} />
          </button>

          {/* ✅ Bouton Mobile */}
          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="md:hidden text-gray-700 hover:text-[#b48456]"
          >
            {mobileMenu ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* ✅ Menu Mobile */}
      {mobileMenu && (
        <div className="md:hidden bg-white border-t shadow-lg">
          {/* Barre de recherche mobile */}
          <div className="flex items-center px-5 py-3 border-b">
            <Search size={20} className="text-gray-500" />
            <input
              type="text"
              placeholder="Rechercher..."
              className="ml-2 w-full outline-none text-gray-700 text-sm"
            />
          </div>

          {menuItems.map((item) => (
            <div key={item.key} className="border-b">
              <button
                onClick={() => handleToggle(item.key)}
                className="w-full text-left px-5 py-3 font-medium text-gray-700 flex justify-between items-center"
              >
                {item.title}
                <span className="text-[#b48456]">
                  {openDropdown === item.key ? "−" : "+"}
                </span>
              </button>

              {openDropdown === item.key && (
                <div className="bg-gray-50">
                  {item.links.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      className="block px-7 py-2 text-sm text-gray-600 hover:bg-[#b48456]/10 hover:text-[#b48456]"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </header>
  );
};

export default Navbar;
