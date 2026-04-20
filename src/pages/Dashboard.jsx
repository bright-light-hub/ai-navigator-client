
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";

function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) navigate("/login");
  }, []);

  const getGreeting = () => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 17) return "Good afternoon";
    return "Good evening";
  };

  const cards = [
    {
      to: "/roadmap",
      title: "AI Roadmap",
      desc: "Generate a personalized step-by-step learning path for your target role.",
      accent: "#63b3ed",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 12h4l3-9 4 18 3-9h4"/>
        </svg>
      ),
      tag: "Most Used",
    },
    {
      to: "/saved",
      title: "Saved Roadmaps",
      desc: "Revisit and track progress on all your previously generated roadmaps.",
      accent: "#a78bfa",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
        </svg>
      ),
      tag: null,
    },
    {
      to: "/resume",
      title: "Resume Analyzer",
      desc: "Get instant AI feedback to sharpen your resume and impress recruiters.",
      accent: "#68d391",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
          <line x1="16" y1="13" x2="8" y2="13"/>
          <line x1="16" y1="17" x2="8" y2="17"/>
        </svg>
      ),
      tag: null,
    },
    {
      to: "/skill-gap",
      title: "Skill Gap Analysis",
      desc: "Discover exactly which skills you're missing for your dream job.",
      accent: "#f6ad55",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <path d="M12 8v4l3 3"/>
        </svg>
      ),
      tag: null,
    },
  ];

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@400;500&display=swap');

        .dash-root {
          font-family: 'DM Sans', sans-serif;
          min-height: 100vh;
          background: #08081a;
          color: #e2e8f0;
          position: relative;
          overflow: hidden;
        }

        .dash-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
          pointer-events: none;
          z-index: 0;
        }
        .dash-orb-1 {
          width: 500px; height: 500px;
          top: -200px; right: -100px;
          background: radial-gradient(circle, rgba(167,139,250,0.1) 0%, transparent 70%);
        }
        .dash-orb-2 {
          width: 400px; height: 400px;
          bottom: 0; left: -100px;
          background: radial-gradient(circle, rgba(99,179,237,0.08) 0%, transparent 70%);
        }

        .dash-content {
          position: relative;
          z-index: 1;
          max-width: 1100px;
          margin: 0 auto;
          padding: 60px 2rem 80px;
        }

        /* Header */
        .dash-header {
          margin-bottom: 56px;
        }

        .dash-greeting {
          font-size: 0.82rem;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: rgba(99,179,237,0.6);
          margin-bottom: 10px;
        }

        .dash-welcome {
          font-family: 'Syne', sans-serif;
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 800;
          letter-spacing: -0.03em;
          color: #f0f4ff;
          margin: 0 0 12px;
          line-height: 1.1;
        }

        .dash-welcome .name-accent {
          background: linear-gradient(135deg, #63b3ed 0%, #a78bfa 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .dash-subtitle {
          font-size: 0.95rem;
          color: rgba(200,210,230,0.45);
          margin: 0;
        }

        /* Quick stats */
        .dash-stats {
          display: flex;
          gap: 12px;
          margin-bottom: 48px;
          flex-wrap: wrap;
        }

        .stat-pill {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          border-radius: 999px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          font-size: 0.82rem;
          color: rgba(200,210,230,0.55);
          transition: border-color 0.2s;
        }

        .stat-pill:hover {
          border-color: rgba(99,179,237,0.2);
        }

        .stat-pill-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
        }

        /* Section label */
        .section-label {
          font-size: 0.78rem;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: rgba(200,210,230,0.35);
          margin-bottom: 20px;
        }

        /* Cards grid */
        .dash-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 18px;
        }

        .dash-card {
          position: relative;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 18px;
          padding: 28px 26px 24px;
          text-decoration: none;
          color: inherit;
          display: flex;
          flex-direction: column;
          transition: border-color 0.25s, background 0.25s, transform 0.25s;
          overflow: hidden;
          cursor: pointer;
        }

        .dash-card::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 18px;
          opacity: 0;
          transition: opacity 0.3s;
          pointer-events: none;
        }

        .dash-card:hover {
          background: rgba(255,255,255,0.055);
          transform: translateY(-4px);
        }

        .dash-card:hover::after {
          opacity: 1;
        }

        .card-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 18px;
        }

        .card-icon-wrap {
          width: 46px;
          height: 46px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .card-tag {
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          padding: 4px 10px;
          border-radius: 999px;
          background: rgba(99,179,237,0.12);
          border: 1px solid rgba(99,179,237,0.2);
          color: #90cdf4;
        }

        .card-title {
          font-family: 'Syne', sans-serif;
          font-size: 1.05rem;
          font-weight: 700;
          color: #f0f4ff;
          margin: 0 0 8px;
          letter-spacing: -0.01em;
        }

        .card-desc {
          font-size: 0.875rem;
          color: rgba(200,210,230,0.45);
          line-height: 1.65;
          margin: 0;
          flex: 1;
        }

        .card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 22px;
          padding-top: 18px;
          border-top: 1px solid rgba(255,255,255,0.06);
        }

        .card-cta {
          font-size: 0.82rem;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 5px;
          transition: gap 0.2s;
        }

        .dash-card:hover .card-cta {
          gap: 9px;
        }

        .card-arrow {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s;
        }

        .dash-card:hover .card-arrow {
          background: rgba(255,255,255,0.06);
        }

        /* Shimmer line at top of card on hover */
        .card-shimmer {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          border-radius: 18px 18px 0 0;
          opacity: 0;
          transition: opacity 0.3s;
        }

        .dash-card:hover .card-shimmer {
          opacity: 1;
        }
      `}</style>

      <div className="dash-root">
        <div className="dash-orb dash-orb-1" />
        <div className="dash-orb dash-orb-2" />

        <div className="dash-content">

          {/* HEADER */}
          <motion.div
            className="dash-header"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="dash-greeting">{getGreeting()}</p>
            <h1 className="dash-welcome">
              Welcome back,{" "}
              <span className="name-accent">{user?.name || "Explorer"}</span>
            </h1>
            <p className="dash-subtitle">
              Pick up where you left off or explore something new today.
            </p>
          </motion.div>

          {/* QUICK STATS */}
          <motion.div
            className="dash-stats"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {[
              { color: "#63b3ed", label: "Roadmaps Generated" },
              { color: "#a78bfa", label: "Skills Tracked" },
              { color: "#68d391", label: "Resume Score" },
            ].map((s) => (
              <div className="stat-pill" key={s.label}>
                <span className="stat-pill-dot" style={{ background: s.color }} />
                {s.label}
              </div>
            ))}
          </motion.div>

          {/* CARDS */}
          <p className="section-label">Your Tools</p>
          <motion.div
            className="dash-grid"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {cards.map((card) => (
              <motion.div key={card.to} variants={itemVariants}>
                <Link to={card.to} className="dash-card" style={{ "--accent": card.accent }}>

                  {/* Shimmer top line */}
                  <div
                    className="card-shimmer"
                    style={{ background: `linear-gradient(90deg, transparent, ${card.accent}60, transparent)` }}
                  />

                  <div className="card-top">
                    <div
                      className="card-icon-wrap"
                      style={{
                        background: `${card.accent}18`,
                        border: `1px solid ${card.accent}28`,
                        color: card.accent,
                      }}
                    >
                      {card.icon}
                    </div>
                    {card.tag && <span className="card-tag">{card.tag}</span>}
                  </div>

                  <h2 className="card-title">{card.title}</h2>
                  <p className="card-desc">{card.desc}</p>

                  <div className="card-footer">
                    <span className="card-cta" style={{ color: card.accent }}>
                      Open
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                      </svg>
                    </span>
                    <div className="card-arrow" style={{ border: `1px solid ${card.accent}25` }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={card.accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M7 17L17 7M17 7H7M17 7v10"/>
                      </svg>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </>
  );
}

export default Dashboard;

