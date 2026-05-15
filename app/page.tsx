import Link from "next/link";
import { products } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

export default function HomePage() {
  const featured = products.filter((p) => p.inStock).slice(0, 3);

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-[#2d5016] via-[#3d6b1f] to-[#1e3610] text-white overflow-hidden">
        {/* Background mountains SVG */}
        <div className="absolute inset-0 opacity-10">
          <svg viewBox="0 0 1200 400" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
            <path d="M0 400 L200 100 L400 300 L600 50 L800 250 L1000 80 L1200 200 L1200 400 Z" fill="white" />
          </svg>
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-36 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-medium mb-6 border border-white/20">
            <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
            Handcrafted 3D models of real terrain
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
            Own the Summit.
            <br />
            <span className="text-amber-300">In Your Hands.</span>
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10">
            We turn real mountain terrain data into stunning 3D printed models. From
            the Alps to the Himalayas — every ridge, valley, and summit, at your fingertips.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="bg-white text-[#2d5016] font-bold px-8 py-4 rounded-2xl hover:bg-stone-100 transition-colors text-lg shadow-lg"
            >
              Shop All Models
            </Link>
            <Link
              href="/products"
              className="border-2 border-white/40 text-white font-semibold px-8 py-4 rounded-2xl hover:bg-white/10 transition-colors text-lg"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Features strip */}
      <section className="bg-[#f5f0e8] border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { icon: "M12 2a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 110-16 8 8 0 010 16z M12 6v6l4 2", label: "Real Terrain Data", desc: "Models generated from actual elevation datasets" },
            { icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4", label: "Premium PLA Filament", desc: "Eco-friendly, durable, and beautifully finished" },
            { icon: "M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4", label: "Ships Worldwide", desc: "Carefully packed and sent to your door" },
          ].map((f) => (
            <div key={f.label} className="flex items-start gap-4">
              <div className="bg-[#2d5016]/10 p-3 rounded-xl shrink-0">
                <svg className="w-6 h-6 text-[#2d5016]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={f.icon} />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-slate-800 mb-0.5">{f.label}</h3>
                <p className="text-sm text-slate-500">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured products */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">Featured Models</h2>
            <p className="text-slate-500 mt-1">Our most popular summit prints</p>
          </div>
          <Link
            href="/products"
            className="text-[#2d5016] font-semibold hover:underline text-sm"
          >
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#2d5016] text-white">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h2 className="text-3xl font-bold mb-4">Find Your Mountain</h2>
          <p className="text-white/75 mb-8 text-lg">
            Browse our full catalog of 3D printed peaks from around the world.
          </p>
          <Link
            href="/products"
            className="bg-amber-400 text-[#2d5016] font-bold px-8 py-4 rounded-2xl hover:bg-amber-300 transition-colors text-lg inline-block"
          >
            Shop All Models
          </Link>
        </div>
      </section>
    </div>
  );
}
