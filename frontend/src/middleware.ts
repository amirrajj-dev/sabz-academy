import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import axiosnInstance from "./configs/axios";
import { IUser } from "./interfaces/types";

export async function middleware(request: NextRequest) {
  console.log("middleware executed:", request.nextUrl.pathname);

  const token = request.cookies.get("sabz-token")?.value;

  if (token) {
    try {
      const res = await axiosnInstance.get("/auth/me", {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        baseURL: "http://localhost:5000/api",
      });
      const user: IUser = res.data.user;
      console.log('User:', user);

      if (request.nextUrl.pathname.startsWith("/sign") && user.name) {
        console.log("Redirecting to /");
        return NextResponse.redirect(new URL("/", request.url));
      }

      if (
        request.nextUrl.pathname.startsWith("/admin") &&
        user.role !== "ADMIN"
      ) {
        console.log("Redirecting to /");
        return NextResponse.redirect(new URL("/", request.url));
      }
    } catch (error) {
      console.log('Error fetching user:', error);
      return NextResponse.next();
    }
  }else{
    if (request.nextUrl.pathname.startsWith("/admin")){
        console.log("Redirecting to /");
        return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/signup", "/signin", "/admin-pannel"],
};