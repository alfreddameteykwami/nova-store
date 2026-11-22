import { useRef } from "react";
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
      className={`group pointer-events-auto inline-flex items-center gap-2 rounded-full bg-cobalt px-7 py-3.5 font-medium text-white transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-cobalt/30 ${className}`}
    >
      Explore Collection{" "}
      <ArrowRight size={18} className="transition group-hover:translate-x-1" />
    </a>
  );
}

// The photo starts as a framed image and grows to full screen as you scroll.
export default function Hero() {
  const ref = useRef(null);
  const still = reduced();
  const { scrollYProgress: p } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const mob = typeof innerWidth !== "undefined" && innerWidth < 768;
  const from = mob
    ? "inset(36% 6% 10% 6% round 28px)"
    : "inset(38% 22% 8% 22% round 36px)";
  const clip = useTransform(
    p,
    [0, 0.75],
    [from, "inset(0% 0% 0% 0% round 0px)"],
  );
  const zoom = useTransform(p, [0, 0.75], [1.2, 1]);
  const titleO = useTransform(p, [0, 0.3], [1, 0]);
  const titleY = useTransform(p, [0, 0.3], [0, -70]);
  const overlayO = useTransform(p, [0.6, 0.92], [0, 1]);

  if (still) {
    return (
      <section id="top" className="px-5 pb-10 pt-28 md:px-10">
        <h1 className="font-display text-5xl font-light leading-[0.95] tracking-tight md:text-8xl">
          Objects for everyday living.
        </h1>
        <p className="mt-5 max-w-md text-mute md:text-lg">
          Considered technology and lifestyle accessories, made to feel as good
          as they work.
        </p>
        <Cta className="mt-6" />
        <Photo
          src="/images/hero.png"
          alt="NØVA lifestyle photograph"
          className="mt-8 aspect-[4/3] rounded-[2rem]"
        />
      </section>
    );
  }

  return (
    <section id="top" ref={ref} className="h-[230svh]">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <motion.div
          style={{ opacity: titleO, y: titleY }}
          className="absolute inset-x-0 top-[13svh] px-5 text-center"
        >
          <h1 className="font-display text-5xl font-light leading-[0.95] tracking-tight md:text-8xl">
            {LINES.map((l, n) => (
              <span key={l} className="block overflow-hidden pb-2">
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
            <p className="mx-auto mt-4 hidden max-w-md text-mute md:block md:text-lg">
              Considered technology and lifestyle accessories, made to feel as
              good as they work.
            </p>
            <Cta className="mt-5" />
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
            className="absolute bottom-12 left-5 max-w-lg text-white md:bottom-16 md:left-16"
          >
            <p className="font-display text-3xl font-light leading-tight md:text-5xl">
              Made to be used every day.
            </p>
            <Cta className="mt-5" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
