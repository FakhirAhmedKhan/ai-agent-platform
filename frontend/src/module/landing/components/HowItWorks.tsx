import { Bot, Send, BarChart3, ArrowRight } from "lucide-react";

const steps = [
  {
    step: "01",
    icon: Bot,
    title: "Create an Agent",
    description: "Configure your AI agent with a custom system prompt, select the model, and set temperature & token limits.",
    color: "from-indigo-600 to-blue-600",
    shadow: "shadow-indigo-500/20",
  },
  {
    step: "02",
    icon: Send,
    title: "Assign a Task",
    description: "Write a natural-language mission, pick an agent, and launch the execution pipeline with one click.",
    color: "from-purple-600 to-pink-600",
    shadow: "shadow-purple-500/20",
  },
  {
    step: "03",
    icon: BarChart3,
    title: "Get Output + Analytics",
    description: "Receive the AI response instantly, along with token counts, cost breakdowns, and execution timelines.",
    color: "from-emerald-500 to-teal-500",
    shadow: "shadow-emerald-500/20",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-32 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-100 bg-purple-50/70">
            <Send className="w-4 h-4 text-purple-600" />
            <span className="text-xs font-bold text-purple-700 uppercase tracking-widest">Simple Workflow</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            Three Steps to{" "}
            <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              AI Automation
            </span>
          </h2>
          <p className="text-lg text-slate-500 font-medium">
            From agent creation to actionable outputs — the entire workflow takes seconds.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div key={step.step} className="relative group">
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-full w-8 z-10">
                  <ArrowRight className="w-6 h-6 text-slate-300 ml-1" />
                </div>
              )}
              
              <div className="p-8 rounded-[32px] bg-white border border-slate-100 hover:border-slate-200 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-500 hover:-translate-y-2 h-full">
                {/* Step number */}
                <div className="flex items-center justify-between mb-8">
                  <span className="text-6xl font-black text-slate-100 group-hover:text-slate-200 transition-colors select-none">
                    {step.step}
                  </span>
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg ${step.shadow} group-hover:scale-110 transition-transform duration-300`}>
                    <step.icon className="w-7 h-7 text-white" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed font-medium">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
