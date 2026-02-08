"use client";

import { ReactNode } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ToastContainer from "@/components/ui/Toast";
import CartDrawer from "@/components/cart/CartDrawer";
import CookieConsent from "@/components/ui/CookieConsent";
import FlyToCartAnimation from "@/components/ui/FlyToCartAnimation";

export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
      <CartDrawer />
      <ToastContainer />
      <FlyToCartAnimation />
      <CookieConsent />
    </>
  );
}
