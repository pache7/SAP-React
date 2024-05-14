import { create } from 'zustand';


export const useUserStore = create((set) => ({
  users: [],
  setUserList: (userList) => set({ users: userList }),
}));
