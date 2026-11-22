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
          className="fixed inset-0 z-50 grid place-items-center bg-ink/50 p-3 backdrop-blur-sm sm:p-4 md:p-6"
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
            className="relative grid max-h-[92svh] w-full max-w-4xl overflow-y-auto rounded-3xl bg-paper md:grid-cols-2 md:rounded-4xl"
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute right-3 top-3 z-10 grid h-10 w-10 place-items-center rounded-full bg-fog/90 shadow-sm backdrop-blur-sm sm:right-4 sm:top-4"
            >
              <X size={18} />
            </button>
            <Tile
              p={p}
              className="aspect-[4/3] w-full sm:aspect-[16/10] md:aspect-auto md:min-h-[500px]"
            />
            <div className="flex min-w-0 flex-col p-5 sm:p-7 md:p-10">
              <p className="text-sm text-mute">{p.category}</p>
              <h3 className="mt-1 font-display text-3xl font-light tracking-tight sm:text-4xl">
                {p.name}
              </h3>
              <p className="mt-3 text-sm text-mute sm:mt-4 sm:text-base">
                {p.short}
              </p>
              <ul className="mt-5 space-y-2 text-sm sm:mt-6 sm:text-base">
                {p.feat.map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <Check size={16} className="shrink-0 text-cobalt" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-6 sm:pt-8">
                <span className="font-display text-2xl sm:text-3xl">
                  ${p.price}
                </span>
                <div className="flex items-center gap-2.5">
                  <button
                    onClick={() => onWish(p.id)}
                    aria-label="Toggle wishlist"
                    aria-pressed={wished}
                    className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-ink/20 transition hover:border-ink sm:h-12 sm:w-12"
                  >
                    <Heart
                      size={18}
                      className={wished ? "fill-cobalt text-cobalt" : ""}
                    />
                  </button>
                  <button
                    onClick={() => onAdd(p.id)}
                    className="inline-flex items-center gap-2 rounded-full bg-cobalt px-5 py-3 text-sm font-medium text-white transition active:scale-95 sm:px-6 sm:text-base"
                  >
                    <ShoppingBag size={18} /> Add to bag
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}