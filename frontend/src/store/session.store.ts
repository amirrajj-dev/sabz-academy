import { create } from "zustand";
import { ISession } from "@/interfaces/types";
import axiosnInstance from "@/configs/axios";

interface SessionStore {
  sessions: ISession[];
  getAllSessions : ()=>Promise<{message : string;success : boolean}>
  getSingleCourseSessions: (
    courseID: string
  ) => Promise<{ message: string; success: boolean }>;
  setSession: (session: ISession[]) => void;
  addSession: (
    session: Omit<ISession , 'createdAt' | 'id' | 'course'>
  ) => Promise<{ message: string; success: boolean }>;
  deleteSession: (
    sessionId: string
  ) => Promise<{ message: string; success: boolean }>;
  isLoading: boolean;
}

export const useSessionStore = create<SessionStore>((set, get) => ({
  sessions: [],
  isLoading: false,
  addSession: async (session) => {
    try {
      set({ isLoading: true });
      const { title, time, courseId, video, free } = session;
      if (!title || !time || !courseId || !video || !free) {
        throw new Error("Please fill all fields");
      }
      const formData = new FormData();
      formData.append("title", title);
      formData.append("time", time);
      formData.append("free", free ? "1" : "0"); // Backend expects a number
      formData.append("file", video);
      const res = await axiosnInstance.post(
        `/courses/${courseId}/sessions`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      if (res.data.success) {
        set({ sessions: [...get().sessions, res.data.session], isLoading: false });
        return {
          success: true,
          message: res.data.message,
        };
      } else {
        throw new Error(res.data.message);
      }
    } catch (error: any) {
      console.log(error);
      return {
        message: error.response.data.message || error.message,
        success: false,
      };
    }
  },
  deleteSession: async (sessionId) => {
    try {
      set({ isLoading: true });
      if (!sessionId) {
        throw new Error("Invalid sessionId");
      }
      const res = await axiosnInstance.delete(
        `/courses/sessions/${sessionId}`
      );
      if (res.data.success) {
        set({
          isLoading: false,
          sessions: get().sessions.filter((s) => s.id !== sessionId),
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
        message: error.response.data.message || error.message,
        success: false,
      };
    }
  },
  setSession(session) {
    set({ sessions: session });
  },
  getSingleCourseSessions: async (courseID) => {
    try {
      if (!courseID) {
        throw new Error("Invalid courseID");
      }
      const res = await axiosnInstance.get(`/courses/${courseID}/sessions`);
      if (res.data.success) {
        set({ sessions: res.data.data, isLoading: false });
        return {
          message: res.data.message,
          success: true,
        };
      } else {
        throw new Error(res.data.message || "Failed to fetch sessions");
      }
    } catch (error: any) {
      return {
        message: error.response.data.message || error.message,
        success: false,
      };
    }
  },
  getAllSessions : async ()=>{
    try {
      set({isLoading : true})
      const res = await axiosnInstance.get('/sessions')
      if (res.data.success) {
        set({ sessions: res.data.data, isLoading: false });
        return {
          message: res.data.message,
          success: true
        }
      }else{
        throw new Error(res.data.message || "Failed to fetch sessions");
      }
    } catch (error : any) {
      return {
        message: error.response.data.message || error.message,
        success: false
      }
    }
  }
}));
