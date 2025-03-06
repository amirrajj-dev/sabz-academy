import { create } from "zustand";

interface UserPannelProps {
    isMobile : boolean,
    setIsMobile : (value : boolean)=>void
    isExpanded : boolean,
    setIsExpanded : (value : boolean)=>void
}

export const UseUserPannelStore = create<UserPannelProps>((set , get)=>({
    isExpanded : false,
    isMobile : false,
    setIsExpanded(value) {
        set({isExpanded : value})
    },
    setIsMobile(value) {
        set({isMobile : value})
    },
}))