"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import MobileNavbar from "./MobileNavbar";
import { menuItems, themeItems, userMenuItems } from "@/data/data";
import UserMenu from "./UserMenu";
import CartMenu from "./CartMenu";
import ThemeMenu from "./ThemeMenu";
import CoursesMenu from "./CourseMenu";
import { motion } from "framer-motion";

const Navbar = () => {
  const [theme, setTheme] = useState("light");
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentOption, setCurrentOption] = useState<null | number>(null);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const isAuthenticated = true

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      localStorage.getItem("theme") as string
    );
    const handleResize = () => setInnerWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  const handleSetCurrentOption = (value: number) => {
    setIsSideMenuOpen(true);
    setCurrentOption(value);
  };

  return (
    <>
      {innerWidth > 800 ? (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="bg-base-300 flex items-center justify-between p-4 shadow-lg"
        >
          {/* Left Section - Logo & Menu */}
          <div className="flex items-center gap-10">
            <motion.div whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 300 }}>
              <Image
                src="/logo/logo.webp"
                width={75}
                height={75}
                alt="sabzlearn logo"
                className="cursor-pointer"
              />
            </motion.div>

            {/* Navigation Links */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="flex"
            >
              <CoursesMenu
                currentOption={currentOption}
                handleSetCurrentOption={handleSetCurrentOption}
                menuItems={menuItems}
                setCurrentOption={setCurrentOption}
              />

              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
                className="relative group"
              >
                <Link href="/" className="btn btn-ghost text-base font-medium text-base-content">
                  همه دوره ها
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
                className="relative group"
              >
                <Link href="/" className="btn btn-ghost text-base font-medium text-base-content">
                  مقالات
                </Link>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Section - User, Cart, Theme */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="flex items-center gap-6"
          >
            <CartMenu cartItems={cartItems} cartOpen={cartOpen} setCartOpen={setCartOpen} />
            <ThemeMenu
              handleThemeChange={handleThemeChange}
              setThemeMenuOpen={setThemeMenuOpen}
              theme={theme}
              themeItems={themeItems}
              themeMenuOpen={themeMenuOpen}
            />
            {isAuthenticated ? (
              <UserMenu
                isAdmin={isAdmin}
                menuOpen={menuOpen}
                setMenuOpen={setMenuOpen}
                userMenuItems={userMenuItems}
              />
            ) : (
              <Link href="/" className="btn btn-primary text-primary-content font-medium">
                ورود | عضویت
              </Link>
            )}
          </motion.div>
        </motion.div>
      ) : (
        <MobileNavbar />
      )}
    </>
  );
};

export default Navbar;