import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.jpg"; // Assure-toi que le fichier existe

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-[#b48456] to-[#8c6239] text-white py-12 mt-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
        
        {/* ----------- Colonne 1 : Logo & Description ----------- */}
        <div className="flex flex-col items-start space-y-4">
          <img
            src={logo}
            alt="DecoStyle Logo"
            className="w-32 rounded-lg shadow-md"
          />
          <p className="text-sm leading-relaxed text-white/90 max-w-xs">
            Donnez vie à votre intérieur avec nos meubles et décorations haut de gamme.
            Alliant design, élégance et confort, DecoStyle sublime votre maison.
          </p>
        </div>

        {/* ----------- Colonne 2 : Liens utiles ----------- */}
        <div className="flex flex-col space-y-4">
          <h3 className="text-2xl font-semibold mb-3 border-b-2 border-white/30 inline-block pb-1">
            Liens utiles
          </h3>
          <nav className="flex flex-col space-y-2 text-white/90">
            <Link to="/" className="hover:text-white transition-colors">Accueil</Link>
            <Link to="/about" className="hover:text-white transition-colors">À propos</Link>
            <Link to="/catalogue" className="hover:text-white transition-colors">Catalogue</Link>
            <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
          </nav>

          {/* Boutons compte utilisateur */}
          
        </div>

        {/* ----------- Colonne 3 : Réseaux sociaux ----------- */}
        <div className="flex flex-col items-start space-y-4">
          <h3 className="text-2xl font-semibold mb-3 border-b-2 border-white/30 inline-block pb-1">
            Suivez-nous
          </h3>
          <p className="text-white/90 text-sm max-w-sm">
            Rejoignez notre communauté et découvrez les dernières tendances déco.
          </p>
          <div className="flex space-x-5 mt-2">
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
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/733/733547.png"
                alt="Facebook"
                className="w-8 h-8"
              />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/733/733558.png"
                alt="Instagram"
                className="w-8 h-8"
              />
            </a>
          </div>
        </div>
      </div>

      {/* ----------- Ligne de séparation ----------- */}
      <div className="border-t border-white/20 mt-10 pt-5 text-center text-sm text-white/80">
        © {new Date().getFullYear()} <span className="font-semibold">DecoStyle</span> — 
        Développé par{" "}
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
