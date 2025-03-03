import { create } from "zustand";
import { IComment } from "@/interfaces/types";
import axiosnInstance from "@/configs/axios";

interface CommentsStore {
  comments: IComment[];
  setComments: (comments: IComment[]) => void;
  getAllComments: () => Promise<{ message: string; success: boolean }>;
  submitComment: (
    comment: Pick<IComment, "body" | "courseID" | "score">
  ) => Promise<{ message: string; success: boolean }>;
  deleteComment: (commentId: string) => Promise<{message : string ; success : boolean}>;
  answerComment: (
    commentId: string,
    data: { body: string; courseID: string }
  ) => void;
  acceptComment: (
    commentId: string
  ) => Promise<{ message: string; success: boolean }>;
  rejectComment: (
    commentId: string
  ) => Promise<{ message: string; success: boolean }>;
  isLoading: boolean;
}

export const useCommentsStore = create<CommentsStore>((set, get) => ({
  comments: [],
  isLoading: false,
  acceptComment: async (commentId) => {
    try {
      set({ isLoading: true });
      if (!commentId) {
        throw new Error("invalid comment commentId");
      }
      const res = await axiosnInstance.put(`/comments/accept/${commentId}`);
      if (res.data.success) {
        set({
          isLoading: false,
          comments: get().comments.map((c) =>
            c.id === commentId ? { ...c, answer: 1 } : c
          ),
        });
        return {
          success: true,
          message: res.data.message,
        };
      } else {
        throw new Error(res.data.message);
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.response.data.message || error.message,
      };
    }
  },
  answerComment(commentId, data) {},
  deleteComment : async (commentId) => {
    try {
      set({ isLoading: true });
      if (!commentId) {
        throw new Error("invalid comment commentId");
      }
      const res = await axiosnInstance.delete(`/comments/${commentId}`);
      if (res.data.success) {
        set({ isLoading: false, comments: get().comments.filter((c) => c.id !== commentId) });
        return {
          success: true,
          message: res.data.message,
        };
      } else {
        throw new Error(res.data.message);
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.response.data.message || error.message,
      };
    }
  },
  rejectComment: async (commentId) => {
    try {
      set({ isLoading: true });
      if (!commentId) {
        throw new Error("invalid comment commentId");
      }
      const res = await axiosnInstance.put(`/comments/reject/${commentId}`);
      if (res.data.success) {
        set({
          isLoading: false,
          comments: get().comments.map((c) =>
            c.id == commentId ? { ...c, answer: 0 } : c
          ),
        });
        return {
          success: true,
          message: res.data.message,
        };
      } else {
        throw new Error(res.data.message);
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.response.data.message || error.message,
      };
    }
  },
  setComments(comments) {
    set({ comments });
  },
  getAllComments: async () => {
    try {
      set({ isLoading: true });
      const res = await axiosnInstance.get("/comments");
      if (res.data.success) {
        set({ comments: res.data.comments, isLoading: false });
        return {
          success: res.data.success,
          message: res.data.message,
        };
      } else {
        throw new Error("failed to get comments");
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.response.data.message || error.message,
      };
    } finally {
      set({ isLoading: false });
    }
  },
  submitComment: async (comment) => {
    try {
      set({ isLoading: true });
      const { body, courseID, score } = comment;
      if (!body || !courseID || !score) {
        throw new Error("invalid comment");
      }
      const res = await axiosnInstance.post("/comments", {
        body,
        courseID,
        score,
      });
      console.log(res);
      if (res.data.success) {
        set({ isLoading: false });
        return {
          success: res.data.success,
          message: res.data.message,
        };
      } else {
        throw new Error("failed to submit comment");
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.response.data.message || error.message,
      };
    }
  },
}));
