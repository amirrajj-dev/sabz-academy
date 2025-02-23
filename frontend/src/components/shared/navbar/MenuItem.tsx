import { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { motion } from "framer-motion";
import Link from "next/link";

const MenuItem = ({ item }: { item: any }) => {
  const [open, setOpen] = useState(false);

  return (
    <li className="w-full">
      <div
        className="w-full cursor-default px-4 py-2 bg-base-100 hover:bg-primary hover:text-white rounded-md flex justify-between items-center"
      >
        <Link href={'/'} className="cursor-pointer">{item.label}</Link>
        {open ? <FiChevronUp className="cursor-pointer" onClick={()=>setOpen(!open)} /> : <FiChevronDown className="cursor-pointer" onClick={()=>setOpen(!open)} />}
      </div>
      <motion.ul
        className={`${open ? "block" : "hidden"} bg-base-200 rounded-md mt-2`}
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 30 }}
      >
        {item.subItems.map((sub : string, index : number) => (
          <li key={index} className="hover:bg-primary hover:text-white rounded-md">
            <a href="#" className="block px-4 py-2">
              {sub}
            </a>
          </li>
        ))}
      </motion.ul>
    </li>
  );
};

export default MenuItem;