"use client";
import React, { useRef } from "react";
import SectionHeader from "../shared/SectionHeader";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import { courses } from "@/data/data";
import CourseCard from "../shared/CourseCard";
import { Swiper as SwiperType } from "swiper";
import PrevBtn from "./PrevBtn";
import NextBtn from "./NextbBtn";

const NewestCourses = () => {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <div className="mt-20 relative">
      <SectionHeader
        title="جدیدترین دوره ها"
        desc="یادگیری و رشد توسعه فردی"
        haveLink={false}
        linkText=""
        linkUrl=""
        squareColor="bg-cyan-500"
      />

      <div className="flex justify-center gap-4 mt-4 sm:absolute sm:top-8 sm:left-4 sm:mt-0">
        <NextBtn swiperRef={swiperRef} />
        <PrevBtn swiperRef={swiperRef} />
      </div>

      <div className="p-4">
        <Swiper
          spaceBetween={20}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop
          modules={[Autoplay]}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 }
          }}
        >
          {courses.map((course, index) => (
            <SwiperSlide key={index}>
              <CourseCard course={course} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default NewestCourses;