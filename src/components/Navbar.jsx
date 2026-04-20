
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const userLinks = [
    { to: "/", label: "Home" },
    { to: "/dashboard", label: "Dashboard" },
    { to: "/roadmap", label: "Roadmap" },
    { to: "/saved", label: "Saved" },
    { to: "/resume", label: "Resume" },
    { to: "/skill-gap", label: "Skill Gap" },
  ];

  const guestLinks = [
    { to: "/", label: "Home" },
    { to: "/login", label: "Login" },
    { to: "/register", label: "Register" },
  ];

  const links = user ? userLinks : guestLinks;

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700&family=DM+Sans:wght@400;500&display=swap');

        body {
          margin: 0;
        }

        .navbar-shell {
          position: sticky;
          top: 0;
          z-index: 50;
          width: 100%;
          font-family: 'DM Sans', sans-serif;
        }

        .navbar-root {
          width: 100%;
          min-height: 68px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding: 0 2rem;
          background: rgba(8, 8, 20, 0.88);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(99, 179, 237, 0.12);
          box-sizing: border-box;
        }

        .navbar-logo {
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 1.25rem;
          letter-spacing: -0.02em;
          background: linear-gradient(135deg, #63b3ed 0%, #a78bfa 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          flex-shrink: 0;
        }

        .logo-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: linear-gradient(135deg, #63b3ed, #a78bfa);
          display: inline-block;
          animation: pulse-dot 2.5s ease-in-out infinite;
        }

        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(0.85); }
        }

        .nav-desktop {
          display: flex;
          align-items: center;
          gap: 4px;
          min-width: 0;
        }

        .nav-link {
          font-size: 0.875rem;
          font-weight: 500;
          padding: 6px 14px;
          border-radius: 8px;
          text-decoration: none;
          color: rgba(200, 210, 230, 0.7);
          transition: color 0.2s ease, background 0.2s ease;
          position: relative;
          letter-spacing: 0.01em;
          white-space: nowrap;
        }

        .nav-link:hover {
          color: #e2e8f0;
          background: rgba(99, 179, 237, 0.08);
        }

        .nav-link.active {
          color: #90cdf4;
          background: rgba(99, 179, 237, 0.12);
        }

        .nav-link.active::after {
          content: '';
          position: absolute;
          bottom: -1px;
          left: 50%;
          transform: translateX(-50%);
          width: 20px;
          height: 2px;
          border-radius: 2px;
          background: linear-gradient(90deg, #63b3ed, #a78bfa);
        }

        .nav-divider {
          width: 1px;
          height: 20px;
          background: rgba(99, 179, 237, 0.15);
          margin: 0 6px;
        }

        .btn-register {
          font-size: 0.875rem;
          font-weight: 500;
          padding: 7px 18px;
          border-radius: 8px;
          text-decoration: none;
          background: linear-gradient(135deg, rgba(99,179,237,0.15), rgba(167,139,250,0.15));
          border: 1px solid rgba(99, 179, 237, 0.25);
          color: #90cdf4;
          transition: all 0.2s ease;
          letter-spacing: 0.01em;
          white-space: nowrap;
        }

        .btn-register:hover {
          background: linear-gradient(135deg, rgba(99,179,237,0.25), rgba(167,139,250,0.25));
          border-color: rgba(99, 179, 237, 0.45);
          color: #bee3f8;
        }

        .btn-logout {
          font-size: 0.875rem;
          font-weight: 500;
          padding: 7px 16px;
          border-radius: 8px;
          background: transparent;
          border: 1px solid rgba(252, 129, 129, 0.2);
          color: rgba(252, 129, 129, 0.75);
          cursor: pointer;
          transition: all 0.2s ease;
          letter-spacing: 0.01em;
          display: flex;
          align-items: center;
          gap: 6px;
          white-space: nowrap;
        }

        .btn-logout:hover {
          background: rgba(252, 129, 129, 0.08);
          border-color: rgba(252, 129, 129, 0.4);
          color: #fc8181;
        }

        .user-badge {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 4px 12px 4px 6px;
          border-radius: 24px;
          background: rgba(99, 179, 237, 0.08);
          border: 1px solid rgba(99, 179, 237, 0.15);
          margin-left: 4px;
          min-width: 0;
        }

        .user-avatar {
          width: 26px;
          height: 26px;
          border-radius: 50%;
          background: linear-gradient(135deg, #63b3ed, #a78bfa);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          font-weight: 600;
          color: white;
          text-transform: uppercase;
          flex-shrink: 0;
        }

        .user-name {
          font-size: 0.8rem;
          font-weight: 500;
          color: rgba(200, 210, 230, 0.8);
          max-width: 100px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .menu-toggle {
          display: none;
          width: 42px;
          height: 42px;
          border-radius: 12px;
          border: 1px solid rgba(99, 179, 237, 0.18);
          background: rgba(99, 179, 237, 0.08);
          color: #cbd5e1;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          flex-shrink: 0;
        }

        .menu-toggle:hover {
          background: rgba(99, 179, 237, 0.14);
          color: #e2e8f0;
        }

        .nav-mobile {
          display: none;
          width: 100%;
          box-sizing: border-box;
          padding: 14px;
          background: rgba(8, 8, 20, 0.94);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(99, 179, 237, 0.12);
        }

        .nav-mobile.open {
          display: block;
        }

        .nav-mobile-links {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .nav-mobile .nav-link,
        .nav-mobile .btn-register {
          display: block;
          width: 100%;
          box-sizing: border-box;
          padding: 12px 14px;
          border-radius: 14px;
        }

        .nav-mobile .nav-link.active::after {
          display: none;
        }

        .nav-mobile-user {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-top: 14px;
          padding-top: 14px;
          border-top: 1px solid rgba(99, 179, 237, 0.12);
        }

        .nav-mobile-user .user-badge {
          margin-left: 0;
          flex: 1;
        }

        @media (max-width: 980px) {
          .navbar-root {
            padding: 0 1rem;
          }

          .nav-desktop {
            display: none;
          }

          .menu-toggle {
            display: inline-flex;
          }
        }

        @media (max-width: 640px) {
          .navbar-root {
            min-height: 60px;
            padding: 0 0.9rem;
          }

          .navbar-logo {
            font-size: 1.05rem;
          }

          .user-name {
            max-width: 84px;
          }
        }
      `}</style>

      <div className="navbar-shell">
        <nav className="navbar-root">
          <Link to="/" className="navbar-logo" onClick={closeMenu}>
            <span className="logo-dot" />
            AI Navigator
          </Link>

          <div className="nav-desktop">
            {links.map((link) =>
              link.to === "/register" ? (
                <Link key={link.to} to={link.to} className="btn-register">
                  {link.label}
                </Link>
              ) : (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`nav-link ${isActive(link.to) ? "active" : ""}`}
                >
                  {link.label}
                </Link>
              )
            )}

            {user && (
              <>
                <div className="nav-divider" />
                <div className="user-badge">
                  <div className="user-avatar">
                    {(user.name || user.email || "U").charAt(0)}
                  </div>
                  <span className="user-name">{user.name || user.email}</span>
                </div>

                <button
                  className="btn-logout"
                  onClick={() => {
                    localStorage.removeItem("user");
                    window.location.href = "/";
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16,17 21,12 16,7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                  </svg>
                  Logout
                </button>
              </>
            )}
          </div>

          <button
            className="menu-toggle"
            type="button"
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            {menuOpen ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </nav>

        <div className={`nav-mobile ${menuOpen ? "open" : ""}`}>
          <div className="nav-mobile-links">
            {links.map((link) =>
              link.to === "/register" ? (
                <Link
                  key={link.to}
                  to={link.to}
                  className="btn-register"
                  onClick={closeMenu}
                >
                  {link.label}
                </Link>
              ) : (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`nav-link ${isActive(link.to) ? "active" : ""}`}
                  onClick={closeMenu}
                >
                  {link.label}
                </Link>
              )
            )}
          </div>

          {user && (
            <div className="nav-mobile-user">
              <div className="user-badge">
                <div className="user-avatar">
                  {(user.name || user.email || "U").charAt(0)}
                </div>
                <span className="user-name">{user.name || user.email}</span>
              </div>

              <button
                className="btn-logout"
                onClick={() => {
                  localStorage.removeItem("user");
                  window.location.href = "/";
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16,17 21,12 16,7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Navbar;
