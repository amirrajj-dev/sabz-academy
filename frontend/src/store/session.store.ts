import { create } from "zustand";
import { ISession } from "@/interfaces/types";
import axiosnInstance from "@/configs/axios";

interface SessionStore {
  sessions: ISession[];
  getAllSessions : (courseID : string)=>Promise<{message : string ; success : boolean}>;
  setSession: (session: ISession[]) => void;
  addSession: (session: ISession) => void;
  deleteSession: (sessionId: string , courseId) => void; 
  isLoading : boolean 
}

const useSessionStore = create<SessionStore>((set , get) => ({
    sessions : [],
    isLoading : false,
    addSession(session) {
        
    },
    deleteSession : async (sessionId , courseId) => {
        try {
          set({isLoading : true})
          if (!sessionId || !courseId){
            throw new Error('Invalid sessionId or courseId');
          }
          const res = await axiosnInstance.delete(`/courses/${courseId}/sessions/${sessionId}`)
          if (res.data.success) {
            set({ isLoading : false, sessions: get().sessions.filter((s) => s.id !== sessionId) });
            return {
              success: true,
              message: res.data.message,
            };
          }else{
            throw new Error(res.data.message)
          }
        } catch (error : any) {
          return {
            message: error.response.data.message || error.message,
            success: false,
          }
        }
    },  
    setSession(session) {
      set({ sessions: session });
    },  
    getAllSessions : async (courseID) => {
      try {
        if (!courseID){
          throw new Error('Invalid courseID');
        }
        const res = await axiosnInstance.get(`/courses/${courseID}/sessions`)
        if (res.data.success) {
          set({sessions: res.data.data, isLoading : false });
          return {
            message: res.data.message,
            success: true,
          };
        } else {
          throw new Error(res.data.message || 'Failed to fetch sessions');
        }
      } catch (error : any) {
        return {
          message: error.response.data.message || error.message,
          success: false,
        }
      }
    }, 
}))