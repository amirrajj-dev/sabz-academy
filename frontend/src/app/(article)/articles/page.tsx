"use client";
import SortOptions from "@/components/courses/SortOptions";
import SectionHeader from "@/components/shared/SectionHeader";
import ArticleCardSkeleton from "@/components/skeletons/ArticleCardSkeleton";
import ArticleCard from "@/components/ui/ArticleCard";
import { useArticleStore } from "@/store/article.store";
import React, { useEffect, useState } from "react";
import { FaArrowDown, FaArrowUp, FaSearch } from "react-icons/fa";

const sortingOptions = [
  {
    label: "جدیدترین",
    key: "priceAsc",
    icon: <FaArrowDown className="text-lg" />,
  },
  {
    label: "قدیمی ترین",
    key: "priceDesc",
    icon: <FaArrowUp className="text-lg" />,
  },
];

const page = () => {
  const { articles, fetchArticles , isLoading } = useArticleStore();
  const [selectedSort, setSelectedSort] = useState("");
  useEffect(() => {
    fetchArticles();
  }, []);
  return (
    <div className="max-w-7xl mx-auto my-20 flex flex-col gap-6 px-4">
      <div className="flex flex-col items-start sm:flex-row sm:items-center justify-between">
        <SectionHeader
          title="مقاله ها"
          squareColor="bg-warning"
          desc=""
          haveLink={false}
          linkText=""
          linkUrl=""
        />
        <span className="text-2xl text-base-content text-nowrap">
          {articles.length} مقاله
        </span>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="relative mb-4 flex-1">
          <FaSearch className="absolute left-3 text-lg top-7 text-gray-500" />
          <input
            type="text"
            placeholder="جستجوی بین مقاله ها"
            className="input w-full pl-10 bg-base-300 border-none rounded-lg shadow-md h-19.5 focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="lg:w-3/4 w-full">
          <SortOptions
            selectedSort={selectedSort}
            setSelectedSort={setSelectedSort}
            sortingOptions={sortingOptions}
          />
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {isLoading ? (
        Array.from({ length: 6 }).map((_, index) => (
          <ArticleCardSkeleton key={index} />
        ))
      ) : articles.length > 0 ? (
        articles.map((article) => <ArticleCard key={article.id} article={article} />)
      ) : (
        <p></p>
      )}
    </div>
        </div>
      </div>
    </div>
  );
};

export default page;
