import React from "react";
import { FaEye, FaTrash, FaReply } from "react-icons/fa";
import SeeMessageModal from "../../modals/messages/SeeMessageModal";
import DeleteMessageModal from "../../modals/messages/DeleteMessageModal";
import ReplyMessageModal from "../../modals/messages/ReplyMessageModal";

const MessagesPage = () => {
  const messages = [
    { id: 1, name: "علی احمدی", email: "ali@example.com", status: "پاسخ داده نشده" },
    { id: 2, name: "زهرا محمدی", email: "zahra@example.com", status: "پاسخ داده شده" },
    { id: 3, name: "مهدی رضایی", email: "mahdi@example.com", status: "پاسخ داده نشده" },
  ];

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="shadow-lg rounded-xl overflow-x-auto">
        <table className="table bg-base-300 w-full text-center">
          <thead className="bg-base-300 text-base-content">
            <tr>
              <th className="p-4">شناسه</th>
              <th className="p-4">نام و نام خانوادگی</th>
              <th className="p-4">ایمیل</th>
              <th className="p-4">مشاهده</th>
              <th className="p-4">حذف</th>
              <th className="p-4">پاسخ</th>
              <th className="p-4">وضعیت پاسخ</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((message, index) => (
              <tr
                key={message.id}
                className={`border-b hover:bg-base-300 transition ${
                  index % 2 === 0 ? "bg-base-200" : "bg-base-100"
                }`}
              >
                <td className="p-4 font-medium text-base-content">{message.id}</td>
                <td className="p-4 font-semibold text-base-content">{message.name}</td>
                <td className="p-4">{message.email}</td>
                <td className="p-4">
                 <SeeMessageModal/>
                </td>
                <td className="p-4">
                  <DeleteMessageModal/>
                </td>
                <td className="p-4">
                <ReplyMessageModal/>
                </td>
                <td className="p-4">{message.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MessagesPage;