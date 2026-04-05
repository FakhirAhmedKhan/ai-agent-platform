import { ArrowRight, Sparkles, Zap, Shield } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-32">
      <div className="max-w-7xl mx-auto px-6">
        {/* Pricing Hint */}
        <div className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { icon: Sparkles, title: "Start Free", desc: "Full access to every module with mock AI. No limits." },
              { icon: Shield, title: "No Credit Card", desc: "Jump straight in. Upgrade when you're ready for production." },
              { icon: Zap, title: "Mock ↔ Real AI", desc: "Toggle between demo data and live Gemini execution in one click." },
            ].map((item) => (
              <div key={item.title} className="text-center p-6 rounded-[28px] bg-white border border-slate-100 hover:border-slate-200 shadow-sm hover:shadow-md transition-all">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-6 h-6 text-indigo-600" />
                </div>
                <h4 className="font-bold text-slate-900 mb-1">{item.title}</h4>
                <p className="text-sm text-slate-500 font-medium">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="relative rounded-[40px] overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:48px_48px]" />
          
          {/* Glows */}
          <div className="absolute top-0 left-1/4 w-[400px] h-[300px] bg-purple-500/30 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-[300px] h-[200px] bg-indigo-400/20 rounded-full blur-3xl" />

          {/* Content */}
          <div className="relative z-10 px-8 py-20 lg:py-28 text-center space-y-8">
            <h2 className="text-4xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
              Start Managing Your
              <br />
              AI Agents Today
            </h2>
            <p className="text-lg text-indigo-100 max-w-xl mx-auto font-medium">
              Join the next generation of AI-powered teams. Create your first agent in under 60 seconds.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="/"
                className="inline-flex items-center gap-2 px-10 py-5 rounded-2xl text-indigo-700 font-bold bg-white hover:bg-indigo-50 shadow-2xl shadow-black/20 transition-all hover:-translate-y-1 active:translate-y-0 text-lg"
              >
                Launch App
                <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="#features"
                className="inline-flex items-center gap-2 px-10 py-5 rounded-2xl text-white/90 font-bold border border-white/20 hover:bg-white/10 transition-all hover:-translate-y-1 active:translate-y-0 text-lg"
              >
                Explore Features
              </a>
            </div>
            <p className="text-indigo-200 text-sm font-medium">
              Free forever on mock mode · No credit card · Takes 30 seconds
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
