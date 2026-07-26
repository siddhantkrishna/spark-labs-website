import { useCallback, useEffect, useState } from "react";
import { initAnalytics } from "@/services/analytics";

const STORAGE_KEY = "spark-consent-v1";
export type ConsentState = "granted" | "denied" | null;

/**
 * Privacy-first consent gate. Analytics only load after explicit consent,
 * and the choice is remembered in localStorage.
 */
export function useConsent() {
  const [consent, setConsent] = useState<ConsentState>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as ConsentState;
    setConsent(stored);
    if (stored === "granted") initAnalytics();
    setReady(true);
  }, []);

  const accept = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, "granted");
    setConsent("granted");
    initAnalytics();
  }, []);

  const decline = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, "denied");
    setConsent("denied");
  }, []);

  return { consent, ready, accept, decline };
}
