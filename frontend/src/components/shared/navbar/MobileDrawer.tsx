import { motion } from "framer-motion";
import UserSection from "./UserSection";
import MenuItem from "./MenuItem";
import ThemeSwitcher from "./themeSwitcher";
import { useEffect, useState } from "react";

const MobileDrawer = ({
  drawerOpen,
  setDrawerOpen,
  menuRef,
  menuItems,
  themeItems,
}: {
  drawerOpen: boolean;
  setDrawerOpen: (value: boolean) => void;
  menuRef: React.RefObject<HTMLDivElement | null>;
  menuItems: any[];
  themeItems: any[];
}) => {
    const [themeDropDownToggle, setThemeDropdownToggle] = useState(false);
    const [theme , setTheme] = useState('light')
  
    const toggleDrawer = () => {
      setDrawerOpen(!drawerOpen);
    };
  
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setDrawerOpen(false);
      }
    };
  
    useEffect(() => {
      document.addEventListener("mousedown", handleClickOutside);
      document.documentElement.setAttribute(
          "data-theme",
          localStorage.getItem("theme") as string
        );
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);
  
    const handleThemeToggle = () => {
      setThemeDropdownToggle(!themeDropDownToggle);
    };
  
    const handleThemeChange = (newTheme : string) => {
      setTheme(newTheme);
      localStorage.setItem("theme", newTheme);
      document.documentElement.setAttribute("data-theme", newTheme);
    };

  return (
    <div className={`${drawerOpen ? "absolute min-h-screen" : ""} z-50 inset-0 bg-black/50`}>
      <motion.div
        ref={menuRef}
        className="fixed top-0 right-0 w-68 sm:w-80 h-full bg-base-100 shadow-xl rounded-tl-lg overflow-y-auto"
        initial={{ x: "100%" }}
        animate={{ x: drawerOpen ? 0 : "100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <UserSection />
        <ul className="menu p-4 space-y-3 w-full">
          {menuItems.map((item, index) => (
            <MenuItem key={index} item={item} />
          ))}
        </ul>
        <div className="divider divide-base-300 p-2 pt-0"></div>
          <ThemeSwitcher themeItems={themeItems} handleThemeToggle={handleThemeToggle} handleThemeChange={handleThemeChange} themeDropDownOpen={themeDropDownToggle} />
      </motion.div>
    </div>
  );
};

export default MobileDrawer;