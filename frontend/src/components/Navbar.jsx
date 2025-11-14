import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ShoppingCart, User, Search, LogOut } from "lucide-react";
import logo from "../assets/logo.jpg";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useData } from "../context/DataContext";


 const menuItems = [
  {
    title: "Luminaires",
    key: "luminaires",
    links: [
      { to: "/categories/Luminaires?sub=Lampes", label: "Lampes" },
      { to: "/categories/Luminaires?sub=Suspensions", label: "Suspensions" },
      { to: "/categories/Luminaires?sub=Lampadaires", label: "Lampadaires" },
    ],
  },
  {
    title: "Décoration murale",
    key: "murale",
    links: [
      { to: "/categories/Décoration murale?sub=Tableaux décoratifs", label: "Tableaux décoratifs" },
      { to: "/categories/Décoration murale?sub=Miroirs muraux", label: "Miroirs muraux" },
      { to: "/categories/Décoration murale?sub=Cadres élégants", label: "Cadres élégants" },
    ],
  },
  {
    title: "Objets déco",
    key: "objets",
    links: [
      { to: "/categories/Objets déco?sub=Vases design", label: "Vases design" },
      { to: "/categories/Objets déco?sub=Statues d’intérieur", label: "Statues d’intérieur" },
      { to: "/categories/Objets déco?sub=Bougies parfumées", label: "Bougies parfumées" },
    ],
  },
];

const Navbar = () => {

  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const timeoutRef = useRef(null);
  const { cartItems } = useCart();
  const { user, logout } = useAuth(); 
  const [profileMenu, setProfileMenu] = useState(false); 
  const { products } = useData();
const [results, setResults] = useState([]);
const [showDropdown, setShowDropdown] = useState(false);

  
  const handleMouseEnter = (key) => {
    clearTimeout(timeoutRef.current);
    setOpenDropdown(key);
  };
  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setOpenDropdown(null), 200);
  };

  return (
    <header className="bg-white shadow-md fixed w-full top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        
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

        
        <div className="flex items-center space-x-4 relative">
          
        <div className="relative hidden md:flex items-center border border-gray-300 rounded-full px-3 py-1 focus-within:ring-2 focus-within:ring-[#b48456] transition">
  <Search size={18} className="text-gray-500" />

  <input
    type="text"
    placeholder="Rechercher..."
    value={searchValue}
    onChange={(e) => {
      const value = e.target.value;
      setSearchValue(value);

      if (value.trim() === "") {
        setResults([]);
        setShowDropdown(false);
      } else {
        const filtered = products.filter((p) =>
          p.name.toLowerCase().includes(value.toLowerCase())
        );
        setResults(filtered);
        setShowDropdown(true);
      }
    }}
    className="ml-2 w-40 outline-none text-sm text-gray-700 placeholder-gray-400"
  />

  {/* DROPDOWN RESULT */}
  {showDropdown && results.length > 0 && (
    <div className="absolute top-10 left-0 w-full bg-white border shadow-lg rounded-lg max-h-60 overflow-auto z-50">
      {results.map((product) => (
        <Link
          key={product._id}
          to={`/product/${product._id}`}
          onClick={() => setShowDropdown(false)}
          className="flex items-center gap-2 p-2 hover:bg-[#b48456]/10"
        >
          <img
            src={product.images?.[0]}
            alt={product.name}
            className="w-10 h-10 object-cover rounded"
          />
          <span className="text-sm text-gray-700">{product.name}</span>
        </Link>
      ))}
    </div>
  )}

  {/* SI AUCUN RESULTAT */}
  {showDropdown && results.length === 0 && searchValue && (
    <div className="absolute top-10 left-0 w-full bg-white border shadow-lg rounded-lg p-2 text-sm text-gray-500 z-50">
      Aucun produit trouvé
    </div>
  )}
</div>


          
          <Link to="/cart">
            <button className="text-gray-700 hover:text-[#b48456] relative cursor-pointer">
              <ShoppingCart size={22} />
              <span className="absolute -top-2 -right-2 bg-[#b48456] text-white text-xs rounded-full px-1">
                {cartItems.length}
              </span>
            </button>
          </Link>

          {user ? (
            <div className="relative">
              <button
                onClick={() => setProfileMenu(!profileMenu)}
                className="cursor-pointer focus:outline-none"
              >
                <img
                  src={
                    user.image ||
                    "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                  }
                  alt="Profil utilisateur"
                  className="h-8 w-8 rounded-full object-cover border-2 border-[#b48456]"
                />
              </button>

              {profileMenu && (
                <div className="absolute right-0 mt-2 w-44 bg-white border shadow-lg rounded-lg p-2 z-50">
                  <Link
                    to="/Profile"
                    className="block px-3 py-2 text-sm hover:bg-[#b48456]/10 text-gray-700 hover:text-[#b48456] rounded-md"
                  >
                    Mon profil
                  </Link>
                  <Link
                    to="/myorders"
                    className="block px-3 py-2 text-sm hover:bg-[#b48456]/10 text-gray-700 hover:text-[#b48456] rounded-md"
                  >
                    Mes orders
                  </Link>
                  <button
                    onClick={logout}
                    className="flex items-center w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md"
                  >
                    <LogOut size={16} className="mr-2" /> Déconnexion
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/signin">
              <button className="text-gray-700 hover:text-[#b48456] cursor-pointer">
                <User size={22} />
              </button>
            </Link>
          )}
          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="md:hidden text-gray-700 hover:text-[#b48456]"
          >
            {mobileMenu ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>
      {mobileMenu && (
        <div className="md:hidden bg-white border-t shadow-lg">
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
                onClick={() =>
                  setOpenDropdown(openDropdown === item.key ? null : item.key)
                }
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
