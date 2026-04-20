

import { useState } from "react";
import API from "../services/api";

function SkillGap() {
  const [file, setFile] = useState(null);
  const [role, setRole] = useState("");
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("resume", file);
    formData.append("role", role);

    const { data } = await API.post("/api/skill-gap/analyze", formData);

    setResult(data);
  };

  return (
    <div className="min-h-screen bg-[#08081a] text-slate-200 relative overflow-hidden">
      <div className="pointer-events-none absolute -top-32 -right-24 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(167,139,250,0.16)_0%,transparent_70%)] blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-[360px] w-[360px] rounded-full bg-[radial-gradient(circle,rgba(99,179,237,0.14)_0%,transparent_70%)] blur-3xl" />

      <div className="relative z-10 mx-auto max-w-5xl px-6 py-10 md:px-8">
        <div className="mb-10">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.22em] text-sky-300/60">
            Career Match Analysis
          </p>
          <h1 className="mb-3 text-3xl font-bold tracking-tight text-slate-50 md:text-5xl">
            Skill Gap{" "}
            <span className="bg-gradient-to-r from-sky-300 to-violet-400 bg-clip-text text-transparent">
              Analysis
            </span>
          </h1>
          <p className="max-w-2xl text-sm text-slate-400 md:text-base">
            Upload your resume, enter your target role, and discover what skills
            you already have, what you’re missing, and what to build next.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[420px_minmax(0,1fr)]">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] backdrop-blur-xl">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-slate-100">
                  Analysis Input
                </h2>
                <p className="mt-1 text-sm text-slate-400">
                  Add your resume and target job role.
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
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8v4l3 3" />
                </svg>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="rounded-3xl border border-dashed border-white/15 bg-white/[0.02] p-5">
                <label className="mb-3 block text-sm font-medium text-slate-300">
                  Upload Resume
                </label>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => setFile(e.target.files[0])}
                  className="block w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-slate-300 file:mr-4 file:rounded-xl file:border-0 file:bg-sky-400/15 file:px-4 file:py-2 file:text-sm file:font-medium file:text-sky-200 hover:file:bg-sky-400/20"
                />
                <p className="mt-3 text-xs text-slate-500">
                  {file ? `Selected: ${file.name}` : "No file selected yet."}
                </p>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Target Role
                </label>
                <input
                  type="text"
                  placeholder="e.g. Frontend Developer, Data Analyst"
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-sky-400/40 focus:bg-white/[0.05]"
                  onChange={(e) => setRole(e.target.value)}
                />
              </div>

              <button className="inline-flex w-full items-center justify-center rounded-2xl border border-sky-400/30 bg-gradient-to-r from-sky-400/20 to-violet-400/20 px-4 py-3 text-sm font-medium text-sky-200 transition hover:border-sky-300/50 hover:from-sky-400/30 hover:to-violet-400/30 hover:text-slate-50">
                Analyze Skill Gap
              </button>
            </form>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 backdrop-blur-xl">
            {!result ? (
              <div className="flex min-h-[420px] flex-col items-center justify-center rounded-3xl border border-dashed border-white/10 bg-white/[0.02] px-6 text-center">
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
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                    <path d="M7.5 4.21 12 6.81l4.5-2.6" />
                    <path d="M12 22.08V12" />
                  </svg>
                </div>
                <h2 className="mb-2 text-2xl font-semibold text-slate-100">
                  Your skill gap insights will appear here
                </h2>
                <p className="max-w-md text-sm leading-6 text-slate-400">
                  Run the analysis to see your current skills, missing areas,
                  recommended study topics, and suggested projects.
                </p>
              </div>
            ) : (
              <div>
                <div className="mb-8 border-b border-white/10 pb-6">
                  <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
                    Analysis Result
                  </p>
                  <h2 className="text-2xl font-bold text-slate-50">
                    Skill Gap Overview
                  </h2>
                  <p className="mt-2 text-sm text-slate-400">
                    Personalized recommendations based on your resume and target
                    role{role ? `: ${role}` : ""}.
                  </p>
                </div>

                <div className="grid gap-5">
                  <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
                    <div className="mb-4 flex items-center gap-3">
                      <div className="h-3 w-3 rounded-full bg-sky-400" />
                      <h2 className="text-lg font-semibold text-slate-100">
                        Current Skills
                      </h2>
                    </div>
                    <ul className="space-y-3">
                      {result.current_skills.map((s, i) => (
                        <li
                          key={i}
                          className="rounded-2xl border border-white/8 bg-[#0f1024]/70 px-4 py-3 text-slate-300"
                        >
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
                    <div className="mb-4 flex items-center gap-3">
                      <div className="h-3 w-3 rounded-full bg-violet-400" />
                      <h2 className="text-lg font-semibold text-slate-100">
                        Missing Skills
                      </h2>
                    </div>
                    <ul className="space-y-3">
                      {result.missing_skills.map((s, i) => (
                        <li
                          key={i}
                          className="rounded-2xl border border-white/8 bg-[#0f1024]/70 px-4 py-3 text-slate-300"
                        >
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
                    <div className="mb-4 flex items-center gap-3">
                      <div className="h-3 w-3 rounded-full bg-emerald-400" />
                      <h2 className="text-lg font-semibold text-slate-100">
                        Recommended Topics
                      </h2>
                    </div>
                    <ul className="space-y-3">
                      {result.recommended_topics.map((s, i) => (
                        <li
                          key={i}
                          className="rounded-2xl border border-white/8 bg-[#0f1024]/70 px-4 py-3 text-slate-300"
                        >
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
                    <div className="mb-4 flex items-center gap-3">
                      <div className="h-3 w-3 rounded-full bg-amber-400" />
                      <h2 className="text-lg font-semibold text-slate-100">
                        Projects
                      </h2>
                    </div>
                    <ul className="space-y-3">
                      {result.projects.map((s, i) => (
                        <li
                          key={i}
                          className="rounded-2xl border border-white/8 bg-[#0f1024]/70 px-4 py-3 text-slate-300"
                        >
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SkillGap;

