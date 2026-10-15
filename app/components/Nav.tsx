'use client';

import { useEffect, useState } from 'react';

const LINKS = [
  ['Queuella', '#queuella'],
  ['Experience', '#experience'],
  ['Skills', '#skills'],
  ['Education', '#education'],
  ['Contact', '#contact'],
] as const;

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open ? 'border-b border-white/10 bg-ink/95 backdrop-blur' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-[960px] items-center justify-between px-4 py-3.5 sm:px-6">
        <a href="#top" className="font-sans text-[15px] font-extrabold tracking-tight text-white">DPY</a>
        <nav aria-label="Primary" className="hidden gap-8 md:flex">
          {LINKS.map(([label, href]) => (
            <a key={href} href={href} className="font-sans text-[13px] text-white/70 hover:text-white">{label}</a>
          ))}
        </nav>
        <button
          type="button"
          className="-mr-2 flex h-11 w-11 items-center justify-center rounded-md text-white md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((o) => !o)}
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            {open ? <path d="M5 5l12 12M17 5L5 17" /> : <path d="M3 6h16M3 11h16M3 16h16" />}
          </svg>
        </button>
      </div>
      {open && (
        <nav id="mobile-menu" aria-label="Mobile" className="border-t border-white/10 px-4 pb-4 md:hidden">
          <ul>
            {LINKS.map(([label, href]) => (
              <li key={href}>
                <a href={href} onClick={() => setOpen(false)} className="block py-3 font-sans text-base text-white/85 hover:text-white">{label}</a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
