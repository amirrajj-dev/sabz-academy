"use server";
import axiosnInstance from "@/configs/axios";
import { cookies } from "next/headers";

export const getUser = async (t? : string) => {
  try {
    const cokkiesStore = await cookies();
    const token = t || cokkiesStore.get("sabz-token")?.value;
    const res = await axiosnInstance.get("/auth/me", {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      baseURL: "http://localhost:5000/api",
    });
    return res.data.user;
  } catch (error) {
    console.log(error);
  }
};
