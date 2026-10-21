import { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import useCountdown from "../hooks/useCountdown";
import "./Countdown.css";

/**
 * Countdown – live timer to the birthday, or a celebration message
 * if the day has arrived.
 */
export default function Countdown({ birthdayDate }) {
  const sectionRef = useRef(null);
  const { days, hours, minutes, seconds, isToday, isPast } = useCountdown(birthdayDate);
  const [prevValues, setPrevValues] = useState({ days, hours, minutes, seconds });

  /* Animate changed digits with a mini-flip */
  useEffect(() => {
    const units = ["days", "hours", "minutes", "seconds"];
    const current = { days, hours, minutes, seconds };

    units.forEach((unit) => {
      if (current[unit] !== prevValues[unit]) {
        const el = document.getElementById(`countdown-${unit}`);
        if (el) {
          gsap.fromTo(
            el,
            { y: -12, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.35, ease: "back.out(1.4)" }
          );
        }
      }
    });

    setPrevValues(current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [days, hours, minutes, seconds]);

  /* Entrance animation */
  useGSAP(
    () => {
      gsap.from(".countdown__card", {
        y: 40,
        opacity: 0,
        scale: 0.9,
        duration: 0.6,
        ease: "back.out(1.4)",
        stagger: 0.1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });
    },
    { scope: sectionRef }
  );

  if (isToday) {
    return (
      <section className="countdown section" ref={sectionRef} aria-label="Birthday countdown">
        <div className="countdown__today">
          <span className="countdown__today-emoji">🎉</span>
          <h2 className="countdown__today-text">Today&apos;s the day!</h2>
          <p className="countdown__today-sub">Let the celebration begin!</p>
        </div>
      </section>
    );
  }

  if (isPast) {
    return (
      <section className="countdown section" ref={sectionRef} aria-label="Birthday countdown">
        <div className="countdown__today">
          <span className="countdown__today-emoji">🥳</span>
          <h2 className="countdown__today-text">Happy Birthday!</h2>
          <p className="countdown__today-sub">Hope your special day was amazing!</p>
        </div>
      </section>
    );
  }

  const units = [
    { label: "Days", value: days, id: "days" },
    { label: "Hours", value: hours, id: "hours" },
    { label: "Minutes", value: minutes, id: "minutes" },
    { label: "Seconds", value: seconds, id: "seconds" },
  ];

  return (
    <section className="countdown section" ref={sectionRef} aria-label="Birthday countdown">
      <h2 className="section-title">Counting Down ⏳</h2>
      <div className="countdown__grid">
        {units.map(({ label, value, id }) => (
          <div key={id} className="countdown__card glass-card">
            <span className="countdown__number" id={`countdown-${id}`}>
              {String(value).padStart(2, "0")}
            </span>
            <span className="countdown__label">{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
