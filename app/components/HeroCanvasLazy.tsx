'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const HeroCanvas = dynamic(() => import('./HeroCanvas'), { ssr: false });

/** Canvas is decoration: skip on small screens and reduced motion, load after first paint. */
export function HeroCanvasLazy() {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const ok = window.matchMedia('(min-width: 768px) and (prefers-reduced-motion: no-preference)').matches;
    if (!ok) return;
    const w = window as Window & { requestIdleCallback?: (cb: () => void) => number };
    const t = w.requestIdleCallback ? w.requestIdleCallback(() => setOn(true)) : window.setTimeout(() => setOn(true), 300);
    return () => { if (!w.requestIdleCallback) window.clearTimeout(t); };
  }, []);
  return on ? <HeroCanvas /> : null;
}
