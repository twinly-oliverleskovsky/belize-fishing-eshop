"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ShoppingBag, Copy, Mail, Phone } from "lucide-react";
import { z } from "zod";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/lib/utils";
import Button from "@/components/ui/Button";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { analytics } from "@/lib/analytics";

const checkoutSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(6, "Phone number must be at least 6 characters"),
  address: z.string().optional(),
  notes: z.string().optional(),
});

type FormData = z.infer<typeof checkoutSchema>;
type FormErrors = Partial<Record<keyof FormData, string>>;

export default function CheckoutClient() {
  const items = useCartStore((s) => s.items);
  const totalPrice = useCartStore((s) => s.totalPrice());
  const clearCart = useCartStore((s) => s.clearCart);

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    address: "",
    notes: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (errors[name as keyof FormData]) {
      setErrors({ ...errors, [name]: undefined });
    }
  };

  const buildOrderText = () => {
    const orderLines = items
      .map(
        (item) =>
          `- ${item.name} x${item.quantity} — BZ$${(item.price * item.quantity).toFixed(2)}`
      )
      .join("\n");

    return `NEW ORDER — Belize Fishing

Customer: ${form.name}
Email: ${form.email}
Phone: ${form.phone}
Address: ${form.address || "Not provided"}
Notes: ${form.notes || "None"}

--- ORDER ITEMS ---
${orderLines}

TOTAL: BZ$${totalPrice.toFixed(2)}
---`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = checkoutSchema.safeParse(form);

    if (!result.success) {
      const fieldErrors: FormErrors = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof FormData;
        fieldErrors[field] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});

    const body = buildOrderText();
    const mailtoLink = `mailto:office@twinly.eu?subject=${encodeURIComponent(`New Order from ${form.name}`)}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoLink;
    setSubmitted(true);
    analytics.purchase(totalPrice, items.length);
  };

  const handleCopyOrder = async () => {
    const text = buildOrderText();
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const handleClearCart = () => {
    clearCart();
  };

  if (items.length === 0 && !submitted) {
    return (
      <main className="pt-28 pb-24 lg:pb-32 min-h-screen">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center py-20">
            <ShoppingBag
              className="text-sand-medium mx-auto mb-6"
              size={64}
              strokeWidth={1}
            />
            <h2 className="font-display text-2xl text-deep-ocean dark:text-dark-text mb-4">
              Your cart is empty
            </h2>
            <p className="text-drift-gray dark:text-dark-text-secondary font-body mb-8">
              Add some items to your cart before proceeding to checkout.
            </p>
            <Link href="/shop">
              <Button>Browse Products &rarr;</Button>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-28 pb-24 lg:pb-32 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-16 max-w-2xl mx-auto"
            >
              <div className="text-center mb-10">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.2 }}
                  className="w-20 h-20 rounded-full bg-tropical-teal flex items-center justify-center mx-auto mb-8"
                >
                  <Mail className="text-white" size={36} strokeWidth={2} />
                </motion.div>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-deep-ocean dark:text-dark-text mb-4">
                  Almost Done!
                </h2>
                <p className="text-drift-gray dark:text-dark-text-secondary font-body text-lg mb-2">
                  Your email client should have opened with the order details.
                </p>
                <p className="text-drift-gray dark:text-dark-text-secondary font-body">
                  Please <span className="font-semibold text-deep-ocean dark:text-dark-text">send the email</span> to complete your order.
                </p>
              </div>

              {/* Order summary on screen */}
              <div className="bg-sand-medium dark:bg-dark-card rounded-2xl p-6 lg:p-8 mb-8">
                <h3 className="font-body text-lg font-semibold text-deep-ocean dark:text-dark-text uppercase tracking-wider mb-4">
                  Order Summary
                </h3>
                <div className="space-y-3 mb-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-shell-white dark:bg-dark-border shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            sizes="40px"
                            className="object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="font-body text-sm font-medium text-deep-ocean dark:text-dark-text truncate">
                            {item.name}
                          </p>
                          <p className="text-drift-gray dark:text-dark-text-secondary text-xs font-body">
                            Qty: {item.quantity}
                          </p>
                        </div>
                      </div>
                      <p className="font-body text-sm font-bold text-deep-ocean dark:text-dark-text shrink-0">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="border-t border-sun-gold/30 pt-4 mb-6">
                  <div className="flex justify-between">
                    <span className="font-body font-semibold text-deep-ocean dark:text-dark-text text-lg">
                      Total
                    </span>
                    <span className="font-body font-bold text-sun-gold text-xl">
                      {formatPrice(totalPrice)}
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="text-drift-gray dark:text-dark-text-secondary text-sm font-body">
                    <span className="font-semibold text-deep-ocean dark:text-dark-text">Customer:</span> {form.name} ({form.email}, {form.phone})
                  </p>
                  {form.address && (
                    <p className="text-drift-gray dark:text-dark-text-secondary text-sm font-body">
                      <span className="font-semibold text-deep-ocean dark:text-dark-text">Address:</span> {form.address}
                    </p>
                  )}
                </div>
              </div>

              {/* Action buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleCopyOrder}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border-2 border-tropical-teal text-tropical-teal hover:bg-tropical-teal hover:text-white transition-all font-body font-semibold"
                >
                  <Copy size={18} />
                  {copied ? "Copied to Clipboard!" : "Copy Order to Clipboard"}
                </button>
                <button
                  onClick={handleClearCart}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-tropical-teal text-white hover:bg-tropical-teal/90 transition-all font-body font-semibold"
                >
                  <Check size={18} />
                  I&apos;ve Sent the Email — Clear Cart
                </button>
              </div>

              <div className="mt-8 text-center">
                <p className="text-drift-gray dark:text-dark-text-secondary text-sm font-body mb-2">
                  Having trouble? Contact us directly:
                </p>
                <div className="flex items-center justify-center gap-2 text-tropical-teal font-body font-semibold">
                  <Phone size={16} />
                  <span>+501-000-0000</span>
                </div>
                <p className="text-drift-gray dark:text-dark-text-secondary text-xs font-body mt-1">
                  office@twinly.eu
                </p>
              </div>

              <div className="mt-8 text-center">
                <Link href="/shop">
                  <Button>Continue Shopping &rarr;</Button>
                </Link>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <AnimatedSection>
                <h1 className="font-display text-4xl md:text-5xl font-bold text-deep-ocean dark:text-dark-text tracking-tight mb-12">
                  Checkout
                </h1>
              </AnimatedSection>

              <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
                {/* Form */}
                <div className="lg:col-span-3">
                  <AnimatedSection>
                    <h2 className="font-display text-2xl font-semibold text-deep-ocean dark:text-dark-text mb-2">
                      Request Your Order
                    </h2>
                    <p className="text-drift-gray dark:text-dark-text-secondary font-body mb-10">
                      Fill in your details and we&apos;ll open your email client
                      with the order summary. Just hit send!
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-8" noValidate>
                      {/* Name */}
                      <div>
                        <div className="floating-label-group">
                          <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder=" "
                            className={`font-body text-deep-ocean dark:text-dark-text ${errors.name ? "!border-b-coral-accent" : ""}`}
                          />
                          <label className={errors.name ? "!text-coral-accent" : ""}>Full Name *</label>
                        </div>
                        {errors.name && (
                          <p className="text-coral-accent text-xs font-body mt-1.5">{errors.name}</p>
                        )}
                      </div>

                      {/* Email */}
                      <div>
                        <div className="floating-label-group">
                          <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder=" "
                            className={`font-body text-deep-ocean dark:text-dark-text ${errors.email ? "!border-b-coral-accent" : ""}`}
                          />
                          <label className={errors.email ? "!text-coral-accent" : ""}>Email Address *</label>
                        </div>
                        {errors.email && (
                          <p className="text-coral-accent text-xs font-body mt-1.5">{errors.email}</p>
                        )}
                      </div>

                      {/* Phone */}
                      <div>
                        <div className="floating-label-group">
                          <input
                            type="tel"
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            placeholder=" "
                            className={`font-body text-deep-ocean dark:text-dark-text ${errors.phone ? "!border-b-coral-accent" : ""}`}
                          />
                          <label className={errors.phone ? "!text-coral-accent" : ""}>Phone Number *</label>
                        </div>
                        {errors.phone && (
                          <p className="text-coral-accent text-xs font-body mt-1.5">{errors.phone}</p>
                        )}
                      </div>

                      {/* Address */}
                      <div>
                        <div className="floating-label-group">
                          <textarea
                            name="address"
                            value={form.address}
                            onChange={handleChange}
                            placeholder=" "
                            rows={3}
                            className="font-body text-deep-ocean dark:text-dark-text resize-none"
                          />
                          <label>Delivery Address</label>
                        </div>
                      </div>

                      {/* Notes */}
                      <div>
                        <div className="floating-label-group">
                          <textarea
                            name="notes"
                            value={form.notes}
                            onChange={handleChange}
                            placeholder=" "
                            rows={3}
                            className="font-body text-deep-ocean dark:text-dark-text resize-none"
                          />
                          <label>Order Notes (optional)</label>
                        </div>
                      </div>

                      <Button type="submit" fullWidth size="lg">
                        Send Order via Email &rarr;
                      </Button>
                      <p className="text-drift-gray dark:text-dark-text-secondary text-xs font-body text-center">
                        This will open your email client with the order details.
                        We&apos;ll confirm your order by phone or email.
                      </p>
                    </form>
                  </AnimatedSection>
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-2">
                  <AnimatedSection delay={0.2}>
                    <div className="bg-sand-medium dark:bg-dark-card rounded-2xl p-6 lg:p-8 sticky top-28">
                      <h3 className="font-body text-lg font-semibold text-deep-ocean dark:text-dark-text uppercase tracking-wider mb-6">
                        Order Summary
                      </h3>

                      <div className="space-y-4 mb-6">
                        {items.map((item) => (
                          <div key={item.id} className="flex items-center gap-3">
                            <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-shell-white dark:bg-dark-border shrink-0">
                              <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                sizes="48px"
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-body text-sm font-medium text-deep-ocean dark:text-dark-text truncate">
                                {item.name}
                              </p>
                              <p className="text-drift-gray dark:text-dark-text-secondary text-xs font-body">
                                Qty: {item.quantity}
                              </p>
                            </div>
                            <p className="font-body text-sm font-bold text-deep-ocean dark:text-dark-text">
                              {formatPrice(item.price * item.quantity)}
                            </p>
                          </div>
                        ))}
                      </div>

                      <div className="border-t border-sun-gold/30 pt-4">
                        <div className="flex justify-between">
                          <span className="font-body font-semibold text-deep-ocean dark:text-dark-text text-lg">
                            Total
                          </span>
                          <span className="font-body font-bold text-sun-gold text-xl">
                            {formatPrice(totalPrice)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </AnimatedSection>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
