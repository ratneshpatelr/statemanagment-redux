"use client";

import {
  addToCart,
  fetchProductsAsync,
  removeFromcart,
  useAppDispatch,
  useAppSelector,
} from "@/store";
import { Product, RootState } from "@/types";
import { useEffect } from "react";

export default function Products() {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state: RootState) => state.products);
  const cartItems = useAppSelector((state: RootState) => state.cart.items);

  useEffect(() => {
    dispatch(fetchProductsAsync());
  }, []);

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product));
  };
  const handleRemoveFromCart = (productId: number) => {
    dispatch(removeFromcart(productId));
  };

  if (products.loading) {
    return <div>Loading...</div>;
  }
  if (products.error) {
    return <div>Error...{products.error} </div>;
  }
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-6">Products</h1>
      <div className="grid grid-cols-3 gap-4">
        {products.data.map((product: Product) => (
          <div key={product.id} className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-bold mb-2">{product.name} </h2>
            <p className="text-gray-600">Price : {product.price}INR </p>
            <button
              className="bg-blue-500 text-white px-4 py-2 mt-4 rounded"
              onClick={() => handleAddToCart(product)}
            >
              Add to cart
            </button>
          </div>
        ))}
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-bold">Cart</h2>
        {cartItems.length === 0 ? (
          <p>you cart is empty</p>
        ) : (
          <ul>
            {cartItems.map((item) => (
              <div key={item.id}>
                <li>{item.name} </li>
                <li>{item.price}INR </li>
                <button
                  className="bg-blue-500 text-white px-4 py-2 mt-4 rounded"
                  onClick={() => handleRemoveFromCart(item.id)}
                >
                  Remove from cart
                </button>
              </div>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
