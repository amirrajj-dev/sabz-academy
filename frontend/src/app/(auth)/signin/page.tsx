"use client";

import React, { useEffect, useState } from "react";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { motion } from "framer-motion";
import Image from "next/image";
import SabzText from "@/components/shared/SabzText";
import Link from "next/link";

const Signin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
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
        <Image src="/logo/logo.webp" alt="SabzLearn Logo" width={80} height={80} />
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
          ورود
        </motion.h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <FaEnvelope className="absolute left-3 top-3 text-base-content opacity-75" />
            <input
              type="email"
              name="email"
              className="w-full input border-none pl-10 bg-white/10 text-base-content placeholder-base-content rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-400 transition"
              placeholder="ایمیل"
              required
            />
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              className="w-full input border-none pl-10 bg-white/10 text-base-content placeholder-base-content rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-400 transition"
              placeholder="رمز عبور"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute left-3 top-3 text-base-content opacity-75"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </motion.div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.05, boxShadow: "0px 0px 5px rgba(72, 255, 160, 0.8)" }}
            whileTap={{ scale: 0.95 }}
            className="btn btn-success w-full mt-5 text-lg shadow-lg transition"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.4 }}
          >
            ورود
          </motion.button>
        </form>

        <motion.div
          className="text-sm text-center mt-4 text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.5 }}
        >
          <Link href="/forgot-password" className="text-green-400 font-bold hover:underline">
            فراموشی رمز عبور؟
          </Link>
          <p className="mt-2 text-base-content">
            حساب کاربری ندارید؟{" "}
            <Link href="/signup" className="text-green-400 font-bold hover:underline">
              ثبت نام
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Signin;