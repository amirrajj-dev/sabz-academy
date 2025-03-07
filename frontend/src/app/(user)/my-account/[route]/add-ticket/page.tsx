import React from "react";

const AddTicket = () => {
  return (
    <div className="p-6 bg-base-300 rounded-md shadow-md max-w-2xl mx-auto">
      <h1 className="text-2xl font-dana-demi mb-6 text-center">ارسال تیکت</h1>

      <form className="space-y-6">
        <div className="flex flex-col gap-2">
          <label className="label">
            <span className="text-base-content">دپارتمان</span>
          </label>
          <select className="select border-none w-full">
            <option disabled selected>
              دپارتمان مورد نظر...
            </option>
            <option>پشتیبانی فنی</option>
            <option>مالی</option>
            <option>فروش</option>
            <option>دیگر</option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="label">
            <span className="text-base-content">نوع تیکت</span>
          </label>
          <select className="select border-none w-full">
            <option disabled selected>
              نوع تیکت را انتخاب کنید
            </option>
            <option>مشکل</option>
            <option>درخواست</option>
            <option>پیشنهاد</option>
            <option>سوال</option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="label">
            <span className="text-base-content">عنوان تیکت</span>
          </label>
          <input
            type="text"
            placeholder="عنوان تیکت"
            className="input border-none w-full"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="label">
            <span className="text-base-content">الویت تیکت</span>
          </label>
          <select className="select border-none w-full">
            <option disabled selected>
              الویت تیکت را انتخاب کنید
            </option>
            <option>کم</option>
            <option>متوسط</option>
            <option>بالا</option>
            <option>فوری</option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="label">
            <span className="text-base-content">محتوای تیکت</span>
          </label>
          <textarea
            placeholder="محتوای تیکت را وارد کنید"
            className="textarea border-none w-full h-32"
          />
        </div>
        <div className="flex flex-col gap-2 mt-8">
          <button type="submit" className="btn btn-primary w-full">
            ارسال
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTicket;