import { useState, useEffect, useRef } from "react";

/**
 * Hook personnalisé pour détecter si un élément est visible dans le viewport.
 * @param {number} threshold - Pourcentage de visibilité nécessaire (0 à 1)
 * @returns {[React.RefObject, boolean]} - [ref à attacher à l'élément, booléen inView]
 */
export function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect(); // une seule fois
        }
      },
      { threshold }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView];
}
