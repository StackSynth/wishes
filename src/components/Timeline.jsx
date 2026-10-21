import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Timeline.css";

gsap.registerPlugin(ScrollTrigger);

/**
 * Timeline – vertical milestone timeline.
 * The line draws itself on scroll (ScrollTrigger scrub),
 * and each item pops in from the side.
 */
export default function Timeline({ memories }) {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        /* Draw the vertical line */
        gsap.fromTo(
          ".timeline__line-fill",
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: ".timeline__track",
              start: "top 70%",
              end: "bottom 40%",
              scrub: 1,
            },
          }
        );

        /* Each item slides in */
        gsap.utils.toArray(".timeline__item").forEach((item, i) => {
          const fromLeft = i % 2 === 0;
          gsap.from(item, {
            x: fromLeft ? -60 : 60,
            opacity: 0,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 80%",
            },
          });
        });

        /* Dot scale-in */
        gsap.from(".timeline__dot", {
          scale: 0,
          duration: 0.4,
          ease: "back.out(2)",
          stagger: 0.15,
          scrollTrigger: {
            trigger: ".timeline__track",
            start: "top 70%",
          },
        });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(
          ".timeline__item, .timeline__dot, .timeline__line-fill",
          { opacity: 1, x: 0, scale: 1, scaleY: 1 }
        );
      });
    },
    { scope: sectionRef }
  );

  return (
    <section className="timeline section" ref={sectionRef} aria-label="Memories timeline">
      <h2 className="section-title">Our Story 📖</h2>

      <div className="timeline__track">
        {/* Vertical line */}
        <div className="timeline__line" aria-hidden="true">
          <div className="timeline__line-fill" />
        </div>

        {/* Items */}
        {memories.map((mem, i) => (
          <div
            key={i}
            className={`timeline__item ${i % 2 === 0 ? "timeline__item--left" : "timeline__item--right"}`}
          >
            <div className="timeline__dot" aria-hidden="true">
              <span>{mem.emoji}</span>
            </div>

            <div className="timeline__card glass-card">
              <span className="timeline__year">{mem.year}</span>
              <h3 className="timeline__title">{mem.title}</h3>
              <p className="timeline__desc">{mem.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
