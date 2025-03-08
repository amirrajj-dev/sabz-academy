"use client";
import React, { useState } from "react";
import { FaPlus, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const AddMenuModal = () => {
  const [menuTitle, setMenuTitle] = useState("");
  const [menuLink, setMenuLink] = useState("");
  const [course, setCourse] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const courses = [
    { id: 1, name: "دوره 1" },
    { id: 2, name: "دوره 2" },
    { id: 3, name: "دوره 3" },
  ];

  const handleAddMenu = () => {
    if (!menuTitle || !menuLink || !course) {
      return;
    }

    setMenuTitle("");
    setMenuLink("");
    setCourse("");
    setIsOpen(false);
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="btn btn-success flex items-center mb-4 gap-2 shadow-md transition-transform"
        onClick={() => setIsOpen(true)}
      >
        <FaPlus className="text-lg" /> افزودن منو جدید
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-base-100 p-6 rounded-xl shadow-lg max-w-md w-full"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="flex justify-between items-center border-b pb-3">
                <h2 className="text-xl font-bold text-base-content">➕ افزودن منو</h2>
                <motion.button
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-base-content hover:text-error transition"
                  onClick={() => setIsOpen(false)}
                >
                  <FaTimes className="text-lg" />
                </motion.button>
              </div>

              <div className="mt-4 space-y-4">
                <div className="flex flex-col gap-2">
                  <label className="label">
                    <span className="font-medium">عنوان منو</span>
                  </label>
                  <input
                    type="text"
                    placeholder="مثلاً درباره ما"
                    className="input w-full border-none"
                    value={menuTitle}
                    onChange={(e) => setMenuTitle(e.target.value)}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="label">
                    <span className="font-medium">لینک منو</span>
                  </label>
                  <input
                    type="text"
                    placeholder="مثلاً /about-us"
                    className="input w-full border-none"
                    value={menuLink}
                    onChange={(e) => setMenuLink(e.target.value)}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="label">
                    <span className="font-medium">این منو برای کدام دوره است؟</span>
                  </label>
                  <select
                    className="select w-full"
                    value={course}
                    onChange={(e) => setCourse(e.target.value)}
                  >
                    <option value="">انتخاب دوره</option>
                    {courses.map((c) => (
                      <option key={c.id} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn btn-outline btn-error"
                  onClick={() => setIsOpen(false)}
                >
                  انصراف
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn btn-success"
                  onClick={handleAddMenu}
                >
                  ذخیره منو
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AddMenuModal;