import {create} from 'zustand'
import { IUser } from '@/interfaces/types'
import axiosnInstance from '@/configs/axios';

const emailReg = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/

interface AuthStore {
    user: IUser | null;
    signup : (user : Pick<IUser , 'name' | 'username' | 'phone' | 'email' | 'password'>) => Promise<{error? : string , success : boolean, message? : string}>
    login: (user : Pick<IUser , 'email' | 'password'>) => Promise<{message : string , success : boolean}>;
    forgotPassword: (email : string) => Promise<{message : string , success : boolean , token? : string}>;
    resetPassword: (password : string , token : string) => Promise<{message : string , success : boolean}>;
    changePassword: (oldPassword : string , newPassword : string) => Promise<{message : string , success : boolean}>;
    updateUser: (user: Pick<IUser , "username" | "email" | "phone">, file: File) => Promise<{message : string;success : boolean}>;
    logout: () => void;
    setUser: (user : IUser | null) => void;
    isAuthenticated : boolean
    getMe : ()=>void
    error: string | null;
    isLoading : boolean;
}

export const useAuthStore = create<AuthStore>((set , get) => ({
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
    login: async (user) => {
        try {
            set({isLoading : true})
            const {email , password} = user
            if (!email.trim() ||!password.trim()) {
                throw new Error("All fields are required");
            }
            if (password.length < 6){
                throw new Error("Password must be at least 6 characters long");
            }
            if (!emailReg.test(email)){
                throw new Error("Invalid email");
            }
            const res = await axiosnInstance.post('/auth/signin', user)
            if (res.data.success){
                set({ user: res.data.user, isAuthenticated: true, error: null, isLoading: false });
                return {
                    success : res.data.success,
                    message : res.data.message
                }
            }else{
                set({ error: res.data.message });
                return {
                    success : false,
                    message : res.data.message
                }
            }
        } catch (error : any) {
            set({ error: error.response?.data.message || error.message });
            return {
                success : false,
                message : error.response.data.message || error.message
            }
        }finally{
            set({isLoading : false});
        }
    },
    logout: async () => {
        try {
            set({ isLoading: true });
            const res = await axiosnInstance.get('/auth/signout')
            set({ user: null, isAuthenticated: false, error: null, isLoading: false });
            return {
                success : res.data.success,
                message : res.data.message
            }
        } catch (error : any) {
            set({ error: error.response.data.message });
        }finally{
            set({ isLoading: false });
        }
    },
    setUser: (user) => {
        set({ user });
    },
    getMe: async () => {
        try {
            set({isLoading : true})
            const res = await axiosnInstance.get('/auth/me')
            if (res.data.success){
                set({ user: res.data.user, isAuthenticated: true, error: null, isLoading: false });
            }
            return {
                success : res.data.success,
                message : res.data.message
            }
        } catch (error : any) {
            set({ error: error.response.data.message });
        }finally{
            set({ isLoading: false });
        }
    },
    forgotPassword : async (email)=>{
        try {
            set({isLoading : true})
            const res = await axiosnInstance.post('/auth/forgot-password', {email})
            if (res.data.success){
                set({ error: null, isLoading: false });
                return{
                    success : res.data.success,
                    message : res.data.message
                }
            }else{
                set({ error: res.data.message, isLoading: false });
                throw new Error(res.data.message || 'sth goes wrong')
            }
        } catch (error : any) {
            console.log(error);
            return{
                success : false,
                message : error.response?.data.message  || error.message 
            }
        }finally{
            set({ isLoading: false });
        }
    },
    resetPassword : async (password , token)=>{
        try {
            set({isLoading : true})
            const res = await axiosnInstance.post(`/auth/reset-password/${token}`, {password})
            if (res.data.success){
                set({ error: null, isLoading: false });
                return{
                    success : res.data.success,
                    message : res.data.message
                }
            }else{
                set({ error: res.data.message, isLoading: false });
                throw new Error(res.data.message || 'sth goes wrong')
            }
        } catch (error : any) {
            return {
                success : false,
                message : error.response.data.message  || error.message
            }
        }finally{
            set({ isLoading: false });
        }
    },
    changePassword : async (oldPassword , newPassword)=>{
        try {
            set({isLoading : true})
            if (oldPassword.trim().length > 0 && newPassword.trim().length > 0){
                const res = await axiosnInstance.post('/auth/change-password', {oldPassword , newPassword})
                if (res.data.success){
                    set({ error: null, isLoading: false });
                    return{
                        success : true,
                        message : res.data.message as string
                    }
                }else{
                    throw new Error('sth goes wrong changing password')
                }
            }else{
                throw new Error('sth goes wrong')
            }

        } catch (error : any) {
            return {
                success : false,
                message : error.response?.data.message as string
            }
        }
    },
    updateUser : async (user , file)=>{
        try {
          set({isLoading : true})
          const {username , email , phone} = user
          if (!username?.trim() && !email?.trim() && !phone?.trim() && file.size === 0){
            throw new Error('Please fill at least one field')
          }
          const formdata = new FormData()
          formdata.append('username' , username)
          formdata.append('email' , email)
          formdata.append('phone' , phone)
          if (file){
            formdata.append('file' , file)
          }
          const res = await axiosnInstance.put("/users" , formdata  , {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          if (res.data.success) {
            set({isLoading : false , user : res.data.data})
            return {
              success: true,
              message: res.data.message || 'user updated succesfully',
            }
          }else{
            throw new Error('failed to update user')
          }
        } catch (error : any) {
            console.log(error);
          return{
            success : false ,
            message : error.response.data.message || error.message
          }
        }
      }
}))