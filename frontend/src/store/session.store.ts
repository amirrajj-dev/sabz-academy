import { create } from "zustand";
import { ISession } from "@/interfaces/types";
import axiosnInstance from "@/configs/axios";

interface SessionStore {
  sessions: ISession[];
  getAllSessions : (courseID : string)=>void
  setSession: (session: ISession[] | null) => void;
  addSession: (session: ISession) => void;
  deleteSession: (sessionId: string) => void; 
  isLoading : boolean 
}

const useSessionStore = create<SessionStore>((set) => ({
    sessions : [],
    isLoading : false,
    addSession(session) {
        
    },
    deleteSession(sessionId) {
        
    },  
    setSession(session) {
        
    },  
    getAllSessions : async (courseID) => {
      try {
        if (!courseID){
          throw new Error('Invalid courseID');
        }
        const res = await axiosnInstance.get(`/courses/${courseID}/sessions`)
        if (res.data.success) {
          set({sessions: res.data.data, isLoading : false });
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