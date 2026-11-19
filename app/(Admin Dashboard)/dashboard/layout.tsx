'use client';

import { useState } from 'react';
import type { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import './dashboard.css';

// "(Admin Dashboard)" route group hai, uska naam URL mein nahi aata.
const BASE = '/dashboard';

type NavItem = { label: string; href: string; icon: string; ready: boolean };

const NAV: NavItem[] = [
  { label: 'Dashboard', href: BASE, icon: 'M3 3h8v8H3z M13 3h8v5h-8z M13 10h8v11h-8z M3 13h8v8H3z', ready: true },
  { label: 'Staff', href: `${BASE}/staff`, icon: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2 M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M22 21v-2a4 4 0 0 0-3-3.9 M16 3.1a4 4 0 0 1 0 7.8', ready: true },
  { label: 'Reports', href: `${BASE}/reports`, icon: 'M6 2h9l5 5v15H6z M14 2v6h6 M9 13h8 M9 17h8', ready: false },
  { label: 'Batches', href: `${BASE}/batches`, icon: 'M21 8l-9-5-9 5 9 5 9-5z M3 8v8l9 5 9-5V8', ready: false },
  { label: 'Passport', href: `${BASE}/passport`, icon: 'M12 3l8 3v6c0 4.5-3.4 8-8 9-4.6-1-8-4.5-8-9V6l8-3z M9 12l2 2 4-4', ready: false },
  { label: 'Analytics', href: `${BASE}/analytics`, icon: 'M4 20V10 M10 20V4 M16 20v-8 M22 20H2', ready: false },
];

function Icon({ d }: { d: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname() || '';
  const [open, setOpen] = useState(false);

  function isActive(href: string): boolean {
    if (href === BASE) return pathname === BASE;
    return pathname.startsWith(href);
  }

  return (
    <div className="dash-root">
      <div className={`dash-backdrop${open ? ' dash-backdrop-on' : ''}`} onClick={() => setOpen(false)} />

      <aside className={`dash-side${open ? ' dash-side-open' : ''}`}>
        <div className="dash-brand">
          <img className="dash-logo" src="/logo.jpeg" alt="EcoSustain Campus logo" />
          <div>
            <span className="dash-brand-top">AI-Driven</span>
            <span className="dash-brand-name">EcoSustain Campus</span>
          </div>
        </div>

        <nav className="dash-nav" aria-label="Admin navigation">
          {NAV.map((item) =>
            item.ready ? (
              <Link
                key={item.href}
                href={item.href}
                className={`dash-link${isActive(item.href) ? ' dash-link-on' : ''}`}
                onClick={() => setOpen(false)}
              >
                <Icon d={item.icon} />
                {item.label}
              </Link>
            ) : (
              <span key={item.href} className="dash-link dash-link-off" aria-disabled="true">
                <Icon d={item.icon} />
                {item.label}
                <span className="dash-soon">Soon</span>
              </span>
            )
          )}
        </nav>

        <div className="dash-user">
          <div className="dash-avatar">A</div>
          <div>
            <div className="dash-user-name">Admin</div>
            <div className="dash-user-role">Waste Supervisor</div>
          </div>
          <Link href="/login" className="dash-signout">Sign out</Link>
        </div>
      </aside>

      <div className="dash-main">
        <div className="dash-topbar">
          <button type="button" className="dash-menu" aria-label="Open menu" onClick={() => setOpen(true)}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0b2418" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
          <span className="dash-topbar-title">EcoSustain Campus</span>
        </div>
        <div className="dash-content">{children}</div>
      </div>
    </div>
  );
}