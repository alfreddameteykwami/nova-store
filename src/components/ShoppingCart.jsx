import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { Tile } from "./ProductCard";

export default function ShoppingCart({
  open,
  onClose,
  items,
  onQty,
  onRemove,
}) {
  const [note, setNote] = useState("");
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = subtotal === 0 || subtotal >= 150 ? 0 : 9;
  const total = subtotal + shipping;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="b"
          className="fixed inset-0 z-50 bg-ink/40 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />
      )}
      {open && (
        <motion.aside
          key="d"
          role="dialog"
          aria-label="Shopping bag"
          className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-paper p-6"
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.45, ease: [0.2, 0.7, 0.2, 1] }}
        >
          <div className="flex items-center justify-between">
            <h2 className="font-display text-3xl font-light tracking-tight">
              Your bag
            </h2>
            <button
              onClick={onClose}
              aria-label="Close bag"
              className="grid h-10 w-10 place-items-center rounded-full hover:bg-ink/10"
            >
              <X size={20} />
            </button>
          </div>

          {items.length === 0 ? (
            <div className="grid flex-1 place-items-center text-center">
              <div>
                <ShoppingBag
                  size={44}
                  strokeWidth={1}
                  className="mx-auto text-mute"
                />
                <p className="mt-4 font-display text-2xl font-light">
                  Your bag is empty
                </p>
                <p className="mt-1 text-mute">
                  Pick an object and it will appear here.
                </p>
                <a
                  href="#shop"
                  onClick={onClose}
                  className="mt-6 inline-block rounded-full bg-ink px-6 py-3 text-fog"
                >
                  Continue shopping
                </a>
              </div>
            </div>
          ) : (
            <>
              <ul className="mt-6 flex-1 divide-y divide-ink/10 overflow-auto">
                {items.map((i) => (
                  <li key={i.id} className="flex gap-4 py-4">
                    <Tile p={i} className="h-20 w-20 shrink-0 rounded-2xl" />
                    <div className="flex flex-1 flex-col">
                      <div className="flex justify-between gap-2">
                        <span className="font-medium">{i.name}</span>
                        <span>${i.price * i.qty}</span>
                      </div>
                      <span className="text-sm text-mute">${i.price} each</span>
                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-center gap-3 rounded-full border border-ink/20 px-1">
                          <button
                            aria-label="Decrease quantity"
                            onClick={() => onQty(i.id, -1)}
                            className="grid h-8 w-8 place-items-center"
                          >
                            <Minus size={14} />
                          </button>
                          <span
                            aria-live="polite"
                            className="w-4 text-center text-sm"
                          >
                            {i.qty}
                          </span>
                          <button
                            aria-label="Increase quantity"
                            onClick={() => onQty(i.id, 1)}
                            className="grid h-8 w-8 place-items-center"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <button
                          aria-label={`Remove ${i.name}`}
                          onClick={() => onRemove(i.id)}
                          className="text-mute transition hover:text-ink"
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="space-y-2 border-t border-ink/10 pt-5">
                <div className="flex justify-between text-mute">
                  <span>Subtotal</span>
                  <span>${subtotal}</span>
                </div>
                <div className="flex justify-between text-mute">
                  <span>Shipping (free over $150)</span>
                  <span>{shipping ? `$${shipping}` : "Free"}</span>
                </div>
                <div className="flex justify-between pt-2 font-display text-2xl">
                  <span>Total</span>
                  <span>${total}</span>
                </div>
                <button
                  onClick={() =>
                    setNote(
                      "This is a front-end demo, so checkout isn’t connected.",
                    )
                  }
                  className="mt-3 w-full rounded-full bg-cobalt py-3.5 font-medium text-white"
                >
                  Check out
                </button>
                <p className="min-h-5 text-center text-sm text-mute">{note}</p>
              </div>
            </>
          )}
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
