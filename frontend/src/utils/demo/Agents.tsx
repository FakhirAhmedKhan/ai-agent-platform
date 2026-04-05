import { Beaker, Cpu, Zap } from "lucide-react";

const DemoPartAgent = ({}) => {
  console.log("DemoPartAgent re-rendered");
  return (
    <div className="lg:col-span-4 space-y-8">
      <div className="rounded-[32px] bg-slate-900 p-8 text-white relative overflow-hidden shadow-2xl shadow-slate-900/30">
        <div className="relative z-10">
          <Cpu className="w-10 h-10 text-white/20 mb-6" />
          <h3 className="text-2xl font-bold">System Architecture</h3>
          <p className="text-slate-400 mt-2 leading-relaxed">
            Your agents are powered by specialized prompt templates and dynamic
            context loading.
          </p>

          <div className="mt-8 space-y-5">
            {[
              {
                icon: Zap,
                label: "Low Latency Inference",
                desc: "Optimized for speed",
              },
              {
                icon: Beaker,
                label: "Context Window",
                desc: "Up to 1M tokens support",
              },
            ].map((item, i) => (
              <div key={i} className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                  <item.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-bold text-sm">{item.label}</p>
                  <p className="text-xs text-slate-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-[60px]" />
      </div>

      <div className="rounded-[32px] border-2 border-dashed border-slate-200 p-8 text-center bg-white/50">
        <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
          <Cpu className="w-8 h-8 text-slate-400" />
        </div>
        <h4 className="font-bold text-slate-900">Advanced Config</h4>
        <p className="text-sm text-slate-500 mt-2">
          Connect external tools and APIs in the next update.
        </p>
        <p className="text-sm text-slate-500 mt-2">coming soon</p>
      </div>
    </div>
  );
};

export default DemoPartAgent;
