import React from "react";
import Button from "./ui/button";
import { StickyNote, Plus, Loader2 } from "lucide-react";
import StatCard from "./ui/StatCard";
import { useNoteContext } from "@/AppContext";

const CreateNote = () => {
  const { noteData } = useNoteContext();
  const {
    title,
    description,
    handleSubmit,
    isSubmitting,
    setTitle,
    setDescription,
  } = noteData;

  return (
    <section className="p-8 rounded-[32px] bg-white border border-slate-200 shadow-sm animate-in fade-in slide-in-from-left-4 duration-700">
      <div className="mb-8 flex items-start gap-4">
        <StatCard variant="iconBox" icon={StickyNote} className="bg-slate-50 border border-slate-100" />
        <StatCard
          variant="simple"
          title="Create New Note"
          value="Add a title and description for your next idea."
        />
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Note Title</label>
            <input
                placeholder="Enter note title"
                className="w-full h-12 px-4 rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900/5 transition-all text-slate-900"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
        </div>

        <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Description</label>
            <textarea
                placeholder="Write your note details..."
                className="w-full min-h-[140px] p-4 rounded-2xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900/5 transition-all text-slate-900"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-12 rounded-2xl bg-slate-900 text-white font-bold hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
        >
          {isSubmitting ? <Loader2 size={20} className="animate-spin text-slate-400" /> : <Plus size={20} />}
          {isSubmitting ? "Adding..." : "Add Note"}
        </button>
      </form>
    </section>
  );
};

export default CreateNote;
