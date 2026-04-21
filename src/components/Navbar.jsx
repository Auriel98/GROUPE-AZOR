import { useEffect, useState } from "react";
import { companies } from "../data/companies";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        width: "100%",
        zIndex: 1000,
        transition: "all 0.3s ease",

        background: scrolled
          ? "rgba(10,10,10,0.85)"
          : "transparent",

        backdropFilter: scrolled ? "blur(10px)" : "none",
        borderBottom: scrolled
          ? "1px solid rgba(255,255,255,0.08)"
          : "none",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 2rem",
          height: 70,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* LOGO */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <span
            style={{
              fontFamily: "'Georgia', serif",
              fontWeight: 700,
              fontSize: 20,
              color: "white",
              letterSpacing: "-0.02em",
            }}
          >
            GROUPE
          </span>

          <span
            style={{
              fontFamily: "'Georgia', serif",
              fontWeight: 700,
              fontSize: 20,
              color: "#f59e0b",
              marginLeft: 6,
            }}
          >
            AZOR
          </span>
        </div>

        {/* NAV LINKS */}
        <div style={{ display: "flex", gap: "2rem" }}>
          {companies.map((company) => (
            <NavLink key={company.id} company={company} />
          ))}
        </div>

        {/* CTA */}
        <a
          href="/contact"
          style={{
            background: "#f59e0b",
            color: "black",
            padding: "10px 16px",
            borderRadius: 6,
            fontSize: 12,
            fontWeight: 600,
            textDecoration: "none",
          }}
        >
          Contact
        </a>
      </div>
    </nav>
  );
}

/* LIEN */
function NavLink({ company }) {
  const [hover, setHover] = useState(false);

  return (
    <a
      href={`#${company.id}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: "relative",
        fontSize: 13,
        color: hover ? "#f59e0b" : "#ddd",
        textDecoration: "none",
        letterSpacing: "0.05em",
        fontWeight: 500,
        transition: "all 0.2s ease",
      }}
    >
      {company.name}

      {/* underline animation */}
      <span
        style={{
          position: "absolute",
          bottom: -6,
          left: 0,
          height: 2,
          width: hover ? "100%" : "0%",
          background: "#f59e0b",
          transition: "width 0.3s ease",
        }}
      />
    </a>
  );
}