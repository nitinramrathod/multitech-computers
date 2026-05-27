export const SITE_NAME = 'MultiTech Computers'
export const SITE_TAGLINE = 'Premium Refurbished Laptops & Computers'
export const SITE_DESCRIPTION = 'Your trusted destination for certified refurbished laptops, desktops, laptop repairs, and PC upgrades in Jalna, Maharashtra. Quality guaranteed, prices unbeatable.'
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://multitechcomputers.in'
export const CONTACT_EMAIL = 'rathod173ram@gmail.com'
export const CONTACT_PHONE = '+91 98765 43210'
export const WHATSAPP_NUMBER = '919876543210'
export const ADDRESS = 'Shop No. 5, Ambad Road, Jalna, Maharashtra 431203'
export const GOOGLE_MAPS_URL = 'https://maps.google.com/?q=Ambad,Jalna,Maharashtra'
export const GOOGLE_MAPS_EMBED = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30326.91!2d75.8!3d19.83!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bda3db!2sJalna!5e0!3m2!1sen!2sin!4v1'

export const WORKING_HOURS = {
  weekdays: '9:00 AM - 8:00 PM',
  saturday: '9:00 AM - 6:00 PM',
  sunday: 'Closed',
}

export const SOCIAL_LINKS = {
  facebook: 'https://facebook.com/multitechcomputers',
  instagram: 'https://instagram.com/multitechcomputers',
  twitter: 'https://twitter.com/multitechcomp',
  youtube: 'https://youtube.com/@multitechcomputers',
  linkedin: 'https://linkedin.com/company/multitechcomputers',
}

export const BRANDS = ['Dell', 'HP', 'Lenovo', 'Apple', 'ASUS', 'Acer', 'Samsung', 'Toshiba', 'IBM', 'Corsair', 'Logitech']

export const RAM_OPTIONS = ['4GB', '8GB', '16GB', '32GB', '64GB']
export const STORAGE_OPTIONS = ['128GB SSD', '256GB SSD', '512GB SSD', '1TB SSD', '1TB HDD', '2TB HDD']
export const PROCESSOR_OPTIONS = ['Core i3', 'Core i5', 'Core i7', 'Core i9', 'Ryzen 3', 'Ryzen 5', 'Ryzen 7', 'Apple M1', 'Apple M2']
export const CONDITION_OPTIONS = ['Like New', 'Excellent', 'Good', 'Fair']
export const GRADE_OPTIONS = ['Grade A+', 'Grade A', 'Grade B', 'Grade C']

export const TRUST_BADGES = [
  { title: '6-Month Warranty', description: 'On all refurbished products', icon: 'Shield' },
  { title: 'Quality Tested', description: '50-point inspection process', icon: 'CheckCircle' },
  { title: 'Fast Delivery', description: 'Same day in Jalna, 2-3 days elsewhere', icon: 'Truck' },
  { title: 'Expert Support', description: '10+ years experience', icon: 'Headphones' },
  { title: 'Genuine Parts', description: 'OEM parts only', icon: 'Award' },
  { title: 'Easy Returns', description: '7-day return policy', icon: 'RotateCcw' },
]

export const CALLBACK_REASONS = [
  'Product Enquiry',
  'Laptop Repair',
  'Desktop Repair',
  'Upgrade Service',
  'AMC Service',
  'Accessories Enquiry',
  'Other',
]

export const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Products' },
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'About Us' },
  { href: '/blogs', label: 'Blog' },
  { href: '/news', label: 'Tech News' },
  { href: '/testimonials', label: 'Reviews' },
  { href: '/contact', label: 'Contact' },
]

export const FOOTER_QUICK_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'All Products' },
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'About Us' },
  { href: '/blogs', label: 'Blog' },
  { href: '/news', label: 'Tech News' },
  { href: '/testimonials', label: 'Testimonials' },
  { href: '/contact', label: 'Contact Us' },
]

export const FOOTER_SERVICES = [
  { href: '/services#laptop-repair', label: 'Laptop Repair' },
  { href: '/services#desktop-repair', label: 'Desktop Repair' },
  { href: '/services#ssd-upgrade', label: 'SSD Upgrade' },
  { href: '/services#ram-upgrade', label: 'RAM Upgrade' },
  { href: '/services#os-installation', label: 'OS Installation' },
  { href: '/services#amc-service', label: 'AMC Service' },
  { href: '/services#data-recovery', label: 'Data Recovery' },
]

export const ITEMS_PER_PAGE = 12

export const REFURBISHMENT_PROCESS_STEPS = [
  {
    step: 1,
    title: 'Collection & Inspection',
    description: 'Devices are collected from certified sources and undergo initial physical and functional inspection.',
    icon: 'Package',
  },
  {
    step: 2,
    title: 'Deep Diagnostics',
    description: 'Our 50-point diagnostic check covers every component from CPU performance to display quality.',
    icon: 'Scan',
  },
  {
    step: 3,
    title: 'Repair & Replace',
    description: 'Any faulty components are repaired or replaced with genuine OEM parts.',
    icon: 'Wrench',
  },
  {
    step: 4,
    title: 'Deep Cleaning',
    description: 'Professional cleaning inside and out, including thermal paste replacement and fan cleaning.',
    icon: 'Sparkles',
  },
  {
    step: 5,
    title: 'Fresh OS Install',
    description: 'Clean operating system installation with all drivers and genuine license activation.',
    icon: 'Download',
  },
  {
    step: 6,
    title: 'Quality Certification',
    description: 'Final quality check and certification. Only certified devices receive the MultiTech seal.',
    icon: 'Award',
  },
]
