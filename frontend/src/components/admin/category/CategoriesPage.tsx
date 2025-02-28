'use client'
import React, { useEffect } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import AddCategoryModal from "../..//modals/category/AddCategoryModal";
import EditCategoryModal from "../../modals/category/EditCategoryModal";
import DeleteModal from "@/components/modals/shared/DeleteModal";
import { useCategoriesStore } from "@/store/category.store";

const CategoriesPage = () => {

  const {isLoading , fetchCategories , categories} = useCategoriesStore()
  useEffect(() => {
    fetchCategories()
  }, [])

  return (
    <div className="p-6 max-w-5xl mx-auto">

      <div className="flex flex-col gap-4 sm:flex-row sm:gap-0 justify-between items-center mb-6">
        <h1 className="text-3xl font-extrabold text-base-content">📂 دسته‌بندی‌ها</h1>
       <AddCategoryModal/>
      </div>

      <div className="shadow-lg rounded-xl overflow-x-auto">
        <table className="table bg-base-300 min-w-[600px] w-full text-center">

          <thead className="bg-base-300 text-base-content">
            <tr>
              <th className="p-4 whitespace-nowrap">شناسه</th>
              <th className="p-4 whitespace-nowrap">عنوان</th>
              <th className="p-4 whitespace-nowrap">لینک</th>
              <th className="p-4 whitespace-nowrap">ویرایش</th>
              <th className="p-4 whitespace-nowrap">حذف</th>
            </tr>
          </thead>

          <tbody>
            {categories?.map((category, index) => (
              <tr
                key={category.id}
                className={`border-b hover:bg-base-300 transition ${
                  index % 2 === 0 ? "bg-base-200" : "bg-base-100"
                }`}
              >
                <td className="p-4 font-medium text-base-content">{index + 1}</td>
                <td className="p-4 font-semibold text-base-content">{category.name}</td>
                <td className="p-4">
                  <span className="text-primary hover:underline">
                    {category.title}
                  </span>
                </td>
                <td className="p-4">
                 <EditCategoryModal />
                </td>
                <td className="p-4">
                  <DeleteModal title="حذف دسته بندی 📂" message="آیا از حذف این دسته بندی اطمینان دارید" deleteBtnText="حذف دسته بندی" messageDesc="این اقدام قابل بازگشت نیست !"  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CategoriesPage;