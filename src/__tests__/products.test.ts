import { describe, it, expect } from "vitest";
import { products, categories } from "@/data/products";

describe("Products data", () => {
  it("should have at least one product", () => {
    expect(products.length).toBeGreaterThan(0);
  });

  it("every product should have required fields", () => {
    products.forEach((product) => {
      expect(product.id).toBeTruthy();
      expect(product.name).toBeTruthy();
      expect(product.slug).toBeTruthy();
      expect(product.category).toBeTruthy();
      expect(product.price).toBeGreaterThan(0);
      expect(product.image).toBeTruthy();
      expect(product.images.length).toBeGreaterThan(0);
      expect(product.description).toBeTruthy();
      expect(product.rating).toBeGreaterThanOrEqual(0);
      expect(product.rating).toBeLessThanOrEqual(5);
      expect(product.reviewCount).toBeGreaterThanOrEqual(0);
    });
  });

  it("every product slug should be unique", () => {
    const slugs = products.map((p) => p.slug);
    const uniqueSlugs = new Set(slugs);
    expect(uniqueSlugs.size).toBe(slugs.length);
  });

  it("every product id should be unique", () => {
    const ids = products.map((p) => p.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it("every product category should be in the categories list", () => {
    products.forEach((product) => {
      expect(categories).toContain(product.category);
    });
  });

  it("categories should include 'All' as first element", () => {
    expect(categories[0]).toBe("All");
  });

  it("product reviews should have valid ratings", () => {
    products.forEach((product) => {
      product.reviews.forEach((review) => {
        expect(review.rating).toBeGreaterThanOrEqual(1);
        expect(review.rating).toBeLessThanOrEqual(5);
        expect(review.author).toBeTruthy();
        expect(review.comment).toBeTruthy();
      });
    });
  });
});
