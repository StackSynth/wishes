import { useState, useEffect } from "react";

/**
 * useCountdown – returns { days, hours, minutes, seconds, isToday, isPast }
 * Updates every second until the target date.
 *
 * @param {string} dateStr – ISO date string "YYYY-MM-DD"
 */
export default function useCountdown(dateStr) {
  const [timeLeft, setTimeLeft] = useState(() => calculate(dateStr));

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(calculate(dateStr)), 1000);
    return () => clearInterval(id);
  }, [dateStr]);

  return timeLeft;
}

function calculate(dateStr) {
  const now = new Date();
  const target = new Date(dateStr + "T00:00:00");

  /* Same calendar day → "Today's the day!" */
  const isToday =
    now.getFullYear() === target.getFullYear() &&
    now.getMonth() === target.getMonth() &&
    now.getDate() === target.getDate();

  if (isToday) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isToday: true, isPast: false };
  }

  const diff = target - now;

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isToday: false, isPast: true };
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    isToday: false,
    isPast: false,
  };
}
