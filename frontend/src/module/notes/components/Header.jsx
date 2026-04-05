import { StickyNote, LogOut, CheckCircle, Activity } from "lucide-react";
import Button from "./ui/button";
import StatCard from "./ui/StatCard";
import { useNoteContext } from "@/AppContext";

const NoteHeader = () => {
  const { noteData } = useNoteContext();

  return (
    <div className="p-8 rounded-[32px] bg-white border border-slate-200 shadow-sm animate-in fade-in slide-in-from-top-4 duration-500">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-4 max-w-xl">
          <StatCard
            variant="chip"
            icon={StickyNote}
            title="Note Module"
            className="mb-1"
          />
          <StatCard
            variant="simple"
            title="Intelligent Workspace"
            value="Capture your multi-agent ideas and organize quick thoughts with our clean interface."
          />
        </div>

        <div className="flex flex-wrap items-center gap-4">


          <div className="grid grid-cols-2 gap-4 min-w-[240px]">
            <StatCard icon={CheckCircle} title="Total Notes" value={noteData.notes.length} />
            <StatCard
              icon={Activity}
              title="Status"
              value={noteData.notes.length > 0 ? "Active" : "Empty"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteHeader;
