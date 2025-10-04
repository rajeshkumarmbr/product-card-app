"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Product } from "@/lib/types";

interface ProductCardProps {
  product: Product;
  onViewMore?: (id: number) => void;
}

export default function ProductCard({ product, onViewMore }: ProductCardProps) {
  const handleViewMore = () => {
    if (onViewMore) {
      onViewMore(product.id);
    } else {
      console.error("onViewMore function is not provided!");
    }
  };

  return (
    <motion.article
      className="w-full max-w-sm mx-auto bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-2xl sm:max-w-md md:max-w-lg lg:max-w-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
      role="article"
      aria-label={`Product card for ${product.title}`}
    >
      {/* Product Image */}
      <figure className="relative w-full h-48 sm:h-56 md:h-64 lg:h-56 overflow-hidden">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
          priority
        />

        {/* Sale Badge */}
        {product.onSale && product.salePercentage && (
          <motion.div
            className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            role="status"
            aria-label={`${product.salePercentage}% off`}
          >
            -{product.salePercentage}%
          </motion.div>
        )}

        {/* Out of Stock Badge */}
        {!product.inStock && (
          <div
            className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center"
            role="status"
            aria-label="Out of stock"
          >
            <span className="text-white text-lg font-bold">Out of Stock</span>
          </div>
        )}
      </figure>

      {/* Product Content */}
      <div className="p-4 sm:p-5 md:p-6">
        {/* Title */}
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-center text-gray-900 dark:text-white mb-2">
          {product.title}
        </h2>

        {/* Rating */}
        {product.rating && (
          <div
            className="flex justify-center items-center gap-1 mb-3"
            role="img"
            aria-label={`Rating: ${product.rating} out of 5 stars`}
          >
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className={
                  i < product.rating! ? "text-yellow-400" : "text-gray-300"
                }
                aria-hidden="true"
              >
                ★
              </span>
            ))}
            <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">
              ({product.rating})
            </span>
          </div>
        )}

        {/* Description */}
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 text-center mb-4 line-clamp-3">
          {product.description}
        </p>

        {/* Price */}
        <div className="text-center mb-4">
          <span
            className="text-2xl sm:text-3xl font-bold text-blue-600 dark:text-blue-400"
            aria-label={`Price: $${product.price.toFixed(2)}`}
          >
            ${product.price.toFixed(2)}
          </span>
        </div>

        {/* View More Button - Full Width */}
        <motion.button
          type="button"
          onClick={handleViewMore}
          className="w-full py-3 sm:py-3.5 px-4 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={!product.inStock}
          aria-label={`View more details about ${product.title}`}
          aria-disabled={!product.inStock}
        >
          {product.inStock ? "View More" : "Currently Unavailable"}
        </motion.button>
      </div>
    </motion.article>
  );
}
