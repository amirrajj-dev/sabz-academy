"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import MobileNavbar from "./MobileNavbar";
import { themeItems } from "@/data/data";
import UserMenu from "./ui/UserMenu";
import CartMenu from "./ui/CartMenu";
import ThemeMenu from "./ui/ThemeMenu";
import CoursesMenu from "./ui/CourseMenu";
import { motion } from "framer-motion";
import { useAuthStore } from "@/store/auth.store";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useCategoriesStore } from "@/store/category.store";
import { usePathname } from "next/navigation";

const Navbar = React.memo(() => {
  const [theme, setTheme] = useState('dark');
  const [innerWidth, setInnerWidth] = useState<number>(
    typeof window !== "undefined" ? window.innerWidth : 1024
  );
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);
  const [currentOption, setCurrentOption] = useState<null | number>(null);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  const { user, isLoading, getMe, isAuthenticated } = useAuthStore();

  const { categories, fetchCategories } = useCategoriesStore();

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, []);  

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    getMe();
    fetchCategories();

    const handleResize = () => setInnerWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [theme, getMe, fetchCategories]);

  const handleThemeChange = useCallback((newTheme: string) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  }, []);

  const handleSetCurrentOption = useCallback((value: number) => {
    setIsSideMenuOpen(true);
    setCurrentOption(value);
  }, []);

  const memoizedCategories = useMemo(() => categories, [categories]);
  const pathname = usePathname()

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
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link href={"/"}>
                <Image
                  src="/logo/logo.webp"
                  width={75}
                  height={75}
                  alt="sabzlearn logo"
                  className="cursor-pointer"
                />
              </Link>
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
                menuItems={memoizedCategories}
                setCurrentOption={setCurrentOption}
              />

              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
                className="relative group"
              >
                <Link
                  href="/courses"
                  className={`btn btn-ghost text-base font-medium ${pathname === '/courses' ? 'text-success' : 'text-base-content'}`}
                >
                  همه دوره ها
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
                className="relative group"
              >
                <Link
                  href="/articles"
                  className={`btn btn-ghost text-base font-medium ${pathname === '/articles' ? 'text-success' : 'text-base-content'}`}
                >
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
            <CartMenu cartOpen={cartOpen} setCartOpen={setCartOpen} position="left" />
            <ThemeMenu
              handleThemeChange={handleThemeChange}
              setThemeMenuOpen={setThemeMenuOpen}
              theme={theme}
              themeItems={themeItems}
              themeMenuOpen={themeMenuOpen}
            />
            {isLoading ? (
              <AiOutlineLoading3Quarters className="animate-spin" />
            ) : isAuthenticated ? (
              <UserMenu
                menuOpen={menuOpen}
                setMenuOpen={setMenuOpen}
                username={user?.username as string}
              />
            ) : (
              <Link
                href="/signin"
                className="btn btn-primary text-primary-content font-medium"
              >
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
});

export default Navbar;
