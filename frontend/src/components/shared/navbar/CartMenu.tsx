import { FaShoppingCart } from "react-icons/fa";
import Link from "next/link";

const CartMenu = ({ cartOpen, setCartOpen, cartItems }: { cartOpen: boolean; setCartOpen: (value : boolean)=>void; cartItems: any[] }) => {
  return (
    <div className="relative">
      <button onClick={() => setCartOpen(!cartOpen)} className="btn btn-ghost text-white hover:text-primary">
        <FaShoppingCart className="text-xl text-base-content" />
      </button>
      {cartOpen && (
        <ul className="absolute left-0 mt-2 w-52 bg-base-100 shadow-xl rounded-xl z-10 menu menu-sm border border-gray-700">
          {cartItems.length === 0 ? (
            <li className="px-4 py-3 text-base-content">هیچ محصولی در سبد خرید شما نیست</li>
          ) : (
            cartItems.map((item, index) => (
              <li key={index}>
                <Link href="/" className="flex items-center gap-3 px-4 py-3 text-base-content hover:bg-primary hover:text-white rounded-lg transition duration-300 ease-in-out">
                  {item.name}
                </Link>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
};

export default CartMenu;