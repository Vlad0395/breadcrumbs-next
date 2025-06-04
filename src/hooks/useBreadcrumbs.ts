import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import useBreadcrumbsStore from '../stores/breadcrumbsStore'
// import { useUserStore } from '../stores/userStore'
// import { hasPermission, Role } from '@/lib/auth'

interface Breadcrumb {
  label: string
  path: string
  permission?: boolean
  locale?: string
  user?: any | undefined
}

const useBreadcrumbs = (breadcrumb: Breadcrumb) => {

  const { locale = 'en', user } = breadcrumb
  const {
    breadcrumbs,
    addBreadcrumb,
    removeBreadcrumb,
    setPreviousPathname,
    previousPathname,
    saveBreadcrumbsToSession,
    removeBreadcrumbsUpTo,
    clearBreadcrumbs,
  } = useBreadcrumbsStore()
  const pathname = usePathname()

  useEffect(() => {
    if (!user) return
    if (breadcrumb.hasOwnProperty('permission') &&
      !breadcrumb?.permission
    ) {
      return
    }
    const currentPath = breadcrumb.path
    const currentPathSegments = currentPath.split('/').filter(Boolean)
    const previousPathSegments =
      previousPathname?.split('/').filter(Boolean) || []

    if (previousPathSegments.slice(0, 2).join('/') !== `${locale}/login`)
      if (
        previousPathSegments.slice(0, 2).join('/') !==
        currentPathSegments.slice(0, 2).join('/')
      )
        clearBreadcrumbs()
    const storedBreadcrumbs = sessionStorage.getItem('breadcrumbs')
    sessionStorage.removeItem('breadcrumbs')
    if (storedBreadcrumbs && !breadcrumbs.length) {
      const breadcrumbs = JSON.parse(storedBreadcrumbs)
      breadcrumbs.forEach((b: Breadcrumb) => {
        addBreadcrumb(b)
      })
    }
    if (!breadcrumbs.some((b) => b.path === currentPath)) {
      addBreadcrumb({
        label: breadcrumb.label,
        path: currentPath,
      })
    }

    if (previousPathname && previousPathname !== pathname) {
      const previousPath = previousPathname

      if (previousPath.split('/').length > currentPath.split('/').length) {
        removeBreadcrumb(previousPath)
      }
    }

    if (previousPathname !== pathname) {
      setPreviousPathname(pathname)
    }

    const lastBreadcrumb = breadcrumbs[breadcrumbs.length - 1]

    if (lastBreadcrumb && lastBreadcrumb.path !== currentPath) {
      removeBreadcrumbsUpTo(currentPath)
    }

    window.addEventListener('beforeunload', saveBreadcrumbsToSession)

    return () => {
      window.removeEventListener('beforeunload', saveBreadcrumbsToSession)
    }
  }, [
    breadcrumb,
    breadcrumbs,
    previousPathname,
    pathname,
    addBreadcrumb,
    setPreviousPathname,
    clearBreadcrumbs,
    removeBreadcrumb,
    removeBreadcrumbsUpTo,
    saveBreadcrumbsToSession,
    user,
    locale,
  ])
}

export default useBreadcrumbs
