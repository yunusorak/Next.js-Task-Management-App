import { create } from "zustand";

const useUserStore = create((set) => ({
  user: null,
  setUser: (userData) => set({ user: userData }),
  clearUser: () => set({ user: null, isAuthenticated: false }),

  boards: [],
  setBoards: (boards) =>
    set((state) => ({ boards: [...state.boards, ...boards] })),
  clearTask: (taskIdRemove) =>
    set((state) => ({
      tasks: [state.tasks.filter((state) => state.task.id !== taskIdRemove)],
    })),
}));

export default useUserStore;
