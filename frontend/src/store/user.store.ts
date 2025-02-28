import { create } from "zustand";
import { IUser } from "@/interfaces/types";
import axiosnInstance from "@/configs/axios";

interface UserStore {
    users : IUser[];
    addUser : (user : IUser) => void;
    deleteUser : (id : string) => void;
    banUser : (id : string) => void;
    fetchUsers : ()=>void
    isLoading : boolean
}

export const useUserStore = create<UserStore>((set) => ({
    users: [],
    isLoading: false,
    addUser: (user) => {
    },
    deleteUser: (id) => {
    },
    banUser: (id) => {

    },
    fetchUsers: async () => {
        try {
            set({isLoading : true})
            const res = await axiosnInstance.get('/users')
            if (res.data.success){
                set({ users: res.data.data, isLoading: false });
                return {
                    success : res.data.success,
                    message : res.data.message
                }
            }else{
                throw new Error('failed to fetch all users')
            }
        } catch (error : any) {
            return{
                success : false,
                message : error.message || error.response.data.message
            }
        }
    }
 }));