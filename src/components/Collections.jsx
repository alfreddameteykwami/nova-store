import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Photo from "./Photo";
import { reveal } from "../lib/motion";

const items = [
  {
    name: "Technology",
    line: "Chargers, power and wearables.",
    cat: "Tech Accessories",
    img: "/images/collections/technology.jpg",
  },
  {
    name: "Everyday Essentials",
    line: "The whole range, in one place.",
    cat: "All",
    img: "/images/collections/essentials.jpg",
  },
  {
    name: "Workspace",
    line: "Keyboards, mice and light.",
    cat: "Desk Essentials",
    img: "/images/collections/workspace.jpg",
  },
  {
    name: "Lifestyle",
    line: "Bottles, mugs and frames.",
    cat: "Lifestyle Accessories",
    img: "/images/collections/lifestyle.jpg",
  },
];

function Card({ c, onPick }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-9%", "9%"]);
  return (
    <motion.button
      ref={ref}
      {...reveal}
      onClick={() => onPick(c.cat)}
      className="group relative h-72 overflow-hidden rounded-3xl text-left sm:h-88 md:h-[25rem] md:rounded-4xl lg:h-[28.75rem]"
    >
      <motion.div style={{ y }} className="absolute -inset-[12%]">
        <Photo
          src={c.img}
          alt={`${c.name} collection`}
          className="h-full w-full"
        />
      </motion.div>
      <div className="absolute inset-0 bg-linear-to-t from-black/65 via-black/15 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-7">
        <h3 className="font-display text-2xl font-light tracking-tight sm:text-3xl lg:text-4xl">
          {c.name}
        </h3>
        <p className="mt-1 translate-y-2 text-sm opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100 sm:text-base max-lg:translate-y-0 max-lg:opacity-100">
          {c.line}
        </p>
      </div>
    </motion.button>
  );
}

export default function Collections({ onPick }) {
  return (
    <section
      id="collections"
      className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 md:px-10 md:py-24"
    >
      <motion.h2
        {...reveal}
        className="mb-8 font-display text-4xl font-light tracking-tight sm:mb-10 sm:text-5xl md:text-6xl"
      >
        Collections
      </motion.h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
        {items.map((c) => (
          <Card key={c.name} c={c} onPick={onPick} />
        ))}
      </div>
    </section>
  );
}
