"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useCategoriesStore } from "@/store/category.store";
import { useCourseStore } from "@/store/course.store";
import { toast } from "react-toastify";
import { toastOptions } from "@/helpers/toastOptions";
import InputField from "./ui/InputField";
import TextAreaField from "./ui/TextAreaField";
import FileInput from "./ui/FileInput";
import SelectInput from "./ui/SelectInput";
import EditorInput from "./ui/EditorInput";

const CourseForm = () => {
  const { categories, fetchCategories } = useCategoriesStore();
  const { addCourse, isLoading, fetchCourses } = useCourseStore();
  
  const [formState, setFormState] = useState({
    title: "",
    link: "",
    description: "",
    abstract: "<p>چکیده دوره</p>",
    category: "",
    price: "",
    supportType: "",
    coverImage: null as File | null,
    isDraft: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    fetchCategories();
  }, []);

  const validateForm = () => {
    let newErrors: Record<string, string> = {};

    if (!formState.title.trim()) newErrors.title = "عنوان دوره الزامی است";
    if (!formState.link.trim()) newErrors.link = "لینک دوره الزامی است";
    if (!formState.description.trim()) newErrors.description = "توضیحات دوره الزامی است";
    if (!formState.abstract.trim()) newErrors.abstract = "چکیده دوره الزامی است";
    if (!formState.category) newErrors.category = "لطفا یک دسته بندی انتخاب کنید";
    if (!formState.price.trim() || isNaN(Number(formState.price)) || Number(formState.price) < 0) newErrors.price = "قیمت معتبر نیست";
    if (!formState.coverImage) newErrors.coverImage = "لطفا یک تصویر انتخاب کنید";
    else if (formState.coverImage.size > 5 * 1024 * 1024)
      newErrors.coverImage = "حجم فایل نباید بیش از 5 مگابایت باشد";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditorChange = (event: any, editor: any) => {
    const data = editor.getData();
    setFormState((prev) => ({ ...prev, abstract: data }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState((prev) => ({
      ...prev,
      coverImage: e.target.files ? e.target.files[0] : null,
    }));
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      const res = await addCourse({
        name: formState.title,
        description: formState.description,
        categoryID: formState.category,
        shortName: formState.link,
        status: "active",
        body: formState.abstract,
        price: +formState.price || 0,
        discount: 0,
        isComplete: 0,
      }, formState.coverImage as File);

      if (res.success) {
        await fetchCourses()
        toast.success("دوره با موفقیت افزوده شد.", toastOptions);
        setFormState({
          title: "",
          link: "",
          description: "",
          abstract: "<p>چکیده دوره</p>",
          category: "",
          supportType: "",
          coverImage: null,
          isDraft: false,
          price: ""
        });
        setErrors({});
        fetchCourses();
      } else {
        toast.error("خطا در افزودن دوره لطفا دوباره تلاش کنید", toastOptions);
      }
    } catch (error: any) {
      toast.error(error.message, toastOptions);
    }
  };

  return (
    <div className="bg-base-100 p-6 rounded-xl shadow-lg mb-6">
      <h2 className="text-xl font-bold text-base-content mb-4">اضافه کردن دوره</h2>

      <div className="space-y-4">
        <InputField label="عنوان" name="title" placeholder="عنوان دوره" value={formState.title} onChange={handleChange} error={errors.title} />
        <InputField label="لینک" name="link" placeholder="لینک دوره" value={formState.link} onChange={handleChange} error={errors.link} />
        <InputField label="قیمت" name="price" type="number" placeholder="قیمت دوره" value={formState.price} onChange={handleChange} error={errors.price} />
        <TextAreaField label="توضیحات دوره" name="description" placeholder="توضیحات دوره" value={formState.description} onChange={handleChange} error={errors.description} />
        <EditorInput label="چکیده دوره" data={formState.abstract} onChange={handleEditorChange} error={errors.abstract} />
        <FileInput label="انتخاب کاور عکس" onChange={handleFileChange} error={errors.coverImage} />
        <SelectInput label="دسته بندی دوره" name="category" value={formState.category} onChange={handleChange} options={categories.map(cat => ({ value: cat.id, label: cat.name }))} error={errors.category} />
        <SelectInput label="نحوه پشتیبانی دوره" name="supportType" value={formState.supportType} onChange={handleChange} options={[{ value: "آنلاین", label: "آنلاین" }, { value: "حضوری", label: "حضوری" }]} />

        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="btn btn-primary mt-4" onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? "در حال ارسال..." : "اضافه کردن دوره"}
        </motion.button>
      </div>
    </div>
  );
};

export default CourseForm;