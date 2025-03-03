"use client";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { FaStar, FaEdit, FaCheck } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import DeleteModal from "@/components/modals/shared/DeleteModal";
import SeeCommentModal from "@/components/modals/comment/SeeCommentModal";
import ReplyCommentModal from "@/components/modals/comment/ReplyComment";
import BanModal from "@/components/modals/shared/BanModal";
import { useCommentsStore } from "@/store/comment.store";
import { toast } from "react-toastify";
import { toastOptions } from "@/helpers/toastOptions";

const CommentsTable = () => {
  const { comments, getAllComments, acceptComment, isLoading , rejectComment } = useCommentsStore();

  useEffect(() => {
    getAllComments();
  }, []);

  const handleAcceptComment = async (id) => {
    const res = await acceptComment(id);
    if (res.success) {
      toast.success("پیام با موفقیت تایید شد", toastOptions);
    } else {
      toast.error("خطایی رخ داد", toastOptions);
    }
  };

  const handleRejectComment = async (id : string) => {
    const res = await rejectComment(id);
    if (res.success) {
      toast.success("پیام با موفقیت رد شد", toastOptions);
    } else {
      toast.error("خطایی رخ داد", toastOptions);
    }
  }

  return (
    <div className="shadow-lg rounded-xl overflow-x-auto">
      <table className="table bg-base-300 w-full text-center">
        <thead className="bg-base-300 text-base-content">
          <tr>
            <th className="p-4">شناسه</th>
            <th className="p-4">کاربر</th>
            <th className="p-4">دوره</th>
            <th className="p-4">امتیاز</th>
            <th className="p-4">مشاهده</th>
            <th className="p-4">پاسخ</th>
            <th className="p-4">ویرایش</th>
            <th className="p-4">حذف</th>
            <th className="p-4">بن</th>
            <th className="p-4">تایید</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            [...Array(4)].map((_, index) => (
              <tr key={index} className="animate-pulse bg-base-200">
                <td className="p-4"><div className="skeleton h-4 w-10"></div></td>
                <td className="p-4"><div className="skeleton h-4 w-20"></div></td>
                <td className="p-4"><div className="skeleton h-4 w-24"></div></td>
                <td className="p-4 flex justify-center">
                  <div className="skeleton h-4 w-24"></div>
                </td>
                <td className="p-4"><div className="skeleton h-4 w-10"></div></td>
                <td className="p-4"><div className="skeleton h-4 w-10"></div></td>
                <td className="p-4"><div className="skeleton h-4 w-10"></div></td>
                <td className="p-4"><div className="skeleton h-4 w-10"></div></td>
                <td className="p-4"><div className="skeleton h-4 w-10"></div></td>
                <td className="p-4"><div className="skeleton h-4 w-10"></div></td>
              </tr>
            ))
          ) : comments.length === 0 ? (
            <tr>
              <td colSpan={10} className="p-4 text-center text-gray-500">هیچ نظری یافت نشد.</td>
            </tr>
          ) : (
            comments.map((comment, index) => (
              <tr key={comment.id} className={`border-b hover:bg-base-300 transition ${index % 2 === 0 ? "bg-base-200" : "bg-base-100"}`}>
                <td className="p-4 font-medium text-base-content">{index + 1}</td>
                <td className="p-4 font-semibold text-base-content">{comment.creator.name}</td>
                <td className="p-4">{comment.course.name}</td>
                <td className="p-4 flex justify-center items-center">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-500" />
                  ))}
                </td>
                <td className="p-4"><SeeCommentModal /></td>
                <td className="p-4"><ReplyCommentModal /></td>
                <td className="p-4">
                  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="btn btn-primary btn-sm">
                    <FaEdit />
                  </motion.button>
                </td>
                <td className="p-4"><DeleteModal title="حذف کامنت" message="آیا از حذف کامنت اطمینان دارید؟" messageDesc="این اقدام قابل بازگشت نیست!" deleteBtnText="حذف کامنت" /></td>
                <td className="p-4"><BanModal /></td>
                <td className="p-4">
                  {comment.answer === 1 ? (
                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="btn btn-success btn-sm" onClick={()=>handleRejectComment(comment.id)}>
                      <FaCheck />
                    </motion.button>
                  ) : (
                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="btn btn-error btn-sm" onClick={() => handleAcceptComment(comment.id)}>
                      <IoClose />
                    </motion.button>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CommentsTable;