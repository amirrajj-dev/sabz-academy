'use client'
import React, { useState } from "react";
import { FaPlus, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const AddCategoryModal = () => {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleAddCategory = () => {
    if (!title || !link) {
      setError("لطفاً تمام فیلدها را پر کنید.");
      return;
    }
    console.log("New Category:", { title, link });
    setTitle("");
    setLink("");
    setError("");
    setIsOpen(false);
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="btn btn-success flex items-center gap-2 shadow-md transition-transform"
        onClick={() => setIsOpen(true)}
      >
        <FaPlus className="text-lg" /> اضافه کردن دسته‌بندی جدید
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
                <h2 className="text-xl font-bold text-base-content">➕ اضافه کردن دسته‌بندی</h2>
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
                    <span className="font-medium">عنوان دسته‌بندی جدید</span>
                  </label>
                  <input
                    type="text"
                    placeholder="مثلاً پایتون"
                    className="input w-full border-none"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="label">
                    <span className="font-medium">لینک دسته‌بندی جدید</span>
                  </label>
                  <input
                    type="text"
                    placeholder="مثلاً python"
                    className="input border-none w-full"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                  />
                </div>


                {error && <p className="text-red-500 text-sm">{error}</p>}
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
                  onClick={handleAddCategory}
                >
                  ذخیره دسته‌بندی
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AddCategoryModal;