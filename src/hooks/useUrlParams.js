import { useMemo } from "react";
import baseConfig from "../config";

/**
 * useUrlParams – merges URL search-params with the base config.
 *
 * Supported params:
 *   ?name=Priya        → overrides config.name
 *   ?from=Rahul        → overrides config.senderName
 *   ?age=30            → overrides config.age
 *
 * Returns a new config object (never mutates the original).
 */
export default function useUrlParams() {
  return useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    const merged = { ...baseConfig };

    if (params.has("name")) merged.name = params.get("name");
    if (params.has("from")) merged.senderName = params.get("from");
    if (params.has("age")) merged.age = Number(params.get("age")) || merged.age;

    return merged;
  }, []);
}
