import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  HomeIcon,
  ShoppingBagIcon,
  UsersIcon,
  ClipboardDocumentListIcon,
  RectangleStackIcon,
  Bars3Icon,
  BellIcon,
} from "@heroicons/react/24/outline";

const navigation = [
  { path: "/admin/dashboard", name: "Dashboard", icon: HomeIcon },
  { path: "/admin/products", name: "Produits", icon: ShoppingBagIcon },
  { path: "/admin/categories", name: "Catégories", icon: RectangleStackIcon },
  { path: "/admin/orders", name: "Commandes", icon: ClipboardDocumentListIcon },
  { path: "/admin/users", name: "Utilisateurs", icon: UsersIcon },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className={`bg-gray-900 text-white min-h-screen fixed top-0 left-0 z-50 transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Logo + Toggle */}
      <div className="h-20 flex items-center justify-between px-4 border-b border-gray-700">
        {!collapsed && (
          <span className="text-2xl font-bold text-[#b48456]">DecoStyle</span>
        )}
        <Bars3Icon
          className="h-7 w-7 cursor-pointer hover:text-[#b48456]"
          onClick={() => setCollapsed(!collapsed)}
        />
      </div>

      {/* Navigation */}
      <nav className="mt-6 space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center px-4 py-3 rounded-lg transition ${
                  isActive
                    ? "bg-[#b48456] text-white"
                    : "hover:bg-gray-800 hover:text-[#b48456]"
                }`
              }
            >
              <Icon className="h-6 w-6 flex-shrink-0" />
              {!collapsed && <span className="ml-3">{item.name}</span>}
            </NavLink>
          );
        })}
      </nav>

      {/* Navbar in Admin */}
      <div className="absolute top-0 right-0 flex items-center justify-end px-6 mt-20">
        {!collapsed && (
          <>
            <BellIcon className="h-6 w-6 text-gray-400 mr-4 cursor-pointer" />
            <img
              className="h-9 w-9 rounded-full border"
              src="https://i.pravatar.cc/150?img=3"
              alt="user"
            />
          </>
        )}
      </div>
    </div>
  );
}
