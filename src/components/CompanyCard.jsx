import { useState, useEffect } from "react";
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

function useIsMobile(breakpoint = 640) {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < breakpoint : false
  );
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < breakpoint);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, [breakpoint]);
  return isMobile;
}

export default function CompanyCard({ company, index }) {
  const [ref, inView] = useInView(0.1);
  const [hovered, setHovered] = useState(false);
  const isMobile = useIsMobile();

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
          ? hovered && !isMobile ? "translateX(4px)" : "translateX(0)"
          : "translateY(40px)",
        opacity:             inView ? 1 : 0,
        transitionDelay:     inView ? `${index * 0.12}s` : "0s",
        boxShadow:           hovered ? `0 8px 40px ${company.color}1a` : "none",
        display:             "grid",
        gridTemplateColumns: isMobile ? "1fr" : "340px 1fr",
      }}
    >
      <CardLeft company={company} hovered={hovered} isMobile={isMobile} />
      <CardRight company={company} isMobile={isMobile} />
    </div>
  );
}

/* ── Colonne gauche ──────────────────────────────────────────────────────── */
function CardLeft({ company, hovered, isMobile }) {
  if (isMobile) {
    return (
      <div
        style={{
          padding:      "1rem 1.25rem",
          background:   hovered ? company.lightColor : COLORS.bgHeader,
          transition:   "background 0.4s ease",
          borderBottom: `1px solid ${hovered ? company.color + "33" : COLORS.border}`,
          display:      "flex",
          alignItems:   "center",
          gap:          "0.875rem",
        }}
      >
        <div style={{
          width: 52, height: 52, flexShrink: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
          background: "#fff", borderRadius: 4, border: `1px solid ${COLORS.border}`,
          padding: "0.375rem", overflow: "hidden",
        }}>
          <img
            src={`/${company.logo}`}
            alt={`Logo ${company.name}`}
            style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
            onError={(e) => { e.currentTarget.style.display = "none"; e.currentTarget.nextSibling.style.display = "block"; }}
          />
          <span style={{ display: "none", fontSize: 22, color: company.color, lineHeight: 1 }}>{company.icon}</span>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <SectorBadge company={company} />
          <h3 style={{ fontSize: 16, fontWeight: 700, fontFamily: "'Georgia', serif", color: COLORS.textTitle, margin: "2px 0", lineHeight: 1.2 }}>
            {company.name}
          </h3>
          <p style={{ fontSize: 11, color: COLORS.textMuted, margin: 0, letterSpacing: "0.05em" }}>{company.location}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        padding:       "2.5rem",
        background:    hovered ? company.lightColor : COLORS.bgHeader,
        transition:    "background 0.4s ease",
        borderRight:   `1px solid ${hovered ? company.color + "33" : COLORS.border}`,
        display:       "flex",
        flexDirection: "column",
        gap:           "1.5rem",
      }}
    >
      {/* Logo grand format */}
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
            e.currentTarget.style.display = "none";
            e.currentTarget.nextSibling.style.display = "block";
          }}
        />
        <span style={{ display: "none", fontSize: 48, color: company.color, lineHeight: 1 }}>
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
        <p style={{ fontSize: 12, color: COLORS.textMuted, margin: 0, letterSpacing: "0.05em" }}>
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

/* ── Colonne droite ──────────────────────────────────────────────────────── */
function CardRight({ company, isMobile }) {
  return (
    <div
      style={{
        padding:       isMobile ? "1.25rem" : "2.5rem",
        display:       "flex",
        flexDirection: "column",
        gap:           isMobile ? "1rem" : "1.5rem",
      }}
    >
      {/* Tagline mobile */}
      {isMobile && (
        <p
          style={{
            fontStyle:     "italic",
            color:         company.accentColor,
            fontSize:      12,
            letterSpacing: "0.03em",
            margin:        0,
            fontFamily:    "'Georgia', serif",
            lineHeight:    1.5,
          }}
        >
          {company.tagline}
        </p>
      )}

      <p
        style={{
          fontSize:   isMobile ? 13 : 14,
          color:      COLORS.textBody,
          lineHeight: 1.75,
          margin:     0,
          maxWidth:   620,
        }}
      >
        {company.description}
      </p>

      <ServicesList company={company} isMobile={isMobile} />

      <CTAButton company={company} isMobile={isMobile} />
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
        marginBottom:  "0.5rem",
      }}
    >
      {company.sector}
    </span>
  );
}

/* ── Liste des prestations ───────────────────────────────────────────────── */
function ServicesList({ company, isMobile }) {
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
          gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(3, 1fr)",
          gap:                 "6px 12px",
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
function CTAButton({ company, isMobile }) {
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
        display:        isMobile ? "flex" : "inline-flex",
        justifyContent: isMobile ? "center" : "flex-start",
        alignItems:     "center",
        gap:            8,
        background:     company.color,
        color:          "#fff",
        textDecoration: "none",
        padding:        isMobile ? "11px 16px" : "12px 24px",
        fontSize:       12,
        fontWeight:     600,
        letterSpacing:  "0.08em",
        textTransform:  "uppercase",
        fontFamily:     "'Courier New', monospace",
        borderRadius:   2,
        transition:     "background 0.2s ease",
        width:          isMobile ? "100%" : "auto",
        boxSizing:      "border-box",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      Visiter le site
      <span style={{ fontSize: 14 }}>→</span>
    </a>
  );
}