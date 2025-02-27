'use client';
import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

interface Session {
  title: string;
  description: string;
}

const courseSessions: Session[] = [
  {
    title: 'جلسه اول: مقدمه‌ای بر ESLint',
    description: 'در این جلسه، با ابزار ESLint آشنا می‌شوید و یاد می‌گیرید چگونه آن را در پروژه‌های جاوااسکریپت خود پیاده‌سازی کنید.',
  },
  {
    title: 'جلسه دوم: پیکربندی اولیه ESLint',
    description: 'در این جلسه، نحوه پیکربندی ESLint برای پروژه‌های مختلف را بررسی می‌کنیم و به شما نحوه تنظیم و سفارشی‌سازی قوانین را آموزش می‌دهیم.',
  },
  {
    title: 'جلسه سوم: استفاده از قوانین پیش‌فرض ESLint',
    description: 'در این جلسه، با قوانین پیش‌فرض ESLint آشنا می‌شوید و نحوه استفاده و تنظیم آن‌ها در پروژه‌های خود را یاد خواهید گرفت.',
  },
  {
    title: 'جلسه چهارم: کار با افزونه‌ها و پلاگین‌ها',
    description: 'در این جلسه، نحوه استفاده از افزونه‌ها و پلاگین‌های ESLint برای بهبود کیفیت کد و تسهیل فرآیند linting را بررسی می‌کنیم.',
  },
];

const CourseSessions = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="mt-10 flex flex-col md:flex-row gap-6">
      <div className="w-full md:w-2/3 space-y-4 p-6 bg-base-300 shadow-lg rounded-2xl">
        {courseSessions.map((session, index) => (
          <div key={index} className="border bg-base-100 border-gray-300 dark:border-gray-700 rounded-xl overflow-hidden">
            <button
              className="w-full flex justify-between items-center px-5 py-4 text-lg font-semibold bg-base-200 transition-all"
              onClick={() => toggleAccordion(index)}
            >
              <span className='text-sm sm:text-base'>{session.title}</span>
              {activeIndex === index ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </button>
            <AnimatePresence>
              {activeIndex === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  transition={{duration : .1}}
                  animate={{ opacity: 1, height: 'auto' , dur :.1 }}
                  exit={{ opacity: 0, height: 0 }}
                  className="px-5 py-4 bg-base-300"
                >
                  <Link href={''} className="flex items-center gap-3 text-sm">
                    <span className="badge badge-primary">{index + 1}</span>
                    <p>{session.description}</p>
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
      <div className="hidden md:block md:w-1/3"></div>
    </div>
  );
};

export default CourseSessions;