import { create } from "zustand";
import { ICategory } from "@/interfaces/types";
import axiosnInstance from "@/configs/axios";
interface CategoriesStore {
    categories: ICategory[];
    fetchCategories: () => Promise<{message : string , success : boolean}>;
    setCategories: (categories: ICategory[]) => void;
    addCategory: (category: Pick<ICategory , 'name' | 'title'>) => Promise<{message : string , success : boolean}>;
    updateCategory: (category: Pick<ICategory , "name" | 'title' | 'id'>) => Promise<{message : string , success : boolean}>;
    deleteCategory: (categoryId: string) => Promise<void>;
    isLoading: boolean;
}

export const useCategoriesStore = create<CategoriesStore>((set , get) => ({
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
    addCategory: async (category) => {
        try {
            set({ isLoading: true });
    
            const { name, title } = category;
            if (!name.trim() || !title.trim()) {
                throw new Error("Please fill all fields");
            }
    
            const res = await axiosnInstance.post("/category", category);
            if (res.data.success) {
                set({ categories: [...get().categories, res.data.data], isLoading: false });
                return { success: true, message: "Category added successfully" };
            } else {
                throw new Error("Failed to add category");
            }
        } catch (error: any) {
            set({ isLoading: false });
            return {
                success: false,
                message: error.response?.data?.message || error.message || "An error occurred",
            };
        }finally{
            set({isLoading : false})
        }
    },
    
    deleteCategory(categoryId) {
        
    },
    setCategories(categories) {
        
    },
    updateCategory : async (category) => {
        try {
            set({isLoading : true})
            const {name , title} = category
            if (!name.trim() || !title.trim()){
                throw new Error("Please fill all fields")
            }
            const res = await axiosnInstance.put(`/category/${category.id}`, category)
            if (res.data.success){
                const updatedCategories = get().categories.map((c) =>
                    c.id === category.id? {...c, name, title} : c
                );
                set({ categories: updatedCategories, isLoading: false });
                return { success: true, message: "Category updated successfully" };
            }else{
                throw new Error("Failed to update category")
            }
        } catch (error : any) {
            return {
                success : false,
                message : error.message || error.response.data.message
            }
        } 
    },
}))