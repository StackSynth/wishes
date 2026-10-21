import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "./Balloons.css";

/**
 * Balloons – floating balloon overlay for the Hero section.
 * Each balloon drifts upward with random speed, x-drift, and rotation.
 * Respects prefers-reduced-motion.
 */

const BALLOON_COLORS = [
  "#C5B3E6", // light purple
  "#F5C6D8", // light rose
  "#E8C9A0", // light gold
  "#A8D8EA", // light blue
  "#F9E2AE", // light yellow
  "#C8E6C9", // light green
  "#FFB7B2", // soft coral
  "#D4A5E5", // soft violet
];

export default function Balloons() {
  const containerRef = useRef(null);
  const count = 12;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray(".balloon").forEach((el) => {
          const dur = gsap.utils.random(10, 18);
          const delay = gsap.utils.random(0, 8);

          gsap.set(el, {
            y: window.innerHeight + 100,
            x: gsap.utils.random(-30, 30),
            opacity: 0.85,
          });

          gsap.to(el, {
            y: -(window.innerHeight + 200),
            x: `+=${gsap.utils.random(-80, 80)}`,
            rotation: gsap.utils.random(-25, 25),
            duration: dur,
            ease: "none",
            repeat: -1,
            delay,
          });

          /* Gentle sway */
          gsap.to(el, {
            x: `+=${gsap.utils.random(-30, 30)}`,
            duration: gsap.utils.random(3, 5),
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            delay,
          });
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <div className="balloons" ref={containerRef} aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="balloon"
          style={{
            left: `${gsap.utils.random(5, 95)}%`,
            "--balloon-color": BALLOON_COLORS[i % BALLOON_COLORS.length],
            "--balloon-size": `${gsap.utils.random(36, 56)}px`,
          }}
        >
          <div className="balloon__body" />
          <div className="balloon__string" />
        </div>
      ))}
    </div>
  );
}
