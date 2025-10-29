import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export default function OrderPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { cartItems, clearCart } = useCart();
  const location = useLocation();
  const { subtotal = 0, savings = 0, shipping = 0, tax = 0, total = 0 } = location.state || {};
  const [shippingAddress, setShippingAddress] = useState({
    fullName: "",
    address: "",
    telephone: "",
    country: "",
    city: "",
    postalCode: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setShippingAddress((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const calculateTotal = () =>
    cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) return alert("Vous devez être connecté pour passer une commande ❌");
    if (cartItems.length === 0) return alert("Votre panier est vide ❌");

    setLoading(true);

    try {
      const orderData = {
        userId: user._id,
        products: cartItems.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
        })),
        totalPrice: calculateTotal(),
        shippingAddress,
        paymentMethod,
      };

      const res = await axios.post(
        "http://127.0.0.1:5000/api/orders",
        orderData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      alert("Commande créée avec succès ✅");
      clearCart();
      navigate("/myorders", { state: { order: res.data.order } });
    } catch (error) {
      console.error("Erreur lors de la création de la commande:", error);
      alert("Erreur lors de la création de la commande ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen pt-32 pb-20 px-6 md:px-12">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
          Finaliser la commande
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Nom et téléphone */}
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              name="fullName"
              placeholder="Nom complet"
              value={shippingAddress.fullName}
              onChange={handleChange}
              required
              className="p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 w-full"
            />
            <input
              type="text"
              name="telephone"
              placeholder="Téléphone"
              value={shippingAddress.telephone}
              onChange={handleChange}
              required
              className="p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 w-full"
            />
          </div>

          {/* Adresse */}
          <input
            type="text"
            name="address"
            placeholder="Adresse"
            value={shippingAddress.address}
            onChange={handleChange}
            required
            className="p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 w-full"
          />

          {/* Pays, ville, code postal */}
          <div className="grid md:grid-cols-3 gap-4">
            <input
              type="text"
              name="country"
              placeholder="Pays"
              value={shippingAddress.country}
              onChange={handleChange}
              required
              className="p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 w-full"
            />
            <input
              type="text"
              name="city"
              placeholder="Ville"
              value={shippingAddress.city}
              onChange={handleChange}
              required
              className="p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 w-full"
            />
            <input
              type="text"
              name="postalCode"
              placeholder="Code postal"
              value={shippingAddress.postalCode}
              onChange={handleChange}
              required
              className="p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 w-full"
            />
          </div>

          {/* Méthode de paiement */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2">
              Méthode de paiement :
            </label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 w-full"
            >
              <option value="cash">Paiement à la livraison</option>
              <option value="credit_card">Carte bancaire</option>
              <option value="paypal">PayPal</option>
            </select>
          </div>
          <div className="flex justify-between text-lg font-bold text-gray-900 dark:text-white">
            <span>Total</span>
            <span>{total.toFixed(2)} DT</span>
          </div>
          {/* Bouton de confirmation */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#b48456] hover:bg-[#9e6e44] text-white py-3 rounded-xl font-semibold transition"
          >
            {loading ? "Création de la commande..." : "Confirmer la commande"}
          </button>
        </form>
      </div>
    </div>
  );
}