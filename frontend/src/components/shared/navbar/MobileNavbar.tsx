"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CartButton from "./ui/CartButton";
import Logo from "./ui/Logo";
import HamburgerMenu from "./ui/HamburgerMenu";
import MobileDrawer from "./ui/MobileDrawer";
import { mobileMenuItems, themeItems } from "@/data/data";

const MobileNavbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (e: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
      setDrawerOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div>
      {/* Top Navbar */}
      <motion.div
        className="lg:hidden flex items-center justify-between p-4 bg-base-300"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <CartButton />
        <Logo />
        <HamburgerMenu onClick={() => setDrawerOpen(!drawerOpen)} />
      </motion.div>

      {/* Mobile Drawer with Animation */}
      <AnimatePresence>
        {drawerOpen && (
          <MobileDrawer
            drawerOpen={drawerOpen}
            setDrawerOpen={setDrawerOpen}
            menuRef={menuRef}
            menuItems={mobileMenuItems}
            themeItems={themeItems}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileNavbar;