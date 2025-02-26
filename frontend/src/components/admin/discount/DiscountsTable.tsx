'use client'
import React from 'react'
import { Article } from './ArticlesPage'
import {motion} from 'framer-motion'
import { FaTrash } from 'react-icons/fa'
const DiscountsTable = ({articles} : {articles : Article[]}) => {
  return (
    <div className="shadow-lg rounded-xl overflow-x-auto">
    <table className="table bg-base-300 w-full text-center">
      <thead className="bg-base-300 text-base-content">
        <tr>
          <th className="p-4">شناسه</th>
          <th className="p-4">کد</th>
          <th className="p-4">حداکثر استفاده</th>
          <th className="p-4">دفعات استفاده</th>
          <th className="p-4">سازنده</th>
          <th className="p-4">حذف</th>
        </tr>
      </thead>
      <tbody>
        {articles.map((article, index) => (
          <tr
            key={article.id}
            className={`border-b hover:bg-base-300 transition ${index % 2 === 0 ? "bg-base-200" : "bg-base-100"}`}
          >
            <td className="p-4 font-medium text-base-content">{article.id}</td>
            <td className="p-4 font-semibold text-base-content">{article.title}</td>
            <td className="p-4">{article.link}</td>
            <td className="p-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-error btn-sm"
              >
                <FaTrash />
              </motion.button>
            </td>
            
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  )
}

export default DiscountsTable