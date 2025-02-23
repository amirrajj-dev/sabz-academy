import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/shared/navbar/Navbar";

export const metadata: Metadata = {
  title: "سبزلرن | SabzLearn",
  description: "Generated by create next app",
  icons: {
    icon: "/logo/fav.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark" className="font-dana-regular">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
