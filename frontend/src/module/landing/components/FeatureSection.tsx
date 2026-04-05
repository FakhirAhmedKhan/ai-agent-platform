import { 
  BarChart3, Bot, Layers3, Activity, Settings, FileSliders, StickyNote,
  ArrowUpRight
} from "lucide-react";

const features = [
  {
    icon: BarChart3,
    title: "Dashboard",
    description: "Real-time insights into tasks, token consumption, and operational costs at a glance.",
    color: "from-indigo-500 to-blue-500",
    bg: "bg-indigo-50",
  },
  {
    icon: Bot,
    title: "AI Agents",
    description: "Create and configure intelligent agents with custom system prompts and model parameters.",
    color: "from-purple-500 to-pink-500",
    bg: "bg-purple-50",
  },
  {
    icon: Layers3,
    title: "Task Execution",
    description: "Assign missions to agents, track execution pipelines, and review AI-generated outputs.",
    color: "from-emerald-500 to-teal-500",
    bg: "bg-emerald-50",
  },
  {
    icon: Activity,
    title: "Usage Analytics",
    description: "Deep visibility into token breakdown, per-agent allocation, and cumulative cost trends.",
    color: "from-amber-500 to-orange-500",
    bg: "bg-amber-50",
  },
  {
    icon: FileSliders,
    title: "Cost Estimator",
    description: "Predict AI usage before execution. Budget effectively with real-time model pricing data.",
    color: "from-rose-500 to-pink-500",
    bg: "bg-rose-50",
  },
  {
    icon: StickyNote,
    title: "Smart Notes",
    description: "Capture prompts, agent outputs, and ideas in a persistent multi-tenant workspace.",
    color: "from-sky-500 to-cyan-500",
    bg: "bg-sky-50",
  },
  {
    icon: Settings,
    title: "Settings Hub",
    description: "Manage API keys, switch between providers, control themes and notification preferences.",
    color: "from-slate-500 to-zinc-500",
    bg: "bg-slate-100",
  },
];

const FeatureSection = () => {
  return (
    <section id="features" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-indigo-50/60 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-purple-50/40 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-100 bg-indigo-50/70">
            <Layers3 className="w-4 h-4 text-indigo-600" />
            <span className="text-xs font-bold text-indigo-700 uppercase tracking-widest">Core Modules</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            Everything You Need to{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Orchestrate AI
            </span>
          </h2>
          <p className="text-lg text-slate-500 font-medium">
            Seven powerful modules designed to give you complete control over your AI agent ecosystem.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              className={`group relative p-8 rounded-[28px] bg-white border border-slate-100 hover:border-slate-200 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-500 hover:-translate-y-2 cursor-pointer ${
                i === features.length - 1 && features.length % 3 === 1 ? "md:col-span-2 lg:col-span-1" : ""
              }`}
            >
              {/* Gradient glow on hover */}
              <div className="absolute inset-0 rounded-[28px] bg-gradient-to-br from-indigo-50/0 to-purple-50/0 group-hover:from-indigo-50/50 group-hover:to-purple-50/30 transition-all duration-500" />
              
              <div className="relative z-10">
                {/* Icon */}
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                  {feature.title}
                  <ArrowUpRight className="w-4 h-4 text-slate-300 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed font-medium">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
