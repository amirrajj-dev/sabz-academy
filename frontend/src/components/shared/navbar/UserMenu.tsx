import Link from "next/link";
import { FaUser } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const UserMenu = ({
  menuOpen,
  setMenuOpen,
  userMenuItems,
  isAdmin,
}: {
  menuOpen: boolean;
  setMenuOpen: (value: boolean) => void;
  userMenuItems: any[];
  isAdmin: boolean;
}) => {
  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setMenuOpen(!menuOpen)}
        className="btn btn-ghost text-white hover:text-primary transition-all duration-300"
      >
        <FaUser className="text-xl text-base-content" />
      </motion.button>

      <AnimatePresence>
        {menuOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute left-0 mt-2 w-52 bg-base-300 shadow-xl rounded-xl z-10 menu menu-sm border border-gray-700"
          >
            {userMenuItems.map((item, index) => {
              if (item.showFor === "admin" && !isAdmin) return null;
              if (item.label === "divider") {
                return (
                  <motion.li
                    key={index}
                    className="border-t border-gray-600 my-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                );
              }
              return (
                <motion.li
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    href="/"
                    className="flex items-center gap-3 px-4 py-3 text-base-content hover:bg-primary hover:text-primary-content rounded-lg transition duration-300 ease-in-out"
                  >
                    {item.icon && (
                      <span className="text-lg">{item.icon}</span>
                    )}
                    <span className="font-medium">{item.label}</span>
                  </Link>
                </motion.li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserMenu;