import Image from 'next/image';
import type { ReactNode } from 'react';
import { HeroCanvasLazy } from './components/HeroCanvasLazy';
import { Interactions } from './components/Interactions';
import { Nav } from './components/Nav';
import { EmailLink } from './components/EmailLink';
import { PhoneMockup, PosMockup, QueueMockup } from './components/Mockups';
import { AWS_CERTS, BUILT, COMPETENCIES, EXPERIENCE, HIGHLIGHTS, NAV_STATS, OTHER_CERTS, SKILLS } from './data';

const WRAP = 'mx-auto w-full max-w-[960px] px-4 sm:px-6';
const BTN_PRIMARY = 'inline-block rounded-lg bg-brand-deep px-6 py-3 font-sans text-[13.5px] font-bold text-white hover:bg-[#a93226]';
const BTN_GHOST = 'inline-block rounded-lg border border-white/30 px-6 py-3 font-sans text-[13.5px] font-semibold text-white/90 hover:border-white/60';

function SectionLabel({ children }: { children: string }) {
  return (
    <div data-reveal className="mb-10">
      <h2 className="mb-2.5 font-sans text-[11px] font-bold tracking-[0.14em] text-brand-deep uppercase">{children}</h2>
      <div className="h-px bg-gradient-to-r from-brand-deep via-gray-200 to-transparent" />
    </div>
  );
}

function Card({ children, i = 0, className = '' }: { children: ReactNode; i?: number; className?: string }) {
  return (
    <div data-reveal style={{ '--i': i } as React.CSSProperties} className={className}>
      {children}
    </div>
  );
}

