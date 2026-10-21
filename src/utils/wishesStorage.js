/**
 * wishesStorage – thin abstraction over localStorage.
 *
 * Swap this module out for a Firebase / Supabase adapter later;
 * the component only calls getWishes() and addWish().
 */

const STORAGE_KEY = "birthday_wishes";

/** Read all wishes → [{ id, name, message, timestamp }] */
export function getWishes() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/** Add a new wish and return the updated list */
export function addWish(name, message) {
  const wishes = getWishes();
  const newWish = {
    id: crypto.randomUUID?.() ?? Date.now().toString(36),
    name,
    message,
    timestamp: Date.now(),
  };
  const updated = [newWish, ...wishes];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
}

/** Clear all wishes (useful for testing) */
export function clearWishes() {
  localStorage.removeItem(STORAGE_KEY);
}
