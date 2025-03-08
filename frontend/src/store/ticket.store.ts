import {create} from 'zustand';
import { ITicket, IReply } from '../interfaces/types';
import axiosnInstance from '@/configs/axios';

interface TicketState {
  tickets: ITicket[];
  isLoading: boolean;
  error: string | null;
  fetchTickets: () => Promise<{message : string , success : boolean}>;
  createTicket: (ticket: Omit<ITicket, 'id' | 'createdAt' | 'updatedAt' | 'user' | 'replies' | 'status' | "userId">) => Promise<{message : string , success : boolean}>;
  replyTicket: (ticketId: string, reply: Omit<IReply, 'id' | 'createdAt' | 'updatedAt' | 'user' | 'ticket' | "userId">) => Promise<{message : string , success : boolean}>;
}

export const useTicketStore = create<TicketState>((set, get) => ({
  tickets: [],
  isLoading: false,
  error : null,
  fetchTickets: async () => {
      try {
        set({ isLoading: true });
      const res = await axiosnInstance.get('/tickets');
      if (res.data.success){
          set({ tickets: res.data.data, isLoading: false });
          return {
            success: true,
            message : 'tickets fetched succesfully'
          }
      }else{
        throw new Error(res.data.message || 'failed to fetch tickets')
      }
    } catch (error : any) {
      set({ error: error.response.data.message || error.message, isLoading: false });
      return{
        success : false ,
        message : error.response.data.message || error.message
      }
    }finally{
        set({ isLoading: false });
    }
  },

  createTicket: async (ticket) => {
      try {
        set({ isLoading: true });
      const res = await axiosnInstance.post('/tickets' , ticket)
      if (res.data.success){
        set({ tickets: [...get().tickets, res.data.data], isLoading: false });
        return {
            success: true,
            message : 'ticket created succesfully'
        }
      }else{
        throw new Error(res.data.message || 'failed to create ticket')
      }
    } catch (error : any) {
      console.log(error);
      set({ error: error.response.data.message || error.message, isLoading: false });
      return{
        success : false ,
        message : error.response.data.message || error.message
      }
    }finally{
        set({ isLoading: false });
    }
  },

  replyTicket: async (ticketId, reply) => {
      try {
        set({ isLoading: true });
      const res = await axiosnInstance.post(`/tickets/${ticketId}` , reply);
      if (res.data.success){
        set({ tickets: get().tickets.map(ticket=>ticket.id === ticketId ? {...ticket , status : "in_progress" , replies : [...ticket.replies , res.data.data]} : ticket), isLoading: false });
        return {
          success : true,
          message : "replied to ticket sccesfully"
        }
      }else{
        throw new Error(res.data.message || 'failed to reply ticket')
      }
    } catch (error : any) {
      set({ error: error.response.data.message || error.message, isLoading: false });
      return {
        message : error.response.data.message || error.message,
        success:  false
      }
    }
  },
}));