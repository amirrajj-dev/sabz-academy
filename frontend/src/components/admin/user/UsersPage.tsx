'use client'
import React, { useState } from "react";
import { FaEdit, FaTrash, FaPlus, FaBan, FaUserShield } from "react-icons/fa";
import { motion } from "framer-motion";
import AddUserModal from "../../modals/user/AdduserModal";
import EditUserModal from "../../modals/user/EditUerModal";
import BanUserModal from "../../modals/user/BanUserModal";
import ChangeRoleModal from "../../modals/user/ChangeRoleModal";
import DeleteModal from "@/components/modals/shared/DeleteModal";

const UsersPage = () => {
  const [users, setUsers] = useState([
    { id: 1, fullName: "علی احمدی", username: "ali_ahmadi", email: "ali@example.com", role: "Admin" },
    { id: 2, fullName: "مریم رضایی", username: "maryam_razi", email: "maryam@example.com", role: "User" },
    { id: 3, fullName: "رضا صالحی", username: "reza_s", email: "reza@example.com", role: "Moderator" },
  ]);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex flex-col gap-4 sm:flex-row sm:gap-0 justify-between items-center mb-6">
        <h1 className="text-3xl font-extrabold text-base-content">👥 کاربران</h1>
        <AddUserModal/>
      </div>

      <div className="shadow-lg rounded-xl overflow-x-auto">
        <table className="table bg-base-300 min-w-[800px] w-full text-center">
          <thead className="bg-base-300 text-base-content">
            <tr>
              <th className="p-4 whitespace-nowrap">شناسه</th>
              <th className="p-4 whitespace-nowrap">نام</th>
              <th className="p-4 whitespace-nowrap">نام کاربری</th>
              <th className="p-4 whitespace-nowrap">ایمیل</th>
              <th className="p-4 whitespace-nowrap">نقش</th>
              <th className="p-4 whitespace-nowrap">ویرایش</th>
              <th className="p-4 whitespace-nowrap">حذف</th>
              <th className="p-4 whitespace-nowrap">تغییر نقش</th>
              <th className="p-4 whitespace-nowrap">بن</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => (
              <tr
                key={user.id}
                className={`border-b hover:bg-base-300 transition ${
                  index % 2 === 0 ? "bg-base-200" : "bg-base-100"
                }`}
              >
                <td className="p-4 font-medium text-base-content">{user.id}</td>
                <td className="p-4 font-semibold text-base-content">{user.fullName}</td>
                <td className="p-4 font-semibold text-base-content">{user.username}</td>
                <td className="p-4 font-medium text-base-content">{user.email}</td>
                <td className="p-4 font-medium text-base-content">{user.role}</td>
                <td className="p-4">
                  <EditUserModal/>
                </td>
                <td className="p-4">
                 <DeleteModal title="حذف کاربر 👤" message="آیا از حذف کاربر اطمینان دارید ؟" messageDesc="این اقدام قابل بازگشت نیست !" deleteBtnText="حذف کاربر"  />
                </td>
                <td className="p-4">
                  <ChangeRoleModal/>
                </td>
                <td className="p-4">
                 <BanUserModal/>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersPage;