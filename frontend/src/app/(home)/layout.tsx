import type { Metadata } from "next";
import Navbar from "@/components/shared/navbar/Navbar";
import Footer from "@/components/shared/footer/Footer";

export const metadata: Metadata = {
  title: "سبزلرن | SabzLearn",
  description: "Generated by create next app",
  icons: {
    icon: "/logo/fav.png",
  },
};

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
