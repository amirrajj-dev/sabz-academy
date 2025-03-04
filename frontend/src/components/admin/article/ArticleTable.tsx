'use client'
import React, { useEffect } from 'react'
import { Article } from './ArticlesPage'
import { motion } from 'framer-motion'
import { FaCheck, FaTrash } from 'react-icons/fa'
import { useArticleStore } from '@/store/article.store'
import { IoClose } from 'react-icons/io5'
import DeleteModal from '@/components/modals/shared/DeleteModal'
import { toast } from 'react-toastify'
import { toastOptions } from '@/helpers/toastOptions'

const ArticleTable = () => {
  const { articles, fetchArticles, isLoading , deleteArticle } = useArticleStore()

  useEffect(() => {
    fetchArticles()
  }, [])

  const handleDeleteArticle = async (id: string) => {
    const res = await deleteArticle(id)
    if (res.success){
      toast.success('مقاله با موفقیت حذف شد', toastOptions)
    }else{
      toast.error('خطا در حذف مقاله', toastOptions)
    }
  }

  return (
    <div className="shadow-lg rounded-xl overflow-x-auto">
      <table className="table bg-base-300 w-full text-center">
        <thead className="bg-base-300 text-base-content">
          <tr>
            <th className="p-4">شناسه</th>
            <th className="p-4">عنوان</th>
            <th className="p-4">لینک</th>
            <th className="p-4">حذف</th>
            <th className="p-4">وضعیت انتشار</th>
            <th className="p-4">ادامه نوشتن</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            Array.from({ length: 4 }).map((_, index) => (
              <tr key={index} className="border-b bg-base-200">
                <td className="p-4"><div className="skeleton h-4 w-10"></div></td>
                <td className="p-4"><div className="skeleton h-4 w-32"></div></td>
                <td className="p-4"><div className="skeleton h-4 w-20"></div></td>
                <td className="p-4"><div className="skeleton h-4 w-10"></div></td>
                <td className="p-4"><div className="skeleton h-4 w-20"></div></td>
                <td className="p-4"><div className="skeleton h-4 w-20"></div></td>
              </tr>
            ))
          ) : articles.length === 0 ? (
            <tr>
              <td colSpan={6} className="p-4 text-center text-base-content">هیچ مقاله‌ای یافت نشد</td>
            </tr>
          ) : (
            articles.map((article, index) => (
              <tr
                key={article.id}
                className={`border-b hover:bg-base-300 transition ${index % 2 === 0 ? "bg-base-200" : "bg-base-100"}`}
              >
                <td className="p-4 font-medium text-base-content">{index + 1}</td>
                <td className="p-4 font-semibold text-base-content">{article.title}</td>
                <td className="p-4">{article.shortName}</td>
                <td className="p-4">
                  <DeleteModal deleteId={article.id} deleteBtnText='حذف مقاله' message='آیا از حذف مقاله اطمینان دارید ؟' messageDesc='این اقدام قابل بازگشت نیست !' title='حذف مقاله' onDelete={handleDeleteArticle} />
                </td>
                <td className="p-4">{article.publish === 1 ? <button className='btn btn-sm btn-soft btn-success'><FaCheck/></button> : <button className='btn btn-sm btn-soft btn-error'><IoClose/></button>}</td>
                <td className="p-4">
                  {article.publish !== 1 ? (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="btn btn-warning btn-sm"
                    >
                      ادامه نوشتن
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      تکمیل شده
                    </motion.button>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

export default ArticleTable