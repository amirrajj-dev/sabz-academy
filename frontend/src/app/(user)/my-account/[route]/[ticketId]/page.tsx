"use client";
import { useEffect, useState, useMemo, useCallback, use, useRef } from "react";
import { redirect, usePathname } from "next/navigation";
import { toast } from "react-toastify";
import { toastOptions } from "@/helpers/toastOptions";
import { useTicketStore } from "@/store/ticket.store";
import TicketHeader from "@/components/ticketDetail/TicketHeader";
import TicketMetadata from "@/components/ticketDetail/TicketMetaData";
import ChatMessage from "@/components/ticketDetail/ChatMessage";
import ReplyInputBox from "@/components/ticketDetail/ReplyInputBox";
import { ITicket } from "@/interfaces/types";

const TicketDetailsPage = ({
  params,
}: {
  params: Promise<{ ticketId: string }>;
}) => {
  const { tickets, fetchTickets, replyTicket, isLoading } = useTicketStore();
  const [replyContent, setReplyContent] = useState("");
  const [ticket, setTicket] = useState<ITicket | null>(null);
  const { ticketId } = use(params);
  const pathname = usePathname();
  const chatAreaRef = useRef<HTMLDivElement | null>(null);

  if (!pathname.includes("/tickets")) {
    redirect("/my-account");
  }

  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  useEffect(() => {
    if (tickets.length > 0) {
      const foundTicket = tickets.find((t) => t.id === ticketId);
      setTicket(foundTicket || null);
    }
  }, [tickets, ticketId]);

  const memoizedTicket = useMemo(() => ticket, [ticket]);

  const handleReply = useCallback(async () => {
    if (!replyContent.trim()) {
      toast.info("لطفا محتوای پاسخ را وارد کنید", toastOptions);
      return;
    }

    const result = await replyTicket(ticketId, {
      content: replyContent,
      ticketId,
    });
    if (result.success) {
      setReplyContent("");
      fetchTickets();
      toast.success("پاسخ با موفقیت ثبت شد", toastOptions);
    } else {
      toast.error(result.message || "خطا در ارسال پاسخ", toastOptions);
    }
  }, [replyContent, ticketId, replyTicket, fetchTickets]);

  useEffect(() => {
    if (chatAreaRef.current) {
      //this is for that when we refresh or send a message it scrolls to the last message
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }
  }, [memoizedTicket?.replies]);

  if (!memoizedTicket) {
    return <div className="p-4">تیکت مورد نظر یافت نشد.</div>;
  }

  return (
    <div className="p-4 max-w-4xl mx-auto bg-base-300 rounded-md shadow-md">
      <TicketHeader title={memoizedTicket.title} />
      <TicketMetadata
        user={memoizedTicket.user}
        createdAt={String(memoizedTicket.createdAt)}
        priority={memoizedTicket.priority}
        status={memoizedTicket.status}
      />
      <div
        className="bg-base-100 p-4 rounded-lg shadow-md mb-6 max-h-96 overflow-auto"
        ref={chatAreaRef}
      >
        <div className="space-y-4">
          <ChatMessage
            content={memoizedTicket.content}
            createdAt={String(memoizedTicket.createdAt)}
            user={memoizedTicket.user}
          />
          {memoizedTicket.replies.map((reply) => (
            <ChatMessage
              key={reply.id}
              content={reply.content}
              createdAt={String(reply.createdAt)}
              isReply={reply.user.id !== memoizedTicket.user.id}
              user={reply.user}
            />
          ))}
        </div>
      </div>
      <ReplyInputBox
        replyContent={replyContent}
        isLoading={isLoading}
        onReplyChange={(e) => setReplyContent(e.target.value)}
        onReplySubmit={handleReply}
      />
    </div>
  );
};

export default TicketDetailsPage;