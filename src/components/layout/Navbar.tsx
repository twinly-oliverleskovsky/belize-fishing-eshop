"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Menu, X } from "lucide-react";
import Image from "next/image";
import { useCartStore } from "@/store/cartStore";
import { useUIStore } from "@/store/uiStore";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/blog", label: "Blog" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const totalItems = useCartStore((s) => s.totalItems());
  const openCartDrawer = useUIStore((s) => s.openCartDrawer);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-deep-ocean/95 backdrop-blur-md shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <Image
                src="/logo.svg"
                alt="Belize Fishing Logo"
                width={44}
                height={22}
                className="brightness-0 invert transition-transform duration-300 group-hover:scale-110"
              />
              <span className="font-display text-xl font-bold text-white tracking-tight">
                Belize Fishing
              </span>
            </Link>

            {/* Desktop Nav + Cart */}
            <div className="flex items-center gap-8">
              <div className="hidden md:flex items-center gap-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-white/80 hover:text-sun-gold transition-colors duration-300 text-sm font-medium uppercase tracking-widest"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              <button
                data-cart-icon
                onClick={openCartDrawer}
                className="relative text-white hover:text-sun-gold transition-colors duration-300 cursor-pointer"
                aria-label="Open cart"
              >
                <ShoppingBag size={22} strokeWidth={1.5} />
                <AnimatePresence>
                  {totalItems > 0 && (
                    <motion.span
                      key={totalItems}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      transition={{ type: "spring", stiffness: 500, damping: 20 }}
                      className="absolute -top-2 -right-2 bg-coral-accent text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold"
                    >
                      {totalItems}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
              <button
                onClick={() => setMobileOpen(true)}
                className="md:hidden text-white"
                aria-label="Open menu"
              >
                <Menu size={24} strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-deep-ocean flex flex-col items-center justify-center"
          >
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-6 right-6 text-white"
              aria-label="Close menu"
            >
              <X size={28} strokeWidth={1.5} />
            </button>
            <nav className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="text-white text-3xl font-display font-bold hover:text-sun-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    openCartDrawer();
                  }}
                  className="text-sun-gold text-xl font-body font-semibold flex items-center gap-2 cursor-pointer"
                >
                  <ShoppingBag size={20} strokeWidth={1.5} />
                  Cart ({totalItems})
                </button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
