import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        Bienvenue sur MonSite 🎉
      </h1>
      <p className="text-gray-600 mb-6">
        Découvrez notre plateforme et créez votre compte dès aujourd’hui.
      </p>
      <Link
        to="/signup"
        className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition"
      >
        Créer un compte
      </Link>
    </div>
  );
}
