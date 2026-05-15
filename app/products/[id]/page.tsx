import { notFound } from "next/navigation";
import Image from "next/image";
import { products, getProductById, formatPrice } from "@/lib/products";
import AddToCartButton from "./AddToCartButton";

const categoryGradients: Record<string, string> = {
  Yosemite: "from-amber-300 to-stone-500",
  Zion: "from-red-400 to-orange-600",
  Alps: "from-blue-400 to-slate-500",
  Africa: "from-orange-300 to-amber-500",
  "Sierra Nevada": "from-emerald-400 to-teal-600",
  Indonesia: "from-teal-400 to-cyan-600",
};

const categoryColors: Record<string, string> = {
  Yosemite: "bg-amber-100 text-amber-800",
  Zion: "bg-red-100 text-red-800",
  Alps: "bg-blue-100 text-blue-800",
  Africa: "bg-orange-100 text-orange-800",
  "Sierra Nevada": "bg-emerald-100 text-emerald-800",
  Indonesia: "bg-teal-100 text-teal-800",
};

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export default function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const product = getProductById(params.id);
  if (!product) notFound();

  const gradient = categoryGradients[product.category] ?? "from-slate-400 to-slate-600";
  const badgeColor = categoryColors[product.category] ?? "bg-gray-100 text-gray-800";

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        {/* Product image */}
        <div className={`relative rounded-3xl overflow-hidden bg-gradient-to-br ${gradient} aspect-square shadow-xl`}>
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          ) : (
            <svg
              viewBox="0 0 200 160"
              className="w-4/5 h-4/5 absolute inset-1/2 -translate-x-1/2 -translate-y-1/2"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M20 140 L100 20 L180 140 Z" fill="white" opacity="0.3" />
              <path d="M50 140 L112 55 L175 140 Z" fill="white" opacity="0.2" />
              <path d="M90 35 L110 35 L100 20 Z" fill="white" opacity="0.7" />
              <path d="M20 140 L60 140 L100 75 L80 50 Z" fill="white" opacity="0.15" />
            </svg>
          )}
          {!product.inStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="bg-white text-slate-700 font-bold px-6 py-2 rounded-full text-lg">
                Out of Stock
              </span>
            </div>
          )}
        </div>

        {/* Details */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className={`text-sm font-medium px-3 py-1 rounded-full ${badgeColor}`}>
              {product.category}
            </span>
            {product.inStock ? (
              <span className="text-sm text-green-700 font-medium flex items-center gap-1">
                <span className="w-2 h-2 bg-green-500 rounded-full inline-block" />
                In Stock
              </span>
            ) : (
              <span className="text-sm text-red-600 font-medium">Out of Stock</span>
            )}
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 leading-tight">
            {product.name}
          </h1>
          <p className="text-slate-600 text-lg leading-relaxed mb-6">
            {product.description}
          </p>

          {/* Specs */}
          <div className="bg-white rounded-2xl border border-stone-200 divide-y divide-stone-100 mb-8">
            {[
              { label: "Material", value: "Premium PLA Filament" },
              { label: "Layer Resolution", value: "0.1 mm" },
              { label: "Approximate Size", value: "10 × 10 cm base" },
              { label: "Weight", value: "~280 g" },
              { label: "Terrain Source", value: "Real elevation data" },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between px-5 py-3 text-sm">
                <span className="text-slate-500">{label}</span>
                <span className="font-medium text-slate-800">{value}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between mb-6">
            <span className="text-4xl font-extrabold text-slate-900">
              {formatPrice(product.price)}
            </span>
          </div>

          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  );
}
