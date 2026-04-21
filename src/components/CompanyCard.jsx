import { useState, useEffect } from "react";
import { useInView } from "../hooks/useInView";

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
  const [ref, inView] = useInView(0.08);
  const [hovered, setHovered] = useState(false);
  const isMobile = useIsMobile();

  return (
    <div
      ref={ref}
      id={company.id}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        background: "#ffffff",
        borderRadius: "22px",
        border: `1px solid ${hovered ? company.color : "#ececec"}`,
        overflow: "hidden",
        opacity: inView ? 1 : 0,
        transform: inView
          ? hovered
            ? "translateY(-8px)"
            : "translateY(0)"
          : "translateY(40px)",
        transition:
          "all 0.55s ease, transform 0.4s ease, box-shadow 0.4s ease",
        transitionDelay: `${index * 0.08}s`,
        boxShadow: hovered
          ? `0 25px 50px rgba(0,0,0,0.12)`
          : "0 10px 25px rgba(0,0,0,0.06)",
      }}
    >
      {/* Glow top */}
      <div
        style={{
          position: "absolute",
          top: -60,
          right: -60,
          width: 140,
          height: 140,
          borderRadius: "50%",
          background: `${company.color}18`,
          filter: "blur(20px)",
        }}
      />

      {/* Header line */}
      <div
        style={{
          height: 5,
          width: "100%",
          background: `linear-gradient(90deg, ${company.color}, ${company.accentColor || company.color})`,
        }}
      />

      <div
        style={{
          padding: isMobile ? "1.2rem" : "1.7rem",
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* TOP */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            marginBottom: "1rem",
          }}
        >
          {/* LOGO */}
          <div
            style={{
              width: isMobile ? 58 : 72,
              height: isMobile ? 58 : 72,
              minWidth: isMobile ? 58 : 72,
              borderRadius: "18px",
              background: "linear-gradient(145deg,#fff,#f4f4f4)",
              border: "1px solid #eee",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.7)",
            }}
          >
            <img
              src={`/${company.logo}`}
              alt={company.name}
              style={{
                width: "70%",
                height: "70%",
                objectFit: "contain",
              }}
              onError={(e) => {
                e.currentTarget.style.display = "none";
                e.currentTarget.nextSibling.style.display = "flex";
              }}
            />

            <span
              style={{
                display: "none",
                fontSize: 28,
                color: company.color,
              }}
            >
              {company.icon}
            </span>
          </div>

          {/* INFOS */}
          <div style={{ flex: 1 }}>
            <span
              style={{
                display: "inline-block",
                padding: "5px 10px",
                borderRadius: "999px",
                background: company.lightColor,
                color: company.color,
                fontSize: 11,
                fontWeight: 700,
                marginBottom: 8,
                letterSpacing: "0.04em",
              }}
            >
              {company.sector}
            </span>

            <h3
              style={{
                margin: 0,
                fontSize: isMobile ? 18 : 22,
                fontWeight: 800,
                color: "#111",
                lineHeight: 1.2,
              }}
            >
              {company.name}
            </h3>

            <p
              style={{
                margin: "4px 0 0",
                color: "#888",
                fontSize: 13,
              }}
            >
              {company.location}
            </p>
          </div>
        </div>

        {/* Tagline */}
        <p
          style={{
            margin: "0 0 1rem",
            color: company.color,
            fontSize: 14,
            fontWeight: 600,
            lineHeight: 1.6,
          }}
        >
          {company.tagline}
        </p>

        {/* Description */}
        <p
          style={{
            margin: "0 0 1.2rem",
            color: "#555",
            fontSize: 14,
            lineHeight: 1.8,
          }}
        >
          {company.description}
        </p>

        {/* Services */}
        <div style={{ marginBottom: "1.4rem" }}>
          <p
            style={{
              margin: "0 0 0.7rem",
              fontSize: 12,
              color: "#999",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            Prestations
          </p>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
            }}
          >
            {company.services.map((service) => (
              <span
                key={service}
                style={{
                  padding: "7px 12px",
                  borderRadius: "999px",
                  background: company.lightColor,
                  color: company.color,
                  fontSize: 12,
                  fontWeight: 600,
                }}
              >
                {service}
              </span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <a
          href={company.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            width: "100%",
            padding: "14px 18px",
            borderRadius: "14px",
            background: `linear-gradient(135deg, ${company.color}, ${company.accentColor || company.color})`,
            color: "#fff",
            textDecoration: "none",
            fontWeight: 700,
            fontSize: 13,
            letterSpacing: "0.05em",
            transition: "0.3s ease",
            boxShadow: `0 12px 25px ${company.color}35`,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.opacity = "0.92";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.opacity = "1";
          }}
        >
          Visiter le site →
        </a>
      </div>
    </div>
  );
}
