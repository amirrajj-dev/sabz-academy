import { create } from "zustand";
import { IDiscount } from "@/interfaces/types";
import axiosnInstance from "@/configs/axios";
interface DiscountsStore{
    discounts: IDiscount[]
    setDiscounts: (discounts: IDiscount[]) => void
    createDiscount : (data : Omit<IDiscount , 'id' | 'createdAt'>)=>Promise<{message : string , success :boolean}>
    deleteDiscount : (id : string)=>Promise<{message : string , success :boolean}>
    isLoading : boolean
}

export const useDiscountsStore = create<DiscountsStore>((set , get)=>({
    discounts : [],
    isLoading : false,
    createDiscount : async (data)=> {
        try {
            set({isLoading: true})
            const {code , courseId , maxUse , discount} = data
            if (!code || !courseId || !maxUse || !discount){
                throw new Error('All fields are required')
            }
            const response = await axiosnInstance.post('/discounts' , data)
            if (response.data.success){
                set({isLoading: false , discounts : [...response.data.data , ...response.data.data] })
                return {
                    message : response.data.message || 'discount created succesfully' ,
                    success : true
                }
            }else{
                throw new Error(response.data.message)
            }
        } catch (error : any) {
            return {
                message: error.response?.data?.message || error.message,
                success: false
            }
        }        
    },
    deleteDiscount : async (id) => {
        try {
            if (!id){
                throw new Error('Id is required')
            }
            set({isLoading: true})
            const response = await axiosnInstance.delete(`/discounts/${id}`)
            if (response.data.success){
                set({isLoading: false , discounts : get().discounts.filter(discount=>discount.id  !== id) })
                return {
                    message: response.data.message,
                    success: true
                }
            }else{
                throw new Error(response.data.message || 'failed to delete the discount')
            }
        } catch (error : any) {
            return {
                message: error.response?.data?.message || error.message,
                success: false
            }
        }
    },
     setDiscounts(discounts) {
         set({discounts})
     },
}))