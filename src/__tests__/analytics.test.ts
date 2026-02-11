import { describe, it, expect, vi, beforeEach } from "vitest";
import { analytics } from "@/lib/analytics";

const COOKIE_KEY = "belize-fishing-cookie-consent";

describe("Analytics", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it("should not track when consent is not given", () => {
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    analytics.pageView("/shop");
    expect(consoleSpy).not.toHaveBeenCalled();
  });

  it("should not track when consent is declined", () => {
    localStorage.setItem(COOKIE_KEY, "declined");
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    analytics.pageView("/shop");
    expect(consoleSpy).not.toHaveBeenCalled();
  });

  it("should track when consent is accepted", () => {
    localStorage.setItem(COOKIE_KEY, "accepted");
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    analytics.pageView("/shop");
    expect(consoleSpy).toHaveBeenCalledWith(
      "[Analytics] page_view",
      { url: "/shop" }
    );
  });

  it("should track add to cart with product info", () => {
    localStorage.setItem(COOKIE_KEY, "accepted");
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    analytics.addToCart("1", "Test Rod", 99.99, 1);
    expect(consoleSpy).toHaveBeenCalledWith(
      "[Analytics] add_to_cart",
      { productId: "1", productName: "Test Rod", price: 99.99, quantity: 1 }
    );
  });

  it("should mask email in newsletter tracking", () => {
    localStorage.setItem(COOKIE_KEY, "accepted");
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    analytics.newsletterSignup("test@example.com");
    const callData = consoleSpy.mock.calls[0][1] as { email: string };
    expect(callData.email).not.toBe("test@example.com");
    expect(callData.email).toContain("***");
  });

  it("should track purchase", () => {
    localStorage.setItem(COOKIE_KEY, "accepted");
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    analytics.purchase(349.97, 3);
    expect(consoleSpy).toHaveBeenCalledWith(
      "[Analytics] purchase",
      { totalPrice: 349.97, itemCount: 3 }
    );
  });
});
