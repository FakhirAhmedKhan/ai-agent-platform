import { useState, useCallback } from "react";
import { noteService } from "./noteService";

const useNoteApi = () => {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [name, setName] = useState("");
    const [savedName, setSavedName] = useState("");
    const [lockedNotes, setLockedNotes] = useState({});
    const [noteClickCounts, setNoteClickCounts] = useState({});
    const [editingTitle, setEditingTitle] = useState("");
    const [editingDescription, setEditingDescription] = useState("");
  
    const fetchNotes = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const data = await noteService.getAllNotes();
            setNotes(Array.isArray(data) ? data : data.notes || []);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Failed to fetch notes");
            }
        } finally {
            setLoading(false);
        }
    }, []);

    const createNote = useCallback(async (payload) => {
        try {
            setError(null);
            setIsSubmitting(true);

            const data = await noteService.createNote(payload);
            await fetchNotes();

            return data;
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
                throw err;
            }
            throw new Error("Failed to create note");
        } finally {
            setIsSubmitting(false);
        }
    }, [fetchNotes]);

    const deleteNote = useCallback(async (id) => {
        try {
            setError(null);

            const data = await noteService.deleteNote(id);
            setNotes((prev) => prev.filter((note) => note._id !== id));

            return data;
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
                throw err;
            }
            throw new Error("Failed to delete note");
        }
    }, []);

    const updateNote = useCallback(async (id, payload) => {
        try {
            setError(null);

            const data = await noteService.updateNote(id, payload);

            setNotes((prev) =>
                prev.map((note) => (note._id === id ? data.note || data : note)),
            );

            return data;
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
                throw err;
            }
            throw new Error("Failed to update note");
        }
    }, []);

    const handleToggleLock = (id) => {
        setNoteClickCounts((prev) => {
            const nextCount = (prev[id] || 0) + 1;

            setLockedNotes((currentLocked) => {
                if (nextCount === 2) {
                    return { ...currentLocked, [id]: true };
                }

                if (nextCount === 3) {
                    const updated = { ...currentLocked, [id]: false };
                    return updated;
                }

                return currentLocked;
            });

            return {
                ...prev,
                [id]: nextCount === 3 ? 0 : nextCount,
            };
        });
    };
    const handleSaveEdit = async (id, title, description) => {
        if (!title.trim() || !description.trim()) {
            alert("Please fill in both title and description");
            return;
        }

        try {
            await updateNote(id, {
                title: title.trim(),
                description: description.trim(),
            });
            setEditingId(null);
            setEditingTitle("");
            setEditingDescription("");
        } catch (error) {
            console.error("Update note failed:", error);
        }
    };

    const handleAddUser = async (e) => {
        e.preventDefault();

        if (!name.trim()) return;

        try {
            const response = await noteService.createUser({
                username: name,
            });

            const user = response?.user || response?.data || response;

            setSavedName(user.username || name);

            localStorage.setItem("savedName", user.username || name);

            fetchNotes();
            setName("");
        } catch (error) {
            console.error("Failed to add user:", error);
        }
    };
    return {
        notes,
        loading,
        error,
        setError,
        isSubmitting,
        editingId,
        setEditingId,
        fetchNotes,
        createNote,
        deleteNote,
        updateNote,
        handleToggleLock,
        handleSaveEdit,
        handleAddUser,
    }
}

export default useNoteApi