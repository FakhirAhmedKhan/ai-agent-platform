import { ArrowRight, Sparkles, Bot, Layers3, Zap, BarChart3 } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-16">
      {/* Background decorations */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-to-br from-indigo-100/60 via-purple-50/40 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-40 right-0 w-[400px] h-[400px] bg-gradient-to-bl from-purple-100/50 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[300px] bg-gradient-to-tr from-blue-50/50 to-transparent rounded-full blur-3xl" />
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-100 bg-indigo-50/70 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span className="text-xs font-bold text-indigo-700 uppercase tracking-widest">AI Agent Operating System</span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl lg:text-6xl xl:text-7xl font-black text-slate-900 leading-[1.05] tracking-tight">
              Control Your
              <br />
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                AI Agents.
              </span>
              <br />
              Automate
              <br />
              Everything.
            </h1>

            {/* Subtitle */}
            <p className="text-lg text-slate-500 max-w-lg leading-relaxed font-medium">
              Agentic Task Manager lets you create, run, and monitor AI agents with full visibility into tasks, cost, and performance.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <a
                href="/app"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-white font-bold bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-xl shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all hover:-translate-y-0.5 active:translate-y-0"
              >
                Get Started
                <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="/app"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold border border-slate-200 bg-white hover:bg-slate-50 text-slate-900 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 active:translate-y-0"
              >
                View Dashboard
              </a>
            </div>

            {/* Social Proof */}
            <div className="flex items-center gap-6 pt-4">
              <div className="flex -space-x-2">
                {["bg-indigo-200", "bg-purple-200", "bg-pink-200", "bg-amber-200"].map((bg, i) => (
                  <div key={i} className={`w-8 h-8 rounded-full ${bg} border-2 border-white flex items-center justify-center`}>
                    <span className="text-xs font-bold text-slate-600">{["A", "B", "C", "D"][i]}</span>
                  </div>
                ))}
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">Trusted by teams</p>
                <p className="text-xs text-slate-500">Open-source & ready to deploy</p>
              </div>
            </div>
          </div>

          {/* Right — Mock UI Preview */}
          <div className="relative animate-in fade-in slide-in-from-right-8 duration-1000 delay-300 hidden lg:block">
            {/* Glow behind preview */}
            <div className="absolute -inset-8 bg-gradient-to-br from-indigo-200/40 via-purple-100/30 to-pink-100/20 rounded-[40px] blur-2xl" />
            
            {/* Main card */}
            <div className="relative bg-white rounded-[32px] border border-slate-200 shadow-2xl shadow-slate-200/50 p-6 space-y-5">
              {/* Mock Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-sm">Agent Dashboard</p>
                    <p className="text-xs text-slate-400">4 agents • 12 tasks running</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-bold text-emerald-600">Live</span>
                </div>
              </div>

              {/* Mock stat cards */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "Active", value: "4", icon: Bot, color: "bg-indigo-50 text-indigo-600" },
                  { label: "Tasks", value: "12", icon: Layers3, color: "bg-purple-50 text-purple-600" },
                  { label: "Tokens", value: "48K", icon: Zap, color: "bg-amber-50 text-amber-600" },
                ].map((stat) => (
                  <div key={stat.label} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-center group hover:border-slate-200 transition-all">
                    <div className={`w-8 h-8 rounded-xl ${stat.color} flex items-center justify-center mx-auto mb-2`}>
                      <stat.icon className="w-4 h-4" />
                    </div>
                    <p className="text-xl font-black text-slate-900">{stat.value}</p>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mt-0.5">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Mock task list */}
              <div className="space-y-2">
                {[
                  { name: "Marketing Analysis", status: "completed", agent: "GPT-4" },
                  { name: "Code Review", status: "running", agent: "Claude" },
                  { name: "Data Extraction", status: "pending", agent: "Gemini" },
                ].map((task, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-slate-50/70 border border-slate-100 hover:border-slate-200 transition-all">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${
                        task.status === "completed" ? "bg-emerald-500" :
                        task.status === "running" ? "bg-blue-500 animate-pulse" :
                        "bg-slate-300"
                      }`} />
                      <span className="text-sm font-semibold text-slate-700">{task.name}</span>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{task.agent}</span>
                  </div>
                ))}
              </div>

              {/* Mock usage bar */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100/50">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-600">Token Usage</span>
                  <span className="text-xs font-bold text-indigo-600">67%</span>
                </div>
                <div className="h-2 bg-white/80 rounded-full overflow-hidden">
                  <div className="h-full w-[67%] bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" />
                </div>
              </div>
            </div>

            {/* Floating badges */}
            <div className="absolute -top-4 -right-4 px-4 py-2 rounded-2xl bg-white border border-slate-200 shadow-lg animate-bounce-slow">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-indigo-600" />
                <span className="text-xs font-bold text-slate-700">Real-time Analytics</span>
              </div>
            </div>

            <div className="absolute -bottom-3 -left-3 px-4 py-2 rounded-2xl bg-white border border-slate-200 shadow-lg">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-500" />
                <span className="text-xs font-bold text-slate-700">$0.014 cost saved</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
