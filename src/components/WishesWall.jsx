import { useRef, useState, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getWishes, addWish } from "../utils/wishesStorage";
import "./WishesWall.css";

gsap.registerPlugin(ScrollTrigger);

/**
 * WishesWall – visitors add a name + wish, stored in localStorage.
 * The storage layer (wishesStorage.js) can be swapped for Firebase, etc.
 */
export default function WishesWall() {
  const sectionRef = useRef(null);
  const [wishes, setWishes] = useState(() => getWishes());
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  /* Entrance */
  useGSAP(
    () => {
      gsap.from(".wishes__form", {
        y: 40,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      gsap.from(".wishes__card", {
        y: 30,
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: ".wishes__list",
          start: "top 85%",
        },
      });
    },
    { scope: sectionRef }
  );

  /** Submit a new wish */
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!name.trim() || !message.trim()) return;

      const updated = addWish(name.trim(), message.trim());
      setWishes(updated);
      setName("");
      setMessage("");

      /* Animate the new card in */
      requestAnimationFrame(() => {
        const firstCard = document.querySelector(".wishes__card");
        if (firstCard) {
          gsap.from(firstCard, {
            y: -20,
            opacity: 0,
            scale: 0.9,
            duration: 0.5,
            ease: "back.out(1.4)",
          });
        }
      });
    },
    [name, message]
  );

  return (
    <section className="wishes section" ref={sectionRef} aria-label="Birthday wishes wall">
      <h2 className="section-title">Leave a Wish 🌟</h2>

      {/* Form */}
      <form className="wishes__form glass-card" onSubmit={handleSubmit}>
        <div className="wishes__field">
          <label htmlFor="wish-name" className="wishes__label">
            Your name
          </label>
          <input
            id="wish-name"
            className="wishes__input"
            type="text"
            placeholder="e.g. Alex"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={50}
            required
          />
        </div>

        <div className="wishes__field">
          <label htmlFor="wish-message" className="wishes__label">
            Your wish
          </label>
          <textarea
            id="wish-message"
            className="wishes__textarea"
            placeholder="Write something heartfelt…"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            maxLength={280}
            rows={3}
            required
          />
        </div>

        <button type="submit" className="wishes__submit btn-primary">
          ✨ Send Wish
        </button>
      </form>

      {/* Wishes list */}
      {wishes.length > 0 && (
        <div className="wishes__list">
          {wishes.map((w) => (
            <div key={w.id} className="wishes__card glass-card">
              <p className="wishes__card-message">&ldquo;{w.message}&rdquo;</p>
              <p className="wishes__card-name">— {w.name}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
