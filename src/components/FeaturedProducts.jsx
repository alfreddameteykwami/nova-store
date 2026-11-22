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
    <section
      id="shop"
      className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 md:px-10 md:py-24"
    >
      <motion.div
        {...reveal}
        className="flex flex-col gap-5 sm:gap-6 md:flex-row md:items-end md:justify-between"
      >
        <h2 className="font-display text-4xl font-light tracking-tight sm:text-5xl md:text-6xl">
          The collection
        </h2>
        <label className="glass flex w-full items-center gap-2 rounded-full px-4 py-2.5 md:w-72">
          <Search size={18} className="shrink-0 text-mute" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search objects"
            aria-label="Search products"
            className="min-w-0 w-full bg-transparent text-sm outline-none placeholder:text-mute sm:text-base"
          />
        </label>
      </motion.div>

      <div
        className="no-scrollbar -mx-4 mt-6 flex gap-2 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:mt-8 sm:px-6 md:mx-0 md:px-0"
        role="group"
        aria-label="Filter by category"
      >
        {["All", ...CATEGORIES, "Wishlist"].map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            aria-pressed={cat === c}
            className={`whitespace-nowrap rounded-full border px-4 py-1.5 text-sm transition sm:px-5 sm:py-2 ${cat === c ? "border-ink bg-ink text-fog" : "border-ink/20 hover:border-ink"}`}
          >
            {c}
          </button>
        ))}
      </div>

      {list.length ? (
        <div className="mt-8 grid grid-cols-1 gap-x-5 gap-y-10 sm:mt-10 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 xl:grid-cols-4">
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
