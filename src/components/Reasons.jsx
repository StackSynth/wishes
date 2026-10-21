import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Reasons.css";

gsap.registerPlugin(ScrollTrigger);

/**
 * Reasons – flip cards with GSAP rotationY.
 * Front shows the number, back shows the reason.
 */
export default function Reasons({ reasons }) {
  const sectionRef = useRef(null);
  const [flipped, setFlipped] = useState(() => new Set());

  /* Entrance animation */
  useGSAP(
    () => {
      gsap.from(".reasons__card", {
        y: 40,
        opacity: 0,
        scale: 0.9,
        duration: 0.5,
        ease: "back.out(1.4)",
        stagger: 0.08,
        scrollTrigger: {
          trigger: ".reasons__grid",
          start: "top 80%",
        },
      });
    },
    { scope: sectionRef }
  );

  /** Toggle flip for a card */
  const toggleFlip = (index) => {
    const cardInner = document.getElementById(`reason-inner-${index}`);
    if (!cardInner) return;

    const isFlipped = flipped.has(index);

    gsap.to(cardInner, {
      rotationY: isFlipped ? 0 : 180,
      duration: 0.6,
      ease: "power2.inOut",
    });

    setFlipped((prev) => {
      const next = new Set(prev);
      if (isFlipped) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  return (
    <section className="reasons section" ref={sectionRef} aria-label="Reasons I love you">
      <h2 className="section-title">Reasons You&apos;re Amazing 💝</h2>
      <p className="reasons__hint">Tap a card to reveal ✨</p>

      <div className="reasons__grid">
        {reasons.map((r, i) => (
          <div
            key={i}
            className="reasons__card"
            onClick={() => toggleFlip(i)}
            onKeyDown={(e) => e.key === "Enter" && toggleFlip(i)}
            role="button"
            tabIndex={0}
            aria-label={`Reason ${r.front}, tap to ${flipped.has(i) ? "hide" : "reveal"}`}
            style={{ perspective: "600px" }}
          >
            <div className="reasons__inner" id={`reason-inner-${i}`}>
              {/* Front */}
              <div className="reasons__face reasons__front glass-card">
                <span className="reasons__number">{r.front}</span>
                <span className="reasons__tap-icon">👆</span>
              </div>

              {/* Back */}
              <div className="reasons__face reasons__back glass-card">
                <p className="reasons__text">{r.back}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
