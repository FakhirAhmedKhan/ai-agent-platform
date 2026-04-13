import { create } from "zustand";
import type { AgentFormStore } from "./Agent.types";
import { initialForm } from "@/assets/data";

export const useAgentFormStore = create<AgentFormStore>((set) => ({
    showForm: false,
    formData: initialForm,

    setShowForm: (value) => set({ showForm: value }),

    setFormData: (value) => set((state) => ({ formData: typeof value === "function" ? value(state.formData) : value, })),

    resetForm: () => set({ formData: initialForm }),

    closeForm: () => set({ showForm: false, formData: initialForm }),
}));