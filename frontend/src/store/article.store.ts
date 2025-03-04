import { create } from "zustand";
import { IArticle } from "@/interfaces/types";
import axiosnInstance from "@/configs/axios";

interface ArticlesStore {
    articles: IArticle[];
    mainArticle : IArticle | null
    fetchArticles: () => Promise<{ message: string; success: boolean }>;
    setArticles: (articles: IArticle[]) => void;
    addArticle: (article: Pick<IArticle, "title" | "description" | "body" | "cover" | "shortName" | "categoryID">) => Promise<{ message: string; success: boolean }>;
    deleteArticle: (id: string) => Promise<{ message: string; success: boolean }>;
    getSingleArticle : (id : string)=>Promise<{message : string, success : boolean}>
    isLoading: boolean;
}

export const useArticleStore = create<ArticlesStore>((set, get) => ({
    articles : [],
    mainArticle : null,
    isLoading : false,
    addArticle : async (article) => {
        try {
            set({ isLoading : true })
            const {body , categoryID , description , shortName , title , cover} = article
            if (!body || !categoryID || !description || !shortName || !title || !cover){
                throw new Error('all fields are required')
            }
            const formData = new FormData()
            formData.append('title', title)
            formData.append('description', description)
            formData.append('body', body)
            formData.append('file', cover)
            formData.append('categoryID', categoryID)
            formData.append('shortName', shortName)
            const res = await axiosnInstance.post('/articles', formData, {
                headers: { 'Content-Type':'multipart/form-data' },
            })
            if (res.data.success){
                set({ articles: [...get().articles, res.data.data], isLoading : false })
                return { message : res.data.message, success : true }
            }else{
                throw new Error(res.data.message || 'Failed to add article')
            }
        } catch (error : any) {
            return {
                message : error.response.data.message || error.message,
                success : false
            }
        }
    },
    deleteArticle(id) {
        
    },
    getSingleArticle(id) {
        
    },
    setArticles(articles) {
        
    },
}))