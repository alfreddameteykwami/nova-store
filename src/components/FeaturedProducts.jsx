import { Search } from "lucide-react";
import ProductCard from "./ProductCard";
import { CATEGORIES } from "../data/products";
import { reveal } from "../lib/motion";
import { motion } from "framer-motion";

export default function FeaturedProducts({
  list,
  query,
  setQuery,
  cat,
  setCat,
  wishlist,
  onWish,
  onAdd,
  onOpen,
  inputRef,
}) {
  return (
    <section id="shop" className="mx-auto max-w-7xl px-5 py-24 md:px-10">
      <motion.div
        {...reveal}
        className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
      >
        <h2 className="font-display text-5xl font-light tracking-tight md:text-6xl">
          The collection
        </h2>
        <label className="glass flex items-center gap-2 rounded-full px-4 py-2.5 md:w-72">
          <Search size={18} className="text-mute" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search objects"
            aria-label="Search products"
            className="w-full bg-transparent outline-none placeholder:text-mute"
          />
        </label>
      </motion.div>

      <div
        className="no-scrollbar -mx-5 mt-8 flex gap-2 overflow-x-auto px-5 pb-2 md:mx-0 md:px-0"
        role="group"
        aria-label="Filter by category"
      >
        {["All", ...CATEGORIES, "Wishlist"].map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            aria-pressed={cat === c}
            className={`whitespace-nowrap rounded-full border px-5 py-2 text-sm transition ${cat === c ? "border-ink bg-ink text-fog" : "border-ink/20 hover:border-ink"}`}
          >
            {c}
          </button>
        ))}
      </div>

      {list.length ? (
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((p, i) => (
            <ProductCard
              key={p.id}
              p={p}
              i={i}
              wished={wishlist.includes(p.id)}
              onWish={onWish}
              onAdd={onAdd}
              onOpen={onOpen}
            />
          ))}
        </div>
      ) : (
        <p className="mt-16 text-center text-mute">
          {cat === "Wishlist"
            ? "Your wishlist is empty. Tap the heart on any product to save it."
            : "No products match your search."}
        </p>
      )}
    </section>
  );
}
