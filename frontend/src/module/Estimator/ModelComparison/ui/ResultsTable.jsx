import React from "react";

const BADGE = {
  budget:
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400",
  balanced: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400",
  premium:
    "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-400",
};

const ResultsTable = ({ results }) => {
  return (
    <div className="flex flex-col gap-3 animate-fade-in">
      <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400">
        Comparison Results
      </h3>
      <div className="overflow-x-auto rounded-2xl border border-gray-100 dark:border-gray-800">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-800/60 text-xs uppercase tracking-wider text-gray-400 dark:text-gray-500">
              <th className="px-4 py-3 text-left font-semibold">Model</th>
              <th className="px-4 py-3 text-right font-semibold">Tokens</th>
              <th className="px-4 py-3 text-right font-semibold">
                Cost / req
              </th>
              <th className="px-4 py-3 text-right font-semibold">Tier</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {results.map(
              ({ company, name, totalTokens, finalCost, pricing }, i) => {
                const isBest = i === 0;
                return (
                  <tr
                    key={`${company}||${name}`}
                    className={`transition-colors ${
                      isBest
                        ? "bg-emerald-50/60 dark:bg-emerald-950/20"
                        : "bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800/40"
                    }`}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {isBest && (
                          <span className="text-emerald-500 font-bold text-base">
                            🏆
                          </span>
                        )}
                        <div>
                          <div className="font-semibold text-gray-800 dark:text-gray-100">
                            {name}
                          </div>
                          <div className="text-xs text-gray-400 dark:text-gray-500">
                            {company}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right text-gray-600 dark:text-gray-300 tabular-nums">
                      {totalTokens.toLocaleString()}
                    </td>
                    <td
                      className={`px-4 py-3 text-right font-bold tabular-nums ${
                        isBest
                          ? "text-emerald-600 dark:text-emerald-400"
                          : "text-gray-800 dark:text-gray-100"
                      }`}
                    >
                      ${finalCost.toFixed(6)}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span
                        className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase ${BADGE[pricing.category] || BADGE.budget}`}
                      >
                        {pricing.category}
                      </span>
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-gray-400 dark:text-gray-600 text-center">
        🏆 Cheapest model highlighted in green · Sorted by cost (lowest first)
      </p>
    </div>
  );
};

export default ResultsTable;
