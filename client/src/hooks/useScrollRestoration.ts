import { useEffect } from "react"

export function useScrollRestoration(key) {
  useEffect(() => {

    if ("scrollPosition" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const savedPosition = sessionStorage.getItem(key);

    if (savedPosition != null) {
      const position = Number(savedPosition);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          window.scrollTo(0, position);
        });
      });
    }

    const handleScroll = () => {
      sessionStorage.setItem(key, window.scrollY.toString());
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [key]);
}