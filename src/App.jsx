import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import CompaniesSection from "./components/CompaniesSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import "./styles/global.css";
import AboutSection from "./components/Aboutsection";

/**
 * App — composant racine, assemble toutes les sections de la page.
 *
 * Structure :
 *  <Navbar />           → Navigation sticky
 *  <Hero />             → Section d'en-tête avec titre et stats
 *  <CompaniesSection /> → Grille des 3 cartes entreprises
 *  <ContactSection />   → CTA avec liens vers chaque site
 *  <Footer />           → Pied de page
 */
export default function App() {
  return (
    <div
      style={{
        fontFamily: "'Helvetica Neue', Arial, sans-serif",
        background: "#F7F5F0",
        minHeight: "100vh",
        color: "#1A1A18",
      }}
    >
      <Navbar />

      <Hero />
      <AboutSection />
      

      {/* Séparateur décoratif */}
      <div style={{ maxWidth: 1200, margin: "0 auto 5rem", padding: "0 2rem" }}>
        <div
          style={{
            height: 1,
            background:
              "linear-gradient(to right, transparent, #C8C4BC 30%, #C8C4BC 70%, transparent)",
          }}
        />
      </div>

      <CompaniesSection />

      <ContactSection />

      <Footer />
    </div>
  );
}
