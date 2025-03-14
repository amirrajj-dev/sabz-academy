import { create } from "zustand";
import { IUser } from "@/interfaces/types";
import axiosnInstance from "@/configs/axios";

interface UserStore {
  users: IUser[];
  deleteUser: (id: string) => Promise<{message : string;success : boolean}>;
  banUser: (id: string) => Promise<{message : string;success : boolean}>;
  changeRole: (
    role: "ADMIN" | "USER",
    id: string
  ) => Promise<{ message: string; success: boolean }>;
  fetchUsers: () => Promise<{message : string; success : boolean}>;
  isLoading: boolean;
}

export const useUserStore = create<UserStore>((set, get) => ({
  users: [],
  isLoading: false,
  deleteUser: async (id) => {
    try {
      if (!id) {
        throw new Error("id is required");
      }
      const res = await axiosnInstance.delete(`/users/${id}`);
      if (res.data.success) {
        set({ users: get().users.filter((u) => u.id !== id) });
        return {
          success: res.data.success,
          message: res.data.message,
        };
      } else {
        throw new Error("failed to delete user");
      }
    } catch (error: any) {
      console.log(error);
      return {
        success: false,
        message: error.message || error.response.data.message,
      };
    }
  },
  banUser: async (id) => {
    try {
        if (!id) {
        throw new Error("id is required");
      }
      const res = await axiosnInstance.put(`/users/ban/${id}`);
      if (res.data.success) {
        set({isLoading : false , users : get().users.map(u=>u.id.toString() === id.toString() ? {...u , isBanned : !u.isBanned} : u)})
        return {
            success : true,
            message: res.data.message,
        }
      }else{
        throw new Error("failed to ban user");
      }
    } catch (error : any) {
        return {
          success: false,
          message: error.message || error.response.data.message,
        };
  
    }
  },
  changeRole: async (role, id) => {
    try {
      set({ isLoading: true });
      const res = await axiosnInstance.put(`/users/role/${id}`, { role });
      if (res.data.success) {
        set({
          isLoading: false,
          users: get().users.map((u) =>
            u.id == id ? { ...u, ...res.data.data } : u
          ),
        });
        return {
          success: res.data.success,
          message: res.data.message,
        };
      } else {
        throw new Error("failed to change user role");
      }
    } catch (error: any) {
      set({ isLoading: false });
      return {
        success: false,
        message: error.message || error.response.data.message,
      };
    }
  },
  fetchUsers: async () => {
    try {
      set({ isLoading: true });
      const res = await axiosnInstance.get("/users");
      if (res.data.success) {
        set({ users: res.data.data, isLoading: false });
        return {
          success: res.data.success,
          message: res.data.message,
        };
      } else {
        throw new Error("failed to fetch all users");
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.message || error.response.data.message,
      };
    }
  },
}));
