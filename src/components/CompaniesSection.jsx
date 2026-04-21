import { companies } from "../data/companies";
import CompanyCard from "./CompanyCard";

/**
 * CompaniesSection — liste verticale des cartes entreprises (pleine largeur).
 */
export default function CompaniesSection() {
  return (
    <section
      style={{
        maxWidth: 1200,
        margin:   "0 auto",
        padding:  "0 1rem 4rem",      // padding horizontal réduit sur mobile
      }}
    >
      <SectionHeader />
      <div
        style={{
          display:       "flex",
          flexDirection: "column",
          gap:           "1rem",       // gap légèrement réduit
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
    <div style={{ marginBottom: "2rem" }}>
      <p
        style={{
          fontSize:      11,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color:         "#999",
          fontFamily:    "'Courier New', monospace",
          marginBottom:  "0.5rem",
          margin:        0,
        }}
      >
        Notre groupe
      </p>
      <h2
        style={{
          fontFamily:    "'Georgia', serif",
          fontSize:      "clamp(1.5rem, 5vw, 2.8rem)",  // min plus petit pour mobile
          fontWeight:    700,
          letterSpacing: "-0.02em",
          color:         "#1A1A18",
          margin:        "0.4rem 0 0",
        }}
      >
        Nos entreprises
      </h2>
    </div>
  );
}