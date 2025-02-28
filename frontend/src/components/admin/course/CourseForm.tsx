"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useCategoriesStore } from "@/store/category.store";
import { useCourseStore } from "@/store/course.store";
import { toast } from "react-toastify";
import { toastOptions } from "@/helpers/toastOptions";

const CourseForm = () => {
  const { categories, fetchCategories } = useCategoriesStore();
  const {addCourse , isLoading , fetchCourses} = useCourseStore()
  const [formState, setFormState] = useState({
    title: "",
    link: "",
    description: "",
    abstract: "<p>چکیده دوره</p>",
    category: "",
    price : "",
    supportType: "",
    coverImage: null as File | null,
    isDraft: false,
  });

  useEffect(() => {
    fetchCategories();
  }, []);

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
    if (!formState.title.trim() || !formState.description.trim() || !formState.category) {
      toast.error("لطفا تمام فیلد ها را پر کنید", toastOptions);
      return;
    }
  
    try {
      console.log(formState);
      const res = await addCourse({
        name: formState.title,
        description: formState.description,
        categoryID: formState.category,
        shortName: formState.link,
        status: "active",
        body : formState.abstract,
        price: +formState.price || 0,
        discount: 0,
        isComplete: 0,
      }, formState.coverImage as File);

      console.log(res);
  
      if (res.success) {
        toast.success("دوره با موفقیت افزوده شد." , toastOptions);
        setFormState({
          title: "",
          link: "",
          description: "",
          abstract: "<p>چکیده دوره</p>",
          category: "",
          supportType: "",
          coverImage: null,
          isDraft: false,
          price : ""
        });
        fetchCourses(); // update courses list after adding new course  (if needed)
      } else {
        toast.error("خطا در افزودن دوره لطفا دوباره تلاش کنید", toastOptions);
      }
    } catch (error : any) {
      toast.error(error.message, toastOptions);
    }
  };
  


  return (
    <div className="bg-base-100 p-6 rounded-xl shadow-lg mb-6">
      <h2 className="text-xl font-bold text-base-content mb-4">
        اضافه کردن دوره
      </h2>

      <div className="space-y-4">
        <div className="flex flex-col gap-2">
          <label className="label"><span className="font-medium">عنوان</span></label>
          <input type="text" name="title" placeholder="عنوان دوره" className="input w-full" value={formState.title} onChange={handleChange} />
        </div>

        <div className="flex flex-col gap-2">
          <label className="label"><span className="font-medium">لینک</span></label>
          <input type="text" name="link" placeholder="لینک دوره" className="input w-full" value={formState.link} onChange={handleChange} />
        </div>

        <div className="flex flex-col gap-2">
          <label className="label">
            <span className="font-medium">قیمت</span>
          </label>
          <input
            type="number"
            name="price"
            placeholder="قیمت دوره"
            className="input w-full"
            value={formState.price}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="label"><span className="font-medium">توضیحات دوره</span></label>
          <textarea name="description" className="textarea w-full" placeholder="توضیحات دوره" value={formState.description} onChange={handleChange} />
        </div>

        <div className="flex flex-col gap-2">
          <label className="label"><span className="font-medium">چکیده دوره</span></label>
          <CKEditor editor={ClassicEditor} data={formState.abstract} onChange={handleEditorChange} config={{ language: "fa" }} className="bg-base-300" />
        </div>

        <div className="flex flex-col gap-2">
          <label className="label"><span className="font-medium">انتخاب کاور عکس</span></label>
          <input type="file" className="file-input file-input-bordered w-full" onChange={handleFileChange} />
        </div>

        <div className="flex flex-col gap-2">
          <label className="label"><span className="font-medium">دسته بندی دوره</span></label>
          <select name="category" className="select w-full" value={formState.category} onChange={handleChange}>
            <option value="">انتخاب دسته بندی</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="label"><span className="font-medium">نحوه پشتیبانی دوره</span></label>
          <select name="supportType" className="select w-full" value={formState.supportType} onChange={handleChange}>
            <option value="">انتخاب نحوه پشتیبانی</option>
            <option value="آنلاین">آنلاین</option>
            <option value="حضوری">حضوری</option>
          </select>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn btn-primary mt-4"
          onClick={handleSubmit}
        >
          اضافه کردن دوره
        </motion.button>
      </div>
    </div>
  );
};

export default CourseForm;