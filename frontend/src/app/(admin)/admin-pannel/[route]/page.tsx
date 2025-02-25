import React from "react";
import { notFound } from "next/navigation";
import UsersPage from "@/components/admin/user/UsersPage";
import CategoriesPage from "@/components/admin/category/CategoriesPage";
import SessionsPage from "@/components/admin/session/SessionsPage";
import ArticlesPage from "@/components/admin/article/ArticlesPage";
import MessagesPage from "@/components/admin/message/MessagesPage";
import CoursesPage from "@/components/admin/course/CoursesPage";
import CommentsPage from "@/components/admin/comment/CommentsPage";
import MenuesPage from "@/components/admin/menu/MenuesPage";
import CampaigansPage from "@/components/admin/campaigan/CampaigansPage";
import TicketsPage from "@/components/admin/ticket/TicketsPage";
import DiscountsPage from "@/components/admin/discount/DiscountsPage";

const Page = async ({ params }: { params: { route: string } }) => {
  const route = (await params).route.toLocaleLowerCase()
  const validRoutes = [
    "users",
    "categories",
    "sessions",
    "articles",
    "messages",
    "courses",
    "comments",
    "menues",
    "campaigan",
    "tickets",
    "discounts",
  ];

  if (!validRoutes.includes(route)) {
    console.log('erewrwwe');
    notFound();
  }

  const renderComponent = () => {
    switch (route) {
      case "users":
        return <UsersPage />;
      case "categories":
        return <CategoriesPage />;
      case "sessions":
        return <SessionsPage />;
      case "articles":
        return <ArticlesPage />;
      case "messages":
        return <MessagesPage />;
      case "courses":
        return <CoursesPage />;
      case "comments":
        return <CommentsPage />;
      case "menues":
        return <MenuesPage />;
      case "campaigan":
        return <CampaigansPage />;
      case "tickets":
        return <TicketsPage />;
      case "discounts":
        return <DiscountsPage />;
      default:
        return notFound();
    }
  };

  return <div className="mt-20">{renderComponent()}</div>;
};

export default Page;