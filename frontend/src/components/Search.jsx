import { useLocation, Link } from "react-router-dom";
import { useData } from "../context/DataContext";
import { useMemo } from "react";

export default function Search() {
  const { products, loading, error } = useData();
  const query = new URLSearchParams(useLocation().search);
  const search = query.get("q")?.toLowerCase() || "";

  const results = useMemo(() => {
    return products.filter((p) =>
      p.name.toLowerCase().includes(search)
    );
  }, [products, search]);

  return (
    <div className="max-w-6xl mx-auto mt-24 px-4">
      <h2 className="text-2xl font-bold mb-6">
        Résultats pour : <span className="text-[#b48456]">"{search}"</span>
      </h2>

      {loading && <p>Chargement...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && results.length === 0 && (
        <p className="text-gray-600">Aucun produit trouvé 😕</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {results.map((product) => (
          <Link
            key={product._id}
            to={`/product/${product._id}`}
            className="border rounded-xl p-3 hover:shadow-lg transition"
          >
            <img
              src={product.images[0]}
              alt={product.name}
              className="h-48 w-full object-cover rounded-md"
            />
            <h3 className="font-semibold mt-3 text-gray-800">
              {product.name}
            </h3>
            <p className="text-[#b48456] font-bold mt-1">
              {product.price} TND
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
