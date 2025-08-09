import { lazy, Suspense, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import AOS from "aos";
import "aos/dist/aos.css";

const Desktop = lazy(() =>
  import("./screens/Desktop/Desktop").then((m) => ({ default: m.Desktop }))
);
const Mobile = lazy(() =>
  import("./screens/Mobile/Mobile").then((m) => ({ default: m.Mobile }))
);

const BREAKPOINT = 1024; // <= 1024 => mobile/tablet

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(
    () => window.innerWidth <= BREAKPOINT
  );

  useEffect(() => {
    const onResize = () => {
      // Debounce to avoid rapid re-renders while resizing
      window.requestAnimationFrame(() => {
        setIsMobile(window.innerWidth <= BREAKPOINT);
      });
    };
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return isMobile;
}

function Root() {
  // Init AOS ONCE globally; remove AOS.init() from Desktop.tsx & Mobile.tsx
  useEffect(() => {
    AOS.init({ once: true, duration: 800, easing: "ease-out" });
  }, []);

  const isMobile = useIsMobile();

  return (
    <Suspense fallback={null}>
      {isMobile ? <Mobile /> : <Desktop isVisible />}
    </Suspense>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(<Root />);
