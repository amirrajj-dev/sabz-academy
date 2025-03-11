"use client";
import React, { use, useCallback, useEffect, useMemo, useState } from "react";
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
import { useDebounce } from "@/hooks/useDobounce";

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
  const [visibleCourses, setVisibleCourses] = useState(6);
  const { sort: sortQuery } = use(searchParams);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isFree, setIsFree] = useState(false);
  const [isPreSale, setIsPreSale] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const { courses, fetchCourses, isLoading } = useCourseStore();
  const { categories, fetchCategories } = useCategoriesStore();

  const memoizedCategories = useMemo(() => categories, [categories]);

  useEffect(() => {
    fetchCourses();
    fetchCategories();
  }, []);

  useEffect(() => {
    if (sortQuery) {
      switch (sortQuery) {
        case "popular":
          setSelectedSort("popular");
          break;
        case "free":
          setIsFree(true);
          break;
        case "expensive":
          setSelectedSort("priceDesc");
          break;
        case "cheapest":
          setSelectedSort("priceAsc");
          break;
        case "presale":
          setIsPreSale(true);
          break;
        default:
          const category = categories.find(c => c.title === sortQuery);
          if (category) setSelectedCategories([category.id]);
          break;
      }
    }
  }, [sortQuery, categories]);

  const sortedCourses = useMemo(() => {
    let filteredCourses = [...courses];

    filteredCourses = filteredCourses.filter(course => {
      const matchesCategory = selectedCategories.length === 0 || 
        selectedCategories.includes(course.categoryID);
      const matchesPrice = !isFree || course.price === 0;
      const matchesPresale = !isPreSale || course.status === "pre-sale";
      
      return matchesCategory && matchesPrice && matchesPresale;
    });

    if (debouncedSearchQuery) {
      const lowerQuery = debouncedSearchQuery.toLowerCase();
      filteredCourses = filteredCourses.filter(course => {
        const category = categories.find(c => c.id === course.categoryID);
        return (
          course.name.toLowerCase().includes(lowerQuery) ||
          course.description.toLowerCase().includes(lowerQuery) ||
          category?.name.toLowerCase().includes(lowerQuery)
        );
      });
    }

    switch (selectedSort) {
      case "priceAsc":
        return [...filteredCourses].sort((a, b) => a.price - b.price);
      case "priceDesc":
        return [...filteredCourses].sort((a, b) => b.price - a.price);
      case "popular":
        return [...filteredCourses].sort(
          (a, b) => (b.comments?.length || 0) - (a.comments?.length || 0)
        );
      default:
        return filteredCourses;
    }
  }, [courses, selectedSort, isFree, isPreSale, selectedCategories, debouncedSearchQuery, categories]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 550) {
        setVisibleCourses(prev => Math.min(prev + 6, sortedCourses.length));
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sortedCourses.length]);

  const handleCategoryChange = useCallback((categoryID: string) => {
    setSelectedCategories(prev =>
      prev.includes(categoryID)
        ? prev.filter(id => id !== categoryID)
        : [...prev, categoryID]
    );
  }, []);

  const memoizedSortingOptions = useMemo(() => sortingOptions, []);

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
          categories={memoizedCategories}
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
            sortingOptions={memoizedSortingOptions}
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

export default React.memo(CoursesPage);