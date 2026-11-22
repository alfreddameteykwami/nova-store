import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Heart, ShoppingBag, Menu, X, Moon, Sun } from "lucide-react";

const links = [
  ["Home", "#top"],
  ["Shop", "#shop"],
  ["Collections", "#collections"],
  ["About", "#about"],
];

function IconBtn({ label, onClick, count, children }) {
  return (
    <button
      aria-label={label}
      onClick={onClick}
      className="relative grid h-9 w-9 place-items-center rounded-full transition hover:bg-ink/10 sm:h-10 sm:w-10"
    >
      {children}
      {count > 0 && (
        <motion.span
          key={count}
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-cobalt px-1 text-[11px] font-medium text-white"
        >
          {count}
        </motion.span>
      )}
    </button>
  );
}

export default function Navbar({
  cartCount,
  wishCount,
  onCart,
  onWish,
  onSearch,
  theme,
  onTheme,
}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 40);
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${scrolled || open ? "glass" : "border border-transparent"}`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2.5 sm:px-6 sm:py-3 lg:px-10">
        <a
          href="#top"
          className="shrink-0 font-display text-xl font-medium tracking-tight sm:text-2xl"
        >
          NØVA
        </a>
        <nav className="hidden gap-6 md:flex lg:gap-9" aria-label="Main">
          {links.map(([l, h]) => (
            <a
              key={l}
              href={h}
              className="relative py-1 text-[15px] after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-0 after:bg-ink after:transition-all after:duration-300 hover:after:w-full"
            >
              {l}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-0.5 sm:gap-1">
          <IconBtn label="Search" onClick={onSearch}>
            <Search size={19} />
          </IconBtn>
          <IconBtn
            label={
              theme === "dark"
                ? "Switch to light theme"
                : "Switch to dark theme"
            }
            onClick={onTheme}
          >
            {theme === "dark" ? <Sun size={19} /> : <Moon size={19} />}
          </IconBtn>
          <IconBtn label="Wishlist" onClick={onWish} count={wishCount}>
            <Heart size={19} />
          </IconBtn>
          <IconBtn label="Open bag" onClick={onCart} count={cartCount}>
            <ShoppingBag size={19} />
          </IconBtn>
          <button
            className="grid h-9 w-9 place-items-center rounded-full transition hover:bg-ink/10 md:hidden"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="max-h-[calc(100svh-3.75rem)] overflow-y-auto md:hidden"
            aria-label="Mobile"
          >
            <div className="flex flex-col px-4 pb-5 sm:px-6">
              {links.map(([l, h]) => (
                <a
                  key={l}
                  href={h}
                  onClick={() => setOpen(false)}
                  className="border-t border-ink/10 py-3 font-display text-xl font-light sm:text-2xl"
                >
                  {l}
                </a>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}