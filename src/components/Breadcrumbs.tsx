'use client'
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from './ui/breadcrumb'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import useBreadcrumbsStore from '../stores/breadcrumbsStore'
import Link from 'next/link'

import { useMediaQuery } from 'react-responsive'

const Breadcrumbs = () => {
  const { breadcrumbs } = useBreadcrumbsStore()
  const isBigMobile = useMediaQuery({ query: '(max-width: 600px)' })
  const breadCrumbsItem = (breadcrumb: { path: string; label: string }) => {
    return (
      <>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href={breadcrumb?.path || '#'}>{breadcrumb.label}</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
      </>
    )
  }
  return (
    <Breadcrumb>
      {!isBigMobile ? (
        <BreadcrumbList>
          {breadcrumbs.map((breadcrumb, index) => {
            return breadcrumbs.length - 1 !== index ? (
              <div className='flex items-center' key={breadcrumb.path}>
                {breadCrumbsItem(breadcrumb)}
              </div>
            ) : (
              <BreadcrumbItem key={breadcrumb?.path || '#'}>
                <BreadcrumbPage>{breadcrumb?.label || '--'}</BreadcrumbPage>
              </BreadcrumbItem>
            )
          })}
        </BreadcrumbList>
      ) : (
        <BreadcrumbList>
          {breadcrumbs.length > 1 ? breadCrumbsItem(breadcrumbs[0]) : null}
          {breadcrumbs.length > 2 && (
            <BreadcrumbItem>
              <DropdownMenu>
                <DropdownMenuTrigger className='flex items-center gap-1'>
                  <BreadcrumbEllipsis className='h-4 w-4' />
                  <span className='sr-only'>Toggle menu</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='start'>
                  {breadcrumbs.slice(1, -1).map((link) => {
                    return (
                      <DropdownMenuItem key={`isBigMobile-${link.path}`}>
                        <Link href={link.path}>{link.label}</Link>
                      </DropdownMenuItem>
                    )
                  })}
                </DropdownMenuContent>
              </DropdownMenu>
            </BreadcrumbItem>
          )}
          {breadcrumbs.length > 2 && <BreadcrumbSeparator />}
          <BreadcrumbItem>
            <BreadcrumbPage>
              {breadcrumbs[breadcrumbs.length - 1]?.label || '--'}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      )}
    </Breadcrumb>
  )
}

export default Breadcrumbs
