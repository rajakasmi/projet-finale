import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function UserRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <p>Vérification de l'authentification...</p>;
  }

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  return children;
}
