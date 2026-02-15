'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'

const SIDEBAR_MENU = [
  { label: 'Explore Careers', href: '/careers', icon: '/frontend/side-2.png', iconActive: '/frontend/side-2.png' },
  { label: 'Dashboard', href: '/user/dashboard', icon: '/frontend/side-1.png', iconActive: '/frontend/side-1-white.png' },
  { label: 'Profile', href: '/user/profile', icon: '/frontend/side-8.png', iconActive: '/frontend/side-8-white.png' },
 
]

function formatRole(role: string | null | undefined): string {
  if (!role) return 'Student'
  const r = String(role).trim().toLowerCase()
  if (r === 'student') return 'Student'
  if (r === 'parent') return 'Parent'
  if (r === 'teacher' || r === 'school') return r.charAt(0).toUpperCase() + r.slice(1)
  return role.charAt(0).toUpperCase() + role.slice(1)
}

export default function DashboardSidebar() {
  const pathname = usePathname()
  const user = useSelector((state: RootState) => state.auth.user)

  const displayName = user?.name ?? user?.email ?? 'User'
  const displayRole = formatRole(user?.role)

  return (
    <div className="dashboard-sidebar">
      <div className="dashboard-sidebar-profile">
        <img src="/frontend/crcle.png" className="dashboard-sidebar-avatar" alt="" />
        <div>
          <h4 className="dashboard-sidebar-name">{displayName}</h4>
          <p className="dashboard-sidebar-role">{displayRole}</p>
        </div>
      </div>
      <aside className="dashboard-sidebar-nav">
        <nav className="dashboard-sidebar-menu">
          {SIDEBAR_MENU.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
            const iconSrc = isActive && item.iconActive ? item.iconActive : item.icon
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`dashboard-sidebar-link ${isActive ? 'dashboard-sidebar-link-active' : ''}`}
              >
                <Image src={iconSrc} alt={item.label} width={20} height={20} />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>
      </aside>
    </div>
  )
}
