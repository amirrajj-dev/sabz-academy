import {
  FaUser,
  FaWallet,
  FaTachometerAlt,
  FaBook,
  FaTicketAlt,
  FaCog,
  FaSignOutAlt,
  FaUserShield,
} from "react-icons/fa";
import { HiOutlineCodeBracket } from "react-icons/hi2";
import { LuShieldCheck, LuPuzzle } from "react-icons/lu";
import { AiOutlinePython } from "react-icons/ai";
import { LuClipboardCheck } from "react-icons/lu";
import { IoBarChartOutline } from "react-icons/io5";
import { IoBookOutline } from "react-icons/io5";
import { LiaComments } from "react-icons/lia";

export const userMenuItems = [
  { label: "پروفایل", icon: <FaUser />, showFor: "all" },
  { label: "موجودی", icon: <FaWallet />, showFor: "all" },
  { label: "پیشخوان", icon: <FaTachometerAlt />, showFor: "all" },
  { label: "دوره های من", icon: <FaBook />, showFor: "all" },
  { label: "تیکت ها", icon: <FaTicketAlt />, showFor: "all" },
  { label: "جزئیات حساب", icon: <FaCog />, showFor: "all" },
  { label: "divider", showFor: "all" },
  { label: "ادمین پنل", icon: <FaUserShield />, showFor: "admin" },
  { label: "خروج", icon: <FaSignOutAlt />, showFor: "all" },
];

export const themeItems = [
  { label: "روشن", value: "light" },
  { label: "تاریک", value: "dark" },
  { label: "قهوه ای", value: "coffee" },
  { label: "جنگلی", value: "abyss" },
  { label: "فنجون قهوه", value: "cupcake" },
  { label: "شب", value: "night" },
  { label: "کم نور", value: "dim" },
];

export const menuItems = [
  {
    label: "دوره های آموزشی",
    subItems: [
      {
        label: "فرانت اند",
        options: ["HTML", "CSS", "جاوا اسکریپت", "ری اکت"],
      },
      {
        label: "امنیت",
        options: ["مبانی امنیت", "هک اخلاقی", "تست نفوذ"],
      },
      {
        label: "پایتون",
        options: ["جنگو", "فلسک", "علم داده", "یادگیری ماشین"],
      },
      {
        label: "پی اچ پی",
        options: ["لاراول", "سیمفونی", "کدایگنایتر"],
      },
      {
        label: "ارتقای مهارت ها",
        options: ["مهارت‌های نرم", "حل مسئله", "کار تیمی"],
      },
    ],
  },
];

export const mobileMenuItems = [
  { label: "فرانت اند", subItems: ["HTML", "CSS", "JavaScript"] },
  { label: "امنیت", subItems: ["XSS", "SQL Injection", "CSRF"] },
  { label: "پایتون", subItems: ["Django", "Flask", "Pandas"] },
  { label: "پی اچ پی", subItems: ["Laravel", "Symfony", "CodeIgniter"] },
  {
    label: "ارتقای مهارت ها",
    subItems: ["Courses", "Certifications", "Workshops"],
  },
  {
    label: "مقالات",
    subItems: ["Web Development", "Security", "Data Science"],
  },
];

export const courses = [
  {
    name: "آموزش برنامه نویسی پایتون",
    description:
      "در این دوره، شما با اصول پایه و پیشرفته زبان برنامه نویسی پایتون آشنا خواهید شد.",
    cover:
      "https://sabzlearn.ir/wp-content/uploads/2023/12/ezgif.com-jpg-to-webp-converted-19-1-768x432.webp",
    price: 500000,
    creator: "آقای محمدی",
    discount: 0,
    score: 4.8,
    userCounts: 1500,
  },
  {
    name: "دوره جامع طراحی وب",
    description:
      "این دوره شامل آموزش HTML، CSS و JavaScript است تا بتوانید وب‌سایت‌های حرفه‌ای بسازید.",
    cover:
      "https://sabzlearn.ir/wp-content/uploads/2024/10/php-ex-768x432.webp",
    price: 600000,
    creator: "خانم رضایی",
    discount: 15,
    score: 4.7,
    userCounts: 2300,
  },
  {
    name: "دوره تخصصی یادگیری ماشین",
    description:
      "این دوره برای علاقه‌مندان به یادگیری ماشین طراحی شده است و تکنیک‌های پیشرفته را آموزش می‌دهد.",
    cover:
      "https://sabzlearn.ir/wp-content/uploads/2024/04/IMAGE-1403-02-20-17_59_09_11zon-768x432.webp",
    price: 800000,
    creator: "آقای احمدی",
    discount: 10,
    score: 4.9,
    userCounts: 1000,
  },
  {
    name: "آموزش گرافیک رایانه‌ای",
    description:
      "در این دوره، شما یاد می‌گیرید چگونه طراحی‌های گرافیکی زیبا و حرفه‌ای بسازید.",
    cover:
      "https://sabzlearn.ir/wp-content/uploads/2023/12/ezgif.com-jpg-to-webp-converted-30-1-768x432.webp",
    price: 400000,
    creator: "خانم شریفی",
    discount: 25,
    score: 4.5,
    userCounts: 1800,
  },
  {
    name: "دوره تخصصی یادگیری ماشین",
    description:
      "این دوره برای علاقه‌مندان به یادگیری ماشین طراحی شده است و تکنیک‌های پیشرفته را آموزش می‌دهد.",
    cover:
      "https://sabzlearn.ir/wp-content/uploads/2024/04/IMAGE-1403-02-20-17_59_09_11zon-768x432.webp",
    price: 800000,
    creator: "آقای احمدی",
    discount: 10,
    score: 4.9,
    userCounts: 1000,
  },
  {
    name: "آموزش گرافیک رایانه‌ای",
    description:
      "در این دوره، شما یاد می‌گیرید چگونه طراحی‌های گرافیکی زیبا و حرفه‌ای بسازید.",
    cover:
      "https://sabzlearn.ir/wp-content/uploads/2023/12/ezgif.com-jpg-to-webp-converted-30-1-768x432.webp",
    price: 400000,
    creator: "خانم شریفی",
    discount: 25,
    score: 4.5,
    userCounts: 1800,
  },
  {
    name: "دوره تخصصی یادگیری ماشین",
    description:
      "این دوره برای علاقه‌مندان به یادگیری ماشین طراحی شده است و تکنیک‌های پیشرفته را آموزش می‌دهد.",
    cover:
      "https://sabzlearn.ir/wp-content/uploads/2024/04/IMAGE-1403-02-20-17_59_09_11zon-768x432.webp",
    price: 800000,
    creator: "آقای احمدی",
    discount: 10,
    score: 4.9,
    userCounts: 1000,
  },
  {
    name: "آموزش گرافیک رایانه‌ای",
    description:
      "در این دوره، شما یاد می‌گیرید چگونه طراحی‌های گرافیکی زیبا و حرفه‌ای بسازید.",
    cover:
      "https://sabzlearn.ir/wp-content/uploads/2023/12/ezgif.com-jpg-to-webp-converted-30-1-768x432.webp",
    price: 400000,
    creator: "خانم شریفی",
    discount: 25,
    score: 4.5,
    userCounts: 1800,
  },
];

