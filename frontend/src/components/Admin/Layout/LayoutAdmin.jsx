import { useState } from "react";
import Sidebar from "./Sidebar";
import NavbarAdmin from "./NavbarAdmin";
import { Outlet } from "react-router-dom";

export default function LayoutAdmin() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen">
      {/* Navbar top */}
      <NavbarAdmin />

      {/* Main container */}
      <div className="flex pt-20"> 
        {/* Sidebar */}
        <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />

        {/* Content area */}
        <main
          className={`flex-1 transition-all duration-300 px-6 py-6 ${
            collapsed ? "ml-20" : "ml-64"
          }`}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}
