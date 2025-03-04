import { toast } from "react-toastify";
import { create } from "zustand";

interface ICart {
  title: string;
  cover: string;
  shortName: string;
  price: number;
}

interface CartStore {
  cartItems: ICart[];
  addToCart: (cart: ICart) => void;
  deleteCart: (name: string) => void;
  getCartItems: () => void;
}

export const useCartStore = create<CartStore>((set) => ({
  cartItems: [],
  addToCart(cart) {
    const previousItems = JSON.parse(
      localStorage.getItem("sabzCart") || "[]"
    ) as ICart[];
    const isCartExist = previousItems.some((item) => item.title === cart.title);
    if (isCartExist){
      toast.info("محصول مورد نظر در سبد خرید شما وجود دارد");
      return;
    }
    set({ cartItems: [...previousItems, cart] });
    localStorage.setItem("sabzCart", JSON.stringify([...previousItems, cart]));
    toast.success("محصول با موفقیت به سبد خرید شما اضافه شد");
  },
  deleteCart(name) {
    const items = JSON.parse(
      localStorage.getItem("sabzCart") as string
    ) as ICart[];
    const updatedItems = items.filter((item) => item.title !== name);
    localStorage.setItem("sabzCart", JSON.stringify(updatedItems));
    set({ cartItems: updatedItems });
  },
  getCartItems() {
    const items = JSON.parse(localStorage.getItem("sabzCart") as string) || [];
    if (items.length === 0) {
      localStorage.setItem("sabzCart", JSON.stringify(items));
      set({ cartItems: items });
    } else {
      set({ cartItems: items });
    }
  },
}));
