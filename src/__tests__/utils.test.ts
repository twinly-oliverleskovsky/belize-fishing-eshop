import { describe, it, expect } from "vitest";
import { formatPrice, cn } from "@/lib/utils";

describe("formatPrice", () => {
  it("should format whole numbers with two decimals", () => {
    expect(formatPrice(10)).toBe("$10.00");
  });

  it("should format decimal prices correctly", () => {
    expect(formatPrice(99.99)).toBe("$99.99");
  });

  it("should format zero", () => {
    expect(formatPrice(0)).toBe("$0.00");
  });

  it("should format large numbers", () => {
    expect(formatPrice(1234.5)).toBe("$1234.50");
  });

  it("should round to two decimal places", () => {
    expect(formatPrice(9.999)).toBe("$10.00");
  });
});

describe("cn (class name merger)", () => {
  it("should join class names", () => {
    expect(cn("foo", "bar")).toBe("foo bar");
  });

  it("should filter out falsy values", () => {
    expect(cn("foo", false, "bar", null, undefined, "")).toBe("foo bar");
  });

  it("should handle single class", () => {
    expect(cn("foo")).toBe("foo");
  });

  it("should handle all falsy", () => {
    expect(cn(false, null, undefined)).toBe("");
  });
});
