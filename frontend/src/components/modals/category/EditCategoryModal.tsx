"use client";
import React, { useState } from "react";
import { FaEdit, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useCategoriesStore } from "@/store/category.store";
import { toast } from "react-toastify";
import { toastOptions } from "@/helpers/toastOptions";

const EditCategoryModal = ({
  category
}: {
  category: { name: string; title: string , id : string };
}) => {
  const [title, setTitle] = useState(category.name);
  const [link, setLink] = useState(category.title);
  const [isOpen, setIsOpen] = useState(false);
  const {updateCategory , fetchCategories } = useCategoriesStore()
  const handleUpdate = async () => {
    if (!title.trim()) {
      return;
    }
    setIsOpen(false);
    const res = await updateCategory({id : category.id , title : link , name : title})
    if (res.success){
      await fetchCategories()
      toast.success('دسته بندی با موفقیت ویرایش شد' , toastOptions)
    }else{
      toast.error('خطا در ویرایش دسته بندی' , toastOptions)
    }
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="btn btn-warning btn-sm hover:scale-110 transition-transform"
        onClick={() => setIsOpen(true)}
      >
        <FaEdit />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 p-4"
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
                <h2 className="text-xl font-bold text-base-content">
                  ✏️ ویرایش دسته‌بندی
                </h2>
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
                <div className="flex flex-col gap-3">
                  <label className="label">
                    <span className="font-medium">عنوان دسته‌بندی</span>
                  </label>
                  <input
                    type="text"
                    placeholder="مثلاً پایتون"
                    className="input border-none w-full"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
              </div>

              <div className="mt-4 space-y-4">
                <div className="flex flex-col gap-3">
                  <label className="label">
                    <span className="font-medium">لینک دسته‌بندی</span>
                  </label>
                  <input
                    type="text"
                    placeholder="مثلاً python"
                    className="input border-none w-full"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                  />
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
                  className="btn btn-warning"
                  onClick={handleUpdate}
                >
                  ذخیره تغییرات
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default EditCategoryModal;
