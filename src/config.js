/**
 * ✨ Birthday Wishes Configuration ✨
 *
 * Edit these values to personalize the birthday website.
 * All text, dates, photos, and theming live here so you
 * never have to touch component code.
 */

const config = {
  /* ── Person being celebrated ───────────────────── */
  name: "Friend",

  /* ── Your name (the sender) ────────────────────── */
  senderName: "Your Name",

  /* ── Age they're turning ───────────────────────── */
  age: 25,

  /* ── Birthday date  (YYYY-MM-DD) ──────────────── */
  birthdayDate: "2026-12-25",

  /* ── Tone: "funny" | "emotional" | "romantic" | "classy" */
  tone: "emotional",

  /* ── Theme: "pastel" | "dark-neon" | "rose-gold" ─ */
  theme: "pastel",

  /* ── Music file path (place your mp3 in public/audio/) */
  musicSrc: "/audio/birthday.mp3",

  /* ── The heartfelt letter (each string = one line) */
  letterLines: [
    "Dear Friend,",
    "",
    "On this special day, I want you to know just how much you mean to me.",
    "Your smile lights up every room you walk into, and your kindness touches everyone around you.",
    "",
    "Every moment spent with you is a treasure I hold close to my heart.",
    "You make the world a brighter, better place just by being in it.",
    "",
    "Here's to another amazing year of adventures, laughter, and beautiful memories.",
    "May all your dreams come true and may this year bring you everything you deserve.",
    "",
    "With all my love,",
    "Your Name",
  ],

  /* ── Memory timeline items ─────────────────────── */
  memories: [
    {
      year: "2020",
      title: "The Day We Met",
      description:
        "A chance encounter that changed everything. Little did we know this was the beginning of something beautiful.",
      emoji: "✨",
    },
    {
      year: "2021",
      title: "Our First Adventure",
      description:
        "Remember that road trip? Getting lost was the best part. We found the most amazing sunset spot.",
      emoji: "🌅",
    },
    {
      year: "2022",
      title: "The Laughing Fit",
      description:
        "That joke at the restaurant that had us crying with laughter for twenty minutes straight. Pure joy.",
      emoji: "😂",
    },
    {
      year: "2023",
      title: "Standing Together",
      description:
        "Through thick and thin, you were there. That\u2019s when I knew this friendship was forever.",
      emoji: "💪",
    },
    {
      year: "2024",
      title: "Making Dreams Real",
      description:
        "Watching you chase your dreams and succeed was one of the proudest moments. You\u2019re unstoppable.",
      emoji: "🚀",
    },
  ],

  /* ── Reasons I love you (flip-card fronts & backs) */
  reasons: [
    { front: "1", back: "Your infectious laugh that makes everyone smile" },
    { front: "2", back: "The way you always know exactly what to say" },
    { front: "3", back: "Your incredible courage to be yourself, always" },
    { front: "4", back: "How you turn ordinary moments into unforgettable memories" },
    { front: "5", back: "Your endless kindness and compassion for others" },
    { front: "6", back: "The sparkle in your eyes when you talk about your passions" },
    { front: "7", back: "How you make everyone feel special and valued" },
    { front: "8", back: "Your strength that inspires everyone who knows you" },
  ],

  /* ── Photo gallery (place images in public/photos/) */
  photos: [
    { src: "/photos/placeholder-1.jpg", caption: "A moment to remember" },
    { src: "/photos/placeholder-2.jpg", caption: "Best day ever" },
    { src: "/photos/placeholder-3.jpg", caption: "Pure happiness" },
    { src: "/photos/placeholder-4.jpg", caption: "Together is our favorite place" },
    { src: "/photos/placeholder-5.jpg", caption: "Making memories" },
    { src: "/photos/placeholder-6.jpg", caption: "Forever grateful" },
  ],
};

export default config;
