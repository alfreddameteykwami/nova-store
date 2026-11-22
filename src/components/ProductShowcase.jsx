import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { ShoppingBag } from "lucide-react";
import Photo from "./Photo";

// Replace the copy and the three images in public/images/showcase/ with your featured product.
const STEPS = [
  {
    k: "Design",
    t: "Shaped around you, not a spec sheet.",
    d: "Soft-touch materials and a balanced frame that stays comfortable through a full day.",
    stat: ["Weight", "248 g", 55],
    img: "/images/showcase/1.png",
  },
  {
    k: "Sound",
    t: "Clear detail at every volume.",
    d: "Large drivers and adaptive noise cancelling keep the music in and the noise out.",
    stat: ["Noise reduction", "38 dB", 76],
    img: "/images/showcase/2.png",
  },
  {
    k: "Battery",
    t: "A week of commutes on one charge.",
    d: "Forty hours of playback, and five minutes on the cable gives you three more.",
    stat: ["Battery life", "40 hours", 80],
    img: "/images/showcase/3.png",
  },
];
const ease = [0.2, 0.7, 0.2, 1];

export default function ProductShowcase({ product, onAdd }) {
  const ref = useRef(null);
  const [i, setI] = useState(0);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  useMotionValueEvent(scrollYProgress, "change", (v) =>
    setI(Math.min(STEPS.length - 1, Math.max(0, Math.floor(v * STEPS.length)))),
  );
  const s = STEPS[i];

  return (
    <section
      id="showcase"
      ref={ref}
      className="relative"
      style={{ height: `${STEPS.length * 90 + 30}svh` }}
    >
      <div className="sticky top-0 mx-auto grid h-[100svh] max-w-7xl content-center gap-6 px-5 pt-16 md:grid-cols-2 md:items-center md:gap-14 md:px-10">
        <div className="relative h-[46svh] overflow-hidden rounded-[2rem] bg-paper md:h-[74svh]">
          {STEPS.map((st, n) => (
            <motion.div
              key={st.img}
              className="absolute inset-0"
              animate={{ opacity: n === i ? 1 : 0, scale: n === i ? 1 : 1.08 }}
              transition={{ duration: 0.9, ease }}
            >
              <Photo
                src={st.img}
                alt={`${product.name}: ${st.k.toLowerCase()}`}
                className="h-full w-full"
              />
            </motion.div>
          ))}
        </div>

        <div>
          <p className="text-mute">
            {product.name} <span className="mx-1">·</span> {i + 1} of{" "}
            {STEPS.length}
          </p>
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.45, ease }}
            >
              <h2 className="mt-3 font-display text-3xl font-light leading-tight tracking-tight md:text-5xl">
                {s.t}
              </h2>
              <p className="mt-3 max-w-md text-mute">{s.d}</p>
              <div className="mt-6 max-w-md">
                <div className="flex justify-between text-sm">
                  <span className="text-mute">{s.stat[0]}</span>
                  <span className="font-medium">{s.stat[1]}</span>
                </div>
                <div className="mt-2 h-[2px] bg-ink/15">
                  <motion.div
                    className="h-[2px] bg-cobalt"
                    initial={{ width: 0 }}
                    animate={{ width: `${s.stat[2]}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-6 flex gap-2" aria-hidden>
            {STEPS.map((_, n) => (
              <span
                key={n}
                className={`h-[3px] w-10 rounded-full transition-colors duration-500 ${n === i ? "bg-ink" : "bg-ink/20"}`}
              />
            ))}
          </div>
          <div className="mt-6 flex items-center gap-6">
            <span className="font-display text-3xl">${product.price}</span>
            <button
              onClick={() => onAdd(product.id)}
              className="inline-flex items-center gap-2 rounded-full bg-cobalt px-7 py-3.5 font-medium text-white transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-cobalt/30 active:scale-95"
            >
              <ShoppingBag size={18} /> Add to bag
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