export const courseCategories = [
  {
    id: 1,
    title: "فرانت اند",
    icon: <HiOutlineCodeBracket />,
    count: 10,
    from: "from-yellow-400",
    to: "to-yellow-600",
  },
  {
    id: 2,
    title: "امنیت",
    icon: <LuShieldCheck />,
    count: 5,
    from: "from-green-500",
    to: "to-green-700",
  },
  {
    id: 3,
    title: "پایتون",
    icon: <AiOutlinePython />,
    count: 20,
    from: "from-blue-500",
    to: "to-blue-700",
  },
  {
    id: 4,
    title: "مهارت های نرم",
    icon: <LuPuzzle />,
    count: 6,
    from: "from-pink-500",
    to: "to-purple-700",
  },
];

export const services = [
  {
    id: 1,
    title: "تضمین کاملترین محتوا",
    desc: "بزار خیالت راحت کنم توی دوره هامون به ریز ترین موارد پرداختیم بعداز دیدن این دوره نیاز به هیچ آموزش دیگه ای نداری.",
    icon: <IoBookOutline />,
    color: "bg-primary",
  },
  {
    id: 2,
    title: "پشتیبانی دائمی",
    desc: "هرجا سوالی داشتی به مشکل خوردی بچه های تیم آمادن که مشکلت رو حل کنن تلاشمون اینه بدون نگرانی دوره رو کامل کنی.",
    icon: <LiaComments />,
    color: "bg-warning",
  },
  {
    id: 3,
    title: "پروژه محور در راستای بازار کار",
    desc: "کل تمرکز ما رو این هستش بعداز تموم شدن دوره شخص بتونه با اعتماد به نفس کامل پروژه بزنه واقدام کنه برای کسب درآمد.",
    icon: <IoBarChartOutline />,
    color: "bg-success",
  },
  {
    id: 4,
    title: "سراغ حرفه ای ها رفتیم",
    desc: "به جرعت میتونم بگم سخت گیرترین شرایط جذب مدرس داریم چون برامون مهمه محتوا خیلی ساده و روان بیان بشه که توی یادگیری به مشکل نخورید.",
    icon: <LuClipboardCheck />,
    color: "bg-error",
  },
];

export const articles = [
  {
    id : 1 ,
    title: "آزمون آیلتس چیست و چه کاربردی دارد؟",
    description:
      "آیلتس (IELTS) که مخفف “International English Language Testing System” است، یکی از معتبرترین آزمون‌های بین‌المللی برای",
    cover: "https://sabzlearn.ir/wp-content/uploads/2025/02/en-768x403.jpg",
    creator: "شهرام خندقی",
    createdAt: "05/12/1403",
  },
  {
    id : 2 ,
    title: "آزمون آیلتس چیست و چه کاربردی دارد؟",
    description:
      "آیلتس (IELTS) که مخفف “International English Language Testing System” است، یکی از معتبرترین آزمون‌های بین‌المللی برای",
    cover: "https://sabzlearn.ir/wp-content/uploads/2025/02/en-768x403.jpg",
    creator: "شهرام خندقی",
    createdAt: "05/12/1403",
  },
  {
    id : 3 ,
    title: "آزمون آیلتس چیست و چه کاربردی دارد؟",
    description:
      "آیلتس (IELTS) که مخفف “International English Language Testing System” است، یکی از معتبرترین آزمون‌های بین‌المللی برای",
    cover: "https://sabzlearn.ir/wp-content/uploads/2025/02/en-768x403.jpg",
    creator: "شهرام خندقی",
    createdAt: "05/12/1403",
  },
  {
    id : 4 ,
    title: "آزمون آیلتس چیست و چه کاربردی دارد؟",
    description:
      "آیلتس (IELTS) که مخفف “International English Language Testing System” است، یکی از معتبرترین آزمون‌های بین‌المللی برای",
    cover: "https://sabzlearn.ir/wp-content/uploads/2025/02/en-768x403.jpg",
    creator: "شهرام خندقی",
    createdAt: "05/12/1403",
  },
];
