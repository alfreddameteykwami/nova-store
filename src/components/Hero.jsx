import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Photo from "./Photo";
import { reduced } from "../lib/motion";

const LINES = ["Objects for", "everyday living."];
const ease = [0.2, 0.7, 0.2, 1];

function Cta({ className = "" }) {
  return (
    <a
      href="#shop"
      className={`group pointer-events-auto inline-flex items-center gap-2 rounded-full bg-cobalt px-6 py-3 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-cobalt/30 sm:px-7 sm:py-3.5 sm:text-base ${className}`}
    >
      Explore Collection{" "}
      <ArrowRight size={18} className="transition group-hover:translate-x-1" />
    </a>
  );
}

function getViewportMode() {
  if (typeof window === "undefined") {
    return { bp: "desktop", short: false };
  }
  const w = window.innerWidth;
  const h = window.innerHeight;
  const bp = w < 768 ? "mobile" : w < 1024 ? "tablet" : "desktop";
  return { bp, short: h < 540 };
}

// The photo starts as a framed image and grows to full screen as you scroll.
export default function Hero() {
  const ref = useRef(null);
  const still = reduced();
  const [vp, setVp] = useState(getViewportMode);

  useEffect(() => {
    const onResize = () => setVp(getViewportMode());
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const { scrollYProgress: p } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const from =
    vp.bp === "mobile"
      ? "inset(44% 5% 6% 5% round 24px)"
      : vp.bp === "tablet"
        ? "inset(40% 12% 8% 12% round 28px)"
        : "inset(38% 20% 8% 20% round 36px)";

  const clip = useTransform(
    p,
    [0, 0.75],
    [from, "inset(0% 0% 0% 0% round 0px)"],
  );
  const zoom = useTransform(p, [0, 0.75], [1.2, 1]);
  const titleO = useTransform(p, [0, 0.3], [1, 0]);
  const titleY = useTransform(p, [0, 0.3], [0, -70]);
  const overlayO = useTransform(p, [0.6, 0.92], [0, 1]);

  if (still || vp.short) {
    return (
      <section
        id="top"
        className="mx-auto max-w-7xl px-4 pb-10 pt-24 sm:px-6 md:px-10 md:pt-28"
      >
        <h1 className="font-display text-4xl font-light leading-[0.95] tracking-tight sm:text-6xl lg:text-8xl">
          Objects for everyday living.
        </h1>
        <p className="mt-4 max-w-md text-sm text-mute sm:mt-5 sm:text-base md:text-lg">
          Considered technology and lifestyle accessories, made to feel as good
          as they work.
        </p>
        <Cta className="mt-6" />
        <Photo
          src="/images/hero.png"
          alt="NØVA lifestyle photograph"
          className="mt-8 aspect-[16/10] rounded-3xl sm:aspect-[4/3] md:rounded-[2rem] lg:aspect-[16/9]"
        />
      </section>
    );
  }

  return (
    <section id="top" ref={ref} className="h-[220svh] md:h-[230svh]">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <motion.div
          style={{ opacity: titleO, y: titleY }}
          className="absolute inset-x-0 top-[11svh] px-4 text-center sm:top-[12svh] sm:px-6 md:top-[13svh]"
        >
          <h1 className="font-display text-[clamp(2.35rem,9.5vw,6rem)] font-light leading-[0.95] tracking-tight">
            {LINES.map((l, n) => (
              <span key={l} className="block overflow-hidden pb-1.5 sm:pb-2">
                <motion.span
                  className="block"
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.1, delay: 0.9 + n * 0.12, ease }}
                >
                  {l}
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.5, ease }}
          >
            <p className="mx-auto mt-3 hidden max-w-md text-sm text-mute sm:block md:mt-4 md:text-lg">
              Considered technology and lifestyle accessories, made to feel as
              good as they work.
            </p>
            <Cta className="mt-4 sm:mt-5" />
          </motion.div>
        </motion.div>

        <motion.div style={{ clipPath: clip }} className="absolute inset-0">
          <motion.div style={{ scale: zoom }} className="h-full w-full">
            <Photo
              src="/images/hero.png"
              alt="NØVA lifestyle photograph"
              className="h-full w-full"
            />
          </motion.div>
          <motion.div
            style={{ opacity: overlayO }}
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent"
          />
          <motion.div
            style={{ opacity: overlayO }}
            className="absolute bottom-8 left-4 right-4 max-w-lg text-white sm:bottom-12 sm:left-8 md:bottom-16 md:left-16"
          >
            <p className="font-display text-2xl font-light leading-tight sm:text-4xl md:text-5xl">
              Made to be used every day.
            </p>
            <Cta className="mt-4 sm:mt-5" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}