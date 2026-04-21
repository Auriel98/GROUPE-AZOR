import { companies } from "../data/companies";
import CompanyCard from "./CompanyCard";

export default function CompaniesSection() {
  return (
    <section
      style={{
        width: "100%",
        maxWidth: 1200,
        margin: "0 auto",
        padding: "0 1rem 4rem", // ✅ FIX mobile padding
        boxSizing: "border-box",
      }}
    >
      <SectionHeader />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        {companies.map((company, index) => (
          <CompanyCard key={company.id} company={company} index={index} />
        ))}
      </div>
    </section>
  );
}

function SectionHeader() {
  return (
    <div style={{ marginBottom: "2rem" }}>
      <p style={{ fontSize: 11, letterSpacing: "0.18em" }}>
        Notre groupe
      </p>
      <h2 style={{ fontSize: "2rem", fontWeight: 700 }}>
        Nos entreprises
      </h2>
    </div>
  );
}