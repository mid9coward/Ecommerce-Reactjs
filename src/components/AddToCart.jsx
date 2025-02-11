import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCartContext } from "../context/cart_context";
import { formatPrice } from "../utils/helpers";

const AddToCart = ({ product }) => {
  const { addToCart } = useCartContext();

  if (!product) return null; // Prevent crashes if product is undefined

  const { id, stock, colors = [], price } = product;
  const [mainColor, setMainColor] = useState(colors[0] || "");
  const [amount, setAmount] = useState(1);

  useEffect(() => {
    if (colors.length > 0) {
      setMainColor(colors[0]); // Update color when product changes
    }
  }, [colors]);

  const increase = () => setAmount((prev) => Math.min(prev + 1, stock));
  const decrease = () => setAmount((prev) => Math.max(prev - 1, 1));

  return (
    <>
      {/* Colors & Amount */}
      <div className="flex-col mt-6 pb-5 border-b-2 border-gray-200 mb-5">
        {/* Colors */}
        <div className="flex mb-3">
          <span className="mr-3">Color:</span>
          {colors.map((color, index) => (
            <button
              key={index}
              aria-label={`Select color ${color}`}
              style={{ backgroundColor: color }}
              className={`border-2 border-gray-300 rounded-full mr-1 w-6 h-6 focus:outline-none flex items-center justify-center cursor-pointer`}
              onClick={() => setMainColor(color)}
            >
              {mainColor === color && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="#fff"
                >
                  <path d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
          ))}
        </div>

        {/* Amount Buttons */}
        <div className="flex items-center text-2xl lg:text-3xl py-5">
          <button
            className="w-4 cursor-pointer"
            type="button"
            onClick={decrease}
            aria-label="Decrease quantity"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M18 12H6" />
            </svg>
          </button>
          <h2 className="amount mx-8">{amount}</h2>
          <button
            className="w-4 cursor-pointer"
            type="button"
            onClick={increase}
            aria-label="Increase quantity"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>
        </div>
      </div>

      {/* Add to Cart */}
      <div className="flex items-center">
        <span className="title-font font-medium text-2xl text-gray-900">
          {formatPrice(price)}
        </span>
        <Link
          to="/cart"
          className="flex ml-auto text-white bg-secondary-800 border-0 py-2 px-6 focus:outline-none hover:bg-secondary-900 rounded cursor-pointer"
          onClick={() => addToCart(id, mainColor, amount, product)}
        >
          Add to cart
        </Link>
      </div>
    </>
  );
};

export default AddToCart;
