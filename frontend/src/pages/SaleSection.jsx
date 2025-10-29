import { useData } from "../context/DataContext"; 
import { useNavigate } from "react-router-dom";

const SaleSection = () => {
  const { products, loading, error } = useData();
  const navigate = useNavigate();
  const saleProducts = products.filter((p) => p.onSale).slice(0, 3);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-gray-700 text-xl font-medium">
          Chargement des produits en solde...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-red-500 text-xl font-medium">{error}</p>
      </div>
    );
  }

  return (
    <section className="relative w-full min-h-screen bg-gray-100 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1920&q=80"
          alt="Sale background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center pt-24 pb-12">
        <h2 className="text-white text-5xl md:text-6xl font-extrabold mb-6 drop-shadow-lg">
          Les modÃ¨les en solde
        </h2>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-md shadow-md transition">
          Acheter Maintenant
        </button>
      </div>

      {/* Cards */}
      <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-6 pb-20">
        {saleProducts.length > 0 ? (
          saleProducts.map((item) => (
            <div
              key={item._id}
              onClick={() =>
                navigate(`/categories/${item.category}?sale=true`)
              }
              className="relative rounded-xl overflow-hidden shadow-xl group cursor-pointer"
            >
              <img
                src={item.images?.[0]}
                alt={item.name}
                className="w-full h-[420px] object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              <div className="absolute bottom-5 left-5 text-white">
                <p className="text-sm opacity-90">En solde</p>
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-sm">
                  <span className="line-through opacity-70 mr-2">
                    {item.price} TND
                  </span>
                  <span className="text-yellow-400 font-bold">
                    {item.salePrice} TND
                  </span>
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-3 text-center text-white text-lg font-medium">
            Aucun produit en solde pour le moment.
          </p>
        )}
      </div>
    </section>
  );
};

export default SaleSection;