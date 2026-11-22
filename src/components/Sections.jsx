import { useState } from "react";
import { motion } from "framer-motion";
import { reveal } from "../lib/motion";
import Photo from "./Photo";

export function BrandStory() {
  const words =
    "We make fewer things, and we make them better. Objects that earn a place on your desk, in your bag and in your day.".split(
      " ",
    );
  return (
    <section id="about" className="mx-auto max-w-5xl px-5 py-28 md:px-10">
      <p className="font-display text-4xl font-light leading-tight tracking-tight md:text-6xl">
        {words.map((w, i) => (
          <motion.span
            key={i}
            className="mr-[0.25em] inline-block"
            initial={{ opacity: 0.12 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6, delay: i * 0.03 }}
          >
            {w}
          </motion.span>
        ))}
      </p>
      <motion.div {...reveal} className="mt-14">
        <Photo
          src="/images/story.jpg"
          alt="The NØVA workspace"
          className="aspect-[4/3] rounded-[2rem] md:aspect-[21/9]"
          parallax
        />
      </motion.div>
      <div className="mt-16 grid gap-8 md:grid-cols-3">
        {[
          [
            "Made to last",
            "Aluminum, glass and ceramic over plastic wherever we can.",
          ],
          [
            "Designed to disappear",
            "Quiet forms that fit your space and stay out of the way.",
          ],
          ["Priced honestly", "No inflated list prices and no endless sales."],
        ].map(([t, d]) => (
          <motion.div
            key={t}
            {...reveal}
            className="border-t border-ink/20 pt-5"
          >
            <h3 className="font-display text-xl font-medium">{t}</h3>
            <p className="mt-2 text-mute">{d}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  return (
    <section className="mx-auto max-w-7xl px-5 pb-24 md:px-10">
      <motion.div
        {...reveal}
        className="rounded-[2rem] bg-ink p-8 text-fog md:p-16"
      >
        <h2 className="max-w-xl font-display text-4xl font-light tracking-tight md:text-5xl">
          Be first to see what’s next.
        </h2>
        {done ? (
          <p className="mt-8">
            You’re on the list. We’ll write when something new arrives.
          </p>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (email.includes("@")) setDone(true);
            }}
            className="mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              aria-label="Email address"
              className="flex-1 rounded-full bg-fog/15 px-5 py-3.5 outline-none placeholder:text-fog/60 focus:bg-fog/25"
            />
            <button className="rounded-full bg-cobalt px-7 py-3.5 font-medium text-white transition active:scale-95">
              Subscribe
            </button>
          </form>
        )}
      </motion.div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-ink/15 px-5 py-10 md:px-10">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 text-sm text-mute md:flex-row">
        <span className="font-display text-lg text-ink">
          NØVA — Objects for Everyday Living
        </span>
        <span>© 2026 NØVA. A front-end demo store.</span>
      </div>
    </footer>
  );
}
