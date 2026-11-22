import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { products } from "./data/products";
import Navbar from "./components/Navbar";
import FeaturedProducts from "./components/FeaturedProducts";
import ProductDetails from "./components/ProductDetails";
import ShoppingCart from "./components/ShoppingCart";
import Collections from "./components/Collections";
import { BrandStory, Newsletter, Footer } from "./components/Sections";

import Hero from "./components/Hero";
import ProductShowcase from "./components/ProductShowcase";

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const s = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return (
    <motion.div
      style={{ scaleX: s }}
      className="fixed inset-x-0 top-0 z-60 h-2px origin-left bg-cobalt"
    />
  );
}

const goShop = () =>
  document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" });

export default function App() {
  const [ready, setReady] = useState(false);
  const [cart, setCart] = useState({});
  const [wishlist, setWishlist] = useState([]);
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("All");
  const [detail, setDetail] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const inputRef = useRef(null);
  const [theme, setTheme] = useState(
    () => document.documentElement.dataset.theme || "light",
  );
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem("nova-theme", theme);
    } catch (e) {}
  }, [theme]);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 1200);
    return () => clearTimeout(t);
  }, []);
  useEffect(() => {
    document.body.style.overflow = cartOpen || detail ? "hidden" : "";
  }, [cartOpen, detail]);

  const add = (id) => {
    setCart((c) => ({ ...c, [id]: (c[id] || 0) + 1 }));
    setCartOpen(true);
  };
  const setQty = (id, d) =>
    setCart((c) => {
      const q = (c[id] || 0) + d;
      const n = { ...c };
      if (q <= 0) delete n[id];
      else n[id] = q;
      return n;
    });
  const remove = (id) =>
    setCart((c) => {
      const n = { ...c };
      delete n[id];
      return n;
    });
  const wish = (id) =>
    setWishlist((w) =>
      w.includes(id) ? w.filter((x) => x !== id) : [...w, id],
    );

  const items = useMemo(
    () =>
      products
        .filter((p) => cart[p.id])
        .map((p) => ({ ...p, qty: cart[p.id] })),
    [cart],
  );
  const count = items.reduce((s, i) => s + i.qty, 0);
  const list = useMemo(
    () =>
      products.filter(
        (p) =>
          (cat === "All" ||
            (cat === "Wishlist"
              ? wishlist.includes(p.id)
              : p.category === cat)) &&
          `${p.name} ${p.short} ${p.category}`
            .toLowerCase()
            .includes(query.toLowerCase()),
      ),
    [cat, query, wishlist],
  );

  const pickCategory = (c) => {
    setCat(c);
    setQuery("");
    goShop();
  };

  return (
    <>
      <ScrollProgress />
      <AnimatePresence>
        {!ready && (
          <motion.div
            key="loader"
            className="fixed inset-0 z-100 grid place-items-center bg-ink text-fog"
            exit={{ y: "-100%" }}
            transition={{ duration: 0.8, ease: [0.7, 0, 0.2, 1] }}
          >
            <motion.span
              initial={{ opacity: 0, letterSpacing: "0.3em" }}
              animate={{ opacity: 1, letterSpacing: "0.02em" }}
              transition={{ duration: 1 }}
              className="font-display text-6xl font-light"
            >
              NØVA
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>

      <Navbar
        theme={theme}
        onTheme={() => setTheme(theme === "dark" ? "light" : "dark")}
        cartCount={count}
        wishCount={wishlist.length}
        onCart={() => setCartOpen(true)}
        onWish={() => pickCategory("Wishlist")}
        onSearch={() => {
          goShop();
          setTimeout(() => inputRef.current?.focus(), 600);
        }}
      />

      <main>
        <Hero />
        <FeaturedProducts
          list={list}
          query={query}
          setQuery={setQuery}
          cat={cat}
          setCat={setCat}
          wishlist={wishlist}
          onWish={wish}
          onAdd={add}
          onOpen={setDetail}
          inputRef={inputRef}
        />
        <ProductShowcase product={products[0]} onAdd={add} />
        <Collections onPick={pickCategory} />
        <BrandStory />
        <Newsletter />
      </main>
      <Footer />

      <ProductDetails
        p={detail}
        onClose={() => setDetail(null)}
        onAdd={add}
        wished={detail ? wishlist.includes(detail.id) : false}
        onWish={wish}
      />
      <ShoppingCart
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={items}
        onQty={setQty}
        onRemove={remove}
      />
    </>
  );
}
