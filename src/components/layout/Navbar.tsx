'use client';

import Link from 'next/link';
import { navigation } from '@/config/navigation.config';

export function Navbar() {
  return (
    <nav className="navbar">
      {navigation.map((item) => (
        <Link key={item.href} href={item.href}>
          {item.name}
        </Link>
      ))}
    </nav>
  );
}
