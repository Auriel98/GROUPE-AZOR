import { useState, useEffect } from "react";

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

export default function Footer() {
  const year = new Date().getFullYear();
  const isMobile = useIsMobile();

  return (
    <footer style={{ background: "#111110", padding: isMobile ? "2.5rem 1.25rem 1.5rem" : "4rem 2rem 2rem", color: "#ccc" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        {/* TOP GRID */}
        <div style={{
          display:             "grid",
          gridTemplateColumns: isMobile ? "1fr" : "2fr 1fr 1fr 1fr",
          gap:                 isMobile ? "2rem" : "3rem",
          marginBottom:        isMobile ? "2rem" : "3rem",
        }}>

          {/* Branding */}
          <div>
            <h2 style={{
              fontSize:   isMobile ? 18 : 20,
              fontWeight: 700,
              color:      "#fff",
              margin:     "0 0 .5rem",
              letterSpacing: "-.02em",
              fontFamily: "'Georgia', serif",
            }}>
              Groupe Gabon
            </h2>
            <p style={{
              fontSize:      11,
              letterSpacing: ".15em",
              textTransform: "uppercase",
              color:         "#f59e0b",
              fontFamily:    "'Courier New', monospace",
              margin:        "0 0 1rem",
            }}>
              Gabon · Afrique Centrale
            </p>
            <p style={{ fontSize: 13, color: "#888", lineHeight: 1.75, margin: "0 0 1.25rem" }}>
              Trois entreprises spécialisées dans le nettoyage industriel, l'ingénierie des structures
              et le génie civil — au service du développement du Gabon.
            </p>
            <div style={{ display: "flex", gap: 10 }}>
              {["in", "𝕏", "f"].map((icon) => (
                <a key={icon} href="#" style={{
                  width: 34, height: 34, border: "1px solid #2a2a28", borderRadius: 2,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#888", textDecoration: "none", fontSize: 13,
                }}>
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Sur mobile : colonnes Entreprises + Navigation côte à côte */}
          {isMobile ? (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
              <FooterCol title="Nos entreprises" links={[
                { label: "EGENEM", href: "#" },
                { label: "SMIT Engineering", href: "#" },
                { label: "Azor Engineering", href: "#" },
              ]} />
              <FooterCol title="Navigation" links={[
                { label: "Accueil", href: "/" },
                { label: "Entreprises", href: "/entreprises" },
                { label: "Projets", href: "/projets" },
                { label: "Contact", href: "/contact" },
              ]} />
            </div>
          ) : (
            <>
              <FooterCol title="Nos entreprises" links={[
                { label: "EGENEM", href: "#" },
                { label: "SMIT Engineering", href: "#" },
                { label: "Azor Engineering", href: "#" },
              ]} />
              <FooterCol title="Navigation" links={[
                { label: "Accueil", href: "/" },
                { label: "Entreprises", href: "/entreprises" },
                { label: "Projets", href: "/projets" },
                { label: "Contact", href: "/contact" },
              ]} />
            </>
          )}

          {/* Contact */}
          <div>
            <ColTitle>Contact</ColTitle>
            <div style={{ display: "flex", flexDirection: "column", gap: ".75rem" }}>
              <p style={{ fontSize: 13, color: "#888", margin: 0, lineHeight: 1.6 }}>
                Libreville, Gabon<br />Afrique Centrale
              </p>
              <a href="tel:+241000000" style={{ fontSize: 13, color: "#888", textDecoration: "none" }}>
                +241 00 00 00 00
              </a>
              <a href="mailto:contact@groupegabon.ga" style={{ fontSize: 13, color: "#888", textDecoration: "none" }}>
                contact@groupegabon.ga
              </a>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div style={{
          borderTop:      "1px solid #2a2a28",
          paddingTop:     "1.5rem",
          display:        "flex",
          flexDirection:  isMobile ? "column" : "row",
          justifyContent: "space-between",
          alignItems:     isMobile ? "flex-start" : "center",
          gap:            "0.75rem",
        }}>
          <p style={{
            fontSize:      11,
            color:         "#444",
            letterSpacing: ".08em",
            fontFamily:    "'Courier New', monospace",
            margin:        0,
            lineHeight:    1.7,
          }}>
            © {year} Groupe Gabon · EGENEM · SMIT Engineering<br style={{ display: isMobile ? "block" : "none" }} />
            {" "}· Azor Engineering · Tous droits réservés
          </p>
          <div style={{ display: "flex", gap: "1.25rem", flexWrap: "wrap" }}>
            {["Mentions légales", "Politique de confidentialité"].map((label) => (
              <a key={label} href="#" style={{
                fontSize:      11,
                color:         "#444",
                textDecoration: "none",
                letterSpacing: ".05em",
                fontFamily:    "'Courier New', monospace",
              }}>
                {label}
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}

/* ── Helpers ─────────────────────────────────────────────────────────────── */
function ColTitle({ children }) {
  return (
    <p style={{
      fontSize:      10,
      letterSpacing: ".15em",
      textTransform: "uppercase",
      color:         "#f59e0b",
      fontFamily:    "'Courier New', monospace",
      margin:        "0 0 1rem",
      fontWeight:    600,
    }}>
      {children}
    </p>
  );
}

function FooterCol({ title, links }) {
  return (
    <div>
      <ColTitle>{title}</ColTitle>
      <div style={{ display: "flex", flexDirection: "column", gap: ".75rem" }}>
        {links.map(({ label, href }) => (
          <a key={label} href={href} style={{ fontSize: 13, color: "#888", textDecoration: "none" }}>
            {label}
          </a>
        ))}
      </div>
    </div>
  );
}