"use client";
import React, { useEffect, useState } from "react";
import { FaEye, FaReply } from "react-icons/fa";
import { motion } from "framer-motion";
import DeleteModal from "@/components/modals/shared/DeleteModal";
import { useTicketStore } from "@/store/ticket.store";

const TicketsPage = () => {
  const { tickets, fetchTickets, isLoading } = useTicketStore();
  useEffect(() => {
    fetchTickets();
  }, []);

  console.log(tickets);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-extrabold text-base-content mb-4">
        🎫 تیکت ها
      </h1>
      <div className="shadow-lg rounded-xl overflow-x-auto">
        <table className="table bg-base-300 min-w-[800px] w-full text-center">
          <thead className="bg-base-300 text-base-content">
            <tr>
              <th className="p-4">شناسه</th>
              <th className="p-4">کاربر</th>
              <th className="p-4">عنوان</th>
              <th className="p-4">تیکت</th>
              <th className="p-4">الویت</th>
              <th className="p-4">مشاهده</th>
              <th className="p-4">پاسخ</th>
              <th className="p-4">وضعیت پاسخ گویی</th>
            </tr>
          </thead>

          <tbody>
            {tickets.map((ticket, index) => (
              <tr
                key={ticket.id}
                className={`border-b hover:bg-base-300 transition ${
                  index % 2 === 0 ? "bg-base-200" : "bg-base-100"
                }`}
              >
                <td className="p-4 font-medium text-base-content">
                  {index + 1}
                </td>
                <td className="p-4 font-semibold text-base-content">
                  {ticket.user.name}
                </td>
                <td className="p-4 font-semibold text-base-content">
                  {ticket.title}
                </td>
                <td className="p-4 text-base-content">{ticket.title}</td>
                <td className="p-4 text-base-content">
                  {ticket.priority === "high" ? (
                    <span className="size-5 inline-block bg-red-500 rounded-full"></span>
                  ) : ticket.priority === "low" ? (
                    <span className="size-5 inline-block bg-indigo-500 rounded-full"></span>
                  ) : (
                    <span className="size-5 inline-block bg-emerald-500 rounded-full"></span>
                  )}
                </td>
                <td className="p-4">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    className="btn btn-primary btn-sm"
                  >
                    <FaEye />
                  </motion.button>
                </td>
                <td className="p-4">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    className="btn btn-success btn-sm"
                  >
                    <FaReply />
                  </motion.button>
                </td>
                <td className="p-4 text-base-content">{ticket.status === 'open' ? 'پاسخ داده نشده' : "پاسخ داده شده"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TicketsPage;
