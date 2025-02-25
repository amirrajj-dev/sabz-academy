"use client";
import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import AddMenuModal from "@/components/modals/menu/AddMenuModal";
import EditMenuModal from "@/components/modals/menu/EditMenuModal";
import DeleteModal from "@/components/modals/shared/DeleteModal";
const MenuesPage = () => {
  const menus = [
    { id: 1, title: "صفحه اصلی", link: "/" },
    { id: 2, title: "درباره ما", link: "/about" },
    { id: 3, title: "تماس با ما", link: "/contact" },
  ];

  const handleEdit = (id: number) => {
    console.log("Edit menu with ID:", id);
  };

  const handleDelete = (id: number) => {
    console.log("Delete menu with ID:", id);
  };

  return (
    <div className="p-6 bg rounded-lg">
      <div className="flex flex-col items-center justify-between sm:flex-row">
        <h1 className="text-3xl font-extrabold text-base-content mb-6">
          منو ها 📄
        </h1>
        <AddMenuModal />
      </div>
      <div className="overflow-x-auto">
        <table className="table w-full bg-base-200">
          <thead>
            <tr>
              <th>شناسه</th>
              <th>عنوان</th>
              <th>مقصد</th>
              <th>ویرایش</th>
              <th>حذف</th>
            </tr>
          </thead>
          <tbody>
            {menus.map((menu) => (
              <tr key={menu.id}>
                <td>{menu.id}</td>
                <td>{menu.title}</td>
                <td>{menu.link}</td>
                <td>
                 <EditMenuModal/>
                </td>
                <td>
                <DeleteModal title="حذف منو 📄" message="آیا از حذف منو اطمینان دارید ؟" messageDesc="این اقدام قابل بازگشت نیست !" deleteBtnText="حذف منو"/>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MenuesPage;
