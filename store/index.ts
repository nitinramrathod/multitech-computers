import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Product, EnquiryFormData } from '@/types'

interface SavedProductsState {
  savedProducts: Product[]
  addProduct: (product: Product) => void
  removeProduct: (productId: string) => void
  isProductSaved: (productId: string) => boolean
  clearAll: () => void
}

interface EnquiredProductState {
  enquiries: Array<{ product: Product; data: EnquiryFormData; enquiredAt: string }>
  addEnquiry: (product: Product, data: EnquiryFormData) => void
  clearAll: () => void
}

interface RecentlyViewedState {
  recentlyViewed: Product[]
  addProduct: (product: Product) => void
}

export const useSavedProductsStore = create<SavedProductsState>()(
  persist(
    (set, get) => ({
      savedProducts: [],
      addProduct: (product) => {
        const existing = get().savedProducts.find((p) => p.id === product.id)
        if (!existing) {
          set((state) => ({ savedProducts: [...state.savedProducts, product] }))
        }
      },
      removeProduct: (productId) => {
        set((state) => ({
          savedProducts: state.savedProducts.filter((p) => p.id !== productId),
        }))
      },
      isProductSaved: (productId) => {
        return get().savedProducts.some((p) => p.id === productId)
      },
      clearAll: () => set({ savedProducts: [] }),
    }),
    { name: 'multitech-saved-products' }
  )
)

export const useEnquiriesStore = create<EnquiredProductState>()(
  persist(
    (set) => ({
      enquiries: [],
      addEnquiry: (product, data) => {
        set((state) => ({
          enquiries: [
            ...state.enquiries,
            { product, data, enquiredAt: new Date().toISOString() },
          ],
        }))
      },
      clearAll: () => set({ enquiries: [] }),
    }),
    { name: 'multitech-enquiries' }
  )
)

export const useRecentlyViewedStore = create<RecentlyViewedState>()(
  persist(
    (set, get) => ({
      recentlyViewed: [],
      addProduct: (product) => {
        const existing = get().recentlyViewed.filter((p) => p.id !== product.id)
        const updated = [product, ...existing].slice(0, 8)
        set({ recentlyViewed: updated })
      },
    }),
    { name: 'multitech-recently-viewed' }
  )
)
