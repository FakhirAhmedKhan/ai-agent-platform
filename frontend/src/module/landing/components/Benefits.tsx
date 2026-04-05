import { Clock, Eye, Scale, Workflow } from "lucide-react";

const benefits = [
  {
    icon: Clock,
    title: "Save Time with Automation",
    description: "Eliminate manual workflows. Let agents handle repetitive tasks while you focus on strategy and growth.",
    metric: "10x",
    metricLabel: "Faster execution",
    gradient: "from-indigo-500 to-blue-500",
  },
  {
    icon: Eye,
    title: "Full Visibility of AI Costs",
    description: "Every token is tracked. Every dollar is accounted for. No hidden costs, no billing surprises — ever.",
    metric: "$0",
    metricLabel: "Hidden fees",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: Scale,
    title: "Scale Multiple Agents Easily",
    description: "Run dozens of specialized agents concurrently. Each with its own prompt, model, and configuration.",
    metric: "∞",
    metricLabel: "Agent capacity",
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    icon: Workflow,
    title: "No-Code AI Workflow",
    description: "No scripting required. Create agents, assign tasks, and analyze results through a clean visual interface.",
    metric: "0",
    metricLabel: "Lines of code",
    gradient: "from-amber-500 to-orange-500",
  },
];

const Benefits = () => {
  return (
    <section id="benefits" className="py-32 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-100 bg-amber-50/70">
            <Scale className="w-4 h-4 text-amber-600" />
            <span className="text-xs font-bold text-amber-700 uppercase tracking-widest">Why Choose Us</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            Built for{" "}
            <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              Serious Teams
            </span>
          </h2>
          <p className="text-lg text-slate-500 font-medium">
            Every feature is designed to help you move faster, spend less, and scale intelligently.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="group relative p-8 lg:p-10 rounded-[32px] bg-white border border-slate-100 hover:border-slate-200 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-500 hover:-translate-y-1 overflow-hidden"
            >
              {/* Background glow */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-indigo-50/0 via-purple-50/0 to-transparent group-hover:from-indigo-50/60 group-hover:via-purple-50/30 rounded-full blur-2xl transition-all duration-700" />

              <div className="relative z-10 flex flex-col lg:flex-row lg:items-start gap-6">
                {/* Left — Icon + Metric */}
                <div className="space-y-4 shrink-0">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${benefit.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <benefit.icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="text-center lg:text-left">
                    <p className="text-3xl font-black text-slate-900">{benefit.metric}</p>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{benefit.metricLabel}</p>
                  </div>
                </div>

                {/* Right — Content */}
                <div className="space-y-3 flex-1">
                  <h3 className="text-xl font-bold text-slate-900">{benefit.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed font-medium">{benefit.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
