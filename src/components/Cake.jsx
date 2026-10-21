import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import confetti from "canvas-confetti";
import "./Cake.css";

/**
 * Cake – interactive birthday cake with candles.
 * Click the "Blow out" button (or individual candles) to
 * extinguish flames with GSAP animation + confetti.
 */

const CANDLE_COUNT = 5;

export default function Cake() {
  const sectionRef = useRef(null);
  const [candlesLit, setCandlesLit] = useState(
    () => new Array(CANDLE_COUNT).fill(true)
  );
  const [allBlown, setAllBlown] = useState(false);

  /* Entrance animation */
  useGSAP(
    () => {
      gsap.from(".cake__wrapper", {
        y: 60,
        opacity: 0,
        scale: 0.9,
        duration: 0.8,
        ease: "back.out(1.4)",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });
    },
    { scope: sectionRef }
  );

  /** Blow out a single candle or all remaining */
  const blowCandle = (index) => {
    if (!candlesLit[index]) return;

    /* Animate the flame out */
    const flameEl = document.getElementById(`flame-${index}`);
    if (flameEl) {
      gsap.to(flameEl, {
        scaleY: 0,
        opacity: 0,
        duration: 0.4,
        ease: "power2.in",
      });
    }

    /* Show smoke */
    const smokeEl = document.getElementById(`smoke-${index}`);
    if (smokeEl) {
      gsap.fromTo(
        smokeEl,
        { opacity: 0.7, y: 0, scale: 1 },
        {
          opacity: 0,
          y: -40,
          scale: 1.5,
          duration: 1.2,
          ease: "power1.out",
        }
      );
    }

    /* Update state */
    setCandlesLit((prev) => {
      const next = [...prev];
      next[index] = false;
      if (next.every((lit) => !lit)) {
        setTimeout(handleAllBlown, 400);
      }
      return next;
    });
  };

  /** Blow out all candles at once */
  const blowAll = () => {
    candlesLit.forEach((lit, i) => {
      if (lit) {
        setTimeout(() => blowCandle(i), i * 100);
      }
    });
  };

  /** All candles extinguished! */
  const handleAllBlown = () => {
    setAllBlown(true);
    const colors = ["#8B7EC8", "#E8A0BF", "#D4A574", "#B8ACE6", "#F5C6D8"];
    confetti({ particleCount: 120, spread: 90, origin: { y: 0.6 }, colors });
    setTimeout(() => {
      confetti({ particleCount: 60, angle: 60, spread: 55, origin: { x: 0 }, colors });
      confetti({ particleCount: 60, angle: 120, spread: 55, origin: { x: 1 }, colors });
    }, 250);

    /* Animate the "Make a wish" text */
    gsap.from(".cake__wish", {
      scale: 0,
      opacity: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.4)",
      delay: 0.3,
    });
  };

  return (
    <section className="cake section" ref={sectionRef} aria-label="Interactive birthday cake">
      <h2 className="section-title">Make a Wish 🎂</h2>

      <div className="cake__wrapper">
        {/* Candles */}
        <div className="cake__candles">
          {candlesLit.map((lit, i) => (
            <button
              key={i}
              className="cake__candle"
              onClick={() => blowCandle(i)}
              aria-label={`Candle ${i + 1}, ${lit ? "lit" : "blown out"}`}
            >
              {/* Smoke (hidden until blown) */}
              <div className="cake__smoke" id={`smoke-${i}`} aria-hidden="true" />

              {/* Flame */}
              <div
                className={`cake__flame ${lit ? "cake__flame--lit" : ""}`}
                id={`flame-${i}`}
                aria-hidden="true"
              />

              {/* Candle stick */}
              <div className="cake__stick" />
            </button>
          ))}
        </div>

        {/* Cake layers */}
        <div className="cake__body">
          <div className="cake__layer cake__layer--top">
            <div className="cake__frosting cake__frosting--top" />
          </div>
          <div className="cake__layer cake__layer--mid">
            <div className="cake__frosting cake__frosting--mid" />
          </div>
          <div className="cake__layer cake__layer--bottom">
            <div className="cake__frosting cake__frosting--bottom" />
          </div>
          <div className="cake__plate" />
        </div>
      </div>

      {/* Blow button */}
      {!allBlown && (
        <button
          className="cake__blow btn-primary"
          onClick={blowAll}
          aria-label="Blow out all candles"
        >
          🌬️ Blow out the candles!
        </button>
      )}

      {/* Wish revealed */}
      {allBlown && (
        <div className="cake__wish">
          <p className="cake__wish-text">Make a wish ✨</p>
          <p className="cake__wish-sub">Close your eyes and wish for something wonderful</p>
        </div>
      )}
    </section>
  );
}
