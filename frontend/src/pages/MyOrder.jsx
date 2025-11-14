import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { useAuth } from "../context/AuthContext";

export default function MyOrder() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    if (!user) return;

    try {
      const res = await axiosInstance.get(
        "/orders",
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      console.log("Orders fetched:", res.data);
      setOrders(res.data);
    } catch (error) {
      console.error("Erreur lors du chargement des commandes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (!user) return <p className="text-center mt-20">Veuillez vous connecter pour voir vos commandes ✅</p>;

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen pt-32 pb-20 px-6 md:px-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Mes commandes
        </h1>

        {loading ? (
          <p className="text-gray-600 dark:text-gray-300">Chargement...</p>
        ) : orders.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-300">
            Vous n’avez aucune commande pour le moment.
          </p>
        ) : (
          <div className="space-y-8">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
              >
                <div className="flex justify-between mb-4">
                  <p className="font-semibold text-gray-800 dark:text-white">
                    Commande n°: {order?._id}
                  </p>

                  <p className="text-[#b48456] font-bold">
                    Total: {(order?.totalPrice ?? 0).toFixed(2)} TND
                  </p>
                </div>


                {order.products.map((prod) => (
                  <div
                    key={prod._id}
                    className="flex items-center gap-4 border-b pb-3 mb-3"
                  >
                    <img
                      src={prod?.productId?.images?.[0] || "https://via.placeholder.com/80"}
                      alt={prod?.productId?.name || "No name"}
                      className="w-20 h-20 object-cover rounded-lg"
                    />

                    <div>
                      <p className="text-gray-800 dark:text-white font-medium">
                        {prod?.productId?.name || "Unknown product"}
                      </p>
                      <p className="text-gray-600 dark:text-gray-400">
                        Qté: {prod.quantity}
                      </p>
                  
                    </div>
                  </div>
                ))}

                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Adresse: {order.shippingAddress.address}, {order.shippingAddress.city}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Méthode de paiement: {order.paymentMethod === "cash" ? "Livraison" : order.paymentMethod}
                </p>

                <p className="text-xs text-gray-500 mt-2">
                  Date: {new Date(order.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
