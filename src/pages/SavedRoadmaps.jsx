

import { useEffect, useState } from "react";
import API from "../services/api";

const calculateProgress = (roadmap) => {
  let total = 0;
  let completed = 0;

  ["beginner", "intermediate", "advanced"].forEach((level) => {
    roadmap[level]?.forEach((item) => {
      total++;
      if (item.completed) completed++;
    });
  });

  return total === 0 ? 0 : Math.round((completed / total) * 100);
};

const getProgressMeta = (roadmap) => {
  let total = 0;
  let completed = 0;

  ["beginner", "intermediate", "advanced"].forEach((level) => {
    roadmap[level]?.forEach((item) => {
      total++;
      if (item.completed) completed++;
    });
  });

  return { total, completed };
};

function SavedRoadmaps() {
  const [data, setData] = useState([]);
  const [openId, setOpenId] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      const res = await API.get("/api/roadmap/my", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setData(res.data);
    };
    fetch();
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#08081a] text-slate-200">
      <div className="pointer-events-none absolute -top-32 -right-24 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(167,139,250,0.16)_0%,transparent_70%)] blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-[360px] w-[360px] rounded-full bg-[radial-gradient(circle,rgba(99,179,237,0.14)_0%,transparent_70%)] blur-3xl" />

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-10 md:px-8">
        <div className="mb-10">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.22em] text-sky-300/60">
            Your Learning Library
          </p>
          <h1 className="mb-3 text-3xl font-bold tracking-tight text-slate-50 md:text-5xl">
            Saved{" "}
            <span className="bg-gradient-to-r from-sky-300 to-violet-400 bg-clip-text text-transparent">
              Roadmaps
            </span>
          </h1>
          <p className="max-w-2xl text-sm text-slate-400 md:text-base">
            Keep your plans organized, monitor completion, and expand any roadmap
            to continue where you left off.
          </p>
        </div>

        {data.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 backdrop-blur-xl">
            <div className="flex min-h-[320px] flex-col items-center justify-center rounded-3xl border border-dashed border-white/10 bg-white/[0.02] px-6 text-center">
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
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <h2 className="mb-2 text-2xl font-semibold text-slate-100">
                No saved roadmaps yet
              </h2>
              <p className="max-w-md text-sm leading-6 text-slate-400">
                Once you save a roadmap, it will appear here in a compact list
                with progress and expandable details.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {data.map((roadmapItem, roadmapIndex) => {
              const progress = calculateProgress(roadmapItem.roadmap);
              const { total, completed } = getProgressMeta(roadmapItem.roadmap);
              const isOpen = openId === roadmapItem._id;

              return (
                <div
                  key={roadmapItem._id}
                  className={`overflow-hidden rounded-3xl border backdrop-blur-xl transition-all duration-300 ${
                    isOpen
                      ? "border-sky-400/20 bg-white/[0.05] shadow-[0_20px_80px_rgba(15,23,42,0.35)]"
                      : "border-white/10 bg-white/[0.035] hover:border-white/15 hover:bg-white/[0.045]"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() =>
                      setOpenId((prev) =>
                        prev === roadmapItem._id ? null : roadmapItem._id
                      )
                    }
                    className="w-full text-left"
                  >
                    <div className="flex flex-col gap-5 p-5 md:flex-row md:items-center md:justify-between md:p-6">
                      <div className="min-w-0 flex-1">
                        <div className="mb-3 flex flex-wrap items-center gap-3">
                          <span
                            className={`inline-flex h-2.5 w-2.5 rounded-full ${
                              roadmapIndex % 3 === 0
                                ? "bg-sky-400"
                                : roadmapIndex % 3 === 1
                                ? "bg-violet-400"
                                : "bg-emerald-400"
                            }`}
                          />
                          <span className="rounded-full border border-sky-400/20 bg-sky-400/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-sky-300">
                            {roadmapItem.level}
                          </span>
                          <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-emerald-300">
                            {completed}/{total} Complete
                          </span>
                        </div>

                        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                          <div className="min-w-0">
                            <h2 className="truncate text-xl font-bold text-slate-50 md:text-2xl">
                              {roadmapItem.skill}
                            </h2>
                            <p className="mt-1 text-sm text-slate-400">
                              {isOpen
                                ? "Expanded roadmap view with sections and checklist progress."
                                : "Click to expand this roadmap and continue learning."}
                            </p>
                          </div>

                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
                                Status
                              </p>
                              <p className="text-lg font-semibold text-slate-100">
                                {progress}%
                              </p>
                            </div>

                            <div
                              className={`flex h-11 w-11 items-center justify-center rounded-2xl border transition ${
                                isOpen
                                  ? "border-sky-400/25 bg-sky-400/10 text-sky-300"
                                  : "border-white/10 bg-white/[0.04] text-slate-300"
                              }`}
                            >
                              <svg
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className={`transition-transform duration-300 ${
                                  isOpen ? "rotate-180" : ""
                                }`}
                              >
                                <polyline points="6 9 12 15 18 9" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 md:ml-6">
                        <div className="hidden w-36 md:block">
                          <div className="mb-2 flex items-center justify-between text-xs uppercase tracking-[0.18em] text-slate-500">
                            <span>Progress</span>
                            <span>{progress}%</span>
                          </div>
                          <div className="h-2.5 w-full overflow-hidden rounded-full bg-white/10">
                            <div
                              className="h-2.5 rounded-full bg-gradient-to-r from-sky-400 via-violet-400 to-emerald-400 transition-all duration-300"
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={async (e) => {
                            e.stopPropagation();

                            const user = JSON.parse(localStorage.getItem("user"));

                            await API.delete(`/api/roadmap/${roadmapItem._id}`, {
                              headers: {
                                Authorization: `Bearer ${user.token}`,
                              },
                            });

                            setData((prev) =>
                              prev.filter((item) => item._id !== roadmapItem._id)
                            );

                            setOpenId((prev) =>
                              prev === roadmapItem._id ? null : prev
                            );
                          }}
                          className="inline-flex items-center justify-center rounded-2xl border border-red-400/20 bg-red-400/10 px-4 py-2.5 text-sm font-medium text-red-300 transition hover:border-red-300/35 hover:bg-red-400/15 hover:text-red-200"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </button>

                  {isOpen && (
                    <div className="border-t border-white/10 px-5 pb-5 pt-5 md:px-6 md:pb-6">
                      <div className="mb-6 rounded-3xl border border-white/10 bg-[#0f1024]/70 p-5">
                        <div className="mb-3 flex items-center justify-between gap-4">
                          <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
                            Overall Progress
                          </h3>
                          <span className="text-lg font-semibold text-slate-100">
                            {progress}%
                          </span>
                        </div>

                        <div className="h-3 w-full overflow-hidden rounded-full bg-white/10">
                          <div
                            className="h-3 rounded-full bg-gradient-to-r from-sky-400 via-violet-400 to-emerald-400 transition-all duration-300"
                            style={{ width: `${progress}%` }}
                          />
                        </div>

                        <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-slate-400">
                          <span>{completed} topics completed</span>
                          <span className="h-1 w-1 rounded-full bg-slate-600" />
                          <span>{total - completed} remaining</span>
                        </div>
                      </div>

                      <div className="grid gap-5">
                        {Object.entries(roadmapItem.roadmap).map(
                          ([key, items], sectionIndex) => (
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
                                <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-slate-400">
                                  {items.length} items
                                </span>
                              </div>

                              <ul className="space-y-3">
                                {items.map((item, i) => (
                                  <li
                                    key={i}
                                    className="flex items-start gap-3 rounded-2xl border border-white/8 bg-[#0f1024]/70 px-4 py-3 transition hover:border-sky-400/20 hover:bg-[#13152d]"
                                  >
                                    <input
                                      type="checkbox"
                                      checked={item.completed || false}
                                      onChange={async () => {
                                        const user = JSON.parse(
                                          localStorage.getItem("user")
                                        );
                                        const res = await API.put(
                                          "/api/roadmap/toggle",
                                          {
                                            roadmapId: roadmapItem._id,
                                            section: key,
                                            topicIndex: i,
                                          },
                                          {
                                            headers: {
                                              Authorization: `Bearer ${user.token}`,
                                            },
                                          }
                                        );
                                        setData((prev) =>
                                          prev.map((r) =>
                                            r._id === roadmapItem._id ? res.data : r
                                          )
                                        );
                                      }}
                                      className="mt-1 h-4 w-4 rounded border-white/20 bg-transparent text-sky-400 focus:ring-sky-400/40"
                                    />
                                    <div className="flex-1">
                                      <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
                                        <span
                                          className={
                                            item.completed
                                              ? "font-medium text-slate-500 line-through"
                                              : "font-medium text-slate-200"
                                          }
                                        >
                                          {item.topic}
                                        </span>
                                        <span className="text-sm text-slate-400">
                                          {item.duration}
                                        </span>
                                      </div>
                                    </div>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default SavedRoadmaps;
