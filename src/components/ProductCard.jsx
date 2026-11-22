import { motion } from "framer-motion";
import { Heart, Plus } from "lucide-react";
import Photo from "./Photo";

export function Tile({ p, className = "" }) {
  return <Photo src={p.image} alt={p.name} className={className} parallax />;
}

export default function ProductCard({ p, i, wished, onWish, onAdd, onOpen }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.6,
        delay: (i % 4) * 0.08,
        ease: [0.2, 0.7, 0.2, 1],
      }}
      className="group"
    >
      <div className="relative">
        <button
          onClick={() => onOpen(p)}
          aria-label={`View ${p.name}`}
          className="block w-full text-left"
        >
          <Tile p={p} className="aspect-4/5 rounded-3xl" />
        </button>
        <span className="glass absolute left-3 top-3 rounded-full px-3 py-1 text-xs">
          {p.category}
        </span>
        <button
          onClick={() => onWish(p.id)}
          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={wished}
          className="glass absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full transition hover:scale-110"
        >
          <Heart
            size={17}
            className={wished ? "fill-cobalt text-cobalt" : ""}
          />
        </button>
      </div>
      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-xl font-medium tracking-tight">
            {p.name}
          </h3>
          <p className="mt-1 max-w-[26ch] text-sm text-mute">{p.short}</p>
        </div>
        <span className="font-display text-lg">${p.price}</span>
      </div>
      <button
        onClick={() => onAdd(p.id)}
        className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full border border-ink/20 py-2.5 text-sm font-medium transition hover:border-ink hover:bg-ink hover:text-fog active:scale-[0.98]"
      >
        <Plus size={16} /> Add to bag
      </button>
    </motion.article>
  );
}
