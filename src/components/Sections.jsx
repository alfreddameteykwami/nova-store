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
    <section
      id="about"
      className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24 md:px-10 md:py-28"
    >
      <p className="font-display text-3xl font-light leading-tight tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
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
      <motion.div {...reveal} className="mt-10 sm:mt-14">
        <Photo
          src="/images/story.jpg"
          alt="The NØVA workspace"
          className="aspect-[4/3] rounded-3xl md:aspect-[21/9] md:rounded-[2rem]"
          parallax
        />
      </motion.div>
      <div className="mt-12 grid gap-6 sm:mt-16 sm:gap-8 md:grid-cols-3">
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
            <h3 className="font-display text-lg font-medium sm:text-xl">{t}</h3>
            <p className="mt-2 text-sm text-mute sm:text-base">{d}</p>
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
    <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-20 md:px-10 md:pb-24">
      <motion.div
        {...reveal}
        className="rounded-3xl bg-ink p-6 text-fog sm:p-10 md:rounded-[2rem] md:p-16"
      >
        <h2 className="max-w-xl font-display text-3xl font-light tracking-tight sm:text-4xl md:text-5xl">
          Be first to see what’s next.
        </h2>
        {done ? (
          <p className="mt-6 sm:mt-8">
            You’re on the list. We’ll write when something new arrives.
          </p>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (email.includes("@")) setDone(true);
            }}
            className="mt-6 flex w-full max-w-md flex-col gap-3 sm:mt-8 sm:flex-row"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              aria-label="Email address"
              className="min-w-0 flex-1 rounded-full bg-fog/15 px-5 py-3.5 text-sm outline-none placeholder:text-fog/60 focus:bg-fog/25 sm:text-base"
            />
            <button className="shrink-0 rounded-full bg-cobalt px-7 py-3.5 text-sm font-medium text-white transition active:scale-95 sm:text-base">
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
    <footer className="border-t border-ink/15 px-4 py-8 sm:px-6 md:px-10 md:py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-3 text-sm text-mute sm:flex-row sm:items-center">
        <span className="font-display text-base text-ink sm:text-lg">
          NØVA — Objects for Everyday Living
        </span>
        <span>© 2026 NØVA. A front-end demo store.</span>
      </div>
    </footer>
  );
}