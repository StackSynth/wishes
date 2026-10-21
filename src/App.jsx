import { useState, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import useUrlParams from "./hooks/useUrlParams";
import Welcome from "./components/Welcome";
import Hero from "./components/Hero";
import Countdown from "./components/Countdown";
import Cake from "./components/Cake";
import Letter from "./components/Letter";
import Gallery from "./components/Gallery";
import Timeline from "./components/Timeline";
import Reasons from "./components/Reasons";
import WishesWall from "./components/WishesWall";
import Footer from "./components/Footer";
import MusicToggle from "./components/MusicToggle";
import "./App.css";

/* Register GSAP plugins once at the top level */
gsap.registerPlugin(ScrollTrigger);

/**
 * App – root component that orchestrates the welcome flow,
 * music playback, and all birthday sections.
 */
export default function App() {
  const [isOpened, setIsOpened] = useState(false);
  const audioRef = useRef(null);
  const config = useUrlParams();

  /** Called when the user taps "Open your surprise" */
  const handleOpen = useCallback(() => {
    setIsOpened(true);

    /* Start music (allowed after user gesture) */
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.5;
      audio.play().catch(() => {
        /* Browser may still block – that's OK, toggle button works */
      });
    }

    /* Refresh ScrollTrigger after new content mounts */
    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });
  }, []);

  /** Replay: scroll to top, reset state */
  const handleReplay = useCallback(() => {
    /* Pause music */
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }

    /* Kill all ScrollTriggers so they re-initialize on re-mount */
    ScrollTrigger.getAll().forEach((st) => st.kill());

    window.scrollTo({ top: 0, behavior: "instant" });
    setIsOpened(false);
  }, []);

  return (
    <>
      {/* Background audio – always mounted so ref stays stable */}
      <audio ref={audioRef} src={config.musicSrc} loop preload="none" />

      {/* Welcome splash */}
      {!isOpened && <Welcome onOpen={handleOpen} />}

      {/* Main content – only mounted after welcome is dismissed */}
      {isOpened && (
        <>
          <MusicToggle audioRef={audioRef} />

          <main className="app__main" id="main-content">
            <Hero name={config.name} age={config.age} />
            <Countdown birthdayDate={config.birthdayDate} />
            <Cake />
            <Letter
              lines={config.letterLines}
              senderName={config.senderName}
            />
            <Gallery photos={config.photos} />
            <Timeline memories={config.memories} />
            <Reasons reasons={config.reasons} />
            <WishesWall />
            <Footer
              senderName={config.senderName}
              name={config.name}
              onReplay={handleReplay}
            />
          </main>
        </>
      )}
    </>
  );
}
