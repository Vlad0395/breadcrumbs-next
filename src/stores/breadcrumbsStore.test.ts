import { describe, it, expect, beforeEach, vi } from 'vitest'
import useBreadcrumbsStore from './breadcrumbsStore'

const breadcrumb1 = { label: 'Home', path: '/' }
const breadcrumb2 = { label: 'About', path: '/about' }
const breadcrumb3 = { label: 'Contact', path: '/contact' }

describe('useBreadcrumbsStore', () => {
  beforeEach(() => {
    useBreadcrumbsStore.getState().resetStore()
    vi.stubGlobal('sessionStorage', {
      setItem: vi.fn(),
      getItem: vi.fn(),
      removeItem: vi.fn(),
      clear: vi.fn(),
    })
  })

  it('should initialize with empty breadcrumbs and null previousPathname', () => {
    const state = useBreadcrumbsStore.getState()
    expect(state.breadcrumbs).toEqual([])
    expect(state.previousPathname).toBeNull()
  })

  it('should add a breadcrumb', () => {
    useBreadcrumbsStore.getState().addBreadcrumb(breadcrumb1)
    expect(useBreadcrumbsStore.getState().breadcrumbs).toEqual([breadcrumb1])
  })

  it('should not add duplicate breadcrumbs', () => {
    useBreadcrumbsStore.getState().addBreadcrumb(breadcrumb1)
    useBreadcrumbsStore.getState().addBreadcrumb(breadcrumb1)
    expect(useBreadcrumbsStore.getState().breadcrumbs).toEqual([breadcrumb1])
  })

  it('should remove a breadcrumb by path', () => {
    useBreadcrumbsStore.getState().addBreadcrumb(breadcrumb1)
    useBreadcrumbsStore.getState().addBreadcrumb(breadcrumb2)
    useBreadcrumbsStore.getState().removeBreadcrumb(breadcrumb1.path)
    expect(useBreadcrumbsStore.getState().breadcrumbs).toEqual([breadcrumb2])
  })

  it('should set previousPathname', () => {
    useBreadcrumbsStore.getState().setPreviousPathname('/previous')
    expect(useBreadcrumbsStore.getState().previousPathname).toBe('/previous')
  })

  it('should save breadcrumbs to sessionStorage', () => {
    useBreadcrumbsStore.getState().addBreadcrumb(breadcrumb1)
    useBreadcrumbsStore.getState().saveBreadcrumbsToSession()
    expect(sessionStorage.setItem).toHaveBeenCalledWith(
      'breadcrumbs',
      JSON.stringify([breadcrumb1])
    )
  })

  it('should remove breadcrumbs up to a given path', () => {
    useBreadcrumbsStore.getState().addBreadcrumb(breadcrumb1)
    useBreadcrumbsStore.getState().addBreadcrumb(breadcrumb2)
    useBreadcrumbsStore.getState().addBreadcrumb(breadcrumb3)
    useBreadcrumbsStore.getState().removeBreadcrumbsUpTo(breadcrumb2.path)
    expect(useBreadcrumbsStore.getState().breadcrumbs).toEqual([
      breadcrumb1,
      breadcrumb2,
    ])
  })

  it('should not change breadcrumbs if path not found in removeBreadcrumbsUpTo', () => {
    useBreadcrumbsStore.getState().addBreadcrumb(breadcrumb1)
    useBreadcrumbsStore.getState().removeBreadcrumbsUpTo('/not-exist')
    expect(useBreadcrumbsStore.getState().breadcrumbs).toEqual([breadcrumb1])
  })

  it('should clear breadcrumbs', () => {
    useBreadcrumbsStore.getState().addBreadcrumb(breadcrumb1)
    useBreadcrumbsStore.getState().clearBreadcrumbs()
    expect(useBreadcrumbsStore.getState().breadcrumbs).toEqual([])
  })

  it('should reset store to initial state', () => {
    useBreadcrumbsStore.getState().addBreadcrumb(breadcrumb1)
    useBreadcrumbsStore.getState().setPreviousPathname('/prev')
    useBreadcrumbsStore.getState().resetStore()
    expect(useBreadcrumbsStore.getState().breadcrumbs).toEqual([])
    expect(useBreadcrumbsStore.getState().previousPathname).toBeNull()
  })
})
