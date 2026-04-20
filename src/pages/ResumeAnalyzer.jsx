

import { useState } from "react";
import API from "../services/api";

function ResumeAnalyzer() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("resume", file);

    const { data } = await API.post("/api/resume/analyze", formData);

    setResult(data);
  };

  return (
    <div className="min-h-screen bg-[#08081a] text-slate-200 relative overflow-hidden">
      <div className="pointer-events-none absolute -top-32 -right-24 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(167,139,250,0.16)_0%,transparent_70%)] blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-[360px] w-[360px] rounded-full bg-[radial-gradient(circle,rgba(99,179,237,0.14)_0%,transparent_70%)] blur-3xl" />

      <div className="relative z-10 mx-auto max-w-5xl px-6 py-10 md:px-8">
        <div className="mb-10">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.22em] text-sky-300/60">
            AI Resume Review
          </p>
          <h1 className="mb-3 text-3xl font-bold tracking-tight text-slate-50 md:text-5xl">
            Resume{" "}
            <span className="bg-gradient-to-r from-sky-300 to-violet-400 bg-clip-text text-transparent">
              Analyzer
            </span>
          </h1>
          <p className="max-w-2xl text-sm text-slate-400 md:text-base">
            Upload your PDF resume and get an instant AI-powered review with
            score, strengths, missing skills, and practical suggestions.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[420px_minmax(0,1fr)]">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] backdrop-blur-xl">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-slate-100">
                  Upload Resume
                </h2>
                <p className="mt-1 text-sm text-slate-400">
                  PDF format only for analysis.
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
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                </svg>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="rounded-3xl border border-dashed border-white/15 bg-white/[0.02] p-5">
                <label className="mb-3 block text-sm font-medium text-slate-300">
                  Choose PDF File
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

              <button className="inline-flex w-full items-center justify-center rounded-2xl border border-sky-400/30 bg-gradient-to-r from-sky-400/20 to-violet-400/20 px-4 py-3 text-sm font-medium text-sky-200 transition hover:border-sky-300/50 hover:from-sky-400/30 hover:to-violet-400/30 hover:text-slate-50">
                Analyze Resume
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
                    <path d="M9 12h6" />
                    <path d="M9 16h6" />
                    <path d="M9 8h6" />
                    <path d="M5 3h11l3 3v15a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" />
                  </svg>
                </div>
                <h2 className="mb-2 text-2xl font-semibold text-slate-100">
                  Your resume insights will appear here
                </h2>
                <p className="max-w-md text-sm leading-6 text-slate-400">
                  Upload your resume and analyze it to get a score plus a clear
                  breakdown of strengths, missing skills, and improvements.
                </p>
              </div>
            ) : (
              <div>
                <div className="mb-8 flex flex-col gap-4 border-b border-white/10 pb-6 md:flex-row md:items-end md:justify-between">
                  <div>
                    <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
                      Analysis Result
                    </p>
                    <h2 className="text-2xl font-bold text-slate-50">
                      Resume Score
                    </h2>
                    <p className="mt-2 text-sm text-slate-400">
                      A quick AI evaluation of your uploaded resume.
                    </p>
                  </div>

                  <div className="inline-flex items-center rounded-2xl border border-emerald-400/25 bg-emerald-400/10 px-5 py-3 text-lg font-semibold text-emerald-300">
                    {result.score}
                  </div>
                </div>

                <div className="grid gap-5">
                  <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
                    <div className="mb-4 flex items-center gap-3">
                      <div className="h-3 w-3 rounded-full bg-sky-400" />
                      <h3 className="text-lg font-semibold text-slate-100">
                        Strengths
                      </h3>
                    </div>
                    <ul className="space-y-3">
                      {result.strengths.map((s, i) => (
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
                      <h3 className="text-lg font-semibold text-slate-100">
                        Missing Skills
                      </h3>
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
                      <h3 className="text-lg font-semibold text-slate-100">
                        Suggestions
                      </h3>
                    </div>
                    <ul className="space-y-3">
                      {result.suggestions.map((s, i) => (
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

export default ResumeAnalyzer;

