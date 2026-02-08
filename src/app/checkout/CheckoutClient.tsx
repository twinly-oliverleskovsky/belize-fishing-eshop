"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ShoppingBag } from "lucide-react";
import { z } from "zod";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/lib/utils";
import Button from "@/components/ui/Button";
import AnimatedSection from "@/components/ui/AnimatedSection";

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
    setSubmitted(true);
    clearCart();
  };

  // Empty cart check
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
            <h2 className="font-display text-2xl text-deep-ocean mb-4">
              Your cart is empty
            </h2>
            <p className="text-drift-gray font-body mb-8">
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
              className="text-center py-20 max-w-lg mx-auto"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
                className="w-20 h-20 rounded-full bg-tropical-teal flex items-center justify-center mx-auto mb-8"
              >
                <Check className="text-white" size={36} strokeWidth={2} />
              </motion.div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-deep-ocean mb-4">
                Thank You for Your Order!
              </h2>
              <p className="text-drift-gray font-body text-lg mb-2">
                Order <span className="font-semibold text-deep-ocean">#BF-001</span>
              </p>
              <p className="text-drift-gray font-body mb-8">
                We&apos;ll contact you shortly at{" "}
                <span className="text-deep-ocean font-medium">{form.phone || "your number"}</span>{" "}
                to arrange delivery and payment details.
              </p>
              <Link href="/shop">
                <Button>Continue Shopping &rarr;</Button>
              </Link>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <AnimatedSection>
                <h1 className="font-display text-4xl md:text-5xl font-bold text-deep-ocean tracking-tight mb-12">
                  Checkout
                </h1>
              </AnimatedSection>

              <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
                {/* Form */}
                <div className="lg:col-span-3">
                  <AnimatedSection>
                    <h2 className="font-display text-2xl font-semibold text-deep-ocean mb-2">
                      Complete Your Order
                    </h2>
                    <p className="text-drift-gray font-body mb-10">
                      Fill in your details and we&apos;ll contact you to arrange
                      delivery and payment
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
                            className={`font-body text-deep-ocean ${errors.name ? "!border-b-coral-accent" : ""}`}
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
                            className={`font-body text-deep-ocean ${errors.email ? "!border-b-coral-accent" : ""}`}
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
                            className={`font-body text-deep-ocean ${errors.phone ? "!border-b-coral-accent" : ""}`}
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
                            className="font-body text-deep-ocean resize-none"
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
                            className="font-body text-deep-ocean resize-none"
                          />
                          <label>Order Notes (optional)</label>
                        </div>
                      </div>

                      <Button type="submit" fullWidth size="lg">
                        Place Order
                      </Button>
                    </form>
                  </AnimatedSection>
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-2">
                  <AnimatedSection delay={0.2}>
                    <div className="bg-sand-medium rounded-2xl p-6 lg:p-8 sticky top-28">
                      <h3 className="font-body text-lg font-semibold text-deep-ocean uppercase tracking-wider mb-6">
                        Order Summary
                      </h3>

                      <div className="space-y-4 mb-6">
                        {items.map((item) => (
                          <div key={item.id} className="flex items-center gap-3">
                            <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-shell-white shrink-0">
                              <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                sizes="48px"
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-body text-sm font-medium text-deep-ocean truncate">
                                {item.name}
                              </p>
                              <p className="text-drift-gray text-xs font-body">
                                Qty: {item.quantity}
                              </p>
                            </div>
                            <p className="font-body text-sm font-bold text-deep-ocean">
                              {formatPrice(item.price * item.quantity)}
                            </p>
                          </div>
                        ))}
                      </div>

                      <div className="border-t border-sun-gold/30 pt-4">
                        <div className="flex justify-between">
                          <span className="font-body font-semibold text-deep-ocean text-lg">
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
