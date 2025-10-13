import React, { useState } from "react";

export default function Cart() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Vase en céramique artisanale",
      color: "Beige",
      price: 49.99,
      quantity: 1,
      image:
        "https://img.freepik.com/photos-gratuite/design-vase-moderne-elegant_23-2150529721.jpg?semt=ais_incoming&w=740&q=80",
      stock: "En stock",
    },
    {
      id: 2,
      name: "Lampe de table design",
      color: "Noir",
      price: 69.99,
      quantity: 1,
      image:
        "https://m.media-amazon.com/images/I/41bIWOgQyvL.jpg",
      stock: "Expédié sous 3–4 semaines",
    },
  ]);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shipping = 5.0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleQuantityChange = (id, value) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: Number(value) } : item
    );
    setCartItems(updatedCart);
  };

  const handleRemove = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen pt-32 pb-20 px-6 md:px-12">
      {/* --------- TITRE --------- */}
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-10 text-center md:text-left">
          Panier
        </h1>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* --------- PRODUITS --------- */}
          <div className="flex-1 bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-6 mb-6"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-28 h-28 rounded-lg object-cover shadow-sm"
                  />
                  <div>
                    <h2 className="font-semibold text-lg text-gray-800 dark:text-gray-100">
                      {item.name}
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      Couleur : {item.color}
                    </p>
                    <p className="font-medium text-gray-700 dark:text-gray-300 mt-1">
                      {item.price.toFixed(2)} €
                    </p>
                    <p
                      className={`text-sm mt-1 ${
                        item.stock === "En stock"
                          ? "text-green-600"
                          : "text-yellow-500"
                      }`}
                    >
                      {item.stock}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <select
                    value={item.quantity}
                    onChange={(e) =>
                      handleQuantityChange(item.id, e.target.value)
                    }
                    className="border border-gray-300 dark:border-gray-700 rounded-lg px-2 py-1 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:ring-[#b48456]"
                  >
                    {[1, 2, 3, 4, 5].map((qty) => (
                      <option key={qty} value={qty}>
                        {qty}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="text-gray-400 hover:text-red-500 text-xl"
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}

            {cartItems.length === 0 && (
              <p className="text-gray-500 dark:text-gray-400 text-center py-6">
                Votre panier est vide.
              </p>
            )}
          </div>

          {/* --------- RÉSUMÉ COMMANDE --------- */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
                Résumé de la commande
              </h2>

              <div className="flex justify-between text-gray-700 dark:text-gray-300 mb-2">
                <span>Sous-total</span>
                <span>{subtotal.toFixed(2)} €</span>
              </div>
              <div className="flex justify-between text-gray-700 dark:text-gray-300 mb-2">
                <span>Frais de livraison</span>
                <span>{shipping.toFixed(2)} €</span>
              </div>
              <div className="flex justify-between text-gray-700 dark:text-gray-300 mb-4">
                <span>Taxes estimées</span>
                <span>{tax.toFixed(2)} €</span>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 my-4"></div>

              <div className="flex justify-between font-bold text-gray-900 dark:text-white text-lg mb-6">
                <span>Total</span>
                <span>{total.toFixed(2)} €</span>
              </div>

              <button className="w-full bg-[#b48456] hover:bg-[#9e6e44] text-white py-3 rounded-xl font-semibold transition">
                Passer à la caisse
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
