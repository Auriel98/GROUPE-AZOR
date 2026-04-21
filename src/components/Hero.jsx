import { useState, useEffect } from "react";
import { stats } from "../data/companies";

export default function Hero() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      style={{
        position: "relative",
        minHeight: "90vh",
        display: "flex",
        alignItems: "center",
        color: "white",
        overflow: "hidden",
      }}
    >
      {/* BACKGROUND IMAGE */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url('/hero.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: 0,
        }}
      />

      {/* DARK OVERLAY */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(90deg, rgba(0,0,0,0.75) 30%, rgba(0,0,0,0.3) 100%)",
          zIndex: 1,
        }}
      />

      {/* CONTENT */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: 1200,
          margin: "0 auto",
          padding: "6rem 2rem",
        }}
      >
        {/* Sous-titre */}
        <p
          style={{
            fontSize: 12,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#ddd",
            marginBottom: "1.5rem",
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(10px)",
            transition: "all 0.6s ease",
          }}
        >
          Gabon · Afrique Centrale
        </p>

        {/* TITRE */}
        <h1
          style={{
            fontSize: "clamp(3rem, 6vw, 5.5rem)",
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            maxWidth: 800,
            marginBottom: "2rem",
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(20px)",
            transition:
              "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s",
          }}
        >
          Trois expertises,
          <br />
          <span style={{ color: "#f59e0b" }}>
            une seule vision.
          </span>
        </h1>

        {/* DESCRIPTION */}
        <p
          style={{
            fontSize: 18,
            color: "#e5e5e5",
            maxWidth: 600,
            lineHeight: 1.8,
            marginBottom: "3rem",
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(16px)",
            transition:
              "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s",
          }}
        >
          Un groupe d'entreprises gabonaises spécialisées dans le nettoyage
          industriel, l'ingénierie des structures et le génie civil — au service
          du développement du Gabon et de l'Afrique Centrale.
        </p>

        {/* BOUTONS */}
        <div
          style={{
            display: "flex",
            gap: "1rem",
            flexWrap: "wrap",
            marginBottom: "3rem",
          }}
        >
          <a
            href="/entreprises"
            style={{
              background: "#f59e0b",
              color: "black",
              padding: "14px 22px",
              borderRadius: 8,
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            Découvrir nos entreprises
          </a>

          <a
            href="/contact"
            style={{
              border: "1px solid white",
              padding: "14px 22px",
              borderRadius: 8,
              textDecoration: "none",
              color: "white",
            }}
          >
            Nous contacter
          </a>
        </div>

        {/* STATS */}
        <div
          style={{
            display: "flex",
            gap: "3rem",
            flexWrap: "wrap",
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(12px)",
            transition:
              "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.35s",
          }}
        >
          {stats.map((stat) => (
            <StatItem key={stat.label} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* STAT */
function StatItem({ value, label }) {
  return (
    <div>
      <div
        style={{
          fontSize: 36,
          fontWeight: 700,
          color: "#f59e0b",
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontSize: 12,
          color: "#ccc",
          textTransform: "uppercase",
          letterSpacing: "0.08em",
        }}
      >
        {label}
      </div>
    </div>
  );
}