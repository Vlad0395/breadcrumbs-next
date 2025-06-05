import { create } from 'zustand'

interface Breadcrumb {
  label: string
  path: string
}

interface BreadcrumbsStore {
  breadcrumbs: Breadcrumb[]
  previousPathname: string | null
  addBreadcrumb: (breadcrumb: Breadcrumb) => void
  removeBreadcrumb: (path: string) => void
  setPreviousPathname: (pathname: string) => void
  saveBreadcrumbsToSession: () => void
  removeBreadcrumbsUpTo: (path: string) => void
  clearBreadcrumbs: () => void
  resetStore: () => void
}

const initialState = {
  breadcrumbs: [],
  previousPathname: null,
}

const useBreadcrumbsStore = create<BreadcrumbsStore>((set, get) => ({
  ...initialState,
  resetStore: () => set(initialState),
  addBreadcrumb: (breadcrumb) =>
    set(({ breadcrumbs }) => {
      const breadcrumbExists =
        breadcrumbs?.some((b) => b.path === breadcrumb.path) ?? false
      if (!breadcrumbExists) {
        const breadCrumbs = [...breadcrumbs, breadcrumb]
        sessionStorage.setItem('breadcrumbs', JSON.stringify(breadCrumbs))
        return {
          breadcrumbs: breadCrumbs,
        }
      }
      return { breadcrumbs }
    }),
  removeBreadcrumb: (path) => {
    set((state) => ({
      breadcrumbs: state.breadcrumbs.filter((b) => b.path !== path),
    }))
  },
  setPreviousPathname: (pathname) =>
    set(() => ({
      previousPathname: pathname,
    })),
  saveBreadcrumbsToSession: () => {
    const { breadcrumbs } = get()
    sessionStorage.setItem('breadcrumbs', JSON.stringify(breadcrumbs))
  },
  removeBreadcrumbsUpTo: (path) =>
    set((state) => {
      const index = state.breadcrumbs.findIndex((b) => b.path === path)
      if (index !== -1) {
        return {
          breadcrumbs: state.breadcrumbs.slice(0, index + 1),
        }
      }
      return state
    }),
  clearBreadcrumbs: () => {
    set(() => ({ breadcrumbs: [] }))
  },
}))

export default useBreadcrumbsStore
