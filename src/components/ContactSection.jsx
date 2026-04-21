import { companies } from "../data/companies";

export default function ContactSection() {
  return (
    <section
      style={{
        background: "#0f0f0f",
        padding: "6rem 2rem",
        position: "relative",
      }}
    >
      {/* CONTENU */}
      <div
        style={{
          maxWidth: 900,
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        {/* LABEL */}
        <p
          style={{
            fontSize: 12,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#aaa",
            marginBottom: "1.5rem",
          }}
        >
          Contact
        </p>

        {/* TITRE */}
        <h2
          style={{
            fontFamily: "'Georgia', serif",
            fontSize: "clamp(2.2rem, 4vw, 3.5rem)",
            fontWeight: 700,
            color: "#ffffff",
            lineHeight: 1.2,
            marginBottom: "1.5rem",
          }}
        >
          Un projet au Gabon ?
        </h2>

        {/* TEXTE */}
        <p
          style={{
            fontSize: 17,
            color: "#ccc",
            lineHeight: 1.8,
            maxWidth: 550,
            margin: "0 auto 3rem",
          }}
        >
          Nos équipes vous accompagnent de l’étude à la réalisation,
          avec des solutions adaptées aux exigences industrielles,
          techniques et environnementales.
        </p>

        {/* BOUTONS ENTREPRISES */}
        <div
          style={{
            display: "flex",
            gap: "1rem",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {companies.map((company) => (
            <ContactButton key={company.id} company={company} />
          ))}
        </div>

        {/* CTA GLOBAL */}
        <div style={{ marginTop: "3rem" }}>
          <a
            href="/contact"
            style={{
              background: "#f59e0b",
              color: "#000",
              padding: "14px 26px",
              borderRadius: 8,
              fontWeight: 600,
              textDecoration: "none",
              fontSize: 14,
              display: "inline-block",
            }}
          >
            Demander un devis
          </a>
        </div>
      </div>
    </section>
  );
}

/* BOUTON ENTREPRISE */
function ContactButton({ company }) {
  return (
    <a
      href={company.url}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        padding: "12px 22px",
        borderRadius: 6,
        fontSize: 12,
        fontWeight: 600,
        textDecoration: "none",
        letterSpacing: "0.08em",
        textTransform: "uppercase",

        color: "#fff",
        border: "1px solid rgba(255,255,255,0.2)",

        background: "rgba(255,255,255,0.05)",
        backdropFilter: "blur(6px)",

        transition: "all 0.25s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = company.color;
        e.currentTarget.style.border = "1px solid transparent";
        e.currentTarget.style.color = "#000";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "rgba(255,255,255,0.05)";
        e.currentTarget.style.border =
          "1px solid rgba(255,255,255,0.2)";
        e.currentTarget.style.color = "#fff";
      }}
    >
      {company.name} →
    </a>
  );
}