import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Signin() {
  const navigate = useNavigate();
  const { login } = useAuth(); 

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) {
      alert("Connexion réussie ✅");
      
    } else {
      alert("Email ou mot de passe incorrect ❌");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-10">
      <div className="bg-white rounded-2xl shadow-xl flex flex-col md:flex-row overflow-hidden w-[90%] max-w-4xl">
        {/* Image */}
        <div className="hidden md:flex md:w-1/2">
          <img
            src="https://cdn-images.farfetch-contents.com/18/26/96/21/18269621_39540539_600.jpg"
            alt="Connexion"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Formulaire */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-10">
          <div className="w-full">
            <h2 className="text-3xl font-bold text-center text-[#b48456] mb-6">
              Se connecter
            </h2>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-1 font-medium">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#b48456] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1 font-medium">
                  Mot de passe
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#b48456] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-4 px-5 py-2 border-2 border-[#b48456] text-[#b48456] font-semibold rounded-full transition-all duration-300 hover:bg-[#b48456] hover:text-white"
              >
                Se connecter
              </button>
            </form>

            <p className="text-sm text-center text-gray-500 mt-6">
              Vous n’avez pas encore de compte ?{" "}
              <Link
                to="/signup"
                className="text-[#b48456] hover:underline font-semibold"
              >
                Créer un compte
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
