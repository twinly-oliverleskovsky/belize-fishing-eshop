import type { Metadata } from "next";
import CheckoutClient from "./CheckoutClient";

export const metadata: Metadata = {
  title: "Checkout | Belize Fishing",
  description: "Complete your order and we'll contact you to arrange delivery.",
};

export default function CheckoutPage() {
  return <CheckoutClient />;
}
