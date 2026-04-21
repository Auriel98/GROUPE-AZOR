import { useState } from "react";
import { useInView } from "../hooks/useInView";

// ─── Palette partagée ────────────────────────────────────────────────────────
const COLORS = {
  accent:      "#f59e0b",
  accentHover: "#d97706",
  border:      "#E8E4DE",
  bgCard:      "#fff",
  bgHeader:    "#FAFAF8",
  textTitle:   "#1A1A18",
  textBody:    "#555",
  textMuted:   "#888",
  textFaint:   "#999",
};
// ─────────────────────────────────────────────────────────────────────────────

/**
 * CompanyCard — carte horizontale pleine largeur avec animation au scroll.
 * Disposition : colonne gauche (logo + identité) | colonne droite (détails + CTA)
 */
export default function CompanyCard({ company, index }) {
  const [ref, inView] = useInView(0.1);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      id={company.id}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background:          COLORS.bgCard,
        border:              `1px solid ${hovered ? company.color : COLORS.border}`,
        borderRadius:        4,
        overflow:            "hidden",
        transition:          "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        transform:           inView
          ? hovered ? "translateX(4px)" : "translateX(0)"
          : "translateY(40px)",
        opacity:             inView ? 1 : 0,
        transitionDelay:     inView ? `${index * 0.12}s` : "0s",
        boxShadow:           hovered ? `0 8px 40px ${company.color}1a` : "none",
        display:             "grid",
        gridTemplateColumns: "340px 1fr",
      }}
    >
      <CardLeft company={company} hovered={hovered} />
      <CardRight company={company} />
    </div>
  );
}

/* ── Colonne gauche : logo grand format + badge + nom + localisation + tagline */
function CardLeft({ company, hovered }) {
  return (
    <div
      style={{
        padding:        "2.5rem",
        background:     hovered ? company.lightColor : COLORS.bgHeader,
        transition:     "background 0.4s ease",
        borderRight:    `1px solid ${hovered ? company.color + "33" : COLORS.border}`,
        display:        "flex",
        flexDirection:  "column",
        gap:            "1.5rem",
      }}
    >
      {/* LOGO grand format */}
      <div
        style={{
          width:          "100%",
          height:         120,
          display:        "flex",
          alignItems:     "center",
          justifyContent: "center",
          background:     "#fff",
          borderRadius:   4,
          border:         `1px solid ${COLORS.border}`,
          padding:        "1rem",
          overflow:       "hidden",
        }}
      >
        <img
          src={`/${company.logo}`}
          alt={`Logo ${company.name}`}
          style={{
            maxWidth:   "100%",
            maxHeight:  "100%",
            objectFit:  "contain",
            transition: "transform 0.3s ease",
            transform:  hovered ? "scale(1.05)" : "scale(1)",
          }}
          onError={(e) => {
            // Fallback vers l'icône emoji si le logo est introuvable
            e.currentTarget.style.display = "none";
            e.currentTarget.nextSibling.style.display = "block";
          }}
        />
        {/* Fallback emoji — caché par défaut */}
        <span
          style={{
            display:    "none",
            fontSize:   48,
            color:      company.color,
            lineHeight: 1,
          }}
        >
          {company.icon}
        </span>
      </div>

      {/* Identité */}
      <div>
        <SectorBadge company={company} />
        <h3
          style={{
            fontSize:   26,
            fontWeight: 700,
            fontFamily: "'Georgia', serif",
            color:      COLORS.textTitle,
            margin:     "0 0 6px",
            lineHeight: 1.1,
          }}
        >
          {company.name}
        </h3>
        <p
          style={{
            fontSize:      12,
            color:         COLORS.textMuted,
            margin:        0,
            letterSpacing: "0.05em",
          }}
        >
          {company.location}
        </p>
      </div>

      {/* Tagline */}
      <p
        style={{
          fontStyle:     "italic",
          color:         company.accentColor,
          fontSize:      13,
          letterSpacing: "0.03em",
          margin:        0,
          fontFamily:    "'Georgia', serif",
          lineHeight:    1.5,
          marginTop:     "auto",
          paddingTop:    "0.5rem",
          borderTop:     `1px solid ${hovered ? company.color + "33" : COLORS.border}`,
        }}
      >
        {company.tagline}
      </p>
    </div>
  );
}

/* ── Colonne droite : description, prestations, CTA ─────────────────────── */
function CardRight({ company }) {
  return (
    <div
      style={{
        padding:        "2.5rem",
        display:        "flex",
        flexDirection:  "column",
        justifyContent: "space-between",
      }}
    >
      <p
        style={{
          fontSize:   14,
          color:      COLORS.textBody,
          lineHeight: 1.75,
          margin:     "0 0 2rem",
          maxWidth:   620,
        }}
      >
        {company.description}
      </p>

      <ServicesList company={company} />

      <div style={{ marginTop: "auto", paddingTop: "1.5rem" }}>
        <CTAButton company={company} />
      </div>
    </div>
  );
}

/* ── Badge secteur ───────────────────────────────────────────────────────── */
function SectorBadge({ company }) {
  return (
    <span
      style={{
        display:       "inline-block",
        fontSize:      10,
        letterSpacing: "0.15em",
        textTransform: "uppercase",
        color:         company.color,
        fontWeight:    600,
        fontFamily:    "'Courier New', monospace",
        background:    company.lightColor,
        padding:       "4px 10px",
        borderRadius:  2,
        marginBottom:  "0.75rem",
      }}
    >
      {company.sector}
    </span>
  );
}

/* ── Liste des prestations ───────────────────────────────────────────────── */
function ServicesList({ company }) {
  return (
    <div>
      <p
        style={{
          fontSize:      10,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color:         COLORS.textFaint,
          margin:        "0 0 0.75rem",
          fontFamily:    "'Courier New', monospace",
        }}
      >
        Nos prestations
      </p>
      <div
        style={{
          display:             "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap:                 "6px 16px",
        }}
      >
        {company.services.map((service) => (
          <ServiceItem key={service} service={service} color={company.color} />
        ))}
      </div>
    </div>
  );
}

/* ── Item prestation ─────────────────────────────────────────────────────── */
function ServiceItem({ service, color }) {
  return (
    <div
      style={{
        display:    "flex",
        alignItems: "center",
        gap:        6,
        fontSize:   12,
        color:      "#444",
      }}
    >
      <span
        style={{
          width:        4,
          height:       4,
          borderRadius: "50%",
          background:   color,
          flexShrink:   0,
        }}
      />
      {service}
    </div>
  );
}

/* ── CTA ─────────────────────────────────────────────────────────────────── */
function CTAButton({ company }) {
  const handleMouseEnter = (e) => {
    e.currentTarget.style.background = company.accentColor;
  };
  const handleMouseLeave = (e) => {
    e.currentTarget.style.background = company.color;
  };

  return (
    <a
      href={company.url}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display:        "inline-flex",
        alignItems:     "center",
        gap:            8,
        background:     company.color,
        color:          "#fff",
        textDecoration: "none",
        padding:        "12px 24px",
        fontSize:       12,
        fontWeight:     600,
        letterSpacing:  "0.08em",
        textTransform:  "uppercase",
        fontFamily:     "'Courier New', monospace",
        borderRadius:   2,
        transition:     "background 0.2s ease",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      Visiter le site
      <span style={{ fontSize: 14 }}>→</span>
    </a>
  );
}