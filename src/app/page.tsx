import HeroSection from "@/components/home/HeroSection";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import CategoryBanner from "@/components/home/CategoryBanner";
import AboutSection from "@/components/home/AboutSection";
import Testimonial from "@/components/home/Testimonial";
import ContactSection from "@/components/home/ContactSection";
import Newsletter from "@/components/home/Newsletter";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <div className="section-divider" />
      <FeaturedProducts />
      <div className="section-divider" />
      <WhyChooseUs />
      <div className="section-divider" />
      <CategoryBanner />
      <div className="section-divider" />
      <AboutSection />
      <div className="section-divider" />
      <Testimonial />
      <div className="section-divider" />
      <ContactSection />
      <Newsletter />
    </main>
  );
}
