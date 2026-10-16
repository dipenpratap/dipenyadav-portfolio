'use client';

import { useSyncExternalStore } from 'react';

// Assembled in the browser so the address never appears in the server HTML that scrapers read.
const ADDRESS = ['dipen', ['queuella', 'com'].join('.')].join('@');
const subscribe = () => () => {};

export function EmailLink({ className }: { className?: string }) {
  const address = useSyncExternalStore(subscribe, () => ADDRESS, () => null);

  return (
    <a
      data-magnetic="0.35"
      href={address ? `mailto:${address}` : '#contact'}
      className={className}
      aria-label={address ? `Email ${address}` : 'Email Dipendra'}
    >
      {address ?? 'Email me'}
    </a>
  );
}
