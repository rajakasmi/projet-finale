import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  ShoppingBagIcon,
  ShoppingCartIcon,
  BanknotesIcon,
  UsersIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";

const API_URL_PRODUCTS = "/products";
const API_URL_ORDERS = "/orders";
const API_URL_USERS = "/users";
const API_URL_CATEGORIES = "/categories";

export default function DashboardAdmin() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        const [productsRes, ordersRes, usersRes, categoriesRes] = await Promise.all([
          axiosInstance.get(API_URL_PRODUCTS),
          axiosInstance.get(API_URL_ORDERS, { headers: { Authorization: `Bearer ${token}` } }),
          axiosInstance.get(API_URL_USERS, { headers: { Authorization: `Bearer ${token}` } }),
          axiosInstance.get(API_URL_CATEGORIES),
        ]);

        setProducts(productsRes.data);
        setOrders(ordersRes.data);
        setUsers(usersRes.data);
        setCategories(categoriesRes.data);
      } catch (error) {
        console.error("❌ Erreur lors du chargement du tableau :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Calculs
  const totalProducts = products.length;
  const totalOrders = orders.length;
  const totalUsers = users.length;
  const totalCategories = categories.length;
  const totalRevenue = orders.reduce((sum, order) => sum + (order.totalPrice || 0), 0);

  // Données du graphique
  const salesData = orders.reduce((acc, order) => {
    const date = new Date(order.createdAt);
    const month = date.toLocaleString("default", { month: "short" });
    const existing = acc.find((d) => d.month === month);
    if (existing) existing.total += order.totalPrice || 0;
    else acc.push({ month, total: order.totalPrice || 0 });
    return acc;
  }, []);

  if (loading) return <div className="p-6 text-gray-500">Chargement...</div>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Tableau de bord</h1>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">

        {/* Users */}
        <div className="bg-white p-6 rounded-2xl shadow flex items-center gap-4">
          <div className="p-3 bg-purple-100 rounded-full">
            <UsersIcon className="h-8 w-8 text-purple-600" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Utilisateurs</p>
            <h2 className="text-2xl font-semibold">{totalUsers}</h2>
          </div>
        </div>

        {/* Categories */}
        <div className="bg-white p-6 rounded-2xl shadow flex items-center gap-4">
          <div className="p-3 bg-pink-100 rounded-full">
            <Squares2X2Icon className="h-8 w-8 text-pink-600" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Catégories</p>
            <h2 className="text-2xl font-semibold">{totalCategories}</h2>
          </div>
        </div>

        {/* Products */}
        <div className="bg-white p-6 rounded-2xl shadow flex items-center gap-4">
          <div className="p-3 bg-blue-100 rounded-full">
            <ShoppingBagIcon className="h-8 w-8 text-blue-600" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Produits</p>
            <h2 className="text-2xl font-semibold">{totalProducts}</h2>
          </div>
        </div>

        {/* Orders */}
        <div className="bg-white p-6 rounded-2xl shadow flex items-center gap-4">
          <div className="p-3 bg-green-100 rounded-full">
            <ShoppingCartIcon className="h-8 w-8 text-green-600" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Commandes</p>
            <h2 className="text-2xl font-semibold">{totalOrders}</h2>
          </div>
        </div>

        {/* Revenue */}
        <div className="bg-white p-6 rounded-2xl shadow flex items-center gap-4">
          <div className="p-3 bg-yellow-100 rounded-full">
            <BanknotesIcon className="h-8 w-8 text-yellow-600" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Revenus</p>
            <h2 className="text-2xl font-semibold">{totalRevenue.toFixed(2)} TND</h2>
          </div>
        </div>
      </div>

      {/* Graphique */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Revenus mensuels</h2>
        {salesData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="total" fill="#3b82f6" name="Revenus (TND)" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-gray-500 text-sm">Aucune donnée disponible.</p>
        )}
      </div>
    </div>
  );
}
