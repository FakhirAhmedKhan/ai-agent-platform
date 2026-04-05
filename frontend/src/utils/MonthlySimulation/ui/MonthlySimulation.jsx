// import { useState, useMemo } from "react";
// import models from "../../assets/models";
// import { calcModelCost } from "../ModelComparison/ModelComparison";
// import { companies } from "../../assets/models";
// import { Header1 } from "../../../utils/Header";
// import { Modelselection } from "./ui/Modelselection";

// const COMPLEXITY_MULTIPLIERS = { Simple: 0.5, Moderate: 1.0, Complex: 2.0 };

// const fmt = (n) => `$${n.toFixed(2)}`;

// const MonthlySimulation = () => {
//   const [company, setCompany] = useState("");
//   const [model, setModel] = useState("");
//   const [words, setWords] = useState("");
//   const [complexity, setComplexity] = useState("Moderate");
//   const [numUsers, setNumUsers] = useState("");
//   const [reqPerUser, setReqPerUser] = useState("");

//   const modelNames =
//     company && models[company] ? Object.keys(models[company]) : [];

//   const sim = useMemo(() => {
//     const u = Number(numUsers);
//     const r = Number(reqPerUser);
//     const w = Number(words);
//     if (!company || !model || w <= 0 || u <= 0 || r <= 0) return null;
//     const singleReq = calcModelCost(company, model, words, complexity);
//     if (!singleReq) return null;
//     const totalRequests = u * r;
//     const monthlyCost = totalRequests * singleReq.finalCost;
//     const yearlyCost = monthlyCost * 12;
//     return {
//       totalRequests,
//       monthlyCost,
//       yearlyCost,
//       costPerReq: singleReq.finalCost,
//     };
//   }, [company, model, words, complexity, numUsers, reqPerUser]);

//   return (
//     <div className="flex flex-col gap-5">
//       {/* Header */}
//       <Header1
//         title="Model Comparison"
//         description="Compare costs across different AI models."
//         icon="📊"
//       />

//       {/* Modelselection */}
//       <Modelselection
//         company={company}
//         setCompany={setCompany}
//         model={model}
//         setModel={setModel}
//         modelNames={modelNames}
//         companies={companies}
//       />

//       {/* Promptcomplexity */}
//       <div className="grid grid-cols-2 gap-4">
//         <div className="flex flex-col gap-1.5">
//           <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
//             Prompt Words
//           </label>
//           <input
//             id="sim-words"
//             type="number"
//             min="1"
//             value={words}
//             onChange={(e) => setWords(e.target.value)}
//             placeholder="e.g. 150"
//             className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
//           />
//         </div>
//         <div className="flex flex-col gap-1.5">
//           <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
//             Complexity
//           </label>
//           <select
//             id="sim-complexity"
//             value={complexity}
//             onChange={(e) => setComplexity(e.target.value)}
//             className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all cursor-pointer"
//           >
//             {Object.keys(COMPLEXITY_MULTIPLIERS).map((c) => (
//               <option key={c}>{c}</option>
//             ))}
//           </select>
//         </div>
//       </div>

//       {/* Volume inputs */}
//       <div className="grid grid-cols-2 gap-4">
//         <div className="flex flex-col gap-1.5">
//           <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
//             Number of Users
//           </label>
//           <input
//             id="sim-users"
//             type="number"
//             min="1"
//             value={numUsers}
//             onChange={(e) => setNumUsers(e.target.value)}
//             placeholder="e.g. 1000"
//             className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
//           />
//         </div>
//         <div className="flex flex-col gap-1.5">
//           <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
//             Requests / User / Month
//           </label>
//           <input
//             id="sim-rpm"
//             type="number"
//             min="1"
//             value={reqPerUser}
//             onChange={(e) => setReqPerUser(e.target.value)}
//             placeholder="e.g. 30"
//             className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
//           />
//         </div>
//       </div>

//       {/* Results */}
//       {sim && (
//         <div className="flex flex-col gap-3 animate-fade-in">
//           <div className="grid grid-cols-2 gap-3">
//             <SimCard
//               icon="👥"
//               label="Total Requests / Month"
//               value={sim.totalRequests.toLocaleString()}
//               accent="blue"
//             />
//             <SimCard
//               icon="💸"
//               label="Cost per Request"
//               value={`$${sim.costPerReq.toFixed(6)}`}
//               accent="purple"
//             />
//             <SimCard
//               icon="📆"
//               label="Monthly Cost"
//               value={fmt(sim.monthlyCost)}
//               accent="amber"
//               large
//             />
//             <SimCard
//               icon="📈"
//               label="Yearly Cost"
//               value={fmt(sim.yearlyCost)}
//               accent="emerald"
//               large
//             />
//           </div>
//           <p className="text-xs text-center text-gray-400 dark:text-gray-600">
//             {numUsers} users × {reqPerUser} req/month ={" "}
//             {sim.totalRequests.toLocaleString()} total requests
//           </p>
//         </div>
//       )}
//     </div>
//   );
// };

// const SimCard = ({ icon, label, value, accent, large }) => {
//   const colors =
//     {
//       blue: "from-blue-500/10 to-blue-600/5 border-blue-500/20 text-blue-600 dark:text-blue-400",
//       purple:
//         "from-purple-500/10 to-purple-600/5 border-purple-500/20 text-purple-600 dark:text-purple-400",
//       emerald:
//         "from-emerald-500/10 to-emerald-600/5 border-emerald-500/20 text-emerald-600 dark:text-emerald-400",
//       amber:
//         "from-amber-500/10 to-amber-600/5 border-amber-500/20 text-amber-600 dark:text-amber-400",
//     }[accent] || "";

//   return (
//     <div
//       className={`bg-gradient-to-br ${colors} border rounded-2xl p-4 flex flex-col gap-1.5 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5`}
//     >
//       <div className="flex items-center gap-1.5">
//         <span className="text-lg">{icon}</span>
//         <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
//           {label}
//         </span>
//       </div>
//       <p
//         className={`font-bold text-gray-800 dark:text-gray-100 tracking-tight tabular-nums ${large ? "text-2xl" : "text-xl"}`}
//       >
//         {value}
//       </p>
//     </div>
//   );
// };

// export default MonthlySimulation;
