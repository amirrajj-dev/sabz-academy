import { create } from "zustand";
import { IComment } from "@/interfaces/types";
import axiosnInstance from "@/configs/axios";

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
  getAllComments : async () => {
    try {
        set({isLoading : true})
        const res = await axiosnInstance.get('/comments')
        if (res.data.success){
            set({ comments: res.data.comments, isLoading: false });
            return {
                success : res.data.success,
                message : res.data.message
            }
        }else{
            throw new Error('failed to get comments')
        }
    } catch (error : any) {
        return{
            success : false,
            message : error.response.data.message || error.message
        }
    }finally{
        set({isLoading : false})
    }
  },
  submitComment(comment) {},
}));
