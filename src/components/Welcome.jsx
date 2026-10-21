import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "./Welcome.css";

/**
 * Welcome – full-screen splash with an animated gift box.
 * Tap the button → lid opens → box fades → onOpen() fires.
 */
export default function Welcome({ onOpen }) {
  const containerRef = useRef(null);
  const tlRef = useRef(null);

  /* Idle floating animation for the gift box */
  useGSAP(
    () => {
      gsap.to(".welcome__gift", {
        y: -12,
        duration: 2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      /* Sparkle twinkle */
      gsap.to(".welcome__sparkle", {
        scale: 1.4,
        opacity: 0.3,
        duration: 1.2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        stagger: { each: 0.3, from: "random" },
      });
    },
    { scope: containerRef }
  );

  /** Build and play the opening timeline */
  const handleOpen = () => {
    if (tlRef.current) return; // prevent double-click

    const tl = gsap.timeline({
      onComplete: () => onOpen(),
    });
    tlRef.current = tl;

    tl
      /* 1. Anticipation – quick scale pulse */
      .to(".welcome__gift", {
        scale: 1.08,
        duration: 0.25,
        ease: "power2.in",
      })
      .to(".welcome__gift", {
        scale: 1,
        duration: 0.15,
        ease: "power2.out",
      })
      /* 2. Lid opens */
      .to(".welcome__lid", {
        rotateX: -140,
        y: -60,
        duration: 0.6,
        ease: "back.out(1.4)",
      })
      /* 3. Particles burst out */
      .to(
        ".welcome__particle",
        {
          y: () => gsap.utils.random(-200, -400),
          x: () => gsap.utils.random(-150, 150),
          opacity: 0,
          scale: 0,
          duration: 0.8,
          ease: "power2.out",
          stagger: { each: 0.04, from: "center" },
        },
        "-=0.3"
      )
      /* 4. Everything scales down & fades */
      .to(
        ".welcome__gift",
        {
          scale: 0.3,
          opacity: 0,
          duration: 0.5,
          ease: "power3.in",
        },
        "-=0.3"
      )
      .to(".welcome__cta", { opacity: 0, duration: 0.2 }, "<")
      /* 5. Overlay fades */
      .to(containerRef.current, {
        opacity: 0,
        duration: 0.4,
        ease: "power2.inOut",
      });
  };

  /* Particles (emoji confetti inside the box) */
  const particles = ["🎉", "⭐", "🎈", "💖", "🎊", "✨", "🌟", "💫"];

  return (
    <div className="welcome" ref={containerRef} aria-label="Birthday surprise welcome screen">
      {/* Background sparkles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <span
          key={i}
          className="welcome__sparkle"
          style={{
            left: `${gsap.utils.random(5, 95)}%`,
            top: `${gsap.utils.random(5, 95)}%`,
            animationDelay: `${gsap.utils.random(0, 3)}s`,
          }}
        />
      ))}

      {/* Gift box */}
      <div className="welcome__gift">
        {/* Particles (hidden inside, burst on open) */}
        <div className="welcome__particles" aria-hidden="true">
          {particles.map((p, i) => (
            <span key={i} className="welcome__particle">
              {p}
            </span>
          ))}
        </div>

        {/* Lid */}
        <div className="welcome__lid">
          <div className="welcome__bow" aria-hidden="true">
            <span className="welcome__bow-loop welcome__bow-loop--left" />
            <span className="welcome__bow-knot" />
            <span className="welcome__bow-loop welcome__bow-loop--right" />
          </div>
          <div className="welcome__lid-face" />
        </div>

        {/* Box body */}
        <div className="welcome__box">
          <div className="welcome__ribbon-v" />
          <div className="welcome__ribbon-h" />
        </div>
      </div>

      {/* CTA */}
      <button
        className="welcome__cta btn-primary"
        onClick={handleOpen}
        aria-label="Open your birthday surprise"
      >
        <span>Tap to open your surprise</span>
        <span className="welcome__cta-emoji" aria-hidden="true">
          ✨
        </span>
      </button>
    </div>
  );
}
