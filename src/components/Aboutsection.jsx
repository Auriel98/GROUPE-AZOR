import { useInView } from "../hooks/useInView";

// ─── Palette partagée ────────────────────────────────────────────────────────
const COLORS = {
  accent:    "#f59e0b",
  border:    "#E8E4DE",
  bgCard:    "#fff",
  bgSection: "#FAFAF8",
  textTitle: "#1A1A18",
  textBody:  "#555",
  textMuted: "#888",
  textFaint: "#999",
};

const VALUES = [
  { label: "Excellence",  text: "Des standards de qualité au niveau international." },
  { label: "Proximité",   text: "Ancrés localement, engagés sur le terrain." },
  { label: "Intégrité",   text: "Transparence et éthique dans chaque relation." },
  { label: "Innovation",  text: "Des solutions adaptées aux défis d'aujourd'hui." },
];

const STATS = [
  { value: "3",   label: "Entreprises" },
  { value: "+10", label: "Ans d'expérience" },
  { value: "+50", label: "Collaborateurs" },
];
// ─────────────────────────────────────────────────────────────────────────────

export default function AboutSection() {
  const [ref, inView] = useInView(0.1);

  const fade = (delay = 0) => ({
    opacity:    inView ? 1 : 0,
    transform:  inView ? "none" : "translateY(24px)",
    transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
  });

  return (
    <section
      ref={ref}
      style={{
        background: COLORS.bgSection,
        borderTop:  `1px solid ${COLORS.border}`,
        borderBottom: `1px solid ${COLORS.border}`,
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin:   "0 auto",
          padding:  "6rem 2rem",
        }}
      >
        {/* EN-TÊTE */}
        <div style={{ marginBottom: "3.5rem", ...fade(0) }}>
          <p
            style={{
              fontSize:      11,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color:         COLORS.textFaint,
              fontFamily:    "'Courier New', monospace",
              marginBottom:  "0.75rem",
            }}
          >
            Qui sommes-nous
          </p>
          <h2
            style={{
              fontFamily:    "'Georgia', serif",
              fontSize:      "clamp(1.8rem, 3vw, 2.8rem)",
              fontWeight:    700,
              letterSpacing: "-0.02em",
              color:         COLORS.textTitle,
              margin:        0,
            }}
          >
            À propos du groupe
          </h2>
        </div>

        {/* GRILLE PRINCIPALE */}
        <div
          style={{
            display:             "grid",
            gridTemplateColumns: "1fr 1fr",
            gap:                 "4rem",
            alignItems:          "start",
          }}
        >
          {/* ── COLONNE GAUCHE ── */}
          <div>
            {/* Citation */}
            <blockquote
              style={{
                fontFamily:   "'Georgia', serif",
                fontStyle:    "italic",
                fontSize:     20,
                lineHeight:   1.65,
                color:        COLORS.textTitle,
                borderLeft:   `3px solid ${COLORS.accent}`,
                paddingLeft:  "1.5rem",
                margin:       "0 0 2rem",
                ...fade(0.1),
              }}
            >
              Bâtir le Gabon de demain, avec les hommes et les femmes d'aujourd'hui.
            </blockquote>

            {/* Paragraphes */}
            <div style={{ ...fade(0.18) }}>
              <p
                style={{
                  fontSize:     14,
                  color:        COLORS.textBody,
                  lineHeight:   1.85,
                  margin:       "0 0 1rem",
                }}
              >
                Fondé à Libreville, notre groupe rassemble trois entreprises
                complémentaires autour d'une ambition commune : contribuer
                activement au développement économique et industriel du Gabon
                et de l'Afrique Centrale.
              </p>
              <p
                style={{
                  fontSize:   14,
                  color:      COLORS.textBody,
                  lineHeight: 1.85,
                  margin:     0,
                }}
              >
                Chacune de nos entités opère avec une expertise propre —
                nettoyage industriel, ingénierie des structures, génie civil —
                mais partage les mêmes valeurs d'exigence, de rigueur et de
                proximité avec nos clients.
              </p>
            </div>

            {/* Séparateur */}
            <div
              style={{
                height:     1,
                background: COLORS.border,
                margin:     "2rem 0",
                ...fade(0.24),
              }}
            />

            {/* Valeurs */}
            <div
              style={{
                display:             "grid",
                gridTemplateColumns: "1fr 1fr",
                gap:                 "0.75rem",
                ...fade(0.3),
              }}
            >
              {VALUES.map((v) => (
                <ValueCard key={v.label} {...v} />
              ))}
            </div>
          </div>

          {/* ── COLONNE DROITE ── */}
          <div style={{ ...fade(0.15) }}>
            {/* Photo */}
            <div
              style={{
                width:          "100%",
                height:         320,
                borderRadius:   4,
                overflow:       "hidden",
                border:         `1px solid ${COLORS.border}`,
              }}
            >
              <img
                src="/about.png"
                alt="Notre équipe"
                style={{
                  width:      "100%",
                  height:     "100%",
                  objectFit:  "cover",
                  display:    "block",
                }}
                onError={(e) => {
                  // Fallback si pas de photo
                  e.currentTarget.parentNode.style.background = "#F5F3EF";
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>

            {/* Stats */}
            <div
              style={{
                display:       "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap:           "1rem",
                marginTop:     "2rem",
                paddingTop:    "2rem",
                borderTop:     `1px solid ${COLORS.border}`,
              }}
            >
              {STATS.map((s) => (
                <StatItem key={s.label} {...s} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Carte valeur ────────────────────────────────────────────────────────── */
function ValueCard({ label, text }) {
  return (
    <div
      style={{
        background:  COLORS.bgCard,
        border:      `1px solid ${COLORS.border}`,
        borderLeft:  `3px solid ${COLORS.accent}`,
        borderRadius: 4,
        padding:     "1rem 1.25rem",
      }}
    >
      <p
        style={{
          fontSize:      10,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color:         COLORS.accent,
          fontWeight:    600,
          fontFamily:    "'Courier New', monospace",
          margin:        "0 0 0.4rem",
        }}
      >
        {label}
      </p>
      <p
        style={{
          fontFamily: "'Georgia', serif",
          fontStyle:  "italic",
          fontSize:   13,
          color:      COLORS.textBody,
          lineHeight: 1.55,
          margin:     0,
        }}
      >
        {text}
      </p>
    </div>
  );
}

/* ── Stat ────────────────────────────────────────────────────────────────── */
function StatItem({ value, label }) {
  return (
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          fontFamily: "'Georgia', serif",
          fontSize:   36,
          fontWeight: 700,
          color:      COLORS.accent,
          lineHeight: 1,
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontSize:      10,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color:         COLORS.textFaint,
          fontFamily:    "'Courier New', monospace",
          marginTop:     "0.4rem",
        }}
      >
        {label}
      </div>
    </div>
  );
}