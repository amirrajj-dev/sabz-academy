import {
  FaUser,
  FaWallet,
  FaTachometerAlt,
  FaBook,
  FaTicketAlt,
  FaCog,
  FaSignOutAlt,
  FaUserShield,
  FaHome,
  FaUsers,
  FaComment,
  FaComments,
  FaFolderOpen,
} from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
import { FaClock, FaChartLine, FaCertificate, FaClipboardList } from "react-icons/fa";
import { HiOutlineCodeBracket } from "react-icons/hi2";
import { LuShieldCheck, LuPuzzle } from "react-icons/lu";
import { AiOutlinePython } from "react-icons/ai";
import { LuClipboardCheck } from "react-icons/lu";
import { IoBarChartOutline, IoMenu } from "react-icons/io5";
import { IoBookOutline } from "react-icons/io5";
import { LiaComments } from "react-icons/lia";
import { count } from "console";
import { MdArticle, MdCampaign, MdCategory, MdDiscount, MdMessage } from "react-icons/md";
import { title } from "process";
import { RiGraduationCapFill } from "react-icons/ri";
import { IoMdFolder } from "react-icons/io";

export const userMenuItems = [
  { label: "پیشخوان", icon: <FaTachometerAlt />, showFor: "all" , href : "/user-pannel" },
  { label: "دوره های من", icon: <FaBook />, showFor: "all" , href : "/user-pannel/courses" },
  { label: "تیکت ها", icon: <FaTicketAlt />, showFor: "all" , href : "/user-pannel/tickets"},
  { label: "جزئیات حساب", icon: <FaCog />, showFor: "all" , href : "/user-pannel/edit-account" },
  { label: "divider", showFor: "all"  , href : ""},
  { label: "پنل ادمین", icon: <FaUserShield />, showFor: "admin" , href : "/admin-pannel" },
  { label: "پنل کاربر", icon: <FaUserShield />, showFor: "admin" , href : "/user-pannel" },
  { label: "خروج", icon: <FaSignOutAlt />, showFor: "all" , href : "/" },
];

export const themeItems = [
  { label: "روشن", value: "light" },
  { label: "تاریک", value: "dark" },
  { label: "قهوه ای", value: "coffee" },
  { label: "جنگلی", value: "abyss" },
  { label: "فنجون قهوه", value: "cupcake" },
  { label: "شب", value: "night" },
  { label: "هالووین", value: "halloween" },
  { label: "آبی", value: "aqua" },
  { label: "رترو", value: "retro" },
  { label: "سینتویو", value: "synthwave" },
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


export const adminPannelCardInfo = [
  {id : 1 , title : "خانه"  , count : "صفحه اصلی" , icon : <FaHome/> , bgColor : 'bg-indigo-500' , link : "/"},
  {id : 2 , title : "دسته بندی ها"  , count : "4" , icon : <MdCategory/> , bgColor : 'bg-emerald-500' , link : "categories"},
  {id : 3 , title : "کاربران" , count : "20" , icon : <FaUsers/> , bgColor : 'bg-zinc-500' , link : "users"},
  {id : 4 , title : "پیغام ها" , count : "10" , icon : <MdMessage/> , bgColor : 'bg-rose-500' , link : "messages"},
  {id : 5 , title : "مقاله ها"  , count : "5" , icon : <MdArticle/> , bgColor : 'bg-cyan-500' , link : "articles"},
  {id : 6 , title : "جلسات" , count : "20" , icon : <RiGraduationCapFill/> , bgColor : 'bg-amber-500' , link : "sessions"},,
  {id : 7 , title : "کامنت ها" , count : "20" , icon : <FaComments/> , bgColor : 'bg-blue-500' , link : "comments"},
  {id : 8 , title : "دوره ها" , count : "3" , icon : <IoMdFolder/> , bgColor : 'bg-slate-500' , link : "courses"},
  {id : 9 , title : "تخفیف ها" , count : "6" , icon : <MdDiscount/> , bgColor : 'bg-warning' , link : "discounts"},
  {id : 10 , title : "تیکت ها" , count : "4" , icon : <FaTicketAlt/> , bgColor : 'bg-violet-500' , link : "tickets"},
  {id : 11 , title : "برگزاری کمپین" , count : "7" , icon : <MdCampaign/> , bgColor : 'bg-lime-500' , link : "campaigan"}
]