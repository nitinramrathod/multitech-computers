'use client'

import { useState, useEffect, createContext, useContext, useCallback } from 'react'
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Toast {
  id: string
  title: string
  description?: string
  type?: 'success' | 'error' | 'info'
}

interface ToastContextType {
  toast: (toast: Omit<Toast, 'id'>) => void
}

const ToastContext = createContext<ToastContextType | null>(null)

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within Toaster')
  return ctx
}

export function Toaster() {
  const [toasts, setToasts] = useState<Toast[]>([])

  const toast = useCallback((newToast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9)
    setToasts(prev => [...prev, { ...newToast, id }])
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, 4000)
  }, [])

  const dismiss = (id: string) => setToasts(prev => prev.filter(t => t.id !== id))

  return (
    <ToastContext.Provider value={{ toast }}>
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
        {toasts.map(t => (
          <div
            key={t.id}
            className={cn(
              'pointer-events-auto flex items-start gap-3 p-4 rounded-xl shadow-xl border backdrop-blur-sm animate-fade-up',
              t.type === 'success' && 'bg-emerald-50 border-emerald-200 dark:bg-emerald-900/30 dark:border-emerald-700',
              t.type === 'error' && 'bg-red-50 border-red-200 dark:bg-red-900/30 dark:border-red-700',
              (!t.type || t.type === 'info') && 'bg-white border-border dark:bg-card'
            )}
          >
            {t.type === 'success' && <CheckCircle className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />}
            {t.type === 'error' && <AlertCircle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />}
            {(!t.type || t.type === 'info') && <Info className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />}
            <div className="flex-1">
              <p className="font-semibold text-sm text-foreground">{t.title}</p>
              {t.description && <p className="text-xs text-muted-foreground mt-0.5">{t.description}</p>}
            </div>
            <button onClick={() => dismiss(t.id)} className="text-muted-foreground hover:text-foreground">
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}
