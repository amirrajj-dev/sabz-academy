import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useCourseStore } from "@/store/course.store";

const CourseMaster = () => {
  const {mainCourse} = useCourseStore()
  return (
    <div className="flex flex-col items-center gap-3 bg-base-100 p-4 rounded-lg shadow-md w-full">
      <Image
        src="https://secure.gravatar.com/avatar/0cccb973498c58ccaba87ac7ad608f70?s=96&d=mm&r=g"
        alt={`Master  ${mainCourse?.creator?.name} Profile`}
        width={80}
        height={80}
        className="rounded-full border border-gray-300"
      />

      <span className="text-lg font-semibold text-base-content">{mainCourse?.creator?.name}</span>

      <Link href={''} className="btn btn-success btn-sm w-full">مشاهده پروفایل</Link>
    </div>
  );
};

export default CourseMaster;