import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div className="card bg-base-100 shadow-md">
      <figure>
        <img
          src={product.image}
          alt={product.name}
          className="h-48 w-full object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{product.name}</h2>
        <p>Price: ${product.price}</p>
        <p>Category: {product.category}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
