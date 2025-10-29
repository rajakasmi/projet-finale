
import { NavLink } from "react-router-dom";
import {
  HomeIcon,
  ShoppingBagIcon,
  UsersIcon,
  ClipboardDocumentListIcon,
  RectangleStackIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";

const navigation = [
  { path: "/admin/dashboard", name: "Dashboard", icon: HomeIcon },
  { path: "/admin/products", name: "Produits", icon: ShoppingBagIcon },
  { path: "/admin/categories", name: "Catégories", icon: RectangleStackIcon },
  { path: "/admin/orders", name: "Commandes", icon: ClipboardDocumentListIcon },
  { path: "/admin/users", name: "Utilisateurs", icon: UsersIcon },
];

export default function Sidebar({ collapsed, onToggle }) {
  return (
    <div
      className={`bg-gray-900 text-white min-h-screen transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      <div className="h-20 flex items-center justify-between px-4 border-b border-gray-700">
        {!collapsed && (
          <span className="text-2xl font-bold text-[#b48456]">DecoStyle</span>
        )}
        <Bars3Icon
          className="h-7 w-7 cursor-pointer hover:text-[#b48456]"
          onClick={onToggle}
        />
      </div>

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
    </div>
  );
}
