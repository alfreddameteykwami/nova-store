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
      className="group relative h-90 overflow-hidden rounded-4xl text-left md:h-115"
    >
      <motion.div style={{ y }} className="absolute inset-[12%]">
        <Photo
          src={c.img}
          alt={`${c.name} collection`}
          className="h-full w-full"
        />
      </motion.div>
      <div className="absolute inset-0 bg-linear-to-t from-black/65 via-black/10 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-7 text-white">
        <h3 className="font-display text-4xl font-light tracking-tight">
          {c.name}
        </h3>
        <p className="mt-1 translate-y-2 opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100 max-md:translate-y-0 max-md:opacity-100">
          {c.line}
        </p>
      </div>
    </motion.button>
  );
}

export default function Collections({ onPick }) {
  return (
    <section id="collections" className="mx-auto max-w-7xl px-5 py-24 md:px-10">
      <motion.h2
        {...reveal}
        className="mb-10 font-display text-5xl font-light tracking-tight md:text-6xl"
      >
        Collections
      </motion.h2>
      <div className="grid gap-5 md:grid-cols-2">
        {items.map((c) => (
          <Card key={c.name} c={c} onPick={onPick} />
        ))}
      </div>
    </section>
  );
}
