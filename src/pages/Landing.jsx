


import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Landing() {
  const navigate = useNavigate();

  const features = [
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
        </svg>
      ),
      title: "AI Roadmaps",
      desc: "Personalized step-by-step learning paths built around your goals and current skill level.",
      accent: "#63b3ed",
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
        </svg>
      ),
      title: "Resume Analyzer",
      desc: "AI-powered feedback to sharpen your resume and make it stand out to recruiters.",
      accent: "#a78bfa",
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
      ),
      title: "Skill Gap Analysis",
      desc: "Instantly identify the exact skills you need to land your next role.",
      accent: "#68d391",
    },
  ];

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@400;500&display=swap');

        .landing-root {
          font-family: 'DM Sans', sans-serif;
          min-height: 100vh;
          background: #08081a;
          color: #e2e8f0;
          overflow: hidden;
          position: relative;
        }

        /* Background orbs */
        .orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(90px);
          pointer-events: none;
          z-index: 0;
        }
        .orb-1 {
          width: 520px; height: 520px;
          top: -160px; left: -100px;
          background: radial-gradient(circle, rgba(99,179,237,0.12) 0%, transparent 70%);
        }
        .orb-2 {
          width: 440px; height: 440px;
          top: 80px; right: -120px;
          background: radial-gradient(circle, rgba(167,139,250,0.1) 0%, transparent 70%);
        }
        .orb-3 {
          width: 300px; height: 300px;
          bottom: 80px; left: 40%;
          background: radial-gradient(circle, rgba(104,211,145,0.07) 0%, transparent 70%);
        }

        /* Grid overlay */
        .grid-overlay {
          position: absolute;
          inset: 0;
          z-index: 0;
          background-image:
            linear-gradient(rgba(99,179,237,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99,179,237,0.04) 1px, transparent 1px);
          background-size: 48px 48px;
          mask-image: radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%);
        }

        .landing-content {
          position: relative;
          z-index: 1;
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        /* Hero */
        .hero {
          padding: 100px 0 80px;
          text-align: center;
        }

        .hero-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 0.78rem;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #90cdf4;
          background: rgba(99,179,237,0.1);
          border: 1px solid rgba(99,179,237,0.2);
          border-radius: 999px;
          padding: 6px 16px;
          margin-bottom: 32px;
        }

        .eyebrow-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #63b3ed;
          animation: blink 2s ease-in-out infinite;
        }

        @keyframes blink {
          0%,100% { opacity: 1; }
          50% { opacity: 0.3; }
        }

        .hero-title {
          font-family: 'Syne', sans-serif;
          font-size: clamp(2.8rem, 6vw, 4.5rem);
          font-weight: 800;
          line-height: 1.08;
          letter-spacing: -0.03em;
          color: #f0f4ff;
          margin: 0 0 24px;
        }

        .hero-title .gradient-text {
          background: linear-gradient(135deg, #63b3ed 0%, #a78bfa 60%, #f687b3 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-sub {
          font-size: 1.1rem;
          color: rgba(200,210,230,0.6);
          max-width: 480px;
          margin: 0 auto 40px;
          line-height: 1.7;
        }

        .hero-actions {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 14px;
          flex-wrap: wrap;
        }

        .btn-primary {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.95rem;
          font-weight: 500;
          padding: 13px 30px;
          border-radius: 10px;
          border: none;
          background: linear-gradient(135deg, #63b3ed, #a78bfa);
          color: #fff;
          cursor: pointer;
          letter-spacing: 0.01em;
          transition: opacity 0.2s, transform 0.2s;
          display: flex;
          align-items: center;
          gap: 8px;
          box-shadow: 0 0 32px rgba(99,179,237,0.25);
        }

        .btn-primary:hover {
          opacity: 0.88;
          transform: translateY(-2px);
          box-shadow: 0 0 44px rgba(99,179,237,0.35);
        }

        .btn-primary:active {
          transform: translateY(0);
        }

        .btn-secondary {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.95rem;
          font-weight: 500;
          padding: 12px 28px;
          border-radius: 10px;
          background: transparent;
          border: 1px solid rgba(99,179,237,0.2);
          color: rgba(200,210,230,0.75);
          cursor: pointer;
          transition: all 0.2s;
          text-decoration: none;
        }

        .btn-secondary:hover {
          border-color: rgba(99,179,237,0.45);
          color: #e2e8f0;
          background: rgba(99,179,237,0.06);
        }

        /* Stats strip */
        .stats-strip {
          display: flex;
          justify-content: center;
          gap: 48px;
          margin-top: 64px;
          padding-top: 48px;
          border-top: 1px solid rgba(99,179,237,0.08);
          flex-wrap: wrap;
        }

        .stat-item {
          text-align: center;
        }

        .stat-number {
          font-family: 'Syne', sans-serif;
          font-size: 1.8rem;
          font-weight: 700;
          background: linear-gradient(135deg, #63b3ed, #a78bfa);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1;
        }

        .stat-label {
          font-size: 0.8rem;
          color: rgba(200,210,230,0.45);
          margin-top: 6px;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }

        /* Features */
        .features-section {
          padding: 80px 0 100px;
        }

        .section-label {
          text-align: center;
          font-size: 0.78rem;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(99,179,237,0.6);
          margin-bottom: 16px;
        }

        .section-title {
          font-family: 'Syne', sans-serif;
          font-size: clamp(1.6rem, 3vw, 2.2rem);
          font-weight: 700;
          text-align: center;
          color: #f0f4ff;
          letter-spacing: -0.02em;
          margin: 0 0 56px;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
        }

        .feature-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px;
          padding: 32px 28px;
          transition: border-color 0.25s, background 0.25s, transform 0.25s;
          position: relative;
          overflow: hidden;
        }

        .feature-card::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 16px;
          opacity: 0;
          transition: opacity 0.3s;
          background: radial-gradient(circle at 30% 30%, rgba(99,179,237,0.06), transparent 60%);
        }

        .feature-card:hover {
          border-color: rgba(99,179,237,0.2);
          background: rgba(255,255,255,0.05);
          transform: translateY(-4px);
        }

        .feature-card:hover::before {
          opacity: 1;
        }

        .feature-icon {
          width: 44px; height: 44px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
        }

        .feature-title {
          font-family: 'Syne', sans-serif;
          font-size: 1.05rem;
          font-weight: 600;
          color: #f0f4ff;
          margin: 0 0 10px;
          letter-spacing: -0.01em;
        }

        .feature-desc {
          font-size: 0.9rem;
          color: rgba(200,210,230,0.5);
          line-height: 1.7;
          margin: 0;
        }

        .feature-arrow {
          margin-top: 24px;
          font-size: 0.82rem;
          font-weight: 500;
          color: rgba(99,179,237,0.5);
          display: flex;
          align-items: center;
          gap: 6px;
          transition: color 0.2s, gap 0.2s;
        }

        .feature-card:hover .feature-arrow {
          color: #90cdf4;
          gap: 10px;
        }
      `}</style>

      <div className="landing-root">
        {/* Background */}
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
        <div className="grid-overlay" />

        <div className="landing-content">

          {/* HERO */}
          <motion.div
            className="hero"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <div className="hero-eyebrow">
                <span className="eyebrow-dot" />
                Powered by Artificial Intelligence
              </div>
            </motion.div>

            <motion.h1 className="hero-title" variants={itemVariants}>
              Navigate Your Career<br />
              <span className="gradient-text">with Confidence</span>
            </motion.h1>

            <motion.p className="hero-sub" variants={itemVariants}>
              Your AI-powered companion for personalized learning paths,
              resume feedback, and skill gap analysis — all in one place.
            </motion.p>

            <motion.div className="hero-actions" variants={itemVariants}>
              <button className="btn-primary" onClick={() => navigate("/roadmap")}>
                Generate Your Roadmap
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </button>
              <button className="btn-secondary" onClick={() => navigate("/login")}>
                Sign in
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div className="stats-strip" variants={itemVariants}>
              {[
                { number: "10K+", label: "Roadmaps Created" },
                { number: "95%", label: "Resume Accuracy" },
                { number: "200+", label: "Career Paths" },
              ].map((s) => (
                <div className="stat-item" key={s.label}>
                  <div className="stat-number">{s.number}</div>
                  <div className="stat-label">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* FEATURES */}
          <motion.div
            className="features-section"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.p className="section-label" variants={itemVariants}>
              What We Offer
            </motion.p>
            <motion.h2 className="section-title" variants={itemVariants}>
              Everything you need to grow
            </motion.h2>

            <div className="features-grid">
              {features.map((f) => (
                <motion.div
                  key={f.title}
                  className="feature-card"
                  variants={itemVariants}
                >
                  <div
                    className="feature-icon"
                    style={{
                      background: `${f.accent}15`,
                      border: `1px solid ${f.accent}25`,
                      color: f.accent,
                    }}
                  >
                    {f.icon}
                  </div>
                  <h3 className="feature-title">{f.title}</h3>
                  <p className="feature-desc">{f.desc}</p>
                  {/* <div className="feature-arrow">
                    Learn more
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                    </svg>
                  </div> */}
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </>
  );
}

export default Landing;