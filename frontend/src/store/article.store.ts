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
    addArticle(article) {
        
    },
    deleteArticle(id) {
        
    },
    getSingleArticle(id) {
        
    },
    setArticles(articles) {
        
    },
}))