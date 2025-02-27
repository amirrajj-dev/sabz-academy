import {create} from 'zustand'
import { IUser } from '@/interfaces/types'
import axiosnInstance from '@/configs/axios';

const emailReg = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/

interface AuthStore {
    user: IUser | null;
    signup : (user : Pick<IUser , 'name' | 'username' | 'phone' | 'email' | 'password'>) => Promise<{error? : string , success : boolean, message? : string}>
    login: (user : Pick<IUser , 'email' | 'password'>) => void;
    logout: () => void;
    setUser: (user : IUser | null) => void;
    isAuthenticated : boolean
    getMe : ()=>void
    error: string | null;
    isLoading : boolean;
}

export const useAuthStore = create<AuthStore>((set) => ({
    user: null,
    isAuthenticated: false,
    error: null,
    isLoading: false,
    signup: async (user) => {
        try {
            set({ isLoading: true });
            const {username , email , name , password , phone} = user 
            if (!username.trim() ||!email.trim() ||!password.trim() ||!name.trim() ||!phone.trim()) {
                throw new Error("All fields are required");
            }
            if (!emailReg.test(email)) {
                throw new Error("Invalid email");
            }
            if (password.length < 6) {
                throw new Error("Password must be at least 6 characters long");
            }
            const res = await axiosnInstance.post('/auth/signup' , user)
            if (res.data.success){
                set({ user: res.data.user, isAuthenticated: true, error: null, isLoading: false });
            }
            return {
                success : res.data.success,
                message : res.data.message
            }
        } catch (error : any) {
            set({ error: error.response.data.message });
            return {
                error: error.response.data.message,
                success : false,
            }
        }finally{
            set({ isLoading: false });
        }
    },
    login: (user) => {},
    logout: () => {},
    setUser: (user) => {},
    getMe: async () => {}
}))