import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.jpg"; // Assure-toi que ton logo est dans src/assets/logo.jpg

export default function Footer() {
  return (
    <footer className="bg-[#b48456] text-white py-10 mt-20">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Logo / Description */}
        <div className="flex flex-col items-start">
          <img src={logo} alt="DecoStyle" className="w-32 mb-4 rounded" />
          <p className="text-sm text-white/90 leading-relaxed">
            Embellissez votre intérieur avec notre collection unique
            de meubles et décorations élégants. Qualité et design au rendez-vous.
          </p>
        </div>

        {/* Liens rapides */}
        <div className="flex flex-col space-y-4">
          <h3 className="text-xl font-semibold mb-3">Liens utiles</h3>
          <Link to="/" className="hover:underline hover:text-gray-200">
            Accueil
          </Link>
          <Link to="/fauteuils" className="hover:underline hover:text-gray-200">
            Nos Fauteuils
          </Link>

          {/* Créer un compte en image */}
          <Link to="/signup" className="w-32 h-12">
            <img
              src="https://cdn-icons-png.flaticon.com/512/709/709722.png"
              alt="Créer un compte"
              className="w-full h-full object-contain cursor-pointer hover:scale-105 transition-transform"
            />
          </Link>

          {/* Se connecter en image */}
          <Link to="/signin" className="w-32 h-12">
            <img
              src="https://cdn-icons-png.flaticon.com/512/709/709699.png"
              alt="Se connecter"
              className="w-full h-full object-contain cursor-pointer hover:scale-105 transition-transform"
            />
          </Link>
        </div>

        {/* Réseaux sociaux */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Suivez-nous</h3>
          <div className="flex space-x-4">
            <a
              href="https://github.com/ton-profil"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
                alt="GitHub"
                className="w-8 h-8"
              />
            </a>

            <a
              href="https://www.linkedin.com/in/ton-profil"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
                alt="LinkedIn"
                className="w-8 h-8"
              />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/20 mt-10 pt-5 text-center text-sm text-white/80">
        © {new Date().getFullYear()} DecoStyle — Développé par{" "}
        <a
          href="https://github.com/ton-profil"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold hover:underline"
        >
          Guesmi Raja
        </a>
      </div>
    </footer>
  );
}
