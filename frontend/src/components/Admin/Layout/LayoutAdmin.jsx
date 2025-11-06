
import React, { useState } from 'react'
import Sidebar from './Sidebar'
import { useAuth } from '../../../context/AuthContext'
import { Outlet, useNavigate } from 'react-router-dom'
import { BellIcon, LogOut } from 'lucide-react'

const LayoutAdmin = () => {
  const navigate = useNavigate()
  const [openNotif, setOpenNotif] = useState(false)
  const [openUserMenu, setOpenUserMenu] = useState(false)
  const { logout } = useAuth()


  const [notifications] = useState([
    "Nouvelle commande reçue 📦",
    "Utilisateur inscrit ✅",
    "Stock faible sur un produit ⚠️"
  ])

 

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <header className="h-16 bg-white shadow flex items-center justify-between px-4 relative">

          <div className="flex items-center space-x-4 ml-auto">

            {/* 🔔 NOTIFICATION */}
            <div className="relative">
              <BellIcon
                className="h-6 w-6 text-gray-500 cursor-pointer"
                onClick={() => setOpenNotif(!openNotif)}
              />

              {openNotif && (
                <div className="absolute right-0 mt-2 w-64 bg-white border shadow-lg rounded-lg p-2">
                  <h4 className="font-semibold text-gray-700 border-b pb-2 mb-2">
                    Notifications
                  </h4>

                  {notifications.length === 0 ? (
                    <p className="text-sm text-gray-500">Aucune notification</p>
                  ) : (
                    notifications.map((notif, i) => (
                      <div key={i} className="text-sm bg-gray-50 p-2 mb-2 rounded hover:bg-gray-100">
                        {notif}
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>

            {/* 👤 IMAGE PROFIL (CLICK) */}
            <div className="relative">
              <img
                className="h-8 w-8 rounded-full cursor-pointer"
                src="https://i.pravatar.cc/150?img=3"
                alt="user"
                onClick={() => setOpenUserMenu(!openUserMenu)}
              />

              {/* Menu Logout */}
              {openUserMenu && (
                <div className="absolute right-0 mt-2 bg-white border shadow-md rounded-md w-28">
                  <button
                    onClick={logout}
                    className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-600 hover:bg-gray-50"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              )}
            </div>

          </div>
        </header>

        <main className="flex-1 p-6 bg-gray-50 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default LayoutAdmin
