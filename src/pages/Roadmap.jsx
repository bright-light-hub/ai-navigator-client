

import { useState } from "react";
import API from "../services/api";

function Roadmap() {
  const [form, setForm] = useState({
    skill: "",
    level: "Beginner",
    goal: "",
    time: "",
  });

  const [roadmap, setRoadmap] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data } = await API.post("/api/roadmap/generate", form);
      setRoadmap(data);
    } catch (error) {
      console.error("Error generating roadmap:", error);
      // Optionally show an error message to the user
    } finally {
      setIsLoading(false);
    }
  };

  const getVisibleSections = () => {
    if (!roadmap) return [];

    if (form.level === "Beginner") {
      return { beginner: roadmap.beginner };
    }

    if (form.level === "Intermediate") {
      return {
        beginner: roadmap.beginner,
        intermediate: roadmap.intermediate,
      };
    }

    return roadmap;
  };

  return (
    <div className="min-h-screen bg-[#08081a] text-slate-200 relative overflow-hidden">
      <div className="pointer-events-none absolute -top-32 -right-24 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(167,139,250,0.16)_0%,transparent_70%)] blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-[360px] w-[360px] rounded-full bg-[radial-gradient(circle,rgba(99,179,237,0.14)_0%,transparent_70%)] blur-3xl" />

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-10 md:px-8">
        <div className="mb-10">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.22em] text-sky-300/60">
            AI Learning Path
          </p>
          <h1 className="mb-3 text-3xl font-bold tracking-tight text-slate-50 md:text-5xl">
            Generate Your{" "}
            <span className="bg-gradient-to-r from-sky-300 to-violet-400 bg-clip-text text-transparent">
              Roadmap
            </span>
          </h1>
          <p className="max-w-2xl text-sm text-slate-400 md:text-base">
            Build a personalized path based on your current level, weekly time,
            and learning goal.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[420px_minmax(0,1fr)]">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] backdrop-blur-xl">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-slate-100">
                  Roadmap Setup
                </h2>
                <p className="mt-1 text-sm text-slate-400">
                  Fill in a few details to generate your plan.
                </p>
              </div>
              <div className="rounded-2xl border border-sky-400/20 bg-sky-400/10 p-3 text-sky-300">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 12h4l3-9 4 18 3-9h4" />
                </svg>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Skill
                </label>
                <input
                  placeholder="e.g. React, Python, UI/UX"
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-sky-400/40 focus:bg-white/[0.05]"
                  onChange={(e) =>
                    setForm({ ...form, skill: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Level
                </label>
                <select
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-sky-400/40 focus:bg-white/[0.05]"
                  onChange={(e) =>
                    setForm({ ...form, level: e.target.value })
                  }
                >
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Goal
                </label>
                <input
                  placeholder="e.g. Get job-ready in frontend development"
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-sky-400/40 focus:bg-white/[0.05]"
                  onChange={(e) =>
                    setForm({ ...form, goal: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Hours Per Week
                </label>
                <input
                  placeholder="e.g. 8"
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-sky-400/40 focus:bg-white/[0.05]"
                  onChange={(e) =>
                    setForm({ ...form, time: e.target.value })
                  }
                />
              </div>

              <button
                disabled={isLoading}
                className="inline-flex w-full items-center justify-center rounded-2xl border border-sky-400/30 bg-gradient-to-r from-sky-400/20 to-violet-400/20 px-4 py-3 text-sm font-medium text-sky-200 transition hover:border-sky-300/50 hover:from-sky-400/30 hover:to-violet-400/30 hover:text-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <svg
                    className="animate-spin h-5 w-5 text-sky-200"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : (
                  "Generate Roadmap"
                )}
              </button>
            </form>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 backdrop-blur-xl">
            {!roadmap ? (
              <div className="flex h-full min-h-[420px] flex-col items-center justify-center rounded-3xl border border-dashed border-white/10 bg-white/[0.02] px-6 text-center">
                <div className="mb-4 rounded-2xl border border-violet-400/20 bg-violet-400/10 p-4 text-violet-300">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 20h9" />
                    <path d="M12 4h9" />
                    <path d="M4 9h16" />
                    <path d="M4 15h16" />
                  </svg>
                </div>
                <h2 className="mb-2 text-2xl font-semibold text-slate-100">
                  Your roadmap will appear here
                </h2>
                <p className="max-w-md text-sm leading-6 text-slate-400">
                  Enter your learning details on the left and generate a
                  personalized roadmap with structured stages and milestones.
                </p>
              </div>
            ) : (
              <div>
                <div className="mb-8 flex flex-col gap-4 border-b border-white/10 pb-6 md:flex-row md:items-end md:justify-between">
                  <div>
                    <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
                      Personalized Output
                    </p>
                    <h2 className="text-2xl font-bold text-slate-50">
                      {form.skill || "Skill"} Roadmap
                    </h2>
                    <p className="mt-2 text-sm text-slate-400">
                      Tailored for a {form.level.toLowerCase()} learner
                      {form.goal ? ` aiming to ${form.goal}` : ""}.
                    </p>
                  </div>

                  <button
                    onClick={async () => {
                      const user = JSON.parse(localStorage.getItem("user"));

                      await API.post(
                        "/api/roadmap/save",
                        {
                          skill: form.skill,
                          level: form.level,
                          roadmap: roadmap,
                          tools: roadmap.tools,
                          projects: roadmap.projects,
                          resources: roadmap.resources,
                        },
                        {
                          headers: {
                            Authorization: `Bearer ${user.token}`,
                          },
                        }
                      );

                      alert("Roadmap Saved ✅");
                    }}
                    className="inline-flex items-center justify-center rounded-2xl border border-emerald-400/25 bg-emerald-400/10 px-4 py-3 text-sm font-medium text-emerald-300 transition hover:border-emerald-300/40 hover:bg-emerald-400/15 hover:text-emerald-200"
                  >
                    Save Roadmap
                  </button>
                </div>

                <div className="space-y-6">
                  {Object.entries(getVisibleSections()).map(([key, items], sectionIndex) => (
                    <div
                      key={key}
                      className="rounded-3xl border border-white/10 bg-white/[0.03] p-5"
                    >
                      <div className="mb-4 flex items-center gap-3">
                        <div
                          className={`h-3 w-3 rounded-full ${
                            sectionIndex % 3 === 0
                              ? "bg-sky-400"
                              : sectionIndex % 3 === 1
                              ? "bg-violet-400"
                              : "bg-emerald-400"
                          }`}
                        />
                        <h3 className="text-lg font-semibold capitalize text-slate-100">
                          {key}
                        </h3>
                      </div>

                      <ul className="space-y-3">
                        {items.map((item, i) => (
                          <li
                            key={i}
                            className="rounded-2xl border border-white/8 bg-[#0f1024]/70 px-4 py-3 transition hover:border-sky-400/20 hover:bg-[#13152d]"
                          >
                            {typeof item === "object" ? (
                              <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
                                <span className="font-medium text-slate-200">
                                  {item.topic}
                                </span>
                                <span className="text-sm text-slate-400">
                                  {item.duration}
                                </span>
                              </div>
                            ) : (
                              <span className="text-slate-300">{item}</span>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Roadmap;








// import { useState } from "react";
// import API from "../services/api";

// function Roadmap() {
//   const [form, setForm] = useState({
//     skill: "",
//     level: "Beginner",
//     goal: "",
//     time: "",
//   });

//   const [roadmap, setRoadmap] = useState(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const { data } = await API.post("/api/roadmap/generate", form);
//     setRoadmap(data);
//   };

//   const getVisibleSections = () => {
//     if (!roadmap) return [];

//     if (form.level === "Beginner") {
//       return { beginner: roadmap.beginner };
//     }

//     if (form.level === "Intermediate") {
//       return {
//         beginner: roadmap.beginner,
//         intermediate: roadmap.intermediate,
//       };
//     }

//     return roadmap;
//   };

//   return (
//     <div className="min-h-screen bg-[#08081a] text-slate-200 relative overflow-hidden">
//       <div className="pointer-events-none absolute -top-32 -right-24 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(167,139,250,0.16)_0%,transparent_70%)] blur-3xl" />
//       <div className="pointer-events-none absolute -bottom-24 -left-24 h-[360px] w-[360px] rounded-full bg-[radial-gradient(circle,rgba(99,179,237,0.14)_0%,transparent_70%)] blur-3xl" />

//       <div className="relative z-10 mx-auto max-w-6xl px-6 py-10 md:px-8">
//         <div className="mb-10">
//           <p className="mb-3 text-xs font-medium uppercase tracking-[0.22em] text-sky-300/60">
//             AI Learning Path
//           </p>
//           <h1 className="mb-3 text-3xl font-bold tracking-tight text-slate-50 md:text-5xl">
//             Generate Your{" "}
//             <span className="bg-gradient-to-r from-sky-300 to-violet-400 bg-clip-text text-transparent">
//               Roadmap
//             </span>
//           </h1>
//           <p className="max-w-2xl text-sm text-slate-400 md:text-base">
//             Build a personalized path based on your current level, weekly time,
//             and learning goal.
//           </p>
//         </div>

//         <div className="grid gap-8 lg:grid-cols-[420px_minmax(0,1fr)]">
//           <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] backdrop-blur-xl">
//             <div className="mb-6 flex items-center justify-between">
//               <div>
//                 <h2 className="text-xl font-semibold text-slate-100">
//                   Roadmap Setup
//                 </h2>
//                 <p className="mt-1 text-sm text-slate-400">
//                   Fill in a few details to generate your plan.
//                 </p>
//               </div>
//               <div className="rounded-2xl border border-sky-400/20 bg-sky-400/10 p-3 text-sky-300">
//                 <svg
//                   width="20"
//                   height="20"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="1.8"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 >
//                   <path d="M3 12h4l3-9 4 18 3-9h4" />
//                 </svg>
//               </div>
//             </div>

//             <form onSubmit={handleSubmit} className="space-y-4">
//               <div>
//                 <label className="mb-2 block text-sm font-medium text-slate-300">
//                   Skill
//                 </label>
//                 <input
//                   placeholder="e.g. React, Python, UI/UX"
//                   className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-sky-400/40 focus:bg-white/[0.05]"
//                   onChange={(e) =>
//                     setForm({ ...form, skill: e.target.value })
//                   }
//                 />
//               </div>

//               <div>
//                 <label className="mb-2 block text-sm font-medium text-slate-300">
//                   Level
//                 </label>
//                 <select
//                   className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-sky-400/40 focus:bg-white/[0.05]"
//                   onChange={(e) =>
//                     setForm({ ...form, level: e.target.value })
//                   }
//                 >
//                   <option>Beginner</option>
//                   <option>Intermediate</option>
//                   <option>Advanced</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="mb-2 block text-sm font-medium text-slate-300">
//                   Goal
//                 </label>
//                 <input
//                   placeholder="e.g. Get job-ready in frontend development"
//                   className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-sky-400/40 focus:bg-white/[0.05]"
//                   onChange={(e) =>
//                     setForm({ ...form, goal: e.target.value })
//                   }
//                 />
//               </div>

//               <div>
//                 <label className="mb-2 block text-sm font-medium text-slate-300">
//                   Hours Per Week
//                 </label>
//                 <input
//                   placeholder="e.g. 8"
//                   className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-sky-400/40 focus:bg-white/[0.05]"
//                   onChange={(e) =>
//                     setForm({ ...form, time: e.target.value })
//                   }
//                 />
//               </div>

//               <button className="inline-flex w-full items-center justify-center rounded-2xl border border-sky-400/30 bg-gradient-to-r from-sky-400/20 to-violet-400/20 px-4 py-3 text-sm font-medium text-sky-200 transition hover:border-sky-300/50 hover:from-sky-400/30 hover:to-violet-400/30 hover:text-slate-50">
//                 Generate Roadmap
//               </button>
//             </form>
//           </div>

//           <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 backdrop-blur-xl">
//             {!roadmap ? (
//               <div className="flex h-full min-h-[420px] flex-col items-center justify-center rounded-3xl border border-dashed border-white/10 bg-white/[0.02] px-6 text-center">
//                 <div className="mb-4 rounded-2xl border border-violet-400/20 bg-violet-400/10 p-4 text-violet-300">
//                   <svg
//                     width="22"
//                     height="22"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth="1.8"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                   >
//                     <path d="M12 20h9" />
//                     <path d="M12 4h9" />
//                     <path d="M4 9h16" />
//                     <path d="M4 15h16" />
//                   </svg>
//                 </div>
//                 <h2 className="mb-2 text-2xl font-semibold text-slate-100">
//                   Your roadmap will appear here
//                 </h2>
//                 <p className="max-w-md text-sm leading-6 text-slate-400">
//                   Enter your learning details on the left and generate a
//                   personalized roadmap with structured stages and milestones.
//                 </p>
//               </div>
//             ) : (
//               <div>
//                 <div className="mb-8 flex flex-col gap-4 border-b border-white/10 pb-6 md:flex-row md:items-end md:justify-between">
//                   <div>
//                     <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
//                       Personalized Output
//                     </p>
//                     <h2 className="text-2xl font-bold text-slate-50">
//                       {form.skill || "Skill"} Roadmap
//                     </h2>
//                     <p className="mt-2 text-sm text-slate-400">
//                       Tailored for a {form.level.toLowerCase()} learner
//                       {form.goal ? ` aiming to ${form.goal}` : ""}.
//                     </p>
//                   </div>

//                   <button
//                     onClick={async () => {
//                       const user = JSON.parse(localStorage.getItem("user"));

//                       await API.post(
//                         "/api/roadmap/save",
//                         {
//                           skill: form.skill,
//                           level: form.level,
//                           roadmap: roadmap,
//                           tools: roadmap.tools,
//                           projects: roadmap.projects,
//                           resources: roadmap.resources,
//                         },
//                         {
//                           headers: {
//                             Authorization: `Bearer ${user.token}`,
//                           },
//                         }
//                       );

//                       alert("Roadmap Saved ✅");
//                     }}
//                     className="inline-flex items-center justify-center rounded-2xl border border-emerald-400/25 bg-emerald-400/10 px-4 py-3 text-sm font-medium text-emerald-300 transition hover:border-emerald-300/40 hover:bg-emerald-400/15 hover:text-emerald-200"
//                   >
//                     Save Roadmap
//                   </button>
//                 </div>

//                 <div className="space-y-6">
//                   {Object.entries(getVisibleSections()).map(([key, items], sectionIndex) => (
//                     <div
//                       key={key}
//                       className="rounded-3xl border border-white/10 bg-white/[0.03] p-5"
//                     >
//                       <div className="mb-4 flex items-center gap-3">
//                         <div
//                           className={`h-3 w-3 rounded-full ${
//                             sectionIndex % 3 === 0
//                               ? "bg-sky-400"
//                               : sectionIndex % 3 === 1
//                               ? "bg-violet-400"
//                               : "bg-emerald-400"
//                           }`}
//                         />
//                         <h3 className="text-lg font-semibold capitalize text-slate-100">
//                           {key}
//                         </h3>
//                       </div>

//                       <ul className="space-y-3">
//                         {items.map((item, i) => (
//                           <li
//                             key={i}
//                             className="rounded-2xl border border-white/8 bg-[#0f1024]/70 px-4 py-3 transition hover:border-sky-400/20 hover:bg-[#13152d]"
//                           >
//                             {typeof item === "object" ? (
//                               <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
//                                 <span className="font-medium text-slate-200">
//                                   {item.topic}
//                                 </span>
//                                 <span className="text-sm text-slate-400">
//                                   {item.duration}
//                                 </span>
//                               </div>
//                             ) : (
//                               <span className="text-slate-300">{item}</span>
//                             )}
//                           </li>
//                         ))}
//                       </ul>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Roadmap;