export default function Home() {
  return (
    <>
      <a href="#main" className="fixed top-2 left-2 z-[60] -translate-y-16 rounded-md bg-white px-4 py-2 font-sans text-sm font-bold text-ink focus:translate-y-0">
        Skip to content
      </a>
      <Interactions />
      <Nav />

      {/* HERO */}
      <section id="top" data-glow className="relative flex min-h-svh items-center overflow-hidden bg-ink">
        <HeroCanvasLazy />
        <div className="hero-glow" aria-hidden="true" />
        <div className={`${WRAP} relative z-10 pt-28 pb-20`}>
          <div className="flex flex-col-reverse items-start gap-12 md:flex-row md:items-center md:justify-between">
            <div className="min-w-0 flex-1">
              <p className="mb-5 font-sans text-[11px] font-bold tracking-[0.14em] text-brand uppercase">Founder &amp; engineer</p>
              <h1 className="mb-5 font-sans text-[clamp(32px,6vw,58px)] leading-[1.05] font-extrabold tracking-tight text-white">
                I build the software that service businesses run on.
              </h1>
              <p className="mb-3 max-w-[34rem] text-base leading-relaxed text-white/75">
                Founder of <a href="https://queuella.com" target="_blank" rel="noopener noreferrer" className="text-white underline decoration-white/40 underline-offset-4">Queuella</a>, a multi-tenant queue, booking and POS platform with a native iOS app.
                Senior data engineer at Liberty Mutual, building regulated, enterprise-scale pipelines since 2021.
              </p>
              <p className="mb-9 font-sans text-[13px] text-white/60">Available for select roles &amp; advisory.</p>

              <dl className="mb-9 grid max-w-[34rem] grid-cols-2 gap-3 sm:grid-cols-4">
                {NAV_STATS.map((s) => (
                  <div key={s.label} className="flex flex-col rounded-xl border border-white/10 bg-white/5 p-3.5">
                    <dt className="order-2 mt-1.5 font-sans text-[11px] leading-snug text-white/65">{s.label}</dt>
                    <dd className="font-sans text-xl leading-none font-extrabold sm:text-2xl tracking-tight text-white">{s.value}</dd>
                  </div>
                ))}
              </dl>

              <div className="flex flex-wrap gap-3">
                <a data-magnetic="0.3" href="#queuella" className={BTN_PRIMARY}>See the Queuella case study</a>
                <a data-magnetic="0.3" href="#contact" className={BTN_GHOST}>Get in touch</a>
              </div>
            </div>

            <div className="flex shrink-0 flex-col items-center gap-3.5 self-center">
              <div className="size-44 overflow-hidden rounded-full border-[3px] border-white/15 shadow-[0_0_0_1px_rgba(192,57,43,0.35),0_24px_60px_rgba(0,0,0,0.55)] sm:size-56 md:size-64">
                <Image
                  src="/headshot.jpg"
                  alt="Dipendra P. Yadav"
                  width={900}
                  height={1200}
                  priority
                  sizes="(min-width: 768px) 256px, (min-width: 640px) 224px, 176px"
                  className="size-full object-cover object-[50%_18%]"
                />
              </div>
              <p className="font-sans text-[12.5px] font-bold text-white/80">Dipendra P. Yadav <span className="font-normal text-white/60">· Georgetown, TX</span></p>
            </div>
          </div>
        </div>
      </section>

      <main id="main">
        {/* QUEUELLA CASE STUDY */}
        <section id="queuella" className="bg-ink py-20 text-white">
          <div className={WRAP}>
            <div data-reveal className="mb-10">
              <p className="mb-2.5 font-sans text-[11px] font-bold tracking-[0.14em] text-brand uppercase">Case study · 2024 – Present</p>
              <div className="h-px bg-gradient-to-r from-brand via-white/15 to-transparent" />
            </div>

            <Card>
              <h2 className="mb-5 max-w-[40rem] font-sans text-[clamp(26px,4.5vw,40px)] leading-tight font-extrabold tracking-tight">
                Queuella: one platform for the waiting room, the booking calendar and the till.
              </h2>
            </Card>

            <div className="mb-14 grid gap-8 md:grid-cols-2">
              <Card i={1}>
                <h3 className="mb-2 font-sans text-[11px] font-bold tracking-[0.12em] text-brand uppercase">The problem</h3>
                <p className="leading-relaxed text-white/75">
                  Small service businesses juggle a paper list, a booking tool, a card reader and a messaging app. Guests do not know how long they will wait, and staff re-key the same
                  information in three places. Most tools also assume one country and one tax regime.
                </p>
              </Card>
              <Card i={2}>
                <h3 className="mb-2 font-sans text-[11px] font-bold tracking-[0.12em] text-brand uppercase">What I did</h3>
                <p className="leading-relaxed text-white/75">
                  Designed, built and operate the whole thing: product, web platform, native iOS app, payments, cloud infrastructure and the security program. One engineer, shipped in production.
                </p>
              </Card>
            </div>

            <div className="mb-14 grid items-start gap-5 md:grid-cols-[1.3fr_1fr_0.7fr]">
              <Card i={0}><div data-tilt><QueueMockup /></div></Card>
              <Card i={1}><div data-tilt><PosMockup /></div></Card>
              <Card i={2}><div data-tilt><PhoneMockup /></div></Card>
            </div>
            <p className="-mt-10 mb-14 font-sans text-[11px] text-white/55">Illustrative UI built for this page. No real customer data.</p>

            <h3 className="sr-only">What was built</h3>
            <ul className="mb-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {BUILT.map((b, i) => (
                <li key={b.title}>
                  <Card i={i % 3} className="h-full">
                    <div data-tilt className="h-full rounded-xl border border-white/10 bg-white/5 p-5">
                      <h4 className="mb-2 font-sans text-[15px] font-bold">{b.title}</h4>
                      <p className="text-[14px] leading-relaxed text-white/70">{b.body}</p>
                    </div>
                  </Card>
                </li>
              ))}
            </ul>

            <Card>
              <h3 className="mb-4 font-sans text-[11px] font-bold tracking-[0.12em] text-brand uppercase">Engineering highlights</h3>
              <ul className="mb-10 space-y-3">
                {HIGHLIGHTS.map((h) => (
                  <li key={h} className="flex gap-3 text-[14.5px] leading-relaxed text-white/80">
                    <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-brand" />
                    {h}
                  </li>
                ))}
              </ul>
              <a data-magnetic="0.3" href="https://queuella.com" target="_blank" rel="noopener noreferrer" className={BTN_PRIMARY}>
                Visit queuella.com <span aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span>
              </a>
            </Card>
          </div>
        </section>

        {/* COMPETENCIES */}
        <section className={`${WRAP} pt-20 pb-12`} aria-label="Core competencies">
          <SectionLabel>Core Competencies</SectionLabel>
          <ul className="flex flex-wrap gap-2.5">
            {COMPETENCIES.map((s, i) => (
              <li key={s} data-reveal style={{ '--i': i } as React.CSSProperties}>
                <span className="inline-block rounded-full border border-gray-200 bg-white px-4 py-1.5 font-sans text-[13px] text-gray-700 transition-colors hover:border-brand-deep hover:bg-brand-deep hover:text-white">{s}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* EXPERIENCE */}
        <section id="experience" className={`${WRAP} py-12`}>
          <SectionLabel>Professional Experience</SectionLabel>
          <p data-reveal className="mb-8 max-w-[40rem] text-[15px] leading-relaxed text-gray-700">
            Founder first, with a data-engineering career underneath it: years of building pipelines that regulated businesses can audit.
          </p>
          <ol className="relative space-y-8 pl-8 before:absolute before:top-2 before:bottom-0 before:left-[6px] before:w-px before:bg-gradient-to-b before:from-brand-deep before:to-gray-200">
            {EXPERIENCE.map((exp, i) => (
              <li key={exp.title + exp.company} className="relative">
                <span aria-hidden="true" className={`absolute top-5 -left-8 size-[13px] rounded-full border-2 ${i === 0 ? 'border-brand-deep bg-brand-deep ring-4 ring-brand-deep/15' : 'border-gray-300 bg-white'}`} />
                <Card>
                  <article className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                    <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <h3 className="font-sans text-[16px] font-bold text-gray-900">{exp.title}</h3>
                        {'href' in exp ? (
                          <a href={exp.href} target="_blank" rel="noopener noreferrer" className="mt-0.5 block font-sans text-[13.5px] font-semibold text-brand-deep">{exp.company} ↗</a>
                        ) : (
                          <p className="mt-0.5 font-sans text-[13.5px] font-semibold text-brand-deep">{exp.company}</p>
                        )}
                      </div>
                      <p className="font-sans text-[12px] text-gray-600">{exp.period}<br /><span className="text-gray-500">{exp.location}</span></p>
                    </div>
                    <ul className="space-y-2">
                      {exp.bullets.map((b) => (
                        <li key={b} className="flex gap-2.5 text-[14px] leading-relaxed text-gray-700">
                          <span aria-hidden="true" className="mt-2.5 size-1 shrink-0 rounded-full bg-brand-deep" />{b}
                        </li>
                      ))}
                    </ul>
                  </article>
                </Card>
              </li>
            ))}
          </ol>
        </section>

        {/* SKILLS */}
        <section id="skills" className="bg-white py-16">
          <div className={WRAP}>
            <SectionLabel>Technical Skills</SectionLabel>
            <div className="grid gap-7">
              {SKILLS.map(({ cat, items }, i) => (
                <Card key={cat} i={i % 4}>
                  <h3 className="mb-2.5 font-sans text-[11px] font-bold tracking-[0.1em] text-gray-600 uppercase">{cat}</h3>
                  <ul className="flex flex-wrap gap-2">
                    {items.map((item) => (
                      <li key={item} className="rounded-md border border-gray-200 bg-gray-100 px-2.5 py-1 font-sans text-[12.5px] text-gray-800">{item}</li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* EDUCATION */}
        <section id="education" className={`${WRAP} py-20`}>
          <SectionLabel>Education</SectionLabel>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { degree: 'M.S. Data Science', school: 'University of Texas at Austin', year: 'Aug 2025', primary: true },
              { degree: 'B.S. Computer Engineering', school: 'Texas Tech University', year: 'May 2020', primary: false },
            ].map((e, i) => (
              <Card key={e.degree} i={i}>
                <div className={`rounded-2xl border p-6 ${e.primary ? 'border-transparent bg-ink text-white' : 'border-gray-200 bg-white'}`}>
                  <p className="mb-1 font-sans text-[15px] font-bold">{e.degree}</p>
                  <p className={`mb-3 font-sans text-[13px] ${e.primary ? 'text-white/70' : 'text-gray-600'}`}>{e.school}</p>
                  <span className={`font-sans text-[12px] font-bold ${e.primary ? 'text-brand' : 'text-brand-deep'}`}>{e.year}</span>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* CERTIFICATIONS */}
        <section id="certifications" className="bg-white pt-4 pb-20">
          <div className={WRAP}>
            <SectionLabel>Certifications &amp; Coursework</SectionLabel>
            <div className="mb-9 grid gap-4 sm:grid-cols-2">
              {AWS_CERTS.map((c, i) => (
                <Card key={c.name} i={i}>
                  <a href={c.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 rounded-2xl bg-ink p-5 shadow-md transition-transform hover:-translate-y-1">
                    <Image src={c.img} alt="" width={72} height={72} className="size-[72px] shrink-0 object-contain" />
                    <span>
                      <span className="block font-sans text-[13.5px] leading-snug font-bold text-white">{c.name}<span className="sr-only"> (opens in a new tab)</span></span>
                      <span className="mt-1 block font-sans text-[12px] text-white/65">Amazon Web Services · {c.issued}</span>
                    </span>
                  </a>
                </Card>
              ))}
            </div>
            <ul className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
              {OTHER_CERTS.map((c, i) => (
                <li key={c.name}>
                  <Card i={i % 3}>
                    <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3">
                      <span className="font-sans text-[10.5px] font-bold tracking-widest text-brand-deep uppercase">{c.issuer}</span>
                      <p className="mt-1 font-sans text-[13px] leading-snug font-semibold text-gray-900">{c.name}</p>
                      <p className="mt-1 font-sans text-[11.5px] text-gray-600">Issued {c.issued}</p>
                    </div>
                  </Card>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="bg-ink py-24">
          <div className={`${WRAP} text-center`}>
            <Card>
              <h2 className="mb-4 font-sans text-[clamp(28px,5vw,46px)] leading-tight font-extrabold tracking-tight text-white">Let&rsquo;s talk.</h2>
              <p className="mx-auto mb-10 max-w-[28rem] leading-relaxed text-white/70">
                Available for select roles and advisory: product-minded engineering, data platforms and early-stage SaaS.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <EmailLink className={`${BTN_PRIMARY} break-all`} />
                <a data-magnetic="0.35" href="https://github.com/dipenpratap" target="_blank" rel="noopener noreferrer" className={BTN_GHOST}>GitHub ↗</a>
                <a data-magnetic="0.35" href="https://queuella.com" target="_blank" rel="noopener noreferrer" className={BTN_GHOST}>queuella.com ↗</a>
              </div>
            </Card>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/5 bg-[#050a10] py-6">
        <div className={`${WRAP} flex flex-wrap justify-between gap-2 font-sans text-[12px] text-white/60`}>
          <span>© {new Date().getFullYear()} Dipendra P. Yadav</span>
          <span>Georgetown, TX</span>
        </div>
      </footer>
    </>
  );
}
