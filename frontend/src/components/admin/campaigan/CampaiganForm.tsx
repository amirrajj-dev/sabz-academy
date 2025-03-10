'use client'
import React, { useState } from "react";
import { motion } from "framer-motion";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useDiscountsStore } from "@/store/discount.store";
import { toast } from "react-toastify";
import { toastOptions } from "@/helpers/toastOptions";
import { FaSpinner } from "react-icons/fa";

interface Category {
  id: number;
  name: string;
}

const categories: Category[] = [
  { id: 1, name: "تکنولوژی" },
  { id: 2, name: "ورزش" },
  { id: 3, name: "سلامت" },
];

const CampaigansForm = () => {
  const [title, setTitle] = useState<string>("");
  const {createCampaigan , fetchDiscounts , isLoading} = useDiscountsStore()
  const handleCreateCampaigan = async ()=>{
    const response = await createCampaigan(title)
    if (response.success){
      await fetchDiscounts()
      toast.success("کمپین با موفقیت ایجاد شد" , toastOptions)
    }else{
      toast.error("خطایی رخ داد" , toastOptions)
    }
  }
  return (
    <div className="bg-base-100 p-6 rounded-xl shadow-lg mb-6">
      <div className="space-y-4">
        <div className="flex flex-col gap-2">
          <label className="label">
            <span className="font-medium">میزان درصد تخفیف را وارد نمایید</span>
          </label>
          <input
            type="text"
            placeholder="میزان تخفیف"
            className="input w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn btn-primary mt-4"
          onClick={handleCreateCampaigan}
        >
         {isLoading ? <FaSpinner className="animate-spin transition-all duration-200" /> :  " ایجاد کمپین"}
        </motion.button>
      </div>
    </div>
  );
};

export default CampaigansForm;