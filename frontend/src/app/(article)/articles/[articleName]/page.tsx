import Article from "@/components/article/Article";
import { getSingleArticle } from "@/helpers/getArticle";
import { IArticle } from "@/interfaces/types";
import { Metadata } from "next";
interface MainArticleProps {
  params: Promise<{ articleName: string }>;
}

export const generateMetadata = async ({ params }: { params: { articleName: string } }): Promise<Metadata> => {
  const article: IArticle = await getSingleArticle(params.articleName);

  return {
    title: `${article.title} | سبزلرن`,
    description: article.description || "مقاله‌ای جامع و کاربردی در زمینه برنامه‌نویسی و فناوری اطلاعات.",
    keywords: [article.title, article.category.name, "برنامه‌نویسی", "توسعه وب", "سبزلرن", "آموزش آنلاین"],
    openGraph: {
      title: `${article.title} | سبزلرن`,
      description: article.description || "مقاله‌ای جامع و کاربردی در زمینه برنامه‌نویسی و فناوری اطلاعات.",
      url: `https://www.sabzlearn.ir/articles/${article.shortName}`,
      siteName: "سبزلرن",
      images: [
        {
          url: article.cover ? `https://www.sabzlearn.ir/images/${article.cover}` : "https://www.sabzlearn.ir/images/default-article-og.jpg",
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
      locale: "fa_IR",
      type: "article",
      publishedTime: new Date(article.createdAt).toLocaleDateString(),
    },
    twitter: {
      card: "summary_large_image",
      title: `${article.title} | سبزلرن`,
      description: article.description || "مقاله‌ای جامع و کاربردی در زمینه برنامه‌نویسی و فناوری اطلاعات.",
      images: [article.cover ? `https://www.sabzlearn.ir/images/${article.cover}` : "https://www.sabzlearn.ir/images/default-article-twitter.jpg"],
    },
  };
};

const Page = ({ params }: MainArticleProps) => {
  return (
    <Article params={params} />
  )
};

export default Page;
