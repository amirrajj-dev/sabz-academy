import Image from "next/image";

const Logo = () => {
  return (
    <div className="flex justify-center w-full">
      <Image src="/logo/logo.webp" width={75} height={75} alt="sabzlearn logo" />
    </div>
  );
};

export default Logo;