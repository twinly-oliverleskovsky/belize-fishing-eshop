"use client";

import { ReactNode } from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ToastContainer from "@/components/ui/Toast";

// Lazy load components not needed on initial render
const CartDrawer = dynamic(() => import("@/components/cart/CartDrawer"), {
  ssr: false,
});
const CookieConsent = dynamic(() => import("@/components/ui/CookieConsent"), {
  ssr: false,
});
const FlyToCartAnimation = dynamic(
  () => import("@/components/ui/FlyToCartAnimation"),
  { ssr: false }
);

export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <div id="main-content">{children}</div>
      <Footer />
      <CartDrawer />
      <ToastContainer />
      <FlyToCartAnimation />
      <CookieConsent />
    </>
  );
}
