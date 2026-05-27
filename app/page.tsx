import HeroSection from '@/components/sections/HeroSection'
import FeaturedCategories from '@/components/sections/FeaturedCategories'
import TrustBadges from '@/components/sections/TrustBadges'
import FeaturedProducts from '@/components/sections/FeaturedProducts'
import WhyChooseUs from '@/components/sections/WhyChooseUs'
import RefurbishmentProcess from '@/components/sections/RefurbishmentProcess'
import ServicesOverview from '@/components/sections/ServicesOverview'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import BrandsSection from '@/components/sections/BrandsSection'
import FAQSection from '@/components/sections/FAQSection'
import LatestBlogs from '@/components/sections/LatestBlogs'
import LatestNews from '@/components/sections/LatestNews'
import CTABanner from '@/components/sections/CTABanner'
import ContactCTA from '@/components/sections/ContactCTA'
import MapSection from '@/components/sections/MapSection'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'MultiTech Computers | Certified Refurbished Laptops in Jalna, Maharashtra',
  description: 'Buy certified refurbished laptops, desktops & accessories in Jalna. Dell, HP, Lenovo at up to 60% off. Expert laptop repairs & PC upgrades. Visit MultiTech Computers, Ambad, Jalna.',
}

export default function HomePage() {
  return (
    <div className="overflow-x-hidden">
      <HeroSection />
      <TrustBadges />
      <FeaturedCategories />
      <FeaturedProducts />
      <WhyChooseUs />
      <RefurbishmentProcess />
      <ServicesOverview />
      <TestimonialsSection />
      <BrandsSection />
      <LatestBlogs />
      <LatestNews />
      <FAQSection />
      <CTABanner />
      <ContactCTA />
      <MapSection />
    </div>
  )
}
