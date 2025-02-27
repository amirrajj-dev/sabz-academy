"use client";
import React, { useState } from "react";
import { IoArrowBackCircleSharp, IoWarningOutline } from "react-icons/io5";
import { FaComments, FaLayerGroup, FaReply } from "react-icons/fa";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LiaCommentSolid } from "react-icons/lia";
import Image from "next/image";

const ourseCommentSection = ({
  isAuthenticated,
  user,
  courseId,
  comments,
  submitComment,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [replyTo, setReplyTo] = useState(null);

  const handleNewCommentClick = () => {
    if (!isAuthenticated) {
      toast.error("برای ارسال نظر باید وارد حساب کاربری خود شوید.");
      return;
    }
    setIsOpen(true);
  };

  const handleSubmitComment = () => {
    if (!comment.trim()) return;
    submitComment({ userId: user.id, courseId, comment, replyTo });
    setIsOpen(false);
    setComment("");
    setReplyTo(null);
  };

  return (
    <div className="bg-base-300 p-6 rounded-lg shadow-lg">
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 10 }}
            whileTap={{ scale: 0.95 }}
            className="text-warning text-2xl sm:text-3xl md:text-5xl"
          >
            <FaComments className="text-success" />
          </motion.div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-dana-demi bg-gradient-to-r text-success">
            نظرات
          </h2>
        </div>
        <button onClick={()=>handleNewCommentClick()} className="btn btn-success btn-soft sm:btn-lg gap-3">
            <span>ایجاد نظر جدید</span>
            <LiaCommentSolid className="text-2xl hidden sm:block -translate-y-[3px]"/>
        </button>
      </div>

      {/* New comment form */}
      {isOpen && isAuthenticated && (
        <div className="mb-6 bg-base-200 p-6 rounded-lg shadow-md">
          <div className="flex items-center gap-4 mb-4">
            <Image
            width={48}
            height={48}
              src={user.avatar}
              alt={user.name}
              className=" rounded-full"
            />
            <h3 className="text-xl font-dana-demi text-base-content">{user.name}</h3>
          </div>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="لطفا نظر خود را بنویسید"
            rows={4}
            className="w-full p-4 border border-gray-300 rounded-lg resize-none mb-4"
          />
          <p className="text-sm hidden sm:flex items-center gap-2 bg-red-500/95 text-white p-3 rounded-md shadow-sm mb-4">
            <IoWarningOutline className="text-xl -translate-y-[2px]" />
            لطفا پرسش مربوط به هر درس یا ویدئو دوره را در صفحه همان ویدئو مطرح
            کنید.
          </p>
          <div className="flex justify-between items-center">
            <button
              onClick={() => setIsOpen(false)}
              className="btn btn-error px-4 py-2 rounded-lg font-semibold"
            >
              لغو
            </button>
            <button
              onClick={handleSubmitComment}
              className="btn btn-success px-4 py-2 rounded-lg font-semibold"
            >
              ارسال
            </button>
          </div>
        </div>
      )}

      {/* Display Comments */}
      <div className="mt-6">
        {comments.map((commentData, index) => (
          <div
            key={index}
            className="bg-base-100 p-4 rounded-lg shadow-md mb-4 relative"
          >
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-2">
              <Image
              width={40}
              height={40}
                src={commentData.user.avatar}
                alt={commentData.user.name}
                className="rounded-full"
              />
              <div>
                <h3 className="font-dana-demi text-base-content text-sm sm:text-base">
                  {commentData.user.name} | 
                  <span className="mr-1">{commentData.user.role}</span>
                </h3>
                <span className="text-sm text-gray-400 font-dana-extra-light">
                {commentData.createdAt}
                </span>
              </div>
            </div>
            <div className="divider divide-base-content"></div>
            <p className="text-base-content font-dana-extra-light">{commentData.comment}</p>
              <button
                onClick={() => {
                  if (isAuthenticated) {
                    setReplyTo(commentData.id);
                    setIsOpen(true);
                  } else {
                    toast.error(
                      "برای پاسخ دادن باید وارد حساب کاربری خود شوید."
                    );
                  }
                }}
                className="absolute top-4 left-4 btn btn-success btn-circle sm:btn-lg btn-soft"
              >
                <FaReply />
              </button>
          </div>
        ))}
      </div>

      {/* Toast Notifications */}
      <ToastContainer />
    </div>
  );
};

export default ourseCommentSection;
