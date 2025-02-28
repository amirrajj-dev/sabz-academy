import { create } from "zustand";
import { ICourse } from "@/interfaces/types";
import axiosnInstance from "@/configs/axios";

interface CourseStore {
    courses: ICourse[];
    fetchCourses: () => Promise<{ message: string; success: boolean }>;
    setCourses: (courses: ICourse[]) => void;
    addCourse : (course : Partial<ICourse>)=>void
    deleteCourse : (id : string)=>void
    editCourse : (id : string) => void
    isLoading : boolean
}

export const useCourseStore = create<CourseStore>((set, get) => ({
    courses: [],
    isLoading: false,
    fetchCourses : async ()=> {
        try {
            set({isLoading: true});
            const res = await axiosnInstance.get("/courses");
            if (res.data.success){
                set({courses: res.data.data, isLoading: false});
                return {
                    message: res.data.message,
                    success: res.data.success,
                };
            }else{
                throw new Error("Failed to fetch courses");
            }
        } catch (error : any) {
            return {
                message: error.message || error.response.data.message,
                success: false,
            }
        }
    },
    setCourses(courses) {
        
    }, 
    addCourse(course) {
        
    },
    deleteCourse(id) {
        
    },
    editCourse(id) {
        
    },
}))