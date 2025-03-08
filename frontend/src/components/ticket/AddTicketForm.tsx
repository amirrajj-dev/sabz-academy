"use client";
import { useTicketStore } from "@/store/ticket.store";
import React, { useState } from "react";
import { TicketPriority, TicketType } from "@/interfaces/types";
import { toast } from "react-toastify";
import { toastOptions } from "@/helpers/toastOptions";
import { FaSpinner } from "react-icons/fa";

const AddTicketForm = () => {
  const { createTicket, isLoading } = useTicketStore();
  const [formData, setFormData] = useState({
    department: "",
    type: "",
    title: "",
    priority: "",
    content: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.department ||
      !formData.type ||
      !formData.title ||
      !formData.priority ||
      !formData.content
    ) {
      toast.info("لطفا تمام فیلدها را پر کنید" , toastOptions);
      return;
    }
    const result = await createTicket({
      content: formData.content,
      department: formData.department,
      priority: formData.priority as TicketPriority,
      title: formData.title,
      type: formData.type as TicketType,
    });

    if (result.success) {
      toast.success("تیکت با موفقیت ایجاد شد" , toastOptions);
      setFormData({
        department: "",
        type: "",
        title: "",
        priority: "",
        content: "",
      });
    } else {
      toast.error("خطا در ایجاد تیکت" , toastOptions);
    }
  };

  return (
    <div className="p-6 bg-base-300 rounded-md shadow-md max-w-2xl mx-auto">
      <h1 className="text-2xl font-dana-demi mb-6 text-center">ارسال تیکت</h1>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <label className="label">
            <span className="text-base-content">دپارتمان</span>
          </label>
          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="select border-none w-full"
            required
          >
            <option disabled value="">
              دپارتمان مورد نظر...
            </option>
            <option value="پشتیبانی فنی">پشتیبانی فنی</option>
            <option value="مالی">مالی</option>
            <option value="فروش">فروش</option>
            <option value="دیگر">دیگر</option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="label">
            <span className="text-base-content">نوع تیکت</span>
          </label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="select border-none w-full"
            required
          >
            <option disabled value="">
              نوع تیکت را انتخاب کنید
            </option>
            <option value="issue">مشکل</option>
            <option value="request">درخواست</option>
            <option value="suggestion">پیشنهاد</option>
            <option value="question">سوال</option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="label">
            <span className="text-base-content">عنوان تیکت</span>
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="عنوان تیکت"
            className="input border-none w-full"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="label">
            <span className="text-base-content">الویت تیکت</span>
          </label>
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="select border-none w-full"
            required
          >
            <option disabled value="">
              الویت تیکت را انتخاب کنید
            </option>
            <option value="low">کم</option>
            <option value="medium">متوسط</option>
            <option value="high">بالا</option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="label">
            <span className="text-base-content">محتوای تیکت</span>
          </label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="محتوای تیکت را وارد کنید"
            className="textarea border-none w-full h-32"
            required
          />
        </div>

        <div className="flex flex-col gap-2 mt-8">
          <button
            type="submit"
            className="btn btn-primary w-full disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? <FaSpinner className="animate-spin transition-all duration-200" /> : "ارسال"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTicketForm;
