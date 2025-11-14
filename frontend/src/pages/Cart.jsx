import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Cart() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { cartItems, updateQuantity,  removeFromCart} = useCart();

  // Calculate prices
  const calculateSubtotal = () =>
    cartItems.reduce(
      (total, item) => total + (item.onSale ? item.salePrice : item.price) * item.quantity,
      0
    );

  const calculateSavings = () =>
    cartItems.reduce(
      (savings, item) =>
        savings + (item.onSale ? (item.price - item.salePrice) * item.quantity : 0),
      0
    );

  const calculateTax = () => 0; // adjust if you have tax logic
  const calculateTotal = () => calculateSubtotal() - calculateSavings() + calculateTax();

  const subtotal = calculateSubtotal();
  const savings = calculateSavings();
  const tax = calculateTax();
  const total = calculateTotal();
  const shipping = 0; // adjust if you have shipping logic

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen pt-32 pb-20 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-10">
          Panier
        </h1>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* --- PRODUITS --- */}
          <div className="flex-1 bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6">
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-6 mb-6"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.images[0]}
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
                        {(item.onSale ? item.salePrice : item.price).toFixed(2)} €
                      </p>
                      {item.onSale && (
                        <p className="text-sm text-red-500 line-through">
                          {item.price.toFixed(2)} €
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <select
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                      className="border border-gray-300 dark:border-gray-700 rounded-lg px-2 py-1 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:ring-[#b48456]"
                    >
                      {[1, 2, 3, 4, 5].map((qty) => (
                        <option key={qty} value={qty}>
                          {qty}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={() =>  removeFromCart(item.id)}
                      className="text-gray-400 hover:text-red-500 text-xl"
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-center py-6">
                Votre panier est vide.
              </p>
            )}
          </div>

          {/* --- RÉSUMÉ COMMANDE --- */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
                Résumé de la commande
              </h2>

              <div className="flex justify-between text-gray-700 dark:text-gray-300 mb-2">
                <span>Sous-total</span>
                <span>{subtotal.toFixed(2)} €</span>
              </div>
              {savings > 0 && (
                <div className="flex justify-between text-green-600 dark:text-green-400 mb-2">
                  <span>Économies</span>
                  <span>-{savings.toFixed(2)} €</span>
                </div>
              )}
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

              <button
                onClick={() => {
                  if (!user) {
                    navigate("/signin");
                  } else {
                    navigate("/order", {state: {total}});
                  }
                }}
                className="w-full bg-[#b48456] hover:bg-[#9e6e44] text-white py-3 rounded-xl font-semibold transition"
              >
                Passer à la caisse
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}