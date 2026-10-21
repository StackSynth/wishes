import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Letter.css";

gsap.registerPlugin(ScrollTrigger);

/**
 * Letter – a heartfelt card revealed line-by-line
 * using ScrollTrigger.
 */
export default function Letter({ lines, senderName }) {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        /* Card entrance */
        gsap.from(".letter__card", {
          y: 60,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".letter__card",
            start: "top 85%",
          },
        });

        /* Lines appear one by one */
        gsap.from(".letter__line", {
          y: 20,
          opacity: 0,
          duration: 0.5,
          ease: "power2.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: ".letter__body",
            start: "top 75%",
          },
        });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(".letter__card, .letter__line", { opacity: 1, y: 0 });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section className="letter section" ref={sectionRef} aria-label="Birthday letter">
      <h2 className="section-title">A Letter for You 💌</h2>

      <div className="letter__card glass-card">
        {/* Decorative seal */}
        <div className="letter__seal" aria-hidden="true">
          <span>💖</span>
        </div>

        <div className="letter__body">
          {lines.map((line, i) =>
            line === "" ? (
              <br key={i} />
            ) : (
              <p key={i} className="letter__line">
                {line}
              </p>
            )
          )}
        </div>

        <div className="letter__signature">
          <span className="letter__dash">—</span> {senderName}
        </div>
      </div>
    </section>
  );
}
