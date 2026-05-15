"use client";

import Link from "next/link";
import Image from "next/image";
import { Product, formatPrice } from "@/lib/products";
import { useCart } from "./CartContext";

const categoryColors: Record<string, string> = {
  Yosemite: "bg-amber-100 text-amber-800",
  Zion: "bg-red-100 text-red-800",
  Alps: "bg-blue-100 text-blue-800",
  Africa: "bg-orange-100 text-orange-800",
  "Sierra Nevada": "bg-emerald-100 text-emerald-800",
  Indonesia: "bg-teal-100 text-teal-800",
};

const categoryGradients: Record<string, string> = {
  Yosemite: "from-amber-300 to-stone-500",
  Zion: "from-red-400 to-orange-600",
  Alps: "from-blue-400 to-slate-500",
  Africa: "from-orange-300 to-amber-500",
  "Sierra Nevada": "from-emerald-400 to-teal-600",
  Indonesia: "from-teal-400 to-cyan-600",
};

function MountainIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 80 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M8 56 L40 8 L72 56 Z" fill="white" opacity="0.3" />
      <path d="M20 56 L45 22 L70 56 Z" fill="white" opacity="0.2" />
      <path d="M36 14 L44 14 L40 8 Z" fill="white" opacity="0.7" />
      <path d="M8 56 L24 56 L40 30 L32 20 Z" fill="white" opacity="0.15" />
    </svg>
  );
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const gradient = categoryGradients[product.category] ?? "from-slate-400 to-slate-600";
  const badgeColor = categoryColors[product.category] ?? "bg-gray-100 text-gray-800";

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();
    addToCart({ id: product.id, name: product.name, price: product.price });
  }

  return (
    <Link href={`/products/${product.id}`} className="group block">
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-stone-200 hover:border-[#2d5016]/30 hover:-translate-y-1">
        {/* Product image */}
        <div className={`relative h-48 bg-gradient-to-br ${gradient} flex items-end justify-center overflow-hidden`}>
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          ) : (
            <MountainIcon className="w-full h-36 absolute bottom-0" />
          )}
          <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors" />
          {!product.inStock && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <span className="bg-white text-slate-700 font-semibold px-4 py-1.5 rounded-full text-sm">
                Out of Stock
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-semibold text-slate-800 group-hover:text-[#2d5016] transition-colors leading-snug">
              {product.name}
            </h3>
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full shrink-0 ${badgeColor}`}>
              {product.category}
            </span>
          </div>
          <p className="text-slate-500 text-sm line-clamp-2 mb-4">
            {product.description}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-slate-900">
              {formatPrice(product.price)}
            </span>
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="bg-[#2d5016] hover:bg-[#3d6b1f] disabled:bg-slate-300 disabled:cursor-not-allowed text-white text-sm font-medium px-4 py-2 rounded-xl transition-colors"
            >
              {product.inStock ? "Add to Cart" : "Unavailable"}
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
