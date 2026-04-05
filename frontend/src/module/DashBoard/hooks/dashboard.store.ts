import { create } from "zustand";

interface DashboardStore {
  selectedAgentId: string;
  selectedTaskId: string;
  search: string;

  setSelectedAgentId: (id: string) => void;
  setSelectedTaskId: (id: string) => void;
  setSearch: (value: string) => void;
}

export const useDashboardStore = create<DashboardStore>((set) => ({
  selectedAgentId: "",
  selectedTaskId: "",
  search: "",

  setSelectedAgentId: (id) => set({ selectedAgentId: id }),
  setSelectedTaskId: (id) => set({ selectedTaskId: id }),
  setSearch: (value) => set({ search: value }),
}));