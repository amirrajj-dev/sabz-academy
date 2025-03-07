import React from "react";
import UserPannelCard from "../shared/UserPannelCard";
import { FaMoneyBillAlt, FaBook, FaTicketAlt, FaWallet } from "react-icons/fa";

const MyAccountHeader = () => {
  const cardsData = [
    {
      title: "مجموع پرداخت ها",
      desc: "تومان",
      length: 0,
      bgColor: "bg-blue-500",
      icon: <FaMoneyBillAlt />, // Icon for payments
    },
    {
      title: "دوره های من",
      desc: "دوره",
      length: 0,
      bgColor: "bg-purple-500",
      icon: <FaBook />, // Icon for courses
    },
    {
      title: "مجموع تیکت ها",
      desc: "تیکت",
      length: 0,
      bgColor: "bg-green-500",
      icon: <FaTicketAlt />, // Icon for tickets
    },
    {
      title: "موجودی حساب",
      desc: "تومان",
      length: 0,
      bgColor: "bg-orange-500",
      icon: <FaWallet />, // Icon for wallet
    },
  ];
  return (

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
        {cardsData.map((card, index) => (
          <UserPannelCard
            key={index}
            title={card.title}
            desc={card.desc}
            length={card.length}
            bgColor={card.bgColor}
            icon={card.icon} 
          />
        ))}
      </div>
  );
};

export default MyAccountHeader;
