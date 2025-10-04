"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Product } from "../lib/types";
import { useEffect } from "react";

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductModal({
  product,
  isOpen,
  onClose,
}: ProductModalProps) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!product) return null;

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-60 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal */}
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="sticky top-4 right-4 float-right w-10 h-10 flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors z-10"
                aria-label="Close modal"
                type="button"
              >
                <span className="text-2xl text-gray-700 dark:text-gray-200">
                  ×
                </span>
              </button>

              {/* Modal Content */}
              <div className="p-6 sm:p-8">
                {/* Product Image */}
                <div className="relative w-full h-64 sm:h-80 rounded-lg overflow-hidden mb-6">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />

                  {/* Sale Badge */}
                  {product.onSale && product.salePercentage && (
                    <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                      -{product.salePercentage}% OFF
                    </div>
                  )}

                  {/* Stock Status */}
                  {!product.inStock && (
                    <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center">
                      <span className="text-white text-2xl font-bold">
                        Out of Stock
                      </span>
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div>
                  <h2
                    id="modal-title"
                    className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3"
                  >
                    {product.title}
                  </h2>

                  {/* Rating */}
                  {product.rating && (
                    <div className="flex items-center gap-2 mb-4">
                      <div
                        className="flex text-yellow-400 text-xl"
                        role="img"
                        aria-label={`${product.rating} out of 5 stars`}
                      >
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={
                              i < product.rating!
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }
                          >
                            ★
                          </span>
                        ))}
                      </div>
                      <span className="text-gray-600 dark:text-gray-400">
                        ({product.rating} out of 5)
                      </span>
                    </div>
                  )}

                  {/* Description */}
                  <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    {product.description}
                  </p>

                  {/* Price Section */}
                  <div className="flex items-center justify-between mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                        Price
                      </p>
                      <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                        ${product.price.toFixed(2)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                        Product ID
                      </p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">
                        #{product.id}
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <button
                      type="button"
                      disabled={!product.inStock}
                      className="flex-1 py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      aria-label={
                        product.inStock ? "Add to cart" : "Product out of stock"
                      }
                    >
                      {product.inStock ? "Add to Cart" : "Out of Stock"}
                    </button>
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-6 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-semibold rounded-lg transition-colors"
                    >
                      Close
                    </button>
                  </div>

                  {/* Additional Details */}
                  <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      Product Details
                    </h3>
                    <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        <span>
                          Availability:{" "}
                          {product.inStock ? "In Stock" : "Out of Stock"}
                        </span>
                      </li>
                      {product.onSale && (
                        <li className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                          <span>
                            Special Offer: {product.salePercentage}% discount
                          </span>
                        </li>
                      )}
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        <span>Free shipping on orders over $50</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
