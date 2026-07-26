import { ENV } from "./env";

/**
 * Lightweight, consent-aware analytics loader.
 *
 * Nothing loads until `initAnalytics()` is called *after* the visitor grants
 * consent (see `useConsent`). Every provider is optional and only initialises
 * when its env var is present, keeping the bundle and network clean by default.
 */

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    clarity?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    _sparkAnalyticsLoaded?: boolean;
  }
}

function injectScript(src: string, attrs: Record<string, string> = {}) {
  if (document.querySelector(`script[src="${src}"]`)) return;
  const s = document.createElement("script");
  s.src = src;
  s.async = true;
  Object.entries(attrs).forEach(([k, v]) => s.setAttribute(k, v));
  document.head.appendChild(s);
}

export function initAnalytics(): void {
  if (typeof window === "undefined" || window._sparkAnalyticsLoaded) return;
  window._sparkAnalyticsLoaded = true;

  // Google Tag Manager
  if (ENV.gtmId) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
    injectScript(`https://www.googletagmanager.com/gtm.js?id=${ENV.gtmId}`);
  }

  // Google Analytics 4
  if (ENV.ga4Id) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag(...args: unknown[]) {
      window.dataLayer!.push(args);
    };
    window.gtag("js", new Date());
    window.gtag("config", ENV.ga4Id, { anonymize_ip: true });
    injectScript(`https://www.googletagmanager.com/gtag/js?id=${ENV.ga4Id}`);
  }

  // Microsoft Clarity
  if (ENV.clarityId) {
    (function (c: Window, l: Document, a: string, r: string) {
      c.clarity =
        c.clarity ||
        function (...args: unknown[]) {
          (c.clarity as unknown as { q: unknown[] }).q =
            (c.clarity as unknown as { q?: unknown[] }).q || [];
          (c.clarity as unknown as { q: unknown[] }).q.push(args);
        };
      const t = l.createElement(a) as HTMLScriptElement;
      t.async = true;
      t.src = "https://www.clarity.ms/tag/" + r;
      const y = l.getElementsByTagName(a)[0];
      y.parentNode?.insertBefore(t, y);
    })(window, document, "script", ENV.clarityId);
  }

  // Meta Pixel (optional)
  if (ENV.metaPixelId) {
    window.fbq =
      window.fbq ||
      function (...args: unknown[]) {
        (window.fbq as unknown as { queue: unknown[] }).queue =
          (window.fbq as unknown as { queue?: unknown[] }).queue || [];
        (window.fbq as unknown as { queue: unknown[] }).queue.push(args);
      };
    injectScript("https://connect.facebook.net/en_US/fbevents.js");
    window.fbq("init", ENV.metaPixelId);
    window.fbq("track", "PageView");
  }
}

/** Track a virtual pageview on SPA route change. */
export function trackPageView(path: string): void {
  if (window.gtag && ENV.ga4Id) {
    window.gtag("event", "page_view", { page_path: path });
  }
  if (window.dataLayer && ENV.gtmId) {
    window.dataLayer.push({ event: "spa_pageview", page_path: path });
  }
  if (window.fbq && ENV.metaPixelId) {
    window.fbq("track", "PageView");
  }
}

/** Track a custom conversion / interaction event. */
export function trackEvent(name: string, params: Record<string, unknown> = {}): void {
  if (window.gtag) window.gtag("event", name, params);
  if (window.dataLayer) window.dataLayer.push({ event: name, ...params });
}
