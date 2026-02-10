"use client";

import { useState } from "react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import Button from "@/components/ui/Button";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";

const contactInfo = [
  {
    icon: MapPin,
    title: "Visit Us",
    lines: ["123 Barrier Reef Drive", "San Pedro, Ambergris Caye, Belize"],
  },
  {
    icon: Phone,
    title: "Call Us",
    lines: ["+501-226-1234", "Mon-Sat: 7am - 6pm"],
  },
  {
    icon: Mail,
    title: "Email Us",
    lines: ["info@belizefishing.com", "We reply within 24 hours"],
  },
  {
    icon: Clock,
    title: "Business Hours",
    lines: ["Mon-Sat: 7:00 AM - 6:00 PM", "Sunday: 8:00 AM - 2:00 PM"],
  },
];

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="py-24 lg:py-32 bg-sand-medium/50 dark:bg-dark-surface/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <span className="text-tropical-teal text-sm font-body font-semibold uppercase tracking-[0.2em] block mb-3">
            Get In Touch
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-deep-ocean dark:text-dark-text tracking-tight">
            Contact Us
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Info */}
          <AnimatedSection>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {contactInfo.map((item) => (
                <div key={item.title} className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-tropical-teal/10 flex items-center justify-center shrink-0">
                    <item.icon className="text-tropical-teal" size={22} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="font-body font-semibold text-deep-ocean dark:text-dark-text text-sm uppercase tracking-wider mb-1">
                      {item.title}
                    </h4>
                    {item.lines.map((line) => (
                      <p key={line} className="text-drift-gray dark:text-dark-text-secondary text-sm font-body">
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>

          {/* Contact Form */}
          <AnimatedSection delay={0.2}>
            {sent ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-tropical-teal flex items-center justify-center mx-auto mb-4">
                    <Send className="text-white" size={24} strokeWidth={1.5} />
                  </div>
                  <h3 className="font-display text-2xl font-semibold text-deep-ocean dark:text-dark-text mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-drift-gray dark:text-dark-text-secondary font-body">
                    We&apos;ll get back to you within 24 hours.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="floating-label-group">
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder=" "
                    required
                    className="font-body text-deep-ocean dark:text-dark-text"
                  />
                  <label>Your Name *</label>
                </div>
                <div className="floating-label-group">
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder=" "
                    required
                    className="font-body text-deep-ocean dark:text-dark-text"
                  />
                  <label>Email Address *</label>
                </div>
                <div className="floating-label-group">
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder=" "
                    rows={4}
                    required
                    className="font-body text-deep-ocean dark:text-dark-text resize-none"
                  />
                  <label>Your Message *</label>
                </div>
                <Button type="submit" fullWidth>
                  Send Message
                </Button>
              </form>
            )}
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
