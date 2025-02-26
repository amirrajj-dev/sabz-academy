'use client'
import React, { useState } from "react";
import { motion } from "framer-motion";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

interface Category {
  id: number;
  name: string;
}

const categories: Category[] = [
  { id: 1, name: "تکنولوژی" },
  { id: 2, name: "ورزش" },
  { id: 3, name: "سلامت" },
];

const CourseForm = () => {
  const [title, setTitle] = useState<string>("");
  const [link, setLink] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [abstract, setAbstract] = useState<string>("<p>چکیده دوره</p>");
  const [category, setCategory] = useState<string>("");
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [isDraft, setIsDraft] = useState<boolean>(false);

  return (
    <div className="bg-base-100 p-6 rounded-xl shadow-lg mb-6">
      <h2 className="text-xl font-bold text-base-content mb-4">
        اضافه کردن دوره
      </h2>
      <div className="space-y-4">
        <div className="flex flex-col gap-2">
          <label className="label">
            <span className="font-medium">عنوان</span>
          </label>
          <input
            type="text"
            placeholder="عنوان دوره"
            className="input w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="label">
            <span className="font-medium">لینک</span>
          </label>
          <input
            type="text"
            placeholder="لینک دوره"
            className="input w-full"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="label">
            <span className="font-medium">توضیحات دوره</span>
          </label>
          <textarea
            className="textarea w-full"
            placeholder="توضیحات دوره"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="label">
            <span className="font-medium">چکیده دوره</span>
          </label>
          <CKEditor
            editor={ClassicEditor}
            data={abstract}
            onChange={(event, editor) => setAbstract(editor.getData())}
            config={{
              language: "fa",
            }}
            className="bg-base-300"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="label">
            <span className="font-medium">انتخاب کاور عکس</span>
          </label>
          <input
            type="file"
            className="file-input file-input-bordered w-full"
            onChange={(e) =>
              setCoverImage(e.target.files ? e.target.files[0] : null)
            }
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="label">
            <span className="font-medium">دسته بندی دوره</span>
          </label>
          <select
            className="select w-full"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">انتخاب دسته بندی</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="label">
            <span className="font-medium">نحوه پشتیبانی دوره</span>
          </label>
          <select
            className="select w-full"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">انتخاب نحوه پشتیانی</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn btn-primary mt-4"
        >
          اضافه کردن دوره
        </motion.button>
      </div>
    </div>
  );
};

export default CourseForm;