
// src/admin/OrderModal.jsx
import React from "react";

export default function OrderModal({ order, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl shadow-xl relative">
        <h2 className="text-xl font-bold mb-4">Détails de la commande</h2>

        <p>
          <strong>Client :</strong> {order.userId?.name}
        </p>
        <p>
          <strong>Email :</strong> {order.userId?.email}
        </p>
        <p>
          <strong>Adresse :</strong> {order.shippingAddress || "Non spécifiée"}
        </p>
        <p>
          <strong>Paiement :</strong> {order.paymentMethod}
        </p>
        <p>
          <strong>Statut :</strong> {order.status}
        </p>

        <h3 className="mt-4 font-semibold">Produits :</h3>
        <ul className="space-y-2">
          {order.products?.map((p, i) => (
            <li key={i} className="flex items-center gap-3">
              {p.productId?.images?.[0] && (
                <img
                  src={`http://localhost:5000/${p.productId.images[0].replace(
                    /^\/?/,
                    ""
                  )}`}
                  alt={p.productId.name}
                  className="w-12 h-12 object-cover rounded border"
                />
              )}
              <div>
                <p>{p.productId?.name}</p>
                <p className="text-sm text-gray-500">
                  {p.quantity} × {p.productId?.price?.toFixed(2)} DT
                </p>
              </div>
            </li>
          ))}
        </ul>

        <p className="text-right font-bold mt-4">
          Total : {order.totalPrice?.toFixed(2)} DT
        </p>

        <div className="mt-6 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
}
