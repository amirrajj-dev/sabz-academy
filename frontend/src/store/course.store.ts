import { create } from "zustand";
import { ICourse } from "@/interfaces/types";
import axiosnInstance from "@/configs/axios";

interface CourseStore {
  courses: ICourse[];
  fetchCourses: () => Promise<{ message: string; success: boolean }>;
  setCourses: (courses: ICourse[]) => void;
  addCourse: (
    course: Partial<ICourse>,
    file: File
  ) => Promise<{ message: string; success: boolean }>;
  deleteCourse: (id: string) => void;
  editCourse: (id: string) => void;
  isLoading: boolean;
}

export const useCourseStore = create<CourseStore>((set, get) => ({
  courses: [],
  isLoading: false,
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
        !price ||
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
console.log(res);
      if (res.data.success) {
        set({ courses: [...get().courses, res.data.data] });
        return { message: res.data.message, success: true };
      } else {
        throw new Error(res.data.message || "Failed to add course");
      }
    } catch (error: any) {
      return {
        message: error.response?.data?.message || error.message,
        success: false,
      };
    }
  },

  deleteCourse(id) {},
  editCourse(id) {},
}));
