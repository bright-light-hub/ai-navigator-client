
import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await API.post("/api/auth/register", form);

      localStorage.setItem("user", JSON.stringify(data));
      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Error");
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#08081a] px-6 py-10 text-slate-200">
      <div className="pointer-events-none absolute -top-32 -right-24 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(167,139,250,0.16)_0%,transparent_70%)] blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-[360px] w-[360px] rounded-full bg-[radial-gradient(circle,rgba(99,179,237,0.14)_0%,transparent_70%)] blur-3xl" />

      <div className="relative z-10 grid w-full max-w-5xl overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.04] shadow-[0_30px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl lg:grid-cols-[1.05fr_0.95fr]">
        <div className="hidden border-r border-white/10 bg-[linear-gradient(180deg,rgba(99,179,237,0.08),rgba(167,139,250,0.03))] p-10 lg:flex lg:flex-col lg:justify-between">
          <div>
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.24em] text-sky-300/60">
              Start Here
            </p>
            <h1 className="max-w-md text-4xl font-bold leading-tight text-slate-50">
              Build your{" "}
              <span className="bg-gradient-to-r from-sky-300 to-violet-400 bg-clip-text text-transparent">
                AI career roadmap
              </span>
            </h1>
            <p className="mt-5 max-w-md text-sm leading-7 text-slate-400">
              Create your account to unlock personalized roadmaps, resume
              analysis, skill gap insights, and a focused learning dashboard.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
            <div className="mb-3 flex items-center gap-3">
              <div className="h-3 w-3 rounded-full bg-violet-400" />
              <p className="text-sm font-medium text-slate-200">
                Designed for guided growth
              </p>
            </div>
            <p className="text-sm leading-6 text-slate-400">
              One place to plan, save, analyze, and track the skills you need
              for your next role.
            </p>
          </div>
        </div>

        <div className="p-6 sm:p-8 md:p-10">
          <div className="mx-auto w-full max-w-md">
            <div className="mb-8">
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.22em] text-sky-300/60">
                Create Account
              </p>
              <h2 className="text-3xl font-bold tracking-tight text-slate-50">
                Register
              </h2>
              <p className="mt-3 text-sm text-slate-400">
                Set up your profile and get started.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Your full name"
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-sky-400/40 focus:bg-white/[0.05]"
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-sky-400/40 focus:bg-white/[0.05]"
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Create a secure password"
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-sky-400/40 focus:bg-white/[0.05]"
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                />
              </div>

              <button className="inline-flex w-full items-center justify-center rounded-2xl border border-sky-400/30 bg-gradient-to-r from-sky-400/20 to-violet-400/20 px-4 py-3 text-sm font-medium text-sky-200 transition hover:border-sky-300/50 hover:from-sky-400/30 hover:to-violet-400/30 hover:text-slate-50">
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
