"use server";
import axiosnInstance from "@/configs/axios";
import { cookies } from "next/headers";

export const getSingleArticle = async (articleName : string) => {
  try {
    const res = await axiosnInstance.get(`/articles/${articleName}`);
    console.log(res);
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};