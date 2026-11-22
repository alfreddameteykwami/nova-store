import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Heart, ShoppingBag, X } from "lucide-react";
import { Tile } from "./ProductCard";

export default function ProductDetails({ p, onClose, onAdd, wished, onWish }) {
  useEffect(() => {
    const f = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", f);
    return () => window.removeEventListener("keydown", f);
  }, [onClose]);

  return (
    <AnimatePresence>
      {p && (
        <motion.div
          key="m"
          className="fixed inset-0 z-50 grid place-items-center bg-ink/50 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={p.name}
            onClick={(e) => e.stopPropagation()}
            initial={{ y: 40, scale: 0.97 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: 40, scale: 0.97 }}
            transition={{ duration: 0.4, ease: [0.2, 0.7, 0.2, 1] }}
            className="relative grid max-h-[92svh] w-full max-w-4xl overflow-auto rounded-4xl bg-paper md:grid-cols-2"
          >
            <Tile p={p} className="min-h-[260px] md:min-h-[520px]" />
            <div className="flex flex-col p-7 md:p-10">
              <button
                onClick={onClose}
                aria-label="Close"
                className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-fog"
              >
                <X size={18} />
              </button>
              <p className="text-sm text-mute">{p.category}</p>
              <h3 className="mt-1 font-display text-4xl font-light tracking-tight">
                {p.name}
              </h3>
              <p className="mt-4 text-mute">{p.short}</p>
              <ul className="mt-6 space-y-2">
                {p.feat.map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <Check size={16} className="text-cobalt" />
                    {f}
                  </li>
                ))}
              </ul>
              <div className="mt-auto flex items-center gap-3 pt-8">
                <span className="mr-auto font-display text-3xl">
                  ${p.price}
                </span>
                <button
                  onClick={() => onWish(p.id)}
                  aria-label="Toggle wishlist"
                  aria-pressed={wished}
                  className="grid h-12 w-12 place-items-center rounded-full border border-ink/20 transition hover:border-ink"
                >
                  <Heart
                    size={18}
                    className={wished ? "fill-cobalt text-cobalt" : ""}
                  />
                </button>
                <button
                  onClick={() => onAdd(p.id)}
                  className="inline-flex items-center gap-2 rounded-full bg-cobalt px-6 py-3 font-medium text-white transition active:scale-95"
                >
                  <ShoppingBag size={18} /> Add to bag
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
