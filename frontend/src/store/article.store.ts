import { create } from "zustand";
import { IArticle } from "@/interfaces/types";
import axiosnInstance from "@/configs/axios";

interface ArticlesStore {
  articles: IArticle[];
  mainArticle: IArticle | null;
  fetchArticles: () => Promise<{ message: string; success: boolean }>;
  setArticles: (articles: IArticle[]) => void;
  addArticle: (
    article: Pick<
      IArticle,
      "title" | "description" | "body" | "cover" | "shortName" | "publish" | "categoryID"
    >
  ) => Promise<{ message: string; success: boolean }>;
  editArticle : (id : string , body : string , publish : string)=> Promise<{ message: string; success: boolean}>
  deleteArticle: (id: string) => Promise<{ message: string; success: boolean }>;
  getSingleArticle: (
    id: string
  ) => Promise<{ message: string; success: boolean }>;
  isLoading: boolean;
}

export const useArticleStore = create<ArticlesStore>((set, get) => ({
  articles: [],
  mainArticle: null,
  isLoading: false,
  addArticle: async (article) => {
    try {
      set({ isLoading: true });
      const { body, categoryID, description, shortName, title, cover , publish } =
        article;
      if (
        !body ||
        !categoryID ||
        !description ||
        !shortName ||
        !title ||
        !cover ||
        publish === undefined
      ) {
        throw new Error("all fields are required");
      }
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("body", body);
      formData.append("file", cover);
      formData.append("categoryID", categoryID);
      formData.append("shortName", shortName);
      formData.append("publish", publish.toString());
      const res = await axiosnInstance.post("/articles", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (res.data.success) {
        set({ articles: [...get().articles, res.data.data], isLoading: false });
        return { message: res.data.message, success: true };
      } else {
        set({isLoading : false})
        throw new Error(res.data.message || "Failed to add article");
      }
    } catch (error: any) {
      console.log(error);
      return {
        message: error.response.data.message || error.message,
        success: false,
      };
    }
  },
  deleteArticle: async (id) => {
    try {
      set({ isLoading: true });
      const res = await axiosnInstance.delete(`/articles/${id}`);
      console.log(res);
      if (res.data.success) {
        set({
          articles: get().articles.filter((article) => article.id !== id),
          isLoading: false,
        });
        return { message: res.data.message, success: true };
      } else {
        throw new Error(res.data.message || "Failed to delete article");
      }
    } catch (error: any) {
      return {
        message: error.response.data.message || error.message,
        success: false,
      };
    } finally {
      set({ isLoading: false });
    }
  },
  getSingleArticle : async (id) => {
    try {
      set({isLoading : true})
      if (!id){
        throw new Error('id is required')
      }
      const res = await axiosnInstance.get(`/articles/${id}`);
      if (res.data.success){
        set({mainArticle : res.data.data , isLoading : false})
        return { message: res.data.message, success: true };
      }else{
        set({isLoading : false})
        throw new Error(res.data.message || "Failed to fetch article");
      }
    } catch (error : any) {
      return {
        message: error.response.data.message || error.message,
        success: false,
      }
    }finally{
      set({ isLoading: false });
    }
  },
  setArticles(articles) {},
  fetchArticles: async () => {
    try {
      set({ isLoading: true });
      const res = await axiosnInstance.get("/articles");
      if (res.data.success) {
        set({ articles: res.data.data, isLoading: false });
        return { message: res.data.message, success: true };
      } else {
        throw new Error(res.data.message || "Failed to fetch articles");
      }
    } catch (error: any) {
      return {
        message: error.response.data.message || error.message,
        success: false,
      };
    } finally {
      set({ isLoading: false });
    }
  },
  editArticle: async (id , body , publish) => {
    try {
      set({ isLoading: true });
      const res = await axiosnInstance.put(`/articles/${id}`, { body , publish });
      if (res.data.success) {
        set({articles : get().articles.map(article=>article.id === id ? {...article , body : res.data.data.body , publish : res.data.data.publish} : article)})
        return { message: res.data.message, success: true };
      } else {
        throw new Error(res.data.message || "Failed to edit article");
      }
    } catch (error: any) {
      return {
        message: error.response.data.message || error.message,
        success: false,
      };
    } finally {
      set({ isLoading: false });
    }
  }
}));