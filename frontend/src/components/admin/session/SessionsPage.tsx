'use client';
import React, { useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { motion } from 'framer-motion';
import AddSessionModal from '../../modals/session/AddSessionModal';
import DeleteModal from '@/components/modals/shared/DeleteModal';

const SessionsPage = () => {
  const [sessions, setSessions] = useState([
    { id: 1, title: 'جلسه مقدماتی', duration: '45 دقیقه', course: 'دوره جاوااسکریپت' },
    { id: 2, title: 'مفاهیم پیشرفته', duration: '60 دقیقه', course: 'دوره ری‌اکت' },
  ]);

  const handleDeleteSession = (id: number) => {
    setSessions(sessions.filter((session) => session.id !== id));
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row items-center justify-between">
      <h1 className="text-3xl font-extrabold text-base-content mb-6">📚 جلسات</h1>
      <AddSessionModal/>
      </div>
      <div className="shadow-lg rounded-xl overflow-x-auto">
        <table className="table bg-base-300 w-full text-center">
          <thead className="bg-base-300 text-base-content">
            <tr>
              <th className="p-4">شناسه</th>
              <th className="p-4">عنوان</th>
              <th className="p-4">تایم</th>
              <th className="p-4">دوره</th>
              <th className="p-4">حذف</th>
            </tr>
          </thead>
          <tbody>
            {sessions.map((session, index) => (
              <tr
                key={session.id}
                className={`border-b hover:bg-base-300 transition ${
                  index % 2 === 0 ? 'bg-base-200' : 'bg-base-100'
                }`}
              >
                <td className="p-4 font-medium text-base-content">{session.id}</td>
                <td className="p-4 font-semibold text-base-content">{session.title}</td>
                <td className="p-4">{session.duration}</td>
                <td className="p-4">{session.course}</td>
                <td className="p-4">
                  <DeleteModal message='آیا از حذف این جلسه اطمینان دارید ؟' messageDesc='این اقدام قابل بازگشت نیست !' title='حذف جلسه 📚' deleteBtnText='حذف جلسه' deleteId={''} onDelete={(id)=>{}} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SessionsPage;