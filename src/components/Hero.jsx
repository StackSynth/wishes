import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import confetti from "canvas-confetti";
import Balloons from "./Balloons";
import "./Hero.css";

/**
 * Hero – "Happy Birthday, [NAME]!" with letter-by-letter
 * stagger, floating balloons, and a confetti burst.
 */
export default function Hero({ name, age }) {
  const sectionRef = useRef(null);
  const headingText = `Happy Birthday!`;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ delay: 0.3 });

        /* Letter-by-letter reveal for "Happy Birthday!" */
        tl.from(".hero__letter", {
          y: 60,
          opacity: 0,
          scale: 0.4,
          rotateZ: () => gsap.utils.random(-15, 15),
          duration: 0.6,
          ease: "back.out(1.7)",
          stagger: 0.05,
        });

        /* Name slide up */
        tl.from(
          ".hero__name",
          {
            y: 80,
            opacity: 0,
            scale: 0.8,
            duration: 0.8,
            ease: "elastic.out(1, 0.5)",
          },
          "-=0.2"
        );

        /* Age badge pop */
        tl.from(
          ".hero__age",
          {
            scale: 0,
            opacity: 0,
            duration: 0.5,
            ease: "back.out(2)",
          },
          "-=0.3"
        );

        /* Subtitle fade */
        tl.from(
          ".hero__subtitle",
          {
            y: 20,
            opacity: 0,
            duration: 0.5,
            ease: "power2.out",
          },
          "-=0.2"
        );

        /* Fire confetti after reveal */
        tl.call(fireConfetti, null, "-=0.1");

        /* Shimmer loop on the heading */
        gsap.to(".hero__letter", {
          backgroundPosition: "200% center",
          duration: 3,
          ease: "none",
          repeat: -1,
          stagger: { each: 0.1, repeat: -1 },
          delay: 1.5,
        });
      });

      /* Reduced motion – just show everything */
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(".hero__letter, .hero__name, .hero__age, .hero__subtitle", {
          opacity: 1,
          y: 0,
          scale: 1,
        });
      });
    },
    { scope: sectionRef }
  );

  const fireConfetti = () => {
    const colors = ["#8B7EC8", "#E8A0BF", "#D4A574", "#B8ACE6", "#F5C6D8"];
    /* Center burst */
    confetti({
      particleCount: 80,
      spread: 80,
      origin: { y: 0.5 },
      colors,
    });
    /* Side cannons */
    setTimeout(() => {
      confetti({ particleCount: 40, angle: 60, spread: 55, origin: { x: 0 }, colors });
      confetti({ particleCount: 40, angle: 120, spread: 55, origin: { x: 1 }, colors });
    }, 300);
  };

  return (
    <section className="hero" ref={sectionRef} aria-label="Birthday greeting">
      <Balloons />

      <div className="hero__content">
        {/* Main heading – split into spans */}
        <h1 className="hero__heading" aria-label={headingText}>
          {headingText.split("").map((char, i) => (
            <span
              key={i}
              className={`hero__letter ${char === " " ? "hero__letter--space" : ""}`}
              aria-hidden="true"
            >
              {char}
            </span>
          ))}
        </h1>

        {/* Name */}
        <p className="hero__name">{name}</p>

        {/* Age badge */}
        <div className="hero__age" aria-label={`Turning ${age}`}>
          <span className="hero__age-number">{age}</span>
        </div>

        {/* Subtitle */}
        <p className="hero__subtitle">
          Wishing you a day as wonderful as you are ✨
        </p>
      </div>
    </section>
  );
}
