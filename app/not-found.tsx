import Link from 'next/link'
import { Home, Search, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-background px-4">
      <div className="text-center max-w-md">
        <div className="text-8xl font-black text-primary/10 mb-4">404</div>
        <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Search className="h-9 w-9 text-primary" />
        </div>
        <h1 className="text-2xl font-black text-foreground mb-3">Page Not Found</h1>
        <p className="text-muted-foreground mb-8 leading-relaxed">
          Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
          >
            <Home className="h-4 w-4" /> Go Home
          </Link>
          <Link
            href="/products"
            className="flex items-center justify-center gap-2 px-6 py-3 border border-border text-foreground rounded-xl font-semibold hover:bg-muted transition-all"
          >
            <ArrowLeft className="h-4 w-4" /> Browse Products
          </Link>
        </div>
      </div>
    </div>
  )
}
