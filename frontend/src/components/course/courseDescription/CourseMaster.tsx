import React from "react";
import Image from "next/image";
import Link from "next/link";

const CourseMaster = () => {
  return (
    <div className="flex flex-col items-center gap-3 bg-base-100 p-4 rounded-lg shadow-md w-full">
      <Image
        src="https://secure.gravatar.com/avatar/50db59beddbfed36a1646dae99ca7b2d?s=96&d=mm&r=g"
        alt="Master Profile"
        width={80}
        height={80}
        className="rounded-full border border-gray-300"
      />

      <span className="text-lg font-semibold text-base-content">محمد امین سعیدی راد</span>

      <Link href={''} className="btn btn-success btn-sm w-full">مشاهده پروفایل</Link>
    </div>
  );
};

export default CourseMaster;