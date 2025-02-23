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
 export  const userMenuItems = [
    { label: "پروفایل", icon: <FaUser/>, showFor: "all" },
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
    { label: "ارتقای مهارت ها", subItems: ["Courses", "Certifications", "Workshops"] },
    { label: "مقالات", subItems: ["Web Development", "Security", "Data Science"] },
  ];