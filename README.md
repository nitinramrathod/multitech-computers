# MultiTech Computers - Website

A premium, production-ready Next.js website for MultiTech Computers, Jalna, Maharashtra.

## Owner
**Adv. Pavan Rathod** — Founder & Owner  
MultiTech Computers, Shop No. 5, Ambad Road, Jalna, Maharashtra 431203

## Tech Stack
- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion** (animations)
- **Zustand** (state management with localStorage persistence)
- **React Hook Form + Zod** (form validation)
- **Axios** (API calls)
- **Lucide Icons**
- **next-themes** (dark/light mode)

## Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Set up environment variables
Copy `.env.local` and fill in your values:
```bash
RESEND_API_KEY=your_resend_api_key_here
NEXT_PUBLIC_SITE_URL=https://multitechcomputers.in
```

### 3. Run development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 4. Build for production
```bash
npm run build
npm start
```

## Project Structure
```
/app              → Next.js App Router pages
/components       → Reusable UI components
  /layout         → Navbar, Footer
  /sections       → Homepage sections
  /products       → Product cards, enquiry modal
  /shared         → FloatingActions (WhatsApp, callback)
  /ui             → Theme provider, Toaster
/features         → Page-level feature components
/data             → Mock data (products, blogs, news, etc.)
/hooks            → Custom React hooks
/lib              → Utilities (cn, formatPrice, etc.)
/services         → API abstraction layer
/store            → Zustand stores (saved products, enquiries)
/types            → TypeScript types
/constants        → Site-wide constants
```

## Pages
| Route | Page |
|-------|------|
| `/` | Homepage |
| `/products` | Products listing with filters |
| `/products/[id]` | Product detail |
| `/services` | Services page |
| `/about` | About us |
| `/contact` | Contact form + map |
| `/blogs` | Blog listing |
| `/blogs/[slug]` | Blog detail |
| `/news` | Tech news |
| `/news/[slug]` | News detail |
| `/testimonials` | Customer reviews |
| `/saved` | Saved products |
| `/enquired` | Submitted enquiries |

## Email Integration
To enable real email sending via Resend:
1. Sign up at https://resend.com
2. Get your API key
3. Add to `.env.local`: `RESEND_API_KEY=re_xxx`
4. Uncomment the Resend code in `/app/api/enquiry/route.ts`, `/app/api/contact/route.ts`, `/app/api/callback/route.ts`

## Features
- ✅ Dark/Light theme with system detection
- ✅ Saved products (localStorage via Zustand)
- ✅ Enquiry system with modal
- ✅ Callback request floating button
- ✅ WhatsApp floating button
- ✅ Product filters (category, brand, RAM, condition, price)
- ✅ SEO optimized (metadata, sitemap, robots.txt)
- ✅ Fully responsive (mobile, tablet, desktop)
- ✅ Framer Motion animations
- ✅ Recently viewed products
