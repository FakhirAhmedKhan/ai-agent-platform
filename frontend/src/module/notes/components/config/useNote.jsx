import { useEffect, useState, useMemo } from "react";
import useNoteApi from "./useNoteApi";
import { useAuth } from "../../../Auth/hooks/useAuth";

export function useNote() {
  const { isAuthenticated } = useAuth();
  const {
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
  } = useNoteApi();

  const [savedName, setSavedName] = useState("");
  const [lockedNotes] = useState({});
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      setError("Please enter both a title and description.");
      return;
    }

    try {
      setError(null);
      await createNote({ title, description });
      setTitle("");
      setDescription("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add note.");
    }
  };

  useEffect(() => {
    const storedName = localStorage.getItem("savedName") || localStorage.getItem("userName");
    if (storedName) {
      setSavedName(storedName);
    }
    if (isAuthenticated) {
      fetchNotes();
    }
  }, [fetchNotes, isAuthenticated]);

  const sortedNotes = useMemo(() => {
    return [...notes].sort(
      (a, b) =>
        new Date(b.createdAt || "").getTime() -
        new Date(a.createdAt || "").getTime(),
    );
  }, [notes]);

  const resetCreateForm = () => {
    setTitle("");
    setDescription("");
  };

  const resetEditForm = () => {
    setEditingId(null);
  };

  const handleStartEdit = (note) => {
    setEditingId(note._id);
  };

  const handleLogout = () => {
    localStorage.removeItem("savedName");
    localStorage.removeItem("userName");
    setSavedName("");
    setError(null);
  };

  const startEdit = (note) => {
    setEditTitle(note.title || note.Title);
    setEditDescription(note.description || note.Description);
    handleStartEdit(note);
  };

  const saveEdit = (id) => {
    handleSaveEdit(id, editTitle, editDescription);
  };

  return {
    noteData: {
      editTitle,
      editDescription,
      startEdit,
      saveEdit,
      lockedNotes,
      handleToggleLock,
      title,
      setTitle,
      description,
      setDescription,
      setEditTitle,
      setEditDescription,
      handleSubmit,
      name,
      savedName,
      notes,
      loading,
      error,
      editingId,
      sortedNotes,
      isSubmitting,
      setName,
      resetCreateForm,
      handleAddUser,
      createNote,
      deleteNote,
      resetEditForm,
      handleStartEdit,
      handleSaveEdit,
      handleLogout,
    },
  };
}
