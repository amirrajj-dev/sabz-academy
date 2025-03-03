import Image from "next/image";
import { IoIosArrowBack } from "react-icons/io";
import moment from "moment-jalaali";
import { useState, useEffect } from "react";
import { useAuthStore } from "@/store/auth.store";

const UserSection = () => {
  const {user , isAuthenticated} = useAuthStore()
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const formatDate = () => {
      const date = moment();
      date.locale("fa", { useGregorianParser: true });
      return date.format("dddd D MMMM jYYYY");
    };
    setCurrentDate(formatDate());
  }, []);

  return (
    <div className="rounded-tl-lg flex justify-between items-center p-4">
      {isAuthenticated ? (
        <div className="flex items-center gap-4">
          <Image
            src="https://secure.gravatar.com/avatar/ca7ef232e4e4e6888b99485dc6207ae5?s=96&d=mm&r=g"
            width={55}
            height={55}
            alt="profile"
            className="rounded-full"
          />
          <div className="flex flex-col gap-3">
            <span>{user?.username}</span>
            <span className="text-xs">{currentDate}</span>
          </div>
        </div>
      ) : (
        <button className="btn btn-primary w-full h-15">ورود یا ثبت نام</button>
      )}
      <IoIosArrowBack />
    </div>
  );
};

export default UserSection;