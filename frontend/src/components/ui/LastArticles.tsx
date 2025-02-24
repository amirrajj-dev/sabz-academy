import React from 'react'
import SectionHeader from '../shared/SectionHeader'
import { articles } from '@/data/data'
import ArticleCard from './ArticleCard'

const LastArticles = () => {
  return (
    <div className='mt-20'>
        <SectionHeader title='آخـــرین مقالات ما' desc='مقاله های بروز برنامه نویسی و تکنولوژی' haveLink={true} linkText='همه مقالات' linkUrl='' squareColor='bg-orange-500' />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-4 mt-8">
            {articles.map(article=>(
                <ArticleCard key={article.id} article={article} />
            ))}
        </div>
    </div>
  )
}

export default LastArticles