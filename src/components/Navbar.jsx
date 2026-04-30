import { useEffect, useState } from "react";
import { companies } from "../data/companies";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  /* Scroll navbar */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* Bloquer scroll quand menu ouvert */
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [menuOpen]);

  const navBg = scrolled || menuOpen
    ? "rgba(10,10,10,0.95)"
    : "transparent";

  return (
    <>
      {/* NAVBAR */}
      <nav style={{
        position: "fixed",
        top: 0,
        width: "100%",
        zIndex: 1000,
        background: navBg,
        backdropFilter: "blur(10px)",
        transition: "0.3s",
      }}>
        <div style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 1rem",
          height: 60,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}>

          {/* LOGO */}
          <a
            href="/"
            onClick={(e) => e.preventDefault()}
            style={{ textDecoration: "none" }}
          >
            <span style={{ color: "#fff", fontWeight: 700 }}>GABIZOCK</span>
            <span style={{ color: "#f59e0b", marginLeft: 5 }}>GROUP</span>
          </a>

          {/* DESKTOP */}
          <div className="desktop-links" style={{
            display: "flex",
            gap: "1.5rem",
          }}>
            {companies.map((c) => (
              <NavLink key={c.id} company={c} />
            ))}
          </div>

          {/* RIGHT */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <a href="/contact" className="cta-btn">
              Contact
            </a>

            {/* HAMBURGER */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="hamburger"
              aria-label="menu"
            >
              <HamburgerIcon open={menuOpen} />
            </button>
          </div>
        </div>
      </nav>

      {/* OVERLAY */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            zIndex: 999,
          }}
        />
      )}

      {/* MENU MOBILE */}
      <div style={{
        position: "fixed",
        top: 0,
        right: menuOpen ? 0 : "-100%",
        width: "75%",
        maxWidth: 300,
        height: "100vh",
        background: "#111",
        zIndex: 1001,
        transition: "right 0.3s ease",
        padding: "80px 20px",
        display: "flex",
        flexDirection: "column",
        gap: 20,
      }}>
        {companies.map((c) => (
          <a
            key={c.id}
            href={`#${c.id}`}
            onClick={() => setMenuOpen(false)}
            style={{
              color: "#ddd",
              textDecoration: "none",
              fontSize: 16,
              borderBottom: "1px solid rgba(255,255,255,0.1)",
              paddingBottom: 10,
            }}
          >
            {c.name}
          </a>
        ))}
      </div>

      {/* STYLES */}
      <style>{`
        .hamburger {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
        }

        .cta-btn {
          background: #f59e0b;
          color: #000;
          padding: 8px 14px;
          font-size: 12px;
          font-weight: 700;
          text-decoration: none;
          border-radius: 4px;
        }

        @media (max-width: 768px) {
          .desktop-links {
            display: none !important;
          }

          .cta-btn {
            display: none;
          }

          .hamburger {
            display: block;
          }
        }
      `}</style>
    </>
  );
}

/* NAV LINK */
function NavLink({ company }) {
  return (
    <a
      href={`#${company.id}`}
      style={{
        color: "#ddd",
        textDecoration: "none",
        fontSize: 13,
      }}
    >
      {company.name}
    </a>
  );
}

/* HAMBURGER ICON */
function HamburgerIcon({ open }) {
  const style = (rotate, y, opacity = 1) => ({
    width: 22,
    height: 2,
    background: "#fff",
    margin: "4px 0",
    transform: `rotate(${rotate}deg) translateY(${y}px)`,
    opacity,
    transition: "0.3s",
  });

  return (
    <div>
      <div style={style(open ? 45 : 0, open ? 6 : 0)} />
      <div style={style(0, 0, open ? 0 : 1)} />
      <div style={style(open ? -45 : 0, open ? -6 : 0)} />
    </div>
  );
}