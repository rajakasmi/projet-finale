
// src/admin/OrderTable.jsx
import { useEffect, useState } from "react";
import axiosInstance from "../../../api/axiosInstance";
import { EyeIcon } from "@heroicons/react/24/outline";
import { format } from "date-fns";
import fr from "date-fns/locale/fr";
import OrderModal from "./OrderModal";

const API_URL = "/orders";

export default function OrderTable() {
  const [orders, setOrders] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // 🟢 Charger les commandes
  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axiosInstance.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(Array.isArray(res.data) ? res.data : res.data.orders || []);
    } catch (error) {
      console.error("❌ Erreur lors du chargement des commandes :", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // 🟢 Changement de statut
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axiosInstance.put(
  `${API_URL}/${orderId}/status`,
  { status: newStatus },
  { headers: { Authorization: `Bearer ${token}` } }
);

      if (res.status === 200) {
        setOrders((prev) =>
          prev.map((o) => (o._id === orderId ? { ...o, status: newStatus } : o))
        );
      }
    } catch (error) {
      console.error("❌ Erreur lors du changement de statut :", error);
    }
  };

  // 🟢 Couleur dynamique selon le statut
 const getStatusColor = (status) => {
  switch (status) {
    case "livrée":
      return "bg-green-100 text-green-700";
    case "en cours":
      return "bg-yellow-100 text-yellow-700";
    case "annulée":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Gestion des Commandes</h1>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-gray-700">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="p-3">Client</th>
                <th className="p-3">Produits</th>
                <th className="p-3">Total</th>
                <th className="p-3">Paiement</th>
                <th className="p-3">Statut</th>
                <th className="p-3">Date</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="border-t hover:bg-gray-50">
                  <td className="p-3">
                    <div className="font-medium">{order.userId?.name || "—"}</div>
                    <div className="text-sm text-gray-500">
                      {order.userId?.email}
                    </div>
                  </td>

                  <td className="p-3 text-sm">
                    {order.products?.map((p, i) => (
                      <div key={i}>
                        {p.productId?.name || "Produit"} × {p.quantity}
                      </div>
                    ))}
                  </td>

                  <td className="p-3 font-semibold">
                    {order.totalPrice
                      ? `${order.totalPrice.toFixed(2)} DT`
                      : "—"}
                  </td>

                  <td className="p-3">{order.paymentMethod || "—"}</td>

                  <td className="p-3">
                    <select
  value={order.status || "en attente"}
  onChange={(e) =>
    handleStatusChange(order._id, e.target.value)
  }
  className={`border rounded-md px-2 py-1 text-sm focus:outline-none ${getStatusColor(
    order.status
  )}`}
>
  <option value="en attente">En attente</option>
  <option value="en cours">En cours</option>
  <option value="livrée">Livrée</option>
  <option value="annulée">Annulée</option>
</select>

                  </td>

                  <td className="p-3 text-sm text-gray-500">
                    {order.createdAt
                      ? format(new Date(order.createdAt), "dd MMM yyyy HH:mm", {
                          locale: fr,
                        })
                      : "—"}
                  </td>

                  <td className="p-3 flex justify-center">
                    <button
                      onClick={() => {
                        setSelectedOrder(order);
                        setShowModal(true);
                      }}
                      className="p-2 text-blue-600 hover:bg-blue-100 rounded"
                    >
                      <EyeIcon className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}

              {orders.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center py-6 text-gray-500">
                    Aucune commande trouvée.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 🪟 MODAL */}
      {showModal && selectedOrder && (
        <OrderModal order={selectedOrder} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
}
