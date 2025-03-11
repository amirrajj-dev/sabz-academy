"use server";
import axiosnInstance from "@/configs/axios";
import { cookies } from "next/headers";

export const getSingleCourse = async (courseName : string) => {
  try {
    const res = await axiosnInstance.get(`/courses/${courseName}`);
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};