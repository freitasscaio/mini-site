import { useEffect } from "react";

/**
 * A página de links vive em `public/bio.html` (arquivo único, sem frameworks).
 * A raiz do site apenas leva o visitante até ela.
 */
const Index = () => {
  useEffect(() => {
    window.location.replace("/bio.html");
  }, []);

  return null;
};

export default Index;
