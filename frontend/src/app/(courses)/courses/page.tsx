"use client";
import React, { use, useEffect, useState } from "react";
import SectionHeader from "@/components/shared/SectionHeader";
import { FaArrowDown, FaArrowUp, FaFire } from "react-icons/fa";
import { useCourseStore } from "@/store/course.store";
import { useCategoriesStore } from "@/store/category.store";
import CourseCardSkeleton from "@/components/skeletons/CourseCardSkeleton";
import { ICourse } from "@/interfaces/types";
import FilterSidebar from "@/components/courses/FilterSideBar";
import NoCoursesMessage from "@/components/courses/NoCoursesMessage";
import CourseGrid from "@/components/courses/CourseGrid";
import SortOptions from "@/components/shared/SortOptions";

const sortingOptions = [
  {
    label: "ارزان ترین",
    key: "priceAsc",
    icon: <FaArrowDown className="text-lg" />,
  },
  {
    label: "گران ترین",
    key: "priceDesc",
    icon: <FaArrowUp className="text-lg" />,
  },
  {
    label: "پرمخاطب ها",
    key: "popular",
    icon: <FaFire className="text-lg text-red-500" />,
  },
];

interface CoursesPageProps {
  params: Promise<void>;
  searchParams: Promise<{ sort: string }>;
}

const CoursesPage = ({ params, searchParams }: CoursesPageProps) => {
  const [selectedSort, setSelectedSort] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [sortedCourses, setSortedCourses] = useState<ICourse[]>([]);
  const [visibleCourses, setVisibleCourses] = useState(6); // Track visible courses
  const { sort: sortQuery } = use(searchParams);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isFree, setIsFree] = useState(false);
  const [isPreSale, setIsPreSale] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const { courses, fetchCourses, isLoading } = useCourseStore();
  const { categories, fetchCategories } = useCategoriesStore();

  useEffect(() => {
    fetchCourses();
    fetchCategories();
    if (sortQuery && sortQuery === "popular") {
      setSelectedSort(sortQuery);
    } else if (sortQuery && sortQuery === "free") {
      setIsFree(true);
    } else if (sortQuery === "expensive") {
      setSelectedSort("priceDesc");
    } else if (sortQuery === "cheapest") {
      setSelectedSort("priceAsc");
    } else if (sortQuery === "presale") {
      setIsPreSale(true);
    }
  }, []);

  useEffect(() => {
    if (courses.length > 0) {
      filterAndSortCourses();
    }
  }, [selectedSort, courses, isFree, isPreSale, selectedCategories, searchQuery]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 550
      ) {
        if (visibleCourses < sortedCourses.length) {
          setVisibleCourses((prev) => prev + 6);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [visibleCourses, sortedCourses]);

  const filterAndSortCourses = () => {
    let filteredCourses = [...courses];
    if (isFree) {
      filteredCourses = filteredCourses.filter((course) => course.price === 0);
    }

    if (isPreSale) {
      filteredCourses = filteredCourses.filter(
        (course) => course.status === "pre-sale"
      );
    }

    if (selectedCategories.length > 0) {
      filteredCourses = filteredCourses.filter((course) =>
        selectedCategories.includes(course.categoryID)
      );
    }

    if (selectedSort === "priceAsc") {
      filteredCourses.sort((a, b) => a.price - b.price);
    } else if (selectedSort === "priceDesc") {
      filteredCourses.sort((a, b) => b.price - a.price);
    } else if (selectedSort === "popular") {
      filteredCourses.sort((a, b) => b?.comments?.length - a?.comments?.length);
    }

    if (searchQuery.length > 0) {
      filteredCourses = filteredCourses.filter(
        (course) =>
          course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setSortedCourses(filteredCourses);
  };

  const handleCategoryChange = (categoryID: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryID)
        ? prev.filter((id) => id !== categoryID)
        : [...prev, categoryID]
    );
  };

  return (
    <div className="max-w-7xl mx-auto my-20 flex flex-col gap-6 px-4">
      <div className="flex flex-col items-start sm:flex-row sm:items-center justify-between">
        <SectionHeader
          title="دوره ها"
          squareColor="bg-warning"
          desc=""
          haveLink={false}
          linkText=""
          linkUrl=""
        />
        <span className="text-2xl text-base-content text-nowrap">
          {sortedCourses.length} عنوان دوره آموزشی
        </span>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <FilterSidebar
          expanded={expanded}
          setExpanded={setExpanded}
          categories={categories}
          isFree={isFree}
          isPreSale={isPreSale}
          setIsFree={setIsFree}
          setIsPreSale={setIsPreSale}
          selectedCategories={selectedCategories}
          handleCategoryChange={handleCategoryChange}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        <div className="lg:w-3/4 w-full">
          <SortOptions
            selectedSort={selectedSort}
            setSelectedSort={setSelectedSort}
            sortingOptions={sortingOptions}
          />
          <CourseGrid
            isLoading={isLoading}
            sortedCourses={sortedCourses.slice(0, visibleCourses)}
            hasMoreCourses={visibleCourses < sortedCourses.length} 
          />
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;