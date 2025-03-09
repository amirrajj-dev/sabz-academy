import { create } from "zustand";
import { ICourse } from "@/interfaces/types";
import axiosnInstance from "@/configs/axios";

interface CourseStore {
  courses: ICourse[];
  mainCourse: ICourse | null;
  relatedCourses : ICourse[];
  fetchCourses: () => Promise<{ message: string; success: boolean }>;
  fetchRelatedCourses : (id : string) => Promise<{ message: string; success: boolean}>;
  setCourses: (courses: ICourse[]) => void;
  addCourse: (
    course: Partial<ICourse>,
    file: File
  ) => Promise<{ message: string; success: boolean }>;
  deleteCourse: (id: string) => Promise<{ message: string; success: boolean }>;
  editCourse: (id: string , data : Partial<ICourse>) => Promise<{ message: string; success: boolean }>;
  getSingleCourse : (id : string)=>Promise<{message : string , success : boolean}>
  isLoading: boolean;
}

export const useCourseStore = create<CourseStore>((set, get) => ({
  courses: [],
  mainCourse: null,
  isLoading: false,
  relatedCourses : [],
  fetchCourses: async () => {
    try {
      set({ isLoading: true });
      const res = await axiosnInstance.get("/courses");
      if (res.data.success) {
        set({ courses: res.data.data, isLoading: false });
        return {
          message: res.data.message,
          success: res.data.success,
        };
      } else {
        throw new Error("Failed to fetch courses");
      }
    } catch (error: any) {
      return {
        message: error.message || error.response.data.message,
        success: false,
      };
    }
  },
  setCourses(courses) {},
  addCourse: async (course, file) => {
    try {
      set({isLoading : true})
      const {
        name,
        description,
        price,
        isComplete,
        status,
        discount,
        categoryID,
        shortName,
        body
      } = course;
      if (
        !name ||
        !description ||
        isNaN(price as number) ||
        !status ||
        !categoryID ||
        !shortName ||
        !body
      ) {
        throw new Error("Please fill all required fields");
      }

      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price?.toString() || "0");
      formData.append("isComplete", isComplete?.toString() || "0");
      formData.append("status", status);
      formData.append("discount", discount?.toString() || "0");
      formData.append("categoryID", categoryID);
      formData.append("shortName", shortName);
      formData.append("body", body);

      if (file) {
        formData.append("file", file);
      }

      const res = await axiosnInstance.post("/courses", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (res.data.success) {
        set({ courses: [...get().courses, res.data.data] , isLoading : false });
        return { message: res.data.message, success: true };
      } else {
        throw new Error(res.data.message || "Failed to add course");
      }
    } catch (error: any) {
      console.log(error);
      return {
        message: error.response?.data?.message || error.message,
        success: false,
      };
    }finally{
      set({ isLoading : false})
    }
  },

  deleteCourse : async (id) => {
    try {
      set({isLoading : true})
      if (!id){
        throw new Error("No course id provided");
      }
      const res = await axiosnInstance.delete(`/courses/${id}`);
      if (res.data.success) {
        set({ courses: get().courses.filter(c => c.id !== id) , isLoading : false });
        return { message: res.data.message, success: true };
      }else{
        throw new Error(res.data.message || "Failed to delete course");
      }
    } catch (error : any) {
      return {
        message: error.response?.data?.message || error.message,
        success: false,
      }
    }
  },
  editCourse : async (id , data) => {
    try {
    set({isLoading : true})
    if (!id){
      throw new Error("No course id provided");
    }
    const {name , shortName , description , price , discount} = data
    if (!name?.trim() && shortName?.trim() && description?.trim() && !price){
      throw new Error("Please fill all fields");
    }
    const res = await axiosnInstance.put(`/courses/${id}`, data);
    if (res.data.success) {
      set({isLoading : false , courses : get().courses.map(course=>course.id === id ? {...course , data} : course)})
      return { message: res.data.message, success: true };
    }else{
      throw new Error(res.data.message || "Failed to edit course");
    }
    } catch (error : any) {
      return{
        message: error.response?.data?.message || error.message,
        success: false,
      }
    }
  },
  getSingleCourse : async (id : string)=>{
    try {
      set({isLoading : true})
      if (!id){
        throw new Error("No course id provided");
      }
      const res = await axiosnInstance.get(`/courses/${id}`);
      if (res.data.success) {
        set({ mainCourse: res.data.data, isLoading: false });
        return { message: res.data.message, success: true };
      }else{
        throw new Error(res.data.message || "Failed to fetch course");
      }
    } catch (error : any) {
      return {
        message: error.response?.data?.message || error.message,
        success: false,
      }
    }
  },
  fetchRelatedCourses: async (id : string) => {
    try {
      set({ isLoading: true });
      if (!id) throw new Error("No course id provided");
      const res = await axiosnInstance.get(`/courses/${id}/related`);
      if (res.data.success) {
        set({ relatedCourses: res.data.data , isLoading : false });
        return { message: res.data.message, success: true };
      }else{
        throw new Error(res.data.message || "Failed to fetch related courses");
      }
    } catch (error : any) {
      return {
        message: error.response?.data?.message || error.message,
        success : false
      }
    }finally{
      set({ isLoading : false })
    }
  }
}));
