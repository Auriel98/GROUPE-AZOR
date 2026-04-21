import { useState, useEffect } from "react";
import { useInView } from "../hooks/useInView";

/* ───────────────────────────────────────────── */
const COLORS = {
  accent: "#f59e0b",
  border: "#E8E4DE",
  bgCard: "#ffffff",
  bgSection: "#FAFAF8",
  textTitle: "#1A1A18",
  textBody: "#555",
  textMuted: "#888",
  textFaint: "#999",
};

const VALUES = [
  {
    label: "Excellence",
    text: "Des standards de qualité au niveau international.",
  },
  {
    label: "Proximité",
    text: "Ancrés localement, engagés sur le terrain.",
  },
  {
    label: "Intégrité",
    text: "Transparence et éthique dans chaque relation.",
  },
  {
    label: "Innovation",
    text: "Des solutions adaptées aux défis d'aujourd'hui.",
  },
];

const STATS = [
  { value: "3", label: "Entreprises" },
  { value: "+10", label: "Ans d'expérience" },
  { value: "+50", label: "Collaborateurs" },
];

/* ───────────────────────────────────────────── */
function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < breakpoint : false
  );

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < breakpoint);

    check();
    window.addEventListener("resize", check);

    return () => window.removeEventListener("resize", check);
  }, [breakpoint]);

  return isMobile;
}

/* ───────────────────────────────────────────── */
export default function AboutSection() {
  const [ref, inView] = useInView(0.08);
  const isMobile = useIsMobile();

  const fade = (delay = 0) => ({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(30px)",
    transition: `all 0.8s ease ${delay}s`,
  });

  return (
    <section
      ref={ref}
      style={{
        background: COLORS.bgSection,
        borderTop: `1px solid ${COLORS.border}`,
        borderBottom: `1px solid ${COLORS.border}`,
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: isMobile ? "4rem 1rem" : "6rem 2rem",
        }}
      >
        {/* Header */}
        <div
          style={{
            marginBottom: isMobile ? "2rem" : "4rem",
            textAlign: isMobile ? "center" : "left",
            ...fade(0),
          }}
        >
          <p
            style={{
              fontSize: 12,
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              color: COLORS.textFaint,
              marginBottom: "0.7rem",
            }}
          >
            Qui sommes-nous
          </p>

          <h2
            style={{
              margin: 0,
              fontSize: "clamp(2rem,5vw,3.2rem)",
              fontWeight: 800,
              color: COLORS.textTitle,
              lineHeight: 1.15,
            }}
          >
            À propos du groupe
          </h2>
        </div>

        {/* Main Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: isMobile ? "2.5rem" : "4rem",
            alignItems: "start",
          }}
        >
          {/* LEFT */}
          <div>
            <blockquote
              style={{
                margin: "0 0 2rem",
                paddingLeft: "1rem",
                borderLeft: `4px solid ${COLORS.accent}`,
                fontSize: isMobile ? 18 : 24,
                lineHeight: 1.6,
                fontWeight: 600,
                color: COLORS.textTitle,
                ...fade(0.1),
              }}
            >
              Bâtir le Gabon de demain, avec les hommes et les femmes
              d'aujourd'hui.
            </blockquote>

            <div style={fade(0.18)}>
              <p
                style={{
                  fontSize: 15,
                  lineHeight: 1.9,
                  color: COLORS.textBody,
                  marginBottom: "1rem",
                }}
              >
                Fondé à Libreville, notre groupe rassemble plusieurs
                entreprises complémentaires avec une ambition commune :
                participer activement au développement économique et
                industriel du Gabon.
              </p>

              <p
                style={{
                  fontSize: 15,
                  lineHeight: 1.9,
                  color: COLORS.textBody,
                  margin: 0,
                }}
              >
                Nettoyage industriel, ingénierie des structures,
                génie civil et services techniques : chaque entité
                agit avec rigueur, expertise et proximité.
              </p>
            </div>

            {/* Divider */}
            <div
              style={{
                height: 1,
                background: COLORS.border,
                margin: "2rem 0",
                ...fade(0.22),
              }}
            />

            {/* Values */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                gap: "1rem",
                ...fade(0.28),
              }}
            >
              {VALUES.map((item) => (
                <ValueCard
                  key={item.label}
                  label={item.label}
                  text={item.text}
                />
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div style={fade(0.15)}>
            {/* Image */}
            <div
              style={{
                width: "100%",
                height: isMobile ? 240 : 360,
                borderRadius: "20px",
                overflow: "hidden",
                border: `1px solid ${COLORS.border}`,
                boxShadow: "0 12px 30px rgba(0,0,0,0.06)",
              }}
            >
              <img
                src="/about.png"
                alt="Notre équipe"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  e.currentTarget.parentNode.style.background =
                    "#f1f1f1";
                }}
              />
            </div>

            {/* Stats */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile
                  ? "1fr"
                  : "repeat(3,1fr)",
                gap: "1rem",
                marginTop: "2rem",
              }}
            >
              {STATS.map((stat) => (
                <StatItem
                  key={stat.label}
                  value={stat.value}
                  label={stat.label}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────────────────────────── */
function ValueCard({ label, text }) {
  return (
    <div
      style={{
        background: COLORS.bgCard,
        border: `1px solid ${COLORS.border}`,
        borderRadius: "16px",
        padding: "1.2rem",
        boxShadow: "0 8px 18px rgba(0,0,0,0.04)",
      }}
    >
      <p
        style={{
          margin: "0 0 0.5rem",
          fontSize: 12,
          fontWeight: 700,
          color: COLORS.accent,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
        }}
      >
        {label}
      </p>

      <p
        style={{
          margin: 0,
          fontSize: 14,
          lineHeight: 1.7,
          color: COLORS.textBody,
        }}
      >
        {text}
      </p>
    </div>
  );
}

/* ───────────────────────────────────────────── */
function StatItem({ value, label }) {
  return (
    <div
      style={{
        background: "#fff",
        border: `1px solid ${COLORS.border}`,
        borderRadius: "18px",
        padding: "1.4rem 1rem",
        textAlign: "center",
        boxShadow: "0 8px 20px rgba(0,0,0,0.04)",
      }}
    >
      <div
        style={{
          fontSize: 34,
          fontWeight: 800,
          color: COLORS.accent,
          lineHeight: 1,
          marginBottom: "0.5rem",
        }}
      >
        {value}
      </div>

      <div
        style={{
          fontSize: 12,
          color: COLORS.textFaint,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          fontWeight: 700,
        }}
      >
        {label}
      </div>
    </div>
  );
}
