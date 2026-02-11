/**
 * Lightweight analytics module.
 * Tracks events only when the user has accepted cookies.
 * Replace the `send` implementation with your real provider
 * (Google Analytics, Plausible, Mixpanel, etc.)
 */

const COOKIE_KEY = "belize-fishing-cookie-consent";

function hasConsent(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(COOKIE_KEY) === "accepted";
}

function send(eventName: string, data?: Record<string, unknown>) {
  // In production, replace with your real analytics call:
  // e.g. gtag("event", eventName, data);
  // e.g. plausible(eventName, { props: data });
  if (process.env.NODE_ENV !== "production") {
    console.log(`[Analytics] ${eventName}`, data ?? "");
  }
}

export const analytics = {
  /** Track a page view */
  pageView(url: string) {
    if (!hasConsent()) return;
    send("page_view", { url });
  },

  /** Track product view */
  viewProduct(productId: string, productName: string, price: number) {
    if (!hasConsent()) return;
    send("view_product", { productId, productName, price });
  },

  /** Track add to cart */
  addToCart(productId: string, productName: string, price: number, quantity: number) {
    if (!hasConsent()) return;
    send("add_to_cart", { productId, productName, price, quantity });
  },

  /** Track remove from cart */
  removeFromCart(productId: string, productName: string) {
    if (!hasConsent()) return;
    send("remove_from_cart", { productId, productName });
  },

  /** Track begin checkout */
  beginCheckout(totalPrice: number, itemCount: number) {
    if (!hasConsent()) return;
    send("begin_checkout", { totalPrice, itemCount });
  },

  /** Track purchase / order placed */
  purchase(totalPrice: number, itemCount: number) {
    if (!hasConsent()) return;
    send("purchase", { totalPrice, itemCount });
  },

  /** Track search */
  search(query: string, resultCount: number) {
    if (!hasConsent()) return;
    send("search", { query, resultCount });
  },

  /** Track newsletter signup */
  newsletterSignup(email: string) {
    if (!hasConsent()) return;
    send("newsletter_signup", { email: email.replace(/(.{2}).*(@.*)/, "$1***$2") });
  },

  /** Track generic custom event */
  event(name: string, data?: Record<string, unknown>) {
    if (!hasConsent()) return;
    send(name, data);
  },
};
