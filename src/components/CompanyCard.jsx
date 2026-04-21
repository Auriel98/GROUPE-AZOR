import { useState, useEffect } from "react";
import { useInView } from "../hooks/useInView";

const COLORS = {
  accent: "#f59e0b",
  accentHover: "#d97706",
  border: "#E8E4DE",
  bgCard: "#fff",
  bgHeader: "#FAFAF8",
  textTitle: "#1A1A18",
  textBody: "#555",
  textMuted: "#888",
  textFaint: "#999",
};

function useIsMobile(breakpoint = 640) {
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

export default function CompanyCard({ company, index }) {
  const [ref, inView] = useInView(0.05);
  const [hovered, setHovered] = useState(false);
  const isMobile = useIsMobile();

  // ✅ FIX MOBILE VISIBILITY
  const visible = isMobile ? true : inView;

  return (
    <div
      ref={ref}
      id={company.id}
      onMouseEnter={() => !isMobile && setHovered(true)}
      onMouseLeave={() => !isMobile && setHovered(false)}
      style={{
        background: COLORS.bgCard,
        border: `1px solid ${hovered ? company.color : COLORS.border}`,
        borderRadius: 4,
        overflow: "hidden",
        transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",

        // ✅ FIX
        transform: visible
          ? hovered && !isMobile
            ? "translateX(4px)"
            : "translateX(0)"
          : "translateY(40px)",

        opacity: visible ? 1 : 0,

        transitionDelay: visible ? `${index * 0.12}s` : "0s",

        boxShadow: hovered ? `0 8px 40px ${company.color}1a` : "none",

        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "340px 1fr",
        width: "100%",
      }}
    >
      <CardLeft company={company} hovered={hovered} isMobile={isMobile} />
      <CardRight company={company} isMobile={isMobile} />
    </div>
  );
}

function CardLeft({ company, hovered, isMobile }) {
  // ✅ MOBILE
  if (isMobile) {
    return (
      <div
        style={{
          padding: "1rem 1.25rem",
          background: COLORS.bgHeader,
          borderBottom: `1px solid ${COLORS.border}`,
          display: "flex",
          alignItems: "center",
          gap: "0.875rem",
        }}
      >
        {/* LOGO */}
        <div
          style={{
            width: 52,
            height: 52,
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#fff",
            borderRadius: 4,
            border: `1px solid ${COLORS.border}`,
            padding: "0.375rem",
            overflow: "hidden",
          }}
        >
          <img
            src={`/${company.logo}`}
            alt={company.name}
            style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
          />
        </div>

        <div style={{ flex: 1 }}>
          <SectorBadge company={company} />
          <h3 style={{ fontSize: 16, fontWeight: 700 }}>
            {company.name}
          </h3>
          <p style={{ fontSize: 11, color: COLORS.textMuted }}>
            {company.location}
          </p>
        </div>
      </div>
    );
  }

  // ✅ DESKTOP
  return (
    <div
      style={{
        padding: "2.5rem",
        background: hovered ? company.lightColor : COLORS.bgHeader,
        borderRight: `1px solid ${COLORS.border}`,
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
      }}
    >
      {/* LOGO */}
      <div
        style={{
          height: 120,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#fff",
          border: `1px solid ${COLORS.border}`,
          borderRadius: 4,
        }}
      >
        <img
          src={`/${company.logo}`}
          alt={company.name}
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
            objectFit: "contain",
            transform: hovered ? "scale(1.05)" : "scale(1)",
            transition: "0.3s",
          }}
        />
      </div>

      <div>
        <SectorBadge company={company} />
        <h3 style={{ fontSize: 24, fontWeight: 700 }}>
          {company.name}
        </h3>
        <p style={{ fontSize: 12, color: COLORS.textMuted }}>
          {company.location}
        </p>
      </div>

      <p style={{ fontStyle: "italic", marginTop: "auto" }}>
        {company.tagline}
      </p>
    </div>
  );
}

function CardRight({ company, isMobile }) {
  return (
    <div
      style={{
        padding: isMobile ? "1.25rem" : "2.5rem",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        width: "100%",
      }}
    >
      {isMobile && <p>{company.tagline}</p>}

      <p>{company.description}</p>

      <ServicesList company={company} isMobile={isMobile} />
      <CTAButton company={company} isMobile={isMobile} />
    </div>
  );
}

function SectorBadge({ company }) {
  return <span>{company.sector}</span>;
}

function ServicesList({ company, isMobile }) {
  return (
    <div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "repeat(2,1fr)" : "repeat(3,1fr)",
          gap: 6,
        }}
      >
        {company.services.map((s) => (
          <div key={s}>{s}</div>
        ))}
      </div>
    </div>
  );
}

function CTAButton({ company, isMobile }) {
  return (
    <a
      href={company.url}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: "flex",
        justifyContent: "center",
        background: company.color,
        color: "#fff",
        padding: "12px",
        width: "100%",
      }}
    >
      Visiter le site →
    </a>
  );
}