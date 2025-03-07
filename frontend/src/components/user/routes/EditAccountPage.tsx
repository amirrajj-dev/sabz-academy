'use client'
import { useAuthStore } from "@/store/auth.store";
import Image from "next/image";
import React, { useEffect } from "react";
import { TbCameraPlus } from "react-icons/tb";

const EditAccountPage = () => {
  const {user , getMe} = useAuthStore()
  useEffect(()=>{
    getMe()
  } , [])
  return (
    <div className="flex flex-col lg:flex-row items-start gap-6 mt-10 p-4">
      <div className="w-full lg:w-3/5 bg-base-300 p-6 rounded-md shadow-md">
        <h2 className="text-xl font-dana-demi mb-4">جزییات حساب کاربری</h2>
        <div className="divider divide-base-100 mb-6" />
        <div className="flex flex-col gap-6">
          <div className="relative w-fit mx-auto">
            <Image
              src={
                "https://secure.gravatar.com/avatar/59cdb83049569198d15c47f81f23da74?s=96&d=mm&r=g"
              }
              width={150}
              height={150}
              className="rounded-full"
              alt="user logo"
            />
            <div className="absolute bottom-0 right-0 w-12 h-12 rounded-full">
              <div className="w-full h-full relative">
                <button className="btn btn-primary btn-lg border-4 border-base-300 btn-circle">
                  <TbCameraPlus />
                </button>
                <input
                  type="file"
                  accept="image/png"
                  aria-label="hidden"
                  className="w-full h-full absolute bottom-0 right-0 opacity-0"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-400">شماره موبایل</label>
              <input
                type="text"
                className="input border-none w-full"
                placeholder="شماره موبایل"
                defaultValue={user?.phone}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-400">نام کاربری</label>
              <input
                type="text"
                className="input border-none w-full"
                placeholder="نام کاربری"
                defaultValue={user?.username}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-400">ایمیل</label>
              <input
                type="email"
                className="input border-none w-full"
                placeholder="ایمیل"
                defaultValue={user?.email}
              />
            </div>
            <button className="btn btn-primary w-full mt-4">ثبت اطلاعات</button>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-2/5 bg-base-300 p-6 rounded-md shadow-md">
        <h2 className="text-xl font-dana-demi mb-4">تغییر رمز عبور</h2>
        <div className="divider divide-base-100 mb-6" />
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-400">رمز عبور فعلی</label>
            <input
              type="password"
              placeholder="رمز فعلی را وارد کنید"
              className="input border-none w-full"
            />
            <a href="#" className="text-sm text-primary hover:underline">
              رمز عبور را فراموش کرده اید؟
            </a>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-400">رمز عبور جدید</label>
            <input
              type="password"
              placeholder="رمز جدید را وارد کنید"
              className="input border-none w-full"
            />
          </div>
          <button className="btn btn-primary w-full mt-4">تغییر رمز</button>
        </div>
      </div>
    </div>
  );
};

export default EditAccountPage;