import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-deep-ocean text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/logo.svg"
                alt="Belize Fishing Logo"
                width={40}
                height={20}
                className="brightness-0 invert"
              />
              <span className="font-display text-xl font-bold">Belize Fishing</span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed font-body">
              Premium fishing equipment curated for the Caribbean waters. Trusted
              by local guides and international anglers since 2003.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-body text-sm font-semibold uppercase tracking-widest text-sun-gold mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { href: "/", label: "Home" },
                { href: "/shop", label: "Shop" },
                { href: "/blog", label: "Blog" },
                { href: "/#about", label: "About Us" },
                { href: "/#contact", label: "Contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-tropical-teal transition-colors text-sm font-body"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-body text-sm font-semibold uppercase tracking-widest text-sun-gold mb-6">
              Categories
            </h4>
            <ul className="space-y-3">
              {["Rods", "Reels", "Lures", "Accessories", "Boats"].map((cat) => (
                <li key={cat}>
                  <Link
                    href="/shop"
                    className="text-white/60 hover:text-tropical-teal transition-colors text-sm font-body"
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-body text-sm font-semibold uppercase tracking-widest text-sun-gold mb-6">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-tropical-teal mt-0.5 shrink-0" strokeWidth={1.5} />
                <span className="text-white/60 text-sm font-body">
                  123 Barrier Reef Drive,<br />
                  San Pedro, Belize
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-tropical-teal shrink-0" strokeWidth={1.5} />
                <span className="text-white/60 text-sm font-body">+501-226-1234</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-tropical-teal shrink-0" strokeWidth={1.5} />
                <span className="text-white/60 text-sm font-body">info@belizefishing.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm font-body">
            &copy; {new Date().getFullYear()} Belize Fishing Store. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {["Facebook", "Instagram", "Twitter"].map((social) => (
              <span
                key={social}
                className="text-white/40 hover:text-tropical-teal transition-colors text-sm cursor-pointer font-body"
              >
                {social}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
