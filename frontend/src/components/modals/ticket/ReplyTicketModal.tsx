"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FaReply, FaTrash } from "react-icons/fa";
import { useTicketStore } from "@/store/ticket.store";
import { toast } from "react-toastify";
import { toastOptions } from "@/helpers/toastOptions";

const ReplyTicketModal = ({
  ticketId,
}: {
  ticketId: string;
}) => {
  const [reply, setReply] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { replyTicket, isLoading } = useTicketStore();

  const handleReply = async () => {
    if (!reply) {
      toast.info("لطفا محتوای پاسخ را وارد کنید" , toastOptions);
      return;
    }

    const result = await replyTicket(ticketId, { content : reply ,  ticketId});

    if (result.success) {
      setReply("");
      setIsOpen(false);
      toast.success("تیکت با موفقیت پاسخ داده شد", toastOptions);
    } else {
      toast.error(result.message || "خطا در ارسال پاسخ");
    }
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="btn btn-success btn-sm hover:scale-110 transition-transform"
        onClick={() => setIsOpen(true)}
      >
        <FaReply />
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-base-100 p-6 rounded-xl shadow-lg max-w-md w-full"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >

              <div className="flex justify-between items-center border-b pb-3">
                <h2 className="text-xl font-bold text-base-content">
                  پاسخ به تیکت
                </h2>
                <button
                  className="text-base-content hover:text-error transition"
                  onClick={() => setIsOpen(false)}
                >
                  <FaTrash className="text-lg" />
                </button>
              </div>

              <div className="mt-4 space-y-4">
                <div className="flex flex-col gap-2">
                  <label className="label">پاسخ شما</label>
                  <textarea
                    className="textarea w-full"
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                    placeholder="پاسخ خود را وارد کنید"
                    rows={4}
                  ></textarea>
                </div>
              </div>
              <div className="flex justify-end mt-6 gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn btn-outline btn-error"
                  onClick={() => setIsOpen(false)}
                >
                  انصراف
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn btn-success"
                  onClick={handleReply}
                  disabled={isLoading}
                >
                  {isLoading ? "در حال ارسال..." : "ارسال پاسخ"}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ReplyTicketModal;