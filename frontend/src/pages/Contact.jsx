import React, { useEffect } from "react";

export default function Contact() {

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <section className="bg-gray-50 min-h-screen py-16 px-6">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="grid md:grid-cols-2">

          {/* Section gauche : informations */}
          <div className="bg-[#b48456] text-white p-10 flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-6">Contactez-nous</h2>
            <p className="mb-6 text-lg">
              Vous avez une question, un projet de décoration ou besoin d’un
              devis ? Notre équipe DecoStyle est à votre écoute.
            </p>
            <ul className="space-y-4 text-base">
              <li>📍 <strong>Adresse :</strong> 12 Rue des Artisans, Tunis</li>
              <li>📞 <strong>Téléphone :</strong> +216 22 345 678</li>
              <li>✉️ <strong>Email :</strong> contact@decostyle.com</li>
            </ul>
            <div className="mt-8 flex gap-4">
              <a
                href="#"
                className="bg-white text-[#b48456] font-semibold px-4 py-2 rounded-full hover:bg-gray-100 transition"
              >
                Facebook
              </a>
              <a
                href="#"
                className="bg-white text-[#b48456] font-semibold px-4 py-2 rounded-full hover:bg-gray-100 transition"
              >
                Instagram
              </a>
            </div>
          </div>

          {/* Section droite : formulaire */}
          <div className="p-10">
            <h3 className="text-2xl font-semibold mb-6 text-gray-800">
              Envoyez-nous un message
            </h3>
            <form className="space-y-6">
              <div>
                <label className="block text-gray-600 font-medium mb-2">
                  Nom complet
                </label>
                <input
                  type="text"
                  placeholder="Entrez votre nom"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#b48456]"
                />
              </div>

              <div>
                <label className="block text-gray-600 font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Votre adresse email"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#b48456]"
                />
              </div>

              <div>
                <label className="block text-gray-600 font-medium mb-2">
                  Message
                </label>
                <textarea
                  rows="5"
                  placeholder="Votre message..."
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#b48456]"
                ></textarea>
              </div>

              <button
                type="submit"
                className="bg-[#b48456] text-white px-6 py-3 rounded-lg hover:bg-[#a47349] transition font-semibold w-full"
              >
                Envoyer le message
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
