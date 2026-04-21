import { companies } from "../data/companies";
import CompanyCard from "./CompanyCard";

/**
 * CompaniesSection — liste verticale des cartes entreprises (pleine largeur).
 */
export default function CompaniesSection() {
  return (
    <section style={{ maxWidth: 1200, margin: "0 auto", padding: "0 2rem 8rem" }}>
      <SectionHeader />
      <div
        style={{
          display:       "flex",
          flexDirection: "column",
          gap:           "1.5rem",
        }}
      >
        {companies.map((company, index) => (
          <CompanyCard key={company.id} company={company} index={index} />
        ))}
      </div>
    </section>
  );
}

/* En-tête de la section */
function SectionHeader() {
  return (
    <div style={{ marginBottom: "3rem" }}>
      <p
        style={{
          fontSize:      11,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color:         "#999",
          fontFamily:    "'Courier New', monospace",
          marginBottom:  "0.75rem",
        }}
      >
        Notre groupe
      </p>
      <h2
        style={{
          fontFamily:    "'Georgia', serif",
          fontSize:      "clamp(1.8rem, 3vw, 2.8rem)",
          fontWeight:    700,
          letterSpacing: "-0.02em",
          color:         "#1A1A18",
          margin:        0,
        }}
      >
        Nos entreprises
      </h2>
    </div>
  );
}