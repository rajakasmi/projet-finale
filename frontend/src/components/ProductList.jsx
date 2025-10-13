import React from "react";
import ProductCard from "./ProductCard";

// Example data (replace with your API or state)
const products = [
  {
    id: 1,
    name: "Modern Table Lamp",
    description: "A stylish lamp to brighten your living room.",
    price: 89.99,
    image: "https://img.freepik.com/photos-gratuite/cadre-photo-pres-fauteuil-velours_53876-132788.jpg?semt=ais_hybrid&w=740&q=80",
  },
  {
    id: 2,
    name: "Wooden Wall Clock",
    description: "Elegant wooden clock with minimal design.",
    price: 49.99,
    image: "https://img.freepik.com/photos-gratuite/cadre-photo-pres-fauteuil-velours_53876-132788.jpg?semt=ais_hybrid&w=740&q=80",
  },
  {
    id: 3,
    name: "Ceramic Vase",
    description: "Handcrafted ceramic vase perfect for decor.",
    price: 29.99,
    image: "https://img.freepik.com/photos-gratuite/cadre-photo-pres-fauteuil-velours_53876-132788.jpg?semt=ais_hybrid&w=740&q=80",
  },
];

export default function ProductList() {
  return (
    <section className="py-10 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Our Products
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
