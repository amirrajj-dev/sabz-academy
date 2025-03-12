'use client'
import React from 'react';
import { AiFillDollarCircle } from 'react-icons/ai';
import { FaMoneyCheck } from 'react-icons/fa';
import { SlRocket } from 'react-icons/sl';
import UserPannelCard from '../shared/UserPannelCard';
import { useAuthStore } from '@/store/auth.store';
import CourseCard from '@/components/shared/CourseCard';
import CourseCardSkeleton from '@/components/skeletons/CourseCardSkeleton';
import Link from 'next/link';

const UserCoursesPage = () => {
  const { user, isLoading } = useAuthStore();

  const cardsData = [
    {
      title: 'دوره های ثبت نام شده',
      desc: 'تومان',
      length: 0,
      bgColor: 'bg-blue-500',
      icon: <SlRocket />,
    },
    {
      title: 'دوره های نقدی',
      desc: 'دوره',
      length: 0,
      bgColor: 'bg-purple-500',
      icon: <FaMoneyCheck />,
    },
    {
      title: 'دوره های رایگان',
      desc: 'تیکت',
      length: 0,
      bgColor: 'bg-green-500',
      icon: <AiFillDollarCircle />,
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
        {cardsData.map((card, index) => (
          <UserPannelCard
            key={index}
            title={card.title}
            desc={card.desc}
            length={card.length}
            bgColor={card.bgColor}
            icon={card.icon}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
        {isLoading ? (
          Array(4)
            .fill(0)
            .map((_, index) => <CourseCardSkeleton key={index + 1} />)
        ) : user?.courses && user.courses.length > 0 ? (
          user.courses.map((course) => (
            <CourseCard course={course} key={course.id} />
          ))
        ) : (
          <div className="col-span-full flex flex-col gap-4 items-center justify-center py-10">
            <p className="text-lg text-gray-600">شما  در هیچ دوره ای ثبت نام نکرده اید</p>
            <Link
              className="btn btn-lg btn-soft btn-primary"
             href={'/courses'}
            >
              مشاهده دوره‌ها
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCoursesPage;