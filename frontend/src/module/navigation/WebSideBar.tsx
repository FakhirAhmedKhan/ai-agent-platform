import { Brain, ChevronLeft, ChevronRight } from "lucide-react";
import { useSideBarContext } from "@/AppContext";
import { useNavigate } from "react-router-dom";

const WebSideBar = () => {
  const { sideBarData } = useSideBarContext();
  const navigate = useNavigate();

  return (
    <aside
      className={`${
        sideBarData.isCollapsed ? "w-24" : "w-72"
      } bg-slate-950 text-white p-5 hidden lg:flex lg:flex-col border-r border-slate-800 shrink-0 transition-all duration-500 ease-in-out relative sticky top-0 h-screen`}
    >
      {/* Collapse Toggle Button */}
      <button
        onClick={() => sideBarData.setIsCollapsed(!sideBarData.isCollapsed)}
        className="absolute -right-3 top-10 w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white transition-all shadow-xl z-20 hover:scale-110 active:scale-90"
      >
        {sideBarData.isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>

      <div
        className={`flex items-center ${sideBarData.isCollapsed ? "justify-center" : "gap-3"} px-2 py-3 transition-all duration-300`}
      >
        <div className="rounded-2xl bg-white/10 p-3 shadow-inner shrink-0 group hover:bg-white/20 transition-all">
          <Brain className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
        </div>
        {!sideBarData.isCollapsed && (
          <div className="animate-in fade-in duration-500 slide-in-from-left-2">
            <h1 className="font-bold text-lg tracking-tight">AgentOS</h1>
            <p className="text-slate-400 text-[11px] uppercase tracking-widest font-bold opacity-80 whitespace-nowrap">
              Mock platform
            </p>
          </div>
        )}
      </div>

      <nav className="mt-10 space-y-2">
        {sideBarData.navItems.map((item) => {
          const Icon = item.icon;
          const isActive = sideBarData.activePage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                sideBarData.setActivePage(item.id);
                navigate(item.path);
              }}
              className={`w-full flex items-center ${sideBarData.isCollapsed ? "justify-center" : "gap-3"} rounded-[20px] ${
                sideBarData.isCollapsed ? "px-0 py-4" : "px-5 py-3.5"
              } transition-all duration-300 group ${
                isActive
                  ? "bg-white text-slate-900 shadow-lg shadow-white/10"
                  : "text-slate-400 hover:text-white hover:bg-white/5 active:scale-95"
              } ${!sideBarData.isCollapsed && isActive ? "translate-x-1" : ""}`}
              title={sideBarData.isCollapsed ? item.label : ""}
            >
              <Icon
                className={`w-5 h-5 transition-transform duration-300 ${
                  isActive ? "scale-110" : "group-hover:scale-110"
                }`}
              />
              {!sideBarData.isCollapsed && (
                <span className="font-semibold text-sm animate-in fade-in duration-300 slide-in-from-left-2 whitespace-nowrap">
                  {item.label}
                </span>
              )}
              {!sideBarData.isCollapsed && isActive && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-slate-900" />
              )}
            </button>
          );
        })}
      </nav>

      <div className="mt-auto space-y-4">
        {sideBarData.isCollapsed ? (
          <div className="flex justify-center py-4">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_#10b981]" />
          </div>
        ) : (
          <div className="rounded-[28px] bg-white/5 p-6 border border-white/10 relative overflow-hidden group animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="absolute -top-4 -right-4 w-12 h-12 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-all duration-500" />
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
              Current provider
            </p>
            <h3 className="font-bold text-base mt-1 text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Mock AI Engine
            </h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Replace with Gemini when backend is live.
            </p>
          </div>
        )}
      </div>
    </aside>
  );
};

export default WebSideBar;
