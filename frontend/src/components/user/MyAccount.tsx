"use client";
import CourseCard from "@/components/shared/CourseCard";
import CourseCardSkeleton from "@/components/skeletons/CourseCardSkeleton";
import TicketCardSkeleton from "@/components/skeletons/TicketCardSkeleton";
import TicketCard from "@/components/ui/TicketCard";
import MyAccountHeader from "@/components/user/myAccountHeader/MyAccountHeader";
import { toastOptions } from "@/helpers/toastOptions";
import { useAuthStore } from "@/store/auth.store";
import { useCourseStore } from "@/store/course.store";
import { useTicketStore } from "@/store/ticket.store";
import Link from "next/link";
import React, { useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { toast } from "react-toastify";

const MyAccount = () => {
  const { courses, fetchCourses, isLoading } = useCourseStore();
  const { user, getMe } = useAuthStore();
  const { tickets, fetchTickets , isLoading : isLoadingTickets , deleteTicket } = useTicketStore();
  useEffect(() => {
    fetchCourses();
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
    <div className="p-4">
      <MyAccountHeader />
      <div className="flex flex-col lg:flex-row gap-6 mt-6">
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row items-center justify-between bg-base-300 w-full p-4 rounded-md shadow-md mb-4">
            <h2 className="text-xl font-dana-medium mb-4 sm:mb-0">
              اخیرا مشاهده شده
            </h2>
            <Link href={"/my-account/courses"}>
              <button className="btn btn-soft btn-primary">
                <h3>همه ی دوره های ثبت نام شده</h3>
                <FaArrowLeft />
              </button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {!isLoading
              ? courses
                  .slice(0, 4)
                  .map((item) => <CourseCard course={item} key={item.id} />)
              : Array(4)
                  .fill(0)
                  .map((_, index) => <CourseCardSkeleton key={index + 1} />)}
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-6">
          <div className="bg-base-300 p-4 rounded-md shadow-md">
            <div className="flex flex-col sm:flex-row items-center justify-between w-full">
              <h2 className="text-xl font-dana-medium mb-4 sm:mb-0">
                تیکت های اخیر
              </h2>
              <Link href={"/my-account/tickets"}>
                <button className="btn btn-soft btn-primary">
                  <h3>همه ی تیکت ها</h3>
                  <FaArrowLeft />
                </button>
              </Link>
            </div>
            <div className="divider divide-base-100 my-4" />
            <div className="flex w-full flex-col items-center gap-4">
            {isLoadingTickets ? Array(3).fill(0).map((_ , index)=>(
                <TicketCardSkeleton key={index + 1} />
              )) : userTickets.length > 0 ? (
                userTickets
                  .slice(0, 3)
                  .map((ticket) => (
                    <TicketCard key={ticket.id} ticket={ticket} onDelete={handleDeleteTicket} />
                  ))
              ) : (
                <p>تا به الان تیکتی ارسال نکرده اید</p>
              )}
            </div>
          </div>

          <div className="bg-base-300 p-4 rounded-md shadow-md">
            <div className="flex flex-col sm:flex-row items-center justify-between w-full">
              <h2 className="text-xl font-dana-medium mb-4 sm:mb-0">
                پرسش های اخیر
              </h2>
            </div>
            <div className="divider divide-base-100 my-4" />
            <div className="flex font-dana-extra-light w-full flex-col items-center gap-4">
            تا به الان پرسشی ارسال نکرده اید
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyAccount