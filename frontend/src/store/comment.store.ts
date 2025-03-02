import { create } from "zustand";
import { IComment } from "@/interfaces/types";

interface CommentsStore {
  comments: IComment[];
  setComments: (comments: IComment[]) => void;
  getAllComments: () => void;
  submitComment: (comment: IComment) => void;
  deleteComment: (commentId: string) => void;
  answerComment: (
    commentId: string,
    data: { body: string; courseID: string }
  ) => void;
  acceptComment: (commentId: string) => void;
  rejectComment: (commentId: string) => void;
  isLoading: boolean;
}

export const useCommentsStore = create<CommentsStore>((set, get) => ({
  comments: [],
  isLoading: false,
  acceptComment(commentId) {},
  answerComment(commentId, data) {},
  deleteComment(commentId) {},
  rejectComment(commentId) {},
  setComments(comments) {},
  getAllComments() {},
  submitComment(comment) {},
}));
