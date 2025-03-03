import { create } from "zustand";
import { IComment } from "@/interfaces/types";
import axiosnInstance from "@/configs/axios";

interface CommentsStore {
  comments: IComment[];
  setComments: (comments: IComment[]) => void;
  getAllComments: () => Promise<{ message: string; success: boolean }>;
  submitComment: (
    comment: Pick<IComment, "body" | "courseID" | "score" | "mainCommentID">
  ) => Promise<{ message: string; success: boolean }>;
  deleteComment: (commentId: string) => Promise<{message : string ; success : boolean}>;
  answerComment: (
    commentId: string,
    data: { body: string; courseID: string }
  ) => Promise<{ message : string; success : boolean }>;
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
  answerComment : async (commentId, data) => {
    try {
      set({isLoading : true})
      if (!commentId ||!data.body ||!data.courseID) {
        throw new Error("invalid comment data");
      }
      const res = await axiosnInstance.post(`/comments/answer/${commentId}`, data);
      if (res.data.success) {
        set({isLoading : false})
        return {
            success: true,
            message: res.data.message,
        };
      }else{
        throw new Error(res.data.message);
      }
    } catch (error : any) {
      return {
        success: false,
        message: error.response.data.message || error.message,
      }
    }
  },
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
      const { body, courseID, score, mainCommentID } = comment;

      if (!body || !courseID || !score) {
        throw new Error("Invalid comment");
      }

      const res = await axiosnInstance.post("/comments", {
        body,
        courseID,
        score,
        mainCommentID: mainCommentID || null
      });

      if (res.data.success) {
        set({ isLoading: false });
        return {
          success: res.data.success,
          message: res.data.message,
        };
      } else {
        throw new Error("Failed to submit comment");
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || error.message,
      };
    }
  }
}));
