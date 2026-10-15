'use client';

import { useEffect } from 'react';

const RADIUS = 90;

/**
 * One controller for all pointer effects (magnetic pull, card tilt, hero glow) and
 * scroll reveals. Transform/opacity only, rAF-batched, passive listeners.
 * Pointer effects are skipped for coarse pointers and reduced motion.
 */
export function Interactions() {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let cleanupReveal: (() => void) | undefined;
    const revealEls = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    if (reduced) {
      revealEls.forEach((el) => el.setAttribute('data-in', ''));
    } else {
      const io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) {
              e.target.setAttribute('data-in', '');
              io.unobserve(e.target);
            }
          }
        },
        { threshold: 0.08, rootMargin: '0px 0px -4% 0px' },
      );
      revealEls.forEach((el) => io.observe(el));
      cleanupReveal = () => io.disconnect();
    }

    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (reduced || !fine) return () => cleanupReveal?.();

    const magnets = Array.from(document.querySelectorAll<HTMLElement>('[data-magnetic]'));
    const tilts = Array.from(document.querySelectorAll<HTMLElement>('[data-tilt]'));
    const glowHost = document.querySelector<HTMLElement>('[data-glow]');
    const glow = glowHost?.querySelector<HTMLElement>('.hero-glow') ?? null;

    let px = 0, py = 0, raf = 0;
    const pulled = new Set<HTMLElement>();

    const frame = () => {
      raf = 0;
      for (const el of magnets) {
        const r = el.getBoundingClientRect();
        if (r.bottom < -RADIUS || r.top > innerHeight + RADIUS) continue;
        const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
        const dx = px - cx, dy = py - cy;
        const dist = Math.hypot(dx, dy);
        const reach = Math.max(r.width, r.height) / 2 + RADIUS;
        if (dist < reach) {
          const k = Number(el.dataset.magnetic) || 0.35;
          el.style.transition = 'transform 0.12s ease-out';
          el.style.transform = `translate3d(${dx * k}px, ${dy * k}px, 0)`;
          pulled.add(el);
        } else if (pulled.has(el)) {
          el.style.transition = 'transform 0.6s cubic-bezier(0.34, 1.9, 0.5, 1)';
          el.style.transform = '';
          pulled.delete(el);
        }
      }
      if (glowHost && glow) {
        const r = glowHost.getBoundingClientRect();
        const inside = px >= r.left && px <= r.right && py >= r.top && py <= r.bottom;
        if (inside) {
          glowHost.setAttribute('data-glow-active', '');
          glow.style.transform = `translate3d(${px - r.left}px, ${py - r.top}px, 0)`;
        } else glowHost.removeAttribute('data-glow-active');
      }
    };
    const onMove = (e: PointerEvent) => {
      px = e.clientX; py = e.clientY;
      if (!raf) raf = requestAnimationFrame(frame);
    };

    const tiltCleanups = tilts.map((el) => {
      const move = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        el.style.transition = 'transform 0.1s ease-out';
        el.style.transform = `perspective(900px) rotateX(${(-y * 5).toFixed(2)}deg) rotateY(${(x * 6).toFixed(2)}deg) translate3d(0,-2px,0)`;
      };
      const leave = () => {
        el.style.transition = 'transform 0.5s ease-out';
        el.style.transform = '';
      };
      el.addEventListener('pointermove', move, { passive: true });
      el.addEventListener('pointerleave', leave, { passive: true });
      return () => { el.removeEventListener('pointermove', move); el.removeEventListener('pointerleave', leave); };
    });

    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      cleanupReveal?.();
      window.removeEventListener('pointermove', onMove);
      tiltCleanups.forEach((c) => c());
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return null;
}
