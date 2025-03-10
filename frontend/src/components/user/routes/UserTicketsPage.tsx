"use client";
import React, { useEffect } from "react";
import { FaPlusCircle, FaTicketAlt } from "react-icons/fa";
import { IoMailOpenSharp, IoTicket } from "react-icons/io5";
import UserPannelCard from "../shared/UserPannelCard";
import Link from "next/link";
import { useAuthStore } from "@/store/auth.store";
import { useTicketStore } from "@/store/ticket.store";
import TicketCardSkeleton from "@/components/skeletons/TicketCardSkeleton";
import TicketCard from "@/components/ui/TicketCard";
import { toast } from "react-toastify";
import { toastOptions } from "@/helpers/toastOptions";

const UserTicketsPage = () => {
  const cardsData = [
    {
      title: "همه ی تیکت ها",
      desc: "تیکت",
      length: 0,
      bgColor: "bg-green-500",
      icon: <FaTicketAlt />,
    },
    {
      title: "تیکت های باز",
      desc: "تیکت",
      length: 0,
      bgColor: "bg-blue-500",
      icon: <IoMailOpenSharp />,
    },
    {
      title: "بسته شده",
      desc: "تیکت",
      length: 0,
      bgColor: "bg-purple-500",
      icon: <IoTicket />,
    },
  ];
  const { user, getMe } = useAuthStore();
  const {
    tickets,
    fetchTickets,
    isLoading: isLoadingTickets,
    deleteTicket
  } = useTicketStore();
  useEffect(() => {
    fetchTickets();
    getMe();
  }, []);

  const userTickets = tickets?.filter((ticket) => ticket.user.id === user?.id);
    const handleDeleteTicket = async (id : string)=>{
      const res = await deleteTicket(id)
      if(res.success){
        toast.success('تیکت با موفقیت حذف شد' , toastOptions)
      }else{
        toast.error('خطایی در حذف تیکت رخ داد' , toastOptions)
      }
    }
  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
        {cardsData?.map((card, index) => (
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
      <div className="flex justify-center">
        <Link href={"/my-account/tickets/add-ticket"}>
          <button className="btn btn-success w-40 sm:w-64 md:w-80 h-16 mr-4 text-lg">
            <span className="translate-y-px">تیکت جدید</span>
            <FaPlusCircle />
          </button>
        </Link>
      </div>
      <div className="bg-base-300 p-4 rounded-md shadow-md">
        <div className="flex flex-col sm:flex-row items-center justify-between w-full">
          <h2 className="text-xl font-dana-medium mb-4 sm:mb-0">تیکت ها</h2>
        </div>
        <div className="divider divide-base-100 my-4" />
        <div className="flex w-full flex-col items-center gap-4">
          {isLoadingTickets ? (
            Array(3)
              .fill(0)
              .map((_, index) => <TicketCardSkeleton key={index + 1} />)
          ) : userTickets?.length > 0 ? (
            userTickets
              .slice(0, 3)
              .map((ticket) => <TicketCard onDelete={handleDeleteTicket} key={ticket?.id} ticket={ticket} />)
          ) : (
            <p>تا به الان تیکتی ارسال نکرده اید</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserTicketsPage;
