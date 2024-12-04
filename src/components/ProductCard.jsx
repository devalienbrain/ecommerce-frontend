import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div className="card bg-base-50 shadow-sm rounded-sm border">
      <figure>
        <img
          src={product.image}
          alt={product.name}
          className="h-48 w-full object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title font-bold">{product.name}</h2>
        <p className="font-semibold">Price: ${product.price}</p>
        <p className="font-bold">
          Category:{" "}
          <span className="text-green-800 font-bold">{product.category}</span>{" "}
        </p>
        <div className="card-actions justify-start">
          <button className="px-4 py-2 rounded-md font-bold bg-red-600 border border-red-600 text-white hover:bg-red-500 hover:border-red-500">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
