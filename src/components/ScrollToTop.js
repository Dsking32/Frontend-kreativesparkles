import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * On every route change:
 *  - If there’s a hash (#section), scroll that element into view.
 *  - Otherwise, scroll window to top-left.
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // Wait a tick so the target exists in the DOM
      const id = hash.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ block: "start", inline: "nearest", behavior: "auto" });
        return;
      }
      // Fallback if element not found yet
      setTimeout(() => {
        const elLater = document.getElementById(id);
        if (elLater) elLater.scrollIntoView({ block: "start", behavior: "auto" });
        else window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      }, 0);
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }
  }, [pathname, hash]);

  return null;
}
