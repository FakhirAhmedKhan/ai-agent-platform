import { Brain } from "lucide-react";

const footerLinks = [
  {
    title: "Product",
    links: [
      { label: "Dashboard", href: "/app" },
      { label: "Agents", href: "/app/agents" },
      { label: "Tasks", href: "/app/tasks" },
      { label: "Usage", href: "/app/usage" },
    ],
  },
  {
    title: "Tools",
    links: [
      { label: "Cost Estimator", href: "/app/costing" },
      { label: "Notes", href: "/app/notes" },
      { label: "Settings", href: "/app/settings" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: "#" },
      { label: "API Reference", href: "#" },
      { label: "Changelog", href: "#" },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="border-t border-slate-100 bg-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1 space-y-4">
            <a href="#" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg text-slate-900 tracking-tight">
                Agentic<span className="text-indigo-600">TM</span>
              </span>
            </a>
            <p className="text-sm text-slate-500 leading-relaxed font-medium max-w-xs">
              The AI Agent Operating System. Manage, orchestrate, and scale AI agents like a pro.
            </p>
          </div>

          {/* Link Groups */}
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">{group.title}</h4>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-slate-600 hover:text-slate-900 font-medium transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-400 font-medium">
            © {new Date().getFullYear()} Agentic Task Manager. Built with ❤️ and AI.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-sm text-slate-400 hover:text-slate-600 font-medium transition-colors">Privacy</a>
            <a href="#" className="text-sm text-slate-400 hover:text-slate-600 font-medium transition-colors">Terms</a>
            <a href="#" className="text-sm text-slate-400 hover:text-slate-600 font-medium transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
