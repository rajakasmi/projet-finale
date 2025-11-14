

import React from "react";

export default function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-56 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          {product.name}
        </h3>
        <p className="text-gray-500 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-[#b48456]">
            ${product.price}
          </span>
          <button className="bg-[#b48456] hover:bg-[#a17448] text-white px-4 py-2 rounded-lg transition-all">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
