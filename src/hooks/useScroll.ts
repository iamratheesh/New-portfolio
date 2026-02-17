'use client';

import { useEffect, useState } from 'react';

export function useScroll() {
  const [y, setY] = useState(0);

  useEffect(() => {
    const handler = () => setY(window.scrollY);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return y;
}
