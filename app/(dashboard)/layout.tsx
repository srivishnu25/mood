import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'

const links = [
  { label: 'Home', href: '/' },
  { label: 'Journal', href: '/journal' },
  { label: 'History', href: '/history' },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative w-screen h-screen">
      <aside className="absolute w-[200px] top-0 left-0 h-full border-r border-black/10">
        <div className="px-2">Mood</div>
        <ul className="flex flex-col gap-y-4 px-2 py-4 h-full">
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </aside>
      <div className="ml-[200px] h-full">
        <header className="h-[60px] border-b border-black/10">
          <div className="flex justify-end items-center px-6 w-full h-full">
            <UserButton />
          </div>
        </header>
        <div className="h-[calc(100vh-60px)]">{children}</div>
      </div>
    </div>
  )
}
