import { companies } from "../data/companies";
import CompanyCard from "./CompanyCard";

export default function CompaniesSection() {
  return (
    <section
      style={{
        position: "relative",
        padding: "5rem 1rem",
        background:
          "linear-gradient(180deg, #ffffff 0%, #f8f9fc 50%, #ffffff 100%)",
        overflow: "hidden",
      }}
    >
      {/* Background Glow */}
      <div
        style={{
          position: "absolute",
          top: "-120px",
          left: "-120px",
          width: "260px",
          height: "260px",
          borderRadius: "50%",
          background: "rgba(0,123,255,0.05)",
          filter: "blur(40px)",
        }}
      />

      <div
        style={{
          position: "absolute",
          bottom: "-120px",
          right: "-120px",
          width: "260px",
          height: "260px",
          borderRadius: "50%",
          background: "rgba(255,140,0,0.05)",
          filter: "blur(40px)",
        }}
      />

      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          position: "relative",
          zIndex: 2,
        }}
      >
        <SectionHeader />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "1.8rem",
          }}
        >
          {companies.map((company, index) => (
            <CompanyCard
              key={company.id}
              company={company}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function SectionHeader() {
  return (
    <div
      style={{
        textAlign: "center",
        maxWidth: "760px",
        margin: "0 auto 3rem",
      }}
    >
      <span
        style={{
          display: "inline-block",
          padding: "8px 16px",
          borderRadius: "999px",
          background: "#eef4ff",
          color: "#1d4ed8",
          fontSize: "12px",
          fontWeight: "700",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          marginBottom: "1rem",
        }}
      >
        Notre Groupe
      </span>

      <h2
        style={{
          fontSize: "clamp(2rem, 5vw, 3.4rem)",
          fontWeight: "800",
          lineHeight: 1.15,
          color: "#111827",
          margin: "0 0 1rem",
        }}
      >
        Nos Entreprises
      </h2>

      <p
        style={{
          fontSize: "1rem",
          lineHeight: 1.8,
          color: "#6b7280",
          margin: 0,
        }}
      >
        Découvrez les sociétés qui composent notre groupe, chacune experte
        dans son domaine avec une vision commune d’excellence, d’innovation
        et de performance.
      </p>
    </div>
  );
}
