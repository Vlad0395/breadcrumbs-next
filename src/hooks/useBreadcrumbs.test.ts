import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { cleanup, renderHook, waitFor } from '@testing-library/react'
import useBreadcrumbs from './useBreadcrumbs'
import useBreadcrumbsStore from '../stores/breadcrumbsStore'
let pathname = '/home'
vi.mock('next/navigation', () => ({
  usePathname: () => pathname,
}))

beforeEach(() => {
  window.sessionStorage.clear()
  useBreadcrumbsStore.getState().resetStore()
  vi.clearAllMocks()
})

afterEach(() => {
  cleanup()
})

describe('useBreadcrumbs', () => {
  it('adds a breadcrumb to the store and saves it to sessionStorage', async () => {
    const breadcrumb = { label: 'Home', path: '/home' }

    renderHook(() => useBreadcrumbs(breadcrumb))

    await waitFor(() => {
      expect(useBreadcrumbsStore.getState().breadcrumbs).toEqual([breadcrumb])
    })

    useBreadcrumbsStore.getState().saveBreadcrumbsToSession()

    await waitFor(() => {
      const stored = sessionStorage.getItem('breadcrumbs')
      expect(stored).not.toBeNull()
      expect(JSON.parse(stored!)).toEqual([breadcrumb])
    })
  })
  it('does not add a breadcrumb if it already exists', async () => {
    const breadcrumb = { label: 'Home', path: '/home' }

    renderHook(() => useBreadcrumbs(breadcrumb))
    renderHook(() => useBreadcrumbs(breadcrumb))

    await waitFor(() => {
      expect(useBreadcrumbsStore.getState().breadcrumbs).toEqual([breadcrumb])
    })
  })
  it('removes a breadcrumb when the path changes', async () => {
    const breadcrumb1 = { label: 'Home', path: '/home' }
    const breadcrumb2 = { label: 'About', path: '/about' }

    const { unmount } = renderHook(() => useBreadcrumbs(breadcrumb1))

    await waitFor(() => {
      expect(useBreadcrumbsStore.getState().breadcrumbs).toEqual([breadcrumb1])
    })

    unmount()

    pathname = '/about'

    const { default: useBreadcrumbsNew } = await import('./useBreadcrumbs')

    renderHook(() => useBreadcrumbsNew(breadcrumb2))

    await waitFor(() => {
      expect(useBreadcrumbsStore.getState().breadcrumbs).toEqual([breadcrumb2])
    })
  })
  it('clears breadcrumbs when the path changes significantly', async () => {
    
  })
})
