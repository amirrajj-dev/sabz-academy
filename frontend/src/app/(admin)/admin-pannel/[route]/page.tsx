import React from "react";
import { notFound } from "next/navigation";
import UsersPage from "@/components/admin/UsersPage";
import CategoriesPage from "@/components/admin/CategoriesPage";
import SessionsPage from "@/components/admin/SessionsPage";
import ArticlesPage from "@/components/admin/ArticlesPage";
import MessagesPage from "@/components/admin/MessagesPage";
import CoursesPage from "@/components/admin/CoursesPage";
import CommentsPage from "@/components/admin/CommentsPage";
import MenuesPage from "@/components/admin/MenuesPage";
import CampaigansPage from "@/components/admin/CampaigansPage";
import TicketsPage from "@/components/admin/TicketsPage";
import DiscountsPage from "@/components/admin/DiscountsPage";

const Page = async ({ params }: { params: { route: string } }) => {
  const route = params.route.toLowerCase();
  console.log(route);

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