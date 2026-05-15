import { products } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

export default function ProductsPage() {
  const categories = Array.from(new Set(products.map((p) => p.category)));

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Page header */}
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-2">All Models</h1>
        <p className="text-slate-500 text-lg">
          {products.length} models from {categories.length} mountain regions
        </p>
      </div>

      {/* Category sections */}
      {categories.map((category) => {
        const catProducts = products.filter((p) => p.category === category);
        return (
          <section key={category} className="mb-14">
            <h2 className="text-xl font-bold text-[#2d5016] mb-5 flex items-center gap-2">
              <span className="w-1 h-6 bg-[#2d5016] rounded-full inline-block" />
              {category}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {catProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
