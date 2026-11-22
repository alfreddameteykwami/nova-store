import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// Real photo with a zoom-out reveal on entry, optional scroll parallax and a hover zoom.
// If the file is missing, a quiet placeholder names the file to add.
export default function Photo({ src, alt, className = "", parallax = false }) {
  const ref = useRef(null);
  const [bad, setBad] = useState(false);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-7%", "7%"]);
  return (
    <div ref={ref} className={`relative overflow-hidden bg-paper ${className}`}>
      {bad ? (
        <div className="absolute inset-0 grid place-items-center p-4 text-center text-sm text-mute">
          <span>
            {alt}
            <br />
            <span className="text-xs opacity-70">{src}</span>
          </span>
        </div>
      ) : (
        <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105">
          <motion.img
            src={src}
            alt={alt}
            loading="lazy"
            decoding="async"
            onError={() => setBad(true)}
            initial={{ scale: 1.18 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1.4, ease: [0.2, 0.7, 0.2, 1] }}
            style={parallax ? { y } : undefined}
            className={`absolute left-0 w-full object-cover ${parallax ? "-top-[8%] h-[116%]" : "top-0 h-full"}`}
          />
        </div>
      )}
    </div>
  );
}
