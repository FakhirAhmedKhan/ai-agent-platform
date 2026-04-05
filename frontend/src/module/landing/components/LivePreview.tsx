import { Bot, CheckCircle, Clock, AlertCircle, Zap, BarChart3, TrendingUp } from "lucide-react";

const LivePreview = () => {
  return (
    <section id="preview" className="py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-100 bg-emerald-50/70">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest">Live Preview</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            Real-time{" "}
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              AI Execution
            </span>
          </h2>
          <p className="text-lg text-slate-500 font-medium">
            Watch your agents work. Every task, every token, every dollar — tracked in real time.
          </p>
        </div>

        {/* Preview Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Agent Card */}
          <div className="p-6 rounded-[28px] bg-white border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 space-y-5">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold uppercase tracking-widest text-slate-400">Agent Profile</h4>
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg">
                <Bot className="w-7 h-7 text-white" />
              </div>
              <div>
                <p className="font-bold text-slate-900">Marketing Agent</p>
                <p className="text-xs text-slate-500">GPT-4 · Temp: 0.7</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-sm text-slate-600 italic font-medium leading-relaxed">
              "You are a marketing expert specialized in growth strategies and content optimization..."
            </div>

            <div className="flex gap-2">
              <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-600 border border-emerald-100">Active</span>
              <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-indigo-50 text-indigo-600 border border-indigo-100">Memory On</span>
            </div>
          </div>

          {/* Task Log */}
          <div className="p-6 rounded-[28px] bg-white border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 space-y-5">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold uppercase tracking-widest text-slate-400">Task Log</h4>
              <span className="text-xs font-bold text-slate-400">3 recent</span>
            </div>

            <div className="space-y-3">
              {[
                { title: "Q1 Growth Plan", status: "completed", tokens: "2.4K", time: "3s" },
                { title: "Email Campaign", status: "running", tokens: "1.1K", time: "2s" },
                { title: "Competitor Analysis", status: "pending", tokens: "—", time: "—" },
              ].map((task) => (
                <div key={task.title} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100 group hover:border-slate-200 transition-all">
                  <div className="shrink-0">
                    {task.status === "completed" ? (
                      <CheckCircle className="w-5 h-5 text-emerald-500" />
                    ) : task.status === "running" ? (
                      <Clock className="w-5 h-5 text-blue-500 animate-pulse" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-slate-300" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-700 truncate">{task.title}</p>
                    <p className="text-[10px] text-slate-400 font-medium">{task.tokens} tokens · {task.time}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <span className="text-xs font-bold text-indigo-600 hover:text-indigo-700 cursor-pointer transition-colors">View all tasks →</span>
            </div>
          </div>

          {/* Usage Graph */}
          <div className="p-6 rounded-[28px] bg-white border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 space-y-5">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold uppercase tracking-widest text-slate-400">Usage Overview</h4>
              <TrendingUp className="w-4 h-4 text-emerald-500" />
            </div>

            {/* Mock bar chart */}
            <div className="flex items-end gap-2 h-32 pt-4">
              {[40, 65, 30, 80, 55, 90, 70, 45, 85, 60, 75, 50].map((height, i) => (
                <div key={i} className="flex-1 rounded-t-lg bg-gradient-to-t from-indigo-500 to-purple-400 transition-all hover:from-indigo-600 hover:to-purple-500"
                  style={{ height: `${height}%` }}
                />
              ))}
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Tokens", value: "48.2K", icon: Zap },
                { label: "Cost", value: "$1.42", icon: BarChart3 },
                { label: "Tasks", value: "127", icon: CheckCircle },
              ].map((stat) => (
                <div key={stat.label} className="text-center p-2 rounded-xl bg-slate-50">
                  <p className="text-lg font-black text-slate-900">{stat.value}</p>
                  <p className="text-[9px] uppercase tracking-widest text-slate-400 font-bold">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LivePreview;
