"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import Button from "@/components/ui/Button";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <section className="bg-deep-ocean dark:bg-dark-surface py-24 lg:py-32">
      <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
        <AnimatedSection>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-white tracking-tight mb-4">
            Stay in the Loop
          </h2>
          <p className="text-white/60 font-body text-lg mb-10">
            Get updates on new gear and fishing tips from Belize
          </p>

          {submitted ? (
            <p className="text-sun-gold font-body text-lg font-semibold">
              Thanks for subscribing!
            </p>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/40 font-body focus:outline-none focus:border-tropical-teal transition-colors"
                required
              />
              <Button type="submit" className="gap-2">
                Subscribe
                <Send size={16} strokeWidth={1.5} />
              </Button>
            </form>
          )}
        </AnimatedSection>
      </div>
    </section>
  );
}
