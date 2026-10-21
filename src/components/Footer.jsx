import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ShareButton from "./ShareButton";
import "./Footer.css";

gsap.registerPlugin(ScrollTrigger);

/**
 * Footer – credits, share button, and a "Replay surprise" button.
 */
export default function Footer({ senderName, name, onReplay }) {
  const footerRef = useRef(null);

  useGSAP(
    () => {
      gsap.from(".footer__content", {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
        },
      });
    },
    { scope: footerRef }
  );

  return (
    <footer className="footer" ref={footerRef} aria-label="Footer">
      <div className="footer__content section">
        {/* Heart divider */}
        <div className="footer__divider" aria-hidden="true">
          <span className="footer__heart">💕</span>
        </div>

        <p className="footer__credit">
          Made with <span aria-label="love">❤️</span> by{" "}
          <strong>{senderName}</strong>
        </p>

        <div className="footer__actions">
          <ShareButton name={name} />

          <button
            className="footer__replay btn-primary"
            onClick={onReplay}
            aria-label="Replay the birthday surprise"
          >
            🔄 Replay Surprise
          </button>
        </div>

        <p className="footer__year">
          © {new Date().getFullYear()} — A birthday to remember ✨
        </p>
      </div>
    </footer>
  );
}
