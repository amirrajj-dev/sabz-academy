"use client";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaStar,
  FaTrash,
  FaCheck,
  FaEye,
  FaReply,
  FaBan,
  FaEdit,
} from "react-icons/fa";
import DeleteModal from "@/components/modals/shared/DeleteModal";
import SeeCommentModal from "@/components/modals/comment/SeeCommentModal";
import ReplyCommentModal from "@/components/modals/comment/ReplyComment";
import BanModal from "@/components/modals/shared/BanModal";
import { useCommentsStore } from "@/store/comment.store";
import { IoClose } from "react-icons/io5";
import { toastOptions } from "@/helpers/toastOptions";
import { toast } from "react-toastify";

interface Comment {
  id: number;
  user: string;
  course: string;
  rating: number;
}

const comments = [
  { id: 1, user: "محمد رضایی", course: "React پیشرفته", rating: 5 },
  { id: 2, user: "زهرا کریمی", course: "Node.js از صفر تا صد", rating: 4 },
  { id: 3, user: "علی احمدی", course: "هوش مصنوعی مقدماتی", rating: 3 },
  { id: 4, user: "سارا محمدی", course: "طراحی سایت با Tailwind", rating: 5 },
  { id: 5, user: "حسین سلطانی", course: "برنامه‌نویسی پایتون", rating: 2 },
];

const CommentsTable = () => {
  const { comments, getAllComments, acceptComment } = useCommentsStore();

  useEffect(() => {
    getAllComments();
  }, []);

  const handleAcceptComment = async (id : string)=>{
    const res = await acceptComment(id)
    if (res.success){
      toast.success("پیام با موفقیت تایید شد", toastOptions);
    }else{
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
          {comments.map((comment, index) => (
            <tr
              key={comment.id}
              className={`border-b hover:bg-base-300 transition ${
                index % 2 === 0 ? "bg-base-200" : "bg-base-100"
              }`}
            >
              <td className="p-4 font-medium text-base-content">{index + 1}</td>
              <td className="p-4 font-semibold text-base-content">
                {comment.creator.name}
              </td>
              <td className="p-4">{comment.course.name}</td>
              <td className="p-4 flex justify-center items-center">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className={"text-yellow-500"} />
                ))}
              </td>
              <td className="p-4">
                <SeeCommentModal />
              </td>
              <td className="p-4">
                <ReplyCommentModal />
              </td>
              <td className="p-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn btn-primary btn-sm"
                >
                  <FaEdit />
                </motion.button>
              </td>
              <td className="p-4">
                <DeleteModal
                  title="حذف کامنت"
                  message="آیا از حذف کامنت اطمینان دارید ؟"
                  messageDesc="این اقدام قابل بازگشت نیست !"
                  deleteBtnText="حذف کامنت"
                />
              </td>
              <td className="p-4">
                <BanModal />
              </td>
              <td className="p-4">
                {comment.answer === 1 ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn btn-success btn-sm"
                  >
                    <FaCheck />
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn btn-error btn-sm"
                    onClick={()=>handleAcceptComment(comment.id)}
                  >
                    <IoClose />
                  </motion.button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CommentsTable;
