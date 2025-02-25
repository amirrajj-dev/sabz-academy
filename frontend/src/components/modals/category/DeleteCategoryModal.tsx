'use client'
import React, { useState } from "react";
import { FaTrash, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const DeleteCategoryModal = ({
  category,
  onDelete,
}: {
  category: { id: number; title: string };
  onDelete: (id: number) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = () => {
    onDelete(category.id);
    setIsOpen(false);
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="btn btn-error btn-sm hover:scale-110 transition-transform"
        onClick={() => setIsOpen(true)}
      >
        <FaTrash />
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
                <h2 className="text-xl font-bold text-base-content">🗑️ حذف دسته‌بندی</h2>
                <motion.button
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-gray-500 hover:text-gray-800 transition"
                  onClick={() => setIsOpen(false)}
                >
                  <FaTimes className="text-lg" />
                </motion.button>
              </div>
              <div className="mt-4 space-y-4 flex">
                <p className="text-lg text-base-content">
                  آیا از حذف این دسته‌بندی اطمینان دارید؟
                </p>
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
                  className="btn btn-error"
                  onClick={handleDelete}
                >
                  حذف
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default DeleteCategoryModal;