import { create } from "zustand";
import { IMenu } from "@/interfaces/types";

interface MenuesStore {
    menues: IMenu[];
    setMenues: (menues: IMenu[]) => void;
    addMenu : (menu : IMenu)=>void
    deleteMenu : (id : string) => void
    editMenu : (id : string , data : Partial<IMenu>)=>void
    getMenues : ()=>void
    isLoading : boolean
}

export const useMenuesStore = create<MenuesStore>((set)=>({
    menues : [],
    isLoading : false,
    setMenues : (menues)=>{
        set({menues})
    },
    addMenu(menu) {
        
    },
    deleteMenu(id) {
        
    },
    editMenu(id, data) {
        
    },
    getMenues() {
        
    },
}))