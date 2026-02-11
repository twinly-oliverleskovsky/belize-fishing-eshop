import { describe, it, expect, beforeEach } from "vitest";
import { useCartStore } from "@/store/cartStore";

const mockItem = {
  id: "1",
  name: "Test Rod",
  price: 99.99,
  image: "/test.jpg",
  slug: "test-rod",
};

const mockItem2 = {
  id: "2",
  name: "Test Reel",
  price: 149.99,
  image: "/test2.jpg",
  slug: "test-reel",
};

describe("Cart Store", () => {
  beforeEach(() => {
    useCartStore.setState({ items: [] });
  });

  it("should start with an empty cart", () => {
    const { items } = useCartStore.getState();
    expect(items).toEqual([]);
    expect(useCartStore.getState().totalItems()).toBe(0);
    expect(useCartStore.getState().totalPrice()).toBe(0);
  });

  it("should add an item to the cart", () => {
    useCartStore.getState().addItem(mockItem);
    const { items } = useCartStore.getState();
    expect(items).toHaveLength(1);
    expect(items[0].name).toBe("Test Rod");
    expect(items[0].quantity).toBe(1);
  });

  it("should increment quantity when adding the same item twice", () => {
    useCartStore.getState().addItem(mockItem);
    useCartStore.getState().addItem(mockItem);
    const { items } = useCartStore.getState();
    expect(items).toHaveLength(1);
    expect(items[0].quantity).toBe(2);
  });

  it("should add multiple different items", () => {
    useCartStore.getState().addItem(mockItem);
    useCartStore.getState().addItem(mockItem2);
    const { items } = useCartStore.getState();
    expect(items).toHaveLength(2);
  });

  it("should remove an item", () => {
    useCartStore.getState().addItem(mockItem);
    useCartStore.getState().addItem(mockItem2);
    useCartStore.getState().removeItem("1");
    const { items } = useCartStore.getState();
    expect(items).toHaveLength(1);
    expect(items[0].id).toBe("2");
  });

  it("should update item quantity", () => {
    useCartStore.getState().addItem(mockItem);
    useCartStore.getState().updateQuantity("1", 5);
    const { items } = useCartStore.getState();
    expect(items[0].quantity).toBe(5);
  });

  it("should remove item when quantity is set to 0", () => {
    useCartStore.getState().addItem(mockItem);
    useCartStore.getState().updateQuantity("1", 0);
    const { items } = useCartStore.getState();
    expect(items).toHaveLength(0);
  });

  it("should remove item when quantity is set to negative", () => {
    useCartStore.getState().addItem(mockItem);
    useCartStore.getState().updateQuantity("1", -1);
    const { items } = useCartStore.getState();
    expect(items).toHaveLength(0);
  });

  it("should clear the cart", () => {
    useCartStore.getState().addItem(mockItem);
    useCartStore.getState().addItem(mockItem2);
    useCartStore.getState().clearCart();
    const { items } = useCartStore.getState();
    expect(items).toHaveLength(0);
  });

  it("should calculate totalItems correctly", () => {
    useCartStore.getState().addItem(mockItem);
    useCartStore.getState().addItem(mockItem); // qty 2
    useCartStore.getState().addItem(mockItem2); // qty 1
    expect(useCartStore.getState().totalItems()).toBe(3);
  });

  it("should calculate totalPrice correctly", () => {
    useCartStore.getState().addItem(mockItem); // 99.99
    useCartStore.getState().addItem(mockItem); // 99.99 x2
    useCartStore.getState().addItem(mockItem2); // 149.99
    // 99.99 * 2 + 149.99 = 349.97
    expect(useCartStore.getState().totalPrice()).toBeCloseTo(349.97, 2);
  });
});
