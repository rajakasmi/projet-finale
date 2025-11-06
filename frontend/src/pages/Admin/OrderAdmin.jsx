import { useState } from "react";
import OrderTable from "../../components/Admin/Layout/OrderTable.jsx"; 
import OrderModal from "../../components/Admin/Layout/OrderModal.jsx";

export default function OrderAdmin() {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // 🟢 Ouvrir la modale
  const openModal = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  // 🟢 Fermer la modale
  const closeModal = () => {
    setSelectedOrder(null);
    setShowModal(false);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Gestion des Commandes</h1>

      {/* 🧾 Tableau des commandes */}
      <OrderTable onOpenModal={openModal} />

      {/* 🪟 Modal Détails */}
      {showModal && selectedOrder && (
        <OrderModal order={selectedOrder} onClose={closeModal} />
      )}
    </div>
  );
}
