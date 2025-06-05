````markdown
# 📍 breadcrumbs-nextjs

**breadcrumbs-nextjs** is a lightweight and customizable React hook and component for implementing breadcrumbs navigation in Next.js applications. It uses `zustand` for state management, persists breadcrumbs in `sessionStorage`, and provides a responsive UI with mobile support.

---

## 🚀 Installation

```bash
npm install breadcrumbs-nextjs
```
````

> ⚠️ This package has the following peer dependencies that must be installed in your project:
>
> - `next` ^14.2.18 or ^15.2.2
> - `react`, `react-dom` ^18.3.1
> - `zustand`
> - `react-responsive`
> - `@radix-ui/react-dropdown-menu`, `@radix-ui/react-slot`
> - `lucide-react`, `clsx`, `tailwind-merge`

---

## 🧩 Usage

### 1. Add the `useBreadcrumbs` hook in your pages or components

```tsx
'use client'
import { useBreadcrumbs } from 'breadcrumbs-nextjs'

export default function Page() {
  useBreadcrumbs({
    label: 'Dashboard',
    path: '/en/dashboard',
  })

  return <div>Dashboard Page</div>
}
```

- `label`: The text displayed in the breadcrumb UI.
- `path`: The full URL path of the page.
- `permission?`: (optional) boolean — if `false`, the breadcrumb will not be added.
- `locale?`: (optional) locale string for multilingual logic (default is `'en'`).

---

### 2. Render the breadcrumbs component

```tsx
'use client'
import { Breadcrumbs } from 'breadcrumbs-nextjs'

const Header = () => {
  return (
    <header>
      <Breadcrumbs />
    </header>
  )
}
```

> The component automatically fetches breadcrumbs from the `zustand` store, updates on navigation, persists state in `sessionStorage`, and has a responsive mobile-friendly dropdown.

---

## 🧠 Architecture

### 🔗 Hook: `useBreadcrumbs`

```ts
useBreadcrumbs({
  label: string,
  path: string,
  permission?: boolean,
  locale?: string
})
```

### 🧠 Zustand store: `useBreadcrumbsStore`

Available methods in the store:

- `breadcrumbs: Breadcrumb[]`
- `addBreadcrumb(breadcrumb)`
- `removeBreadcrumb(path)`
- `removeBreadcrumbsUpTo(path)`
- `clearBreadcrumbs()`
- `saveBreadcrumbsToSession()`
- `previousPathname`, `setPreviousPathname(path)`
- `resetStore()`

> Breadcrumb = `{ label: string; path: string; }`

---

## 📱 Responsiveness

The package uses `react-responsive` to adapt breadcrumb display for mobile devices:

- Desktop: full breadcrumb trail.
- Mobile: shows first and last breadcrumb plus a dropdown for intermediate items.

---

## 🛠 UI libraries

This package uses:

- **Radix UI** for dropdown menus
- **lucide-react** for the ellipsis ("...") icon
- **Tailwind CSS** for styling (must be configured in your project)
- **clsx**, **tailwind-merge** for managing classNames

---

## 📦 Build

Written in TypeScript and compiled via `tsc` into the `dist/` folder.

---

## 🧪 Testing

Configured with `vitest` and `@testing-library/react`.

Run tests with:

```bash
npm run test
```

---

## 📎 Repository

- GitHub: [breadcrumbs-react](https://github.com/Vlad0395/breadcrumbs-react)
- Issues: [Issue Tracker](https://github.com/Vlad0395/breadcrumbs-react/issues)

---

## 📄 License

MIT

---

## 👤 Author

### Vladyslav T
