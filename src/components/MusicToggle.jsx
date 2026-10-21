import { useRef, useState, useEffect } from "react";
import "./MusicToggle.css";

/**
 * MusicToggle – fixed corner button to mute / unmute background music.
 * Receives audioRef from App so it shares the same <audio> element.
 */
export default function MusicToggle({ audioRef }) {
  const [playing, setPlaying] = useState(false);
  const btnRef = useRef(null);

  /* Sync state with actual audio play state */
  useEffect(() => {
    const audio = audioRef?.current;
    if (!audio) return;

    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
    };
  }, [audioRef]);

  const toggle = () => {
    const audio = audioRef?.current;
    if (!audio) return;

    if (audio.paused) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  };

  return (
    <button
      ref={btnRef}
      className={`music-toggle ${playing ? "music-toggle--playing" : ""}`}
      onClick={toggle}
      aria-label={playing ? "Mute music" : "Unmute music"}
      title={playing ? "Mute" : "Unmute"}
    >
      {playing ? (
        /* Speaker icon with sound waves */
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
        </svg>
      ) : (
        /* Muted speaker icon */
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <line x1="23" y1="9" x2="17" y2="15" />
          <line x1="17" y1="9" x2="23" y2="15" />
        </svg>
      )}

      {/* Animated rings when playing */}
      {playing && (
        <span className="music-toggle__rings" aria-hidden="true">
          <span className="music-toggle__ring" />
          <span className="music-toggle__ring" />
        </span>
      )}
    </button>
  );
}
