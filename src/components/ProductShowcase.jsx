import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { ShoppingBag } from "lucide-react";
import Photo from "./Photo";
import { reduced } from "../lib/motion";

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
  const [short, setShort] = useState(
    () => typeof window !== "undefined" && window.innerHeight < 560,
  );
  const still = reduced();

  useEffect(() => {
    const onResize = () => setShort(window.innerHeight < 560);
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (short || still) return;
    setI(Math.min(STEPS.length - 1, Math.max(0, Math.floor(v * STEPS.length))));
  });
  const s = STEPS[i];
  const compact = short || still;

  const selectStep = (n) => {
    if (compact || !ref.current) {
      setI(n);
      return;
    }
    const rect = ref.current.getBoundingClientRect();
    const sectionTop = window.scrollY + rect.top;
    const scrollable = Math.max(
      1,
      ref.current.offsetHeight - window.innerHeight,
    );
    const target = sectionTop + ((n + 0.15) / STEPS.length) * scrollable;
    window.scrollTo({ top: target, behavior: "smooth" });
  };

  return (
    <section
      id="showcase"
      ref={ref}
      className={compact ? "py-14 sm:py-20" : "relative"}
      style={compact ? undefined : { height: `${STEPS.length * 90 + 30}svh` }}
    >
      <div
        className={
          compact
            ? "mx-auto grid max-w-7xl items-center gap-6 px-4 sm:px-6 md:grid-cols-2 md:gap-10 md:px-10"
            : "sticky top-0 mx-auto grid h-[100svh] max-w-7xl content-center gap-4 px-4 pb-4 pt-16 sm:gap-6 sm:px-6 md:grid-cols-2 md:items-center md:gap-10 md:px-10 lg:gap-14"
        }
      >
        <div
          className={
            compact
              ? "relative aspect-[4/3] overflow-hidden rounded-3xl bg-paper md:aspect-[5/4] md:rounded-[2rem]"
              : "relative h-[34svh] min-h-[190px] max-h-[340px] overflow-hidden rounded-3xl bg-paper sm:h-[40svh] sm:max-h-[400px] md:h-[min(70svh,580px)] md:max-h-none md:rounded-[2rem]"
          }
        >
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

        <div className="min-w-0">
          <p className="text-sm text-mute sm:text-base">
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
              <h2 className="mt-2 font-display text-2xl font-light leading-tight tracking-tight sm:mt-3 sm:text-3xl md:text-4xl lg:text-5xl">
                {s.t}
              </h2>
              <p className="mt-2 max-w-md text-sm text-mute sm:mt-3 sm:text-base">
                {s.d}
              </p>
              <div className="mt-4 max-w-md sm:mt-6">
                <div className="flex justify-between text-xs sm:text-sm">
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

          <div
            className="mt-4 flex gap-2 sm:mt-6"
            role="tablist"
            aria-label="Product highlights"
          >
            {STEPS.map((st, n) => (
              <button
                key={st.k}
                type="button"
                role="tab"
                aria-selected={n === i}
                aria-label={`${st.k}: ${st.t}`}
                onClick={() => selectStep(n)}
                className={`h-1 w-10 rounded-full transition-colors duration-500 ${n === i ? "bg-ink" : "bg-ink/20 hover:bg-ink/40"}`}
              />
            ))}
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-4 sm:mt-6 sm:gap-6">
            <span className="font-display text-2xl sm:text-3xl">
              ${product.price}
            </span>
            <button
              onClick={() => onAdd(product.id)}
              className="inline-flex items-center gap-2 rounded-full bg-cobalt px-6 py-3 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-cobalt/30 active:scale-95 sm:px-7 sm:py-3.5 sm:text-base"
            >
              <ShoppingBag size={18} /> Add to bag
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
