import React from "react";
import StatCard from "./ui/StatCard";
import { StickyNote, Pencil, Trash, FileText, Loader2, AlertCircle, Calendar, PlusCircle } from "lucide-react";
import { useNoteContext } from "@/AppContext";

const ReadNote = () => {
  const { noteData } = useNoteContext();
  const {
    error,
    loading,
    sortedNotes,
    editingId,
    lockedNotes,
    handleToggleLock,
    resetEditForm,
    deleteNote,
    setEditTitle,
    setEditDescription,
    editTitle,
    editDescription,
    startEdit,
    saveEdit,
  } = noteData;

  if (loading) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[400px] bg-white rounded-[32px] border border-slate-200 border-dashed space-y-4">
            <Loader2 className="w-10 h-10 text-slate-300 animate-spin" />
            <p className="text-slate-500 font-medium tracking-tight">Syncing workspaces...</p>
        </div>
    );
  }

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between px-4">
        <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Your Workspace
        </h3>
        <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-500 text-xs font-bold uppercase tracking-widest">
            {sortedNotes.length} Notes
        </span>
      </div>

      {error && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-100 flex items-center gap-3 text-rose-700 animate-in fade-in zoom-in duration-300">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <p className="text-sm font-medium">Error: {error}</p>
        </div>
      )}

      {sortedNotes.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[400px] p-10 text-center bg-white rounded-[32px] border border-slate-200 border-dashed space-y-6 animate-in fade-in zoom-in duration-500">
          <div className="w-16 h-16 rounded-3xl bg-slate-50 flex items-center justify-center border border-slate-100">
             <PlusCircle className="w-8 h-8 text-slate-300" />
          </div>
          <div className="space-y-2">
             <h3 className="text-xl font-bold text-slate-900">Workspace is empty</h3>
             <p className="max-w-xs mx-auto text-sm text-slate-500 leading-relaxed">
                Your creative space is waiting. Use the form on the left to start capturing your ideas.
             </p>
          </div>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 xl:grid-cols-2">
          {sortedNotes.map((note) => {
            const isEditing = editingId === note._id;
            const isLocked = lockedNotes?.[note._id];

            return (
              <article
                key={note._id}
                onClick={() => handleToggleLock(note._id)}
                className={`relative group p-6 rounded-[32px] bg-white border transition-all duration-300 cursor-pointer overflow-hidden ${
                  isLocked
                    ? "border-emerald-200 shadow-lg shadow-emerald-500/5 ring-1 ring-emerald-50"
                    : "border-slate-200 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1"
                }`}
              >
                {/* Visual Accent */}
                <div className={`absolute top-0 right-0 w-24 h-24 blur-3xl opacity-10 transition-opacity group-hover:opacity-20 ${isLocked ? 'bg-emerald-400' : 'bg-slate-400'}`} />

                {isEditing ? (
                  <div className="space-y-4 relative z-10" onClick={(e) => e.stopPropagation()}>
                    <input
                      className="w-full h-11 px-4 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/5"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                    />

                    <textarea
                      className="w-full min-h-[100px] p-4 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/5"
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                    />

                    <div className="flex gap-3">
                      <button
                        onClick={() => saveEdit(note._id)}
                        className="flex-1 h-10 rounded-xl bg-emerald-500 text-white text-xs font-bold hover:bg-emerald-600 transition-colors"
                      >
                        Save
                      </button>

                      <button
                        onClick={resetEditForm}
                        className="flex-1 h-10 rounded-xl bg-slate-100 text-slate-600 text-xs font-bold hover:bg-slate-200 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="mb-4 flex items-start justify-between gap-3 relative z-10">
                      <div className="flex-1">
                        <h3 className="line-clamp-2 text-lg font-bold text-slate-900 group-hover:text-slate-700 transition-colors">
                          {note.title || note.Title}
                        </h3>
                      </div>
                      <div className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${isLocked ? 'bg-emerald-50 text-emerald-500' : 'bg-slate-50 text-slate-400 group-hover:bg-slate-100'}`}>
                        <StickyNote className="w-5 h-5" />
                      </div>
                    </div>

                    <p className="mb-6 line-clamp-4 text-sm leading-6 text-slate-500 font-medium relative z-10">
                      {note.description || note.Description}
                    </p>

                    <div className="mb-6 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 relative z-10">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>
                        {note.createdAt
                          ? new Date(note.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
                          : "Unknown State"}
                      </span>
                    </div>

                    <div className="flex gap-3 relative z-10 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          startEdit(note);
                        }}
                        className="flex-1 h-11 rounded-2xl bg-white border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50 hover:border-slate-300 transition-all flex items-center justify-center gap-2"
                      >
                        <Pencil size={14} />
                        Edit
                      </button>
                      <button
                        disabled={isLocked}
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteNote(note._id);
                        }}
                        className="flex-1 h-11 rounded-2xl bg-white border border-rose-100 text-rose-500 text-xs font-bold hover:bg-rose-50 hover:border-rose-200 disabled:opacity-30 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                      >
                        <Trash size={14} />
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default ReadNote;
