import { memo, useContext } from "react";
import { AgentFormContext } from "../hook/Agent.Provider";
import FromInput from "./FromInput";

const ShowForm = () => {
  const { handleSubmit, showForm } = useContext(AgentFormContext);

  return (
    <form
      onSubmit={handleSubmit}
      className={
        showForm
          ? "p-8 rounded-[32px] bg-white border border-slate-200 shadow-2xl shadow-slate-200/50 space-y-6 animate-in zoom-in-95 duration-300"
          : "hidden"
      }
    >
      <FromInput />

      <button
        type="submit"
        className="w-full py-4 rounded-2xl bg-slate-900 text-white font-bold shadow-xl shadow-slate-900/20 hover:bg-slate-800 hover:scale-[1.01] active:scale-95 transition-all text-lg"
      >
        Assemble Agent
      </button>
    </form>
  );
};

export default memo(ShowForm);
