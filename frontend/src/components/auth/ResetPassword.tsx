"use client";

import React, { useEffect, useState } from "react";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { motion } from "framer-motion";
import Image from "next/image";
import SabzText from "@/components/shared/SabzText";
import Link from "next/link";
import { resetPasswordSchemaType, schema } from "@/utils/restPasswordSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAuthStore } from "@/store/auth.store";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { toast } from "react-toastify";
import { toastOptions } from "@/helpers/toastOptions";
import { useRouter } from "next/navigation";

const ResetPasword = (token : {token :string}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<resetPasswordSchemaType>({
    resolver: zodResolver(schema),
  });
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const { isLoading, resetPassword } = useAuthStore();

  const onSubmit = async (data: resetPasswordSchemaType) => {
    const res = await resetPassword(data.password , token.token)
    if(res.success){
      router.replace('/signin')
      toast.success("پسورد با موفقیت بازیابی شد", toastOptions);
    }else{
      toast.error("خطا در بازیابی پسورد", toastOptions);
    }
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", localStorage.theme);
  }, []);

  return (
    <div className="flex flex-col w-full items-center justify-center font-dana-regular">
      <motion.div
        className="flex items-center justify-center gap-4 mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <Image
          src="/logo/logo.webp"
          alt="SabzLearn Logo"
          width={80}
          height={80}
        />
        <SabzText size="size-30" />
      </motion.div>


      <motion.div
        className="w-full max-w-sm mx-auto p-6 bg-base-300 backdrop-blur-lg shadow-lg rounded-2xl border border-white/20"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h2
          className="text-3xl font-extrabold text-center text-base-content font-dana-bold mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          بازیابی رمز عبور
        </motion.h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <motion.div
        className="relative"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.5 }}
      >
        <input
          type={showPassword ? "text" : "password"}
          {...register("password")}
          className="w-full input border-none pl-10 bg-white/10 text-base-content placeholder-base-content rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-400 transition"
          placeholder="رمز عبور"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute left-3 top-3 text-base-content opacity-75"
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
        {errors.password && (
          <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
        )}
      </motion.div>
          <motion.button
            type="submit"
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 0px 5px rgba(72, 255, 160, 0.8)",
            }}
            whileTap={{ scale: 0.95 }}
            className="btn btn-success w-full mt-5 text-lg shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.4 }}
            disabled={isLoading}
          >
            {isLoading ? (
              <AiOutlineLoading3Quarters className="animate-spin" />
            ) : (
              "بازیابی"
            )}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default ResetPasword;
