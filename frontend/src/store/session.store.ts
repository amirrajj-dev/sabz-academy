import { create } from "zustand";
import { ISession } from "@/interfaces/types";

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
    getAllSessions(courseID) {
      
    }, 
}))