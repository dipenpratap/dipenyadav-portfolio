/** Illustrative UI built in markup. No real customer data; names are generic placeholders. */

const ROWS = [
  ['1', 'Guest A', 'Haircut', 'Now serving'],
  ['2', 'Guest B', 'Consultation', '~6 min'],
  ['3', 'Guest C', 'Follow-up', '~14 min'],
  ['4', 'Guest D', 'Walk-in', '~22 min'],
] as const;

export function QueueMockup() {
  return (
    <div role="img" aria-label="Illustration of a live queue board with four generic guests and estimated waits" className="rounded-xl border border-white/10 bg-ink-2 p-4 font-sans">
      <div className="mb-3 flex items-center justify-between text-[11px] text-white/60">
        <span className="font-bold tracking-widest uppercase">Live queue</span>
        <span className="flex items-center gap-1.5"><span className="pulse size-1.5 rounded-full bg-brand" />Live</span>
      </div>
      <ul className="space-y-2">
        {ROWS.map(([n, name, svc, eta], i) => (
          <li key={n} className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-[12px] ${i === 0 ? 'bg-brand-deep/25 ring-1 ring-brand/40' : 'bg-white/5'}`}>
            <span className="flex size-6 items-center justify-center rounded-full bg-white/10 text-[11px] font-bold text-white">{n}</span>
            <span className="flex-1"><span className="block font-semibold text-white">{name}</span><span className="text-white/60">{svc}</span></span>
            <span className={i === 0 ? 'font-bold text-brand' : 'text-white/70'}>{eta}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function PosMockup() {
  return (
    <div role="img" aria-label="Illustration of a point-of-sale checkout offering card and QR payment" className="rounded-xl border border-white/10 bg-ink-2 p-4 font-sans">
      <p className="mb-3 text-[11px] font-bold tracking-widest text-white/60 uppercase">Checkout</p>
      <div className="space-y-1.5 text-[12px] text-white/80">
        <div className="flex justify-between"><span>Service</span><span>$40.00</span></div>
        <div className="flex justify-between"><span>Tax</span><span>$3.30</span></div>
        <div className="flex justify-between border-t border-white/10 pt-2 text-sm font-bold text-white"><span>Total</span><span>$43.30</span></div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2 text-[12px] font-semibold">
        <span className="rounded-lg bg-brand-deep px-3 py-2.5 text-center text-white">Card reader</span>
        <span className="flex items-center justify-center gap-2 rounded-lg bg-white/10 px-3 py-2.5 text-white">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" aria-hidden="true"><path d="M1 1h5v5H1zM8 1h5v5H8zM1 8h5v5H1zM9 9h2v2H9zM12 8h1v1h-1zM8 12h2v1H8z" /></svg>QR
        </span>
      </div>
    </div>
  );
}

export function PhoneMockup() {
  return (
    <div role="img" aria-label="Illustration of the native iPhone staff app showing the next guest and an action button" className="mx-auto w-40 rounded-[26px] border-4 border-white/15 bg-ink-2 p-3 font-sans">
      <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-white/20" />
      <p className="text-[10px] font-bold tracking-widest text-white/60 uppercase">Next up</p>
      <p className="mt-1 text-sm font-bold text-white">Guest A</p>
      <p className="text-[11px] text-white/60">Haircut · 30 min</p>
      <div className="mt-4 space-y-2 text-center text-[11px] font-bold">
        <span className="block rounded-lg bg-brand-deep py-2 text-white">Start service</span>
        <span className="block rounded-lg bg-white/10 py-2 text-white">Message guest</span>
      </div>
    </div>
  );
}
