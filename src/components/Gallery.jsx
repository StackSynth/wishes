import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Gallery.css";

gsap.registerPlugin(ScrollTrigger);

/**
 * Gallery – responsive photo grid with ScrollTrigger parallax,
 * hover tilt, captions, and a simple lightbox.
 */
export default function Gallery({ photos }) {
  const sectionRef = useRef(null);
  const [lightbox, setLightbox] = useState(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".gallery__item", {
          y: 50,
          opacity: 0,
          scale: 0.95,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: ".gallery__grid",
            start: "top 80%",
          },
        });

        /* Subtle parallax on each image */
        gsap.utils.toArray(".gallery__img").forEach((img) => {
          gsap.to(img, {
            yPercent: -8,
            ease: "none",
            scrollTrigger: {
              trigger: img,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          });
        });
      });
    },
    { scope: sectionRef }
  );

  /** Hover tilt effect (mouse-based, desktop only) */
  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -12;
    gsap.to(card, {
      rotateY: x,
      rotateX: y,
      duration: 0.3,
      ease: "power1.out",
    });
  };

  const handleMouseLeave = (e) => {
    gsap.to(e.currentTarget, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.5)",
    });
  };

  return (
    <section className="gallery section" ref={sectionRef} aria-label="Photo gallery">
      <h2 className="section-title">Our Memories 📸</h2>

      <div className="gallery__grid">
        {photos.map((photo, i) => (
          <div
            key={i}
            className="gallery__item glass-card"
            style={{ perspective: "600px" }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={() => setLightbox(photo)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && setLightbox(photo)}
            aria-label={`View photo: ${photo.caption}`}
          >
            <div className="gallery__img-wrap">
              <img
                className="gallery__img"
                src={photo.src}
                alt={photo.caption}
                loading="lazy"
              />
            </div>
            <p className="gallery__caption">{photo.caption}</p>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="gallery__lightbox"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-label="Photo lightbox"
          aria-modal="true"
        >
          <button
            className="gallery__lightbox-close"
            onClick={() => setLightbox(null)}
            aria-label="Close lightbox"
          >
            ✕
          </button>
          <img
            className="gallery__lightbox-img"
            src={lightbox.src}
            alt={lightbox.caption}
          />
          <p className="gallery__lightbox-caption">{lightbox.caption}</p>
        </div>
      )}
    </section>
  );
}
