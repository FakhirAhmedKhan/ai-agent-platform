import { api, endpoints } from "../../../../configs/app.config";

export const noteService = {
    createUser: async (payload) => {
        const { data } = await api.post(endpoints.user, payload);
        return data;
    },

    createNote: async (payload) => {
        const { data } = await api.post(endpoints.notes, payload);
        return data;    
    },

    getAllNotes: async () => {
        const { data } = await api.get(endpoints.notes);
        return data;
    },

    updateNote: async (id, payload) => {
        const { data } = await api.put(endpoints.notesUpdate(id), payload);
        return data;
    },

    deleteNote: async (id) => {
        const { data } = await api.delete(endpoints.notesDelete(id));
        return data;
    },
};