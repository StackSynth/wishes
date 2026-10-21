# 🎂 Birthday Wishes Website

A magical, animated birthday card built with React, GSAP, and canvas-confetti.
Static site — no backend required. Deploy anywhere.

---

## ✨ Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Open http://localhost:5173 in your browser
```

---

## 🎨 Personalize It

All personal details live in **one file**: [`src/config.js`](src/config.js).

| Field           | What it does                                      |
|-----------------|---------------------------------------------------|
| `name`          | Birthday person's name (shown in Hero)            |
| `senderName`    | Your name (shown in Letter & Footer)              |
| `age`           | Age they're turning (shown in Hero badge)          |
| `birthdayDate`  | `"YYYY-MM-DD"` — drives the countdown timer       |
| `tone`          | `"funny"` / `"emotional"` / `"romantic"` / `"classy"` |
| `theme`         | `"pastel"` / `"dark-neon"` / `"rose-gold"`         |
| `musicSrc`      | Path to your background music file                 |
| `letterLines`   | Array of strings — each is one line in the letter  |
| `memories`      | Timeline items `{ year, title, description, emoji }` |
| `reasons`       | Flip-card items `{ front, back }`                  |
| `photos`        | Gallery items `{ src, caption }`                   |

### 📸 Replace Photos

1. Put your images in `public/photos/`
2. Update the `photos` array in `config.js` with the new file names:
   ```js
   photos: [
     { src: "/photos/my-photo-1.jpg", caption: "Our first trip" },
     { src: "/photos/my-photo-2.jpg", caption: "Birthday party" },
     // ...
   ]
   ```

### 🎵 Add Music

1. Place your MP3 in `public/audio/birthday.mp3`
2. Or change the path in `config.js`:
   ```js
   musicSrc: "/audio/my-song.mp3"
   ```

### 🔗 URL Personalization

Override config values via URL parameters:
```
https://your-site.com/?name=Priya&from=Rahul&age=30
```

---

## 📱 Sections

1. **Welcome** — Gift-box splash screen, tap to open
2. **Hero** — Animated "Happy Birthday!" with confetti & balloons
3. **Countdown** — Live countdown to the birthday date
4. **Cake** — Interactive candle blow-out with confetti reward
5. **Letter** — Heartfelt card revealed line-by-line on scroll
6. **Gallery** — Photo grid with parallax, hover tilt, and lightbox
7. **Timeline** — Memory milestones with animated vertical line
8. **Reasons** — Flip cards that reveal why they're amazing
9. **Wishes Wall** — Visitors leave wishes (stored in localStorage)
10. **Footer** — Credits, share button, and replay

---

## 🚀 Deploy

### Netlify
```bash
npm run build
# Upload the `dist/` folder to Netlify
# Or connect your GitHub repo for auto-deploy
```

### Vercel
```bash
npm install -g vercel
vercel --prod
```

### GitHub Pages
```bash
npm run build
# Push the `dist/` folder to the `gh-pages` branch
# Or use the gh-pages npm package:
npm install -D gh-pages
npx gh-pages -d dist
```

---

## 🛠️ Tech Stack

- **React 18** (Vite, plain JSX)
- **GSAP** — core + ScrollTrigger + @gsap/react
- **canvas-confetti** — confetti bursts
- **Plain CSS** — CSS variables, no framework
- **Google Fonts** — Playfair Display + Inter

---

## ♿ Accessibility

- Semantic HTML with `aria-label` on sections and interactive elements
- Keyboard-navigable buttons and cards
- `prefers-reduced-motion` support — heavy animations are simplified
- Good color contrast on all text

---

## 📄 License

Made with ❤️ — use it freely for birthday surprises!
