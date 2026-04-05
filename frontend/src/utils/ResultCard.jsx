/**
 * ResultCard - Displays a single calculation result metric
 * @param {string} label - The metric label
 * @param {string|number} value - The metric value
 * @param {string} icon - Emoji icon
 * @param {string} accent - Tailwind accent color class
 */
const ResultCard = ({ label, value, icon, accent = "blue" }) => {
  const accentClasses = {
    blue: "from-blue-500/10 to-blue-600/5 border-blue-500/20 text-blue-600 dark:text-blue-400",
    purple: "from-purple-500/10 to-purple-600/5 border-purple-500/20 text-purple-600 dark:text-purple-400",
    emerald: "from-emerald-500/10 to-emerald-600/5 border-emerald-500/20 text-emerald-600 dark:text-emerald-400",
    amber: "from-amber-500/10 to-amber-600/5 border-amber-500/20 text-amber-600 dark:text-amber-400",
  };

  const colors = accentClasses[accent] || accentClasses.blue;

  return (
    <div
      className={`bg-gradient-to-br ${colors} border rounded-2xl p-5 flex flex-col gap-2 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5`}
    >
      <div className="flex items-center gap-2">
        <span className="text-xl">{icon}</span>
        <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
          {label}
        </span>
      </div>
      <p className="text-2xl font-bold text-gray-800 dark:text-gray-100 mt-1 tracking-tight">
        {value}
      </p>
    </div>
  );
};

export default ResultCard;
