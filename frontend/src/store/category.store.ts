import { create } from "zustand";
import { ICategory } from "@/interfaces/types";
import axiosnInstance from "@/configs/axios";
interface CategoriesStore {
    categories: ICategory[];
    fetchCategories: () => Promise<{message : string , success : boolean}>;
    setCategories: (categories: ICategory[]) => void;
    addCategory: (category: ICategory) => Promise<void>;
    updateCategory: (category: ICategory) => Promise<void>;
    deleteCategory: (categoryId: string) => Promise<void>;
    isLoading: boolean;
}

export const useCategoriesStore = create<CategoriesStore>((set) => ({
    isLoading : false,
    fetchCategories : async () => {
        try {
            set({isLoading : true})
            const res = await axiosnInstance.get('/category')
            if (res.data.success){
                set({ categories: res.data.data, isLoading: false });
                return {
                    success : res.data.success,
                    message : res.data.message
                }
            }else{
                throw new Error('failed to fetch categories')
            }
        } catch (error : any) {
            return {
                success : false,
                message : error.message || error.response.data.message
            }
        }
    },
    addCategory(category) {
        
    },
    deleteCategory(categoryId) {
        
    },
    setCategories(categories) {
        
    },
    updateCategory(category) {
        
    },
}))