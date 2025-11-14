// src/context/DataContext.js
import React, { createContext, useState, useEffect, useContext } from "react";
import axiosInstance from "../api/axiosInstance";

// 🟢 Création du contexte
const DataContext = createContext();

// 🟢 Provider du contexte
export const DataProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🟢 Fonction pour récupérer tous les produits
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/products"); // ⚠️ Mets ici ton URL backend
      setProducts(res.data);
      setError(null);
    } catch (err) {
      console.error("Erreur récupération produits :", err);
      setError("Impossible de charger les produits");
    } finally {
      setLoading(false);
    }
  };

  // 🟢 Charger les produits au montage
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <DataContext.Provider value={{ products, loading, error, fetchProducts }}>
      {children}
    </DataContext.Provider>
  );
};

// 🟢 Hook personnalisé pour utiliser le contexte facilement
export const useData = () => useContext(DataContext);
