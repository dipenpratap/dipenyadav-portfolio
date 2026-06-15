'use client';

import { useEffect, useRef, useState, ReactNode, CSSProperties } from 'react';
import HeroCanvas from './components/HeroCanvas';

const RED = '#c0392b';
const DARK = '#080f1a';
const MAX = '920px';

function Reveal({ children, delay = 0, style }: { children: ReactNode; delay?: number; style?: CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); obs.disconnect(); } }, { threshold: 0.08 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ opacity: v ? 1 : 0, transform: v ? 'translateY(0)' : 'translateY(22px)', transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`, ...style }}>
      {children}
    </div>
  );
}

function CountUp({ n, suffix = '+' }: { n: number; suffix?: string }) {
  const [v, setV] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        obs.disconnect();
        const s = performance.now(), d = 1400;
        const step = (now: number) => {
          const p = Math.min((now - s) / d, 1);
          setV(Math.round((1 - (1 - p) ** 3) * n));
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      }
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [n]);
  return <span ref={ref}>{v}{suffix}</span>;
}

function SectionLabel({ children }: { children: string }) {
  return (
    <Reveal>
      <div style={{ marginBottom: '2.5rem' }}>
        <p style={{ fontFamily: 'Arial', fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', color: RED, textTransform: 'uppercase', marginBottom: 10 }}>{children}</p>
        <div style={{ height: 1, background: `linear-gradient(to right, ${RED}, #e5e7eb 30%, transparent)` }} />
      </div>
    </Reveal>
  );
}

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 72);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <div style={{ fontFamily: 'Georgia, serif' }}>

      {/* ── NAV ── */}
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? 'rgba(8,15,26,0.97)' : 'transparent',
        backdropFilter: scrolled ? 'blur(14px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
        transition: 'background 0.35s, backdrop-filter 0.35s, border-color 0.35s',
      }}>
        <div style={{ maxWidth: MAX, margin: '0 auto', padding: '0.95rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontFamily: 'Arial', fontWeight: 800, color: 'white', fontSize: 15, letterSpacing: '-0.02em' }}>DPY</span>
          <nav style={{ display: 'flex', gap: 32 }}>
            {['Experience', 'Skills', 'Education', 'Certifications', 'Contact'].map(s => (
              <a key={s} href={`#${s.toLowerCase()}`}
                style={{ color: 'rgba(255,255,255,0.55)', fontSize: 12.5, fontFamily: 'Arial', textDecoration: 'none', letterSpacing: '0.01em', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'white')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}
              >{s}</a>
            ))}
          </nav>
        </div>
      </header>

      {/* ── HERO ── */}
      <section style={{ position: 'relative', background: DARK, minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        <HeroCanvas />

        {/* subtle gradient overlay so center content pops */}
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 70% at 40% 50%, rgba(8,15,26,0.55) 0%, transparent 70%)' }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: MAX, margin: '0 auto', padding: '7rem 1.5rem 5rem', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '3rem', flexWrap: 'wrap' }}>

            {/* Left — text content */}
            <div style={{ flex: 1, minWidth: 300 }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 20, padding: '4px 12px', background: 'rgba(192,57,43,0.12)', border: '1px solid rgba(192,57,43,0.3)', borderRadius: 999 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: RED, display: 'inline-block', boxShadow: `0 0 8px ${RED}` }} />
                <span style={{ fontFamily: 'Arial', fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', color: RED, textTransform: 'uppercase' }}>Open to Opportunities</span>
              </div>

              <h1 style={{ fontFamily: 'Arial', fontSize: 'clamp(38px, 6vw, 70px)', fontWeight: 800, color: 'white', letterSpacing: '-0.035em', lineHeight: 1.02, marginBottom: 18 }}>
                Dipendra P.<br />Yadav
              </h1>

              <p style={{ fontFamily: 'Arial', fontSize: 17, fontWeight: 600, color: RED, marginBottom: 18, letterSpacing: '0.01em' }}>
                Senior Data Engineer
              </p>

              <p style={{ color: 'rgba(255,255,255,0.56)', fontSize: 15.5, maxWidth: 480, lineHeight: 1.75, marginBottom: 44 }}>
                Building enterprise-scale data pipelines at Liberty Mutual and shipping live SaaS products as Founder of <a href="https://queuella.com" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,0.85)', textDecoration: 'underline', textDecorationColor: 'rgba(255,255,255,0.3)' }}>Queuella LLC</a>.
              </p>

              {/* Stats */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))', gap: 12, maxWidth: 480, marginBottom: 44 }}>
                {([
                  { n: 6, s: '+', label: 'Years Experience' },
                  { n: 9, s: '+', label: 'AWS Services' },
                  { n: 2, s: '', label: 'Live SaaS Platforms' },
                  { n: 2, s: '', label: 'AWS Certifications' },
                ] as const).map(({ n, s, label }) => (
                  <div key={label} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 10, padding: '1rem 0.9rem' }}>
                    <div style={{ fontFamily: 'Arial', fontSize: 30, fontWeight: 800, color: 'white', letterSpacing: '-0.04em', lineHeight: 1 }}>
                      <CountUp n={n} suffix={s} />
                    </div>
                    <div style={{ fontFamily: 'Arial', fontSize: 10.5, color: 'rgba(255,255,255,0.38)', marginTop: 6, lineHeight: 1.4 }}>{label}</div>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <a href="#experience"
                  style={{ fontFamily: 'Arial', fontSize: 13, fontWeight: 700, padding: '11px 26px', background: RED, color: 'white', borderRadius: 7, textDecoration: 'none', letterSpacing: '0.01em' }}>
                  View Experience
                </a>
                <a href="#contact"
                  style={{ fontFamily: 'Arial', fontSize: 13, fontWeight: 600, padding: '11px 26px', border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.78)', borderRadius: 7, textDecoration: 'none' }}>
                  Contact Me
                </a>
              </div>
            </div>

            {/* Right — headshot */}
            <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
              <div style={{
                width: 260, height: 260, borderRadius: '50%', overflow: 'hidden',
                border: '3px solid rgba(255,255,255,0.12)',
                boxShadow: '0 0 0 1px rgba(192,57,43,0.25), 0 24px 60px rgba(0,0,0,0.55)',
              }}>
                <img src="/headshot.png" alt="Dipendra P. Yadav" width={260} height={260}
                  style={{ objectFit: 'cover', objectPosition: 'center 15%', width: '100%', height: '100%' }} />
              </div>
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontFamily: 'Arial', fontSize: 12.5, fontWeight: 700, color: 'rgba(255,255,255,0.75)', margin: 0 }}>Dipendra P. Yadav</p>
                <p style={{ fontFamily: 'Arial', fontSize: 11, color: 'rgba(255,255,255,0.35)', margin: '3px 0 0' }}>Georgetown, TX</p>
              </div>
            </div>

          </div>
        </div>

        {/* Scroll cue */}
        <div style={{ position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          <span style={{ fontFamily: 'Arial', fontSize: 9, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase' }}>scroll</span>
          <div style={{ width: 1, height: 36, background: 'linear-gradient(to bottom, rgba(255,255,255,0.25), transparent)' }} />
        </div>
      </section>

      {/* ── MAIN ── */}
      <main style={{ background: '#f7f8fa' }}>

        {/* Summary */}
        <section style={{ maxWidth: MAX, margin: '0 auto', padding: '5rem 1.5rem 3.5rem' }}>
          <Reveal>
            <div style={{ borderLeft: `3px solid ${RED}`, paddingLeft: 24 }}>
              <p style={{ fontSize: 17.5, lineHeight: 1.82, color: '#374151', maxWidth: 680 }}>
                Senior Data Engineer with 6+ years delivering enterprise-scale pipelines, ETL/ELT workflows, and cloud analytics platforms in regulated financial services. Proven in PySpark, Hadoop, Kafka, and AWS — from raw ingestion to ML-ready feature stores. Founder of{' '}
                <a href="https://queuella.com" target="_blank" rel="noopener noreferrer" style={{ color: RED, fontWeight: 700, textDecoration: 'none' }}>Queuella LLC</a>,
                {' '}a live multi-tenant SaaS serving customers across the US, Nepal, and India.
              </p>
              <p style={{ fontFamily: 'Arial', fontSize: 12.5, color: '#9ca3af', marginTop: 14 }}>
                Georgetown, TX · dipen.p.yadav@gmail.com · 737-298-5520
              </p>
            </div>
          </Reveal>
        </section>

        {/* Core Competencies */}
        <section style={{ maxWidth: MAX, margin: '0 auto', padding: '2rem 1.5rem 4rem' }}>
          <SectionLabel>Core Competencies</SectionLabel>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 9 }}>
            {COMPETENCIES.map((s, i) => (
              <Reveal key={s} delay={i * 35}>
                <span
                  style={{ display: 'inline-block', padding: '7px 15px', background: 'white', border: '1px solid #e5e7eb', borderRadius: 999, fontSize: 13, fontFamily: 'Arial', color: '#374151', cursor: 'default', transition: 'all 0.22s' }}
                  onMouseEnter={e => { const el = e.currentTarget; el.style.background = RED; el.style.color = 'white'; el.style.borderColor = RED; el.style.transform = 'translateY(-2px)'; }}
                  onMouseLeave={e => { const el = e.currentTarget; el.style.background = 'white'; el.style.color = '#374151'; el.style.borderColor = '#e5e7eb'; el.style.transform = 'translateY(0)'; }}
                >{s}</span>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section id="experience" style={{ maxWidth: MAX, margin: '0 auto', padding: '2rem 1.5rem 5rem' }}>
          <SectionLabel>Professional Experience</SectionLabel>
          <div style={{ position: 'relative', paddingLeft: 32 }}>
            <div style={{ position: 'absolute', left: 6, top: 6, bottom: 0, width: 1, background: 'linear-gradient(to bottom, #c0392b, #e5e7eb 25%)' }} />

            {EXPERIENCE.map((exp, i) => (
              <Reveal key={exp.title + exp.company} delay={i * 60}>
                <div style={{ position: 'relative', marginBottom: '2.5rem' }}>
                  <div style={{
                    position: 'absolute', left: -32, top: 20,
                    width: 13, height: 13, borderRadius: '50%',
                    background: i === 0 ? RED : '#fff',
                    border: `2px solid ${i === 0 ? RED : '#d1d5db'}`,
                    boxShadow: i === 0 ? `0 0 0 4px rgba(192,57,43,0.15)` : 'none',
                    zIndex: 1,
                  }} />
                  <div style={{ background: 'white', borderRadius: 12, padding: '1.4rem 1.6rem', border: '1px solid #eaecf0', boxShadow: '0 1px 4px rgba(0,0,0,0.05)', transition: 'box-shadow 0.2s' }}
                    onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.09)')}
                    onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.05)')}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 8, marginBottom: 2 }}>
                      <div>
                        <h3 style={{ fontFamily: 'Arial', fontWeight: 700, fontSize: 15.5, color: '#111827', margin: 0 }}>{exp.title}</h3>
                        {exp.companyHref
                          ? <a href={exp.companyHref} target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'Arial', fontSize: 13.5, color: RED, fontWeight: 600, textDecoration: 'none', display: 'block', marginTop: 3 }}>{exp.company} ↗</a>
                          : <p style={{ fontFamily: 'Arial', fontSize: 13.5, color: RED, fontWeight: 600, margin: '3px 0 0' }}>{exp.company}</p>
                        }
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
                        {exp.logo && (
                          <img src={exp.logo} alt={exp.company} style={{ height: 28, maxWidth: 90, objectFit: 'contain', opacity: 0.9 }} />
                        )}
                        <span style={{ fontFamily: 'Arial', fontSize: 11.5, color: '#9ca3af', whiteSpace: 'nowrap', paddingTop: 2 }}>{exp.period}</span>
                      </div>
                    </div>
                    <p style={{ fontFamily: 'Arial', fontSize: 11.5, color: '#9ca3af', marginBottom: 14 }}>{exp.location}</p>
                    <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {exp.bullets.map((b, j) => (
                        <li key={j} style={{ display: 'flex', gap: 10 }}>
                          <span style={{ color: RED, marginTop: 7, flexShrink: 0, fontSize: 5 }}>●</span>
                          <span style={{ fontSize: 13.5, lineHeight: 1.68, color: '#374151' }}>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Technical Skills */}
        <section id="skills" style={{ background: 'white', padding: '4rem 0' }}>
          <div style={{ maxWidth: MAX, margin: '0 auto', padding: '0 1.5rem' }}>
            <SectionLabel>Technical Skills</SectionLabel>
            <div style={{ display: 'grid', gap: '1.75rem' }}>
              {SKILLS.map(({ cat, items }, i) => (
                <Reveal key={cat} delay={i * 50}>
                  <div>
                    <p style={{ fontFamily: 'Arial', fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', color: '#9ca3af', textTransform: 'uppercase', marginBottom: 10 }}>{cat}</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                      {items.map(item => (
                        <span key={item} style={{ padding: '4px 11px', background: '#f3f4f6', borderRadius: 5, fontSize: 12.5, fontFamily: 'Arial, monospace', color: '#1f2937', border: '1px solid #e9eaec', transition: 'all 0.18s', cursor: 'default' }}
                          onMouseEnter={e => { e.currentTarget.style.background = '#fff0ee'; e.currentTarget.style.borderColor = '#f9c2bb'; e.currentTarget.style.color = RED; }}
                          onMouseLeave={e => { e.currentTarget.style.background = '#f3f4f6'; e.currentTarget.style.borderColor = '#e9eaec'; e.currentTarget.style.color = '#1f2937'; }}
                        >{item}</span>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Education */}
        <section id="education" style={{ maxWidth: MAX, margin: '0 auto', padding: '5rem 1.5rem' }}>
          <SectionLabel>Education</SectionLabel>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
            {[
              { degree: 'M.S. Data Science', school: 'University of Texas at Austin', year: 'Aug 2025', primary: true },
              { degree: 'B.S. Computer Engineering', school: 'Texas Tech University', year: 'May 2020', primary: false },
            ].map((e, i) => (
              <Reveal key={e.degree} delay={i * 100}>
                <div style={{ background: e.primary ? DARK : 'white', border: `1px solid ${e.primary ? 'transparent' : '#eaecf0'}`, borderRadius: 14, padding: '1.6rem', transition: 'transform 0.2s' }}
                  onMouseEnter={el => (el.currentTarget.style.transform = 'translateY(-3px)')}
                  onMouseLeave={el => (el.currentTarget.style.transform = 'translateY(0)')}
                >
                  <div style={{ width: 36, height: 36, borderRadius: 9, background: e.primary ? RED : '#f3f4f6', marginBottom: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Arial', fontWeight: 800, fontSize: 15, color: e.primary ? 'white' : '#9ca3af' }}>
                    {e.degree[0]}
                  </div>
                  <p style={{ fontFamily: 'Arial', fontWeight: 700, fontSize: 15, color: e.primary ? 'white' : '#111827', margin: '0 0 5px' }}>{e.degree}</p>
                  <p style={{ fontFamily: 'Arial', fontSize: 13, color: e.primary ? 'rgba(255,255,255,0.55)' : '#6b7280', margin: '0 0 10px' }}>{e.school}</p>
                  <span style={{ fontFamily: 'Arial', fontSize: 11, fontWeight: 700, color: RED }}>{e.year}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Certifications */}
        <section id="certifications" style={{ background: 'white', padding: '1rem 0 5rem' }}>
          <div style={{ maxWidth: MAX, margin: '0 auto', padding: '0 1.5rem' }}>
            <SectionLabel>Licenses & Certifications</SectionLabel>

            {/* AWS Badges — featured with official Credly images */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 36 }}>
              {AWS_CERTS.map((cert, i) => (
                <Reveal key={cert.name} delay={i * 80}>
                  <a href={cert.href} target="_blank" rel="noopener noreferrer"
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, padding: '1.8rem 1.5rem', background: DARK, borderRadius: 14, textDecoration: 'none', transition: 'transform 0.2s, box-shadow 0.2s', boxShadow: '0 2px 10px rgba(0,0,0,0.22)' }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 10px 28px rgba(0,0,0,0.35)'; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.22)'; }}
                  >
                    <img src={cert.img} alt={cert.name} width={110} height={110} style={{ objectFit: 'contain' }} />
                    <div style={{ textAlign: 'center' }}>
                      <p style={{ fontFamily: 'Arial', fontWeight: 700, fontSize: 13.5, color: 'white', margin: '0 0 5px', lineHeight: 1.4 }}>{cert.name}</p>
                      <p style={{ fontFamily: 'Arial', fontSize: 11, color: 'rgba(255,255,255,0.4)', margin: '0 0 8px' }}>Amazon Web Services · {cert.issued}</p>
                      <span style={{ display: 'inline-block', padding: '2px 9px', background: 'rgba(192,57,43,0.18)', border: '1px solid rgba(192,57,43,0.35)', borderRadius: 999, fontFamily: 'Arial', fontSize: 10, fontWeight: 700, color: RED, letterSpacing: '0.07em', textTransform: 'uppercase' }}>Expired</span>
                    </div>
                  </a>
                </Reveal>
              ))}
            </div>

            {/* All other LinkedIn-verified certifications */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(265px, 1fr))', gap: 10 }}>
              {OTHER_CERTS.map((cert, i) => (
                <Reveal key={cert.name} delay={i * 35}>
                  <div style={{ padding: '13px 16px', background: '#f8f9fa', border: '1px solid #eaecf0', borderRadius: 9, transition: 'all 0.2s', cursor: 'default' }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'white'; e.currentTarget.style.borderColor = '#d1d5db'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = '#f8f9fa'; e.currentTarget.style.borderColor = '#eaecf0'; e.currentTarget.style.boxShadow = 'none'; }}
                  >
                    <span style={{ fontFamily: 'Arial', fontSize: 10, fontWeight: 700, color: RED, textTransform: 'uppercase', letterSpacing: '0.09em' }}>{cert.issuer}</span>
                    <p style={{ fontFamily: 'Arial', fontSize: 13, color: '#111827', margin: '4px 0 0', fontWeight: 600, lineHeight: 1.42 }}>{cert.name}</p>
                    <p style={{ fontFamily: 'Arial', fontSize: 11, color: '#9ca3af', margin: '4px 0 0' }}>Issued {cert.issued}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" style={{ background: DARK, padding: '6rem 0' }}>
          <div style={{ maxWidth: MAX, margin: '0 auto', padding: '0 1.5rem', textAlign: 'center' }}>
            <Reveal>
              <p style={{ fontFamily: 'Arial', fontSize: 10, letterSpacing: '0.14em', color: RED, textTransform: 'uppercase', marginBottom: 14 }}>Get In Touch</p>
              <h2 style={{ fontFamily: 'Arial', fontSize: 'clamp(30px, 5vw, 50px)', fontWeight: 800, color: 'white', letterSpacing: '-0.03em', marginBottom: 16 }}>
                Open to New Opportunities
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.50)', fontSize: 15.5, maxWidth: 460, margin: '0 auto 44px', lineHeight: 1.75 }}>
                Available for senior data engineering, staff engineering, and founding engineer roles.
              </p>
              <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                <a href="mailto:dipen.p.yadav@gmail.com" style={{ fontFamily: 'Arial', fontSize: 13.5, fontWeight: 700, padding: '13px 30px', background: RED, color: 'white', borderRadius: 8, textDecoration: 'none' }}>
                  dipen.p.yadav@gmail.com
                </a>
                <a href="https://github.com/dipenpratap" target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'Arial', fontSize: 13.5, fontWeight: 600, padding: '13px 30px', border: '1px solid rgba(255,255,255,0.18)', color: 'rgba(255,255,255,0.75)', borderRadius: 8, textDecoration: 'none' }}>
                  GitHub ↗
                </a>
                <a href="https://queuella.com" target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'Arial', fontSize: 13.5, fontWeight: 600, padding: '13px 30px', border: '1px solid rgba(255,255,255,0.18)', color: 'rgba(255,255,255,0.75)', borderRadius: 8, textDecoration: 'none' }}>
                  queuella.com ↗
                </a>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <footer style={{ background: '#050a10', borderTop: '1px solid rgba(255,255,255,0.05)', padding: '1.5rem 0' }}>
        <div style={{ maxWidth: MAX, margin: '0 auto', padding: '0 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontFamily: 'Arial', fontSize: 11.5, color: 'rgba(255,255,255,0.28)' }}>© {new Date().getFullYear()} Dipendra P. Yadav</span>
          <span style={{ fontFamily: 'Arial', fontSize: 11.5, color: 'rgba(255,255,255,0.28)' }}>Georgetown, TX</span>
        </div>
      </footer>
    </div>
  );
}

const COMPETENCIES = [
  'Enterprise Data Pipeline Design',
  'PySpark / Hadoop / Hive / MapReduce',
  'ETL & ELT Workflow Architecture',
  'AWS Cloud Architecture (9+ services)',
  'Real-Time & Event-Driven Systems',
  'Data Modeling & Warehousing',
  'AI / LLM Integration (Bedrock, OpenAI)',
  'Data Governance & Quality Frameworks',
  'Square API & Third-Party Integration',
  'Full-Stack SaaS Development',
];

const EXPERIENCE = [
  {
    title: 'Senior Data Engineer',
    company: 'Liberty Mutual Insurance Company',
    companyHref: undefined,
    logo: undefined,
    location: 'Remote | Austin, TX',
    period: 'Jan 2021 – Present',
    bullets: [
      'Architected end-to-end enterprise data pipelines using PySpark, Hadoop, and Hive on AWS EMR, processing multi-TB insurance datasets to power analytics, reporting, and ML workloads.',
      'Spearheaded migration of core insurance data systems to AWS (S3, EMR, Glue, Redshift), designing ETL/ELT workflows that reduced data processing errors and testing cycles by 85%.',
      'Implemented data quality and governance frameworks — schema validation, null-rate monitoring, row-count reconciliation, and data lineage tracking — ensuring audit compliance in regulated environments.',
      'Designed star-schema and dimensional data models supporting Tableau and Power BI dashboards across underwriting, claims, and finance functions.',
      'Partnered with data scientists to build ML-ready feature pipelines ensuring point-in-time correctness and feature consistency between training and inference environments.',
      'Led and mentored a cross-functional Agile team, driving monthly insurance reports and data extracts with structured stakeholder reporting.',
      'Optimized Spark job performance via partition tuning, broadcast joins, data skew mitigation, and strategic caching — reducing runtimes and cluster costs for mission-critical batch workloads.',
    ],
  },
  {
    title: 'Founder & Engineering Lead',
    company: 'Queuella — Service Operations SaaS',
    companyHref: 'https://queuella.com',
    logo: '/queuella-logo.png',
    location: 'Georgetown, TX',
    period: '2024 – Present',
    bullets: [
      'Architected and directed development of a production multi-tenant SaaS platform (Next.js 16 / TypeScript / PostgreSQL) with a native Swift iOS companion app serving paying customers across the US, Nepal, and India.',
      'Designed a multi-service AWS backend: S3, SQS, SNS/SES, Cognito (including zero-data-loss migration from Clerk), ECS, Bedrock, and EventBridge.',
      'Integrated Square API across five surfaces (Catalog, Team Members, Labor, Locations, Payments) enabling automatic real-time sync of a client\'s full business profile on integration.',
      'Built a native iOS app (Swift, MVVM) with SSE streaming, APNs push notifications, Keychain auth, and deep link routing — published and serving live customers.',
      'Delivered full Stripe billing infrastructure: subscriptions, webhooks, usage-based billing, and multi-location pricing with a custom superadmin pricing editor.',
      'Established a production-grade testing strategy: Vitest unit suites across 8 domains and 20+ Playwright E2E suites covering auth, kiosk privacy, scheduling, and billing.',
    ],
  },
  {
    title: 'Engineering Lead — Business Automation',
    company: 'iBrows Studio | Multi-Location Beauty Brand',
    companyHref: undefined,
    logo: '/ibrows-logo.svg',
    location: 'Georgetown, TX',
    period: '2024 – Present',
    bullets: [
      'Built a fully automated multi-location payroll processing system (Python, AWS Lambda, EventBridge cron) eliminating all manual payroll processing across bi-monthly pay cycles.',
      'Engineered a Square API pipeline consuming Labor API (timecards + break deduction), Team Members API, and Payments API — transforming raw data into fully computed payroll using pandas with per-employee rules.',
      'Built a timezone-aware timecard anomaly detection engine flagging clock-in/out violations, oversized shifts, and probable auto-clockouts with configurable grace windows.',
      'Delivered a three-tier email notification system: branded HTML pay stubs, timecard exception reports, and a full manager summary with payroll totals and outstanding issues.',
    ],
  },
  {
    title: 'Data Engineer',
    company: 'Cognizant Technology Solutions',
    companyHref: undefined,
    logo: undefined,
    location: 'Austin, TX',
    period: 'Aug 2020 – Dec 2020',
    bullets: [
      'Built a real-time pipeline for high-volume social media stream analysis using Apache Kafka and Spark Streaming, end-to-end from ingestion to output sink.',
      'Conducted large-scale COVID-19 data analysis on AWS EMR producing statistical insights and predictive model inputs from multi-source healthcare datasets.',
      'Developed Power BI dashboards for call center analytics, integrating multiple data sources and delivering BI reporting for business stakeholders.',
    ],
  },
  {
    title: 'Student Research Assistant',
    company: 'Texas Tech University',
    companyHref: undefined,
    logo: undefined,
    location: 'Lubbock, TX',
    period: 'Apr 2019 – May 2020',
    bullets: [
      'Automated data extraction and processing pipelines from large-scale system log files using Python and Bash scripting, improving data accuracy and enabling structured analytical workflows.',
    ],
  },
];

const AWS_CERTS = [
  {
    name: 'AWS Certified Developer – Associate',
    issued: 'Oct 2020',
    img: 'https://images.credly.com/size/340x340/images/b9feab85-1a43-4f6c-99a5-631b88d5461b/image.png',
    href: 'https://www.credly.com/badges/94b6ba0a-48d6-47ca-8534-e91e02425f40',
  },
  {
    name: 'AWS Certified Cloud Practitioner',
    issued: 'Oct 2020',
    img: 'https://images.credly.com/size/340x340/images/00634f82-b07f-4bbd-a6bb-53de397fc3a6/image.png',
    href: 'https://www.credly.com/badges/cc8ce929-47ab-4cc2-b1b8-6868b4a40d46',
  },
];

const OTHER_CERTS = [
  { name: 'Academy Accreditation — Databricks Lakehouse Fundamentals', issuer: 'Databricks', issued: 'Oct 2022' },
  { name: 'Advances in Deep Learning', issuer: 'UT Austin', issued: 'Jan 2026' },
  { name: 'Design Principles & Causal Inference', issuer: 'UT Austin', issued: 'Dec 2024' },
  { name: 'Data Structures & Algorithms', issuer: 'UT Austin', issued: 'Dec 2024' },
  { name: 'Optimization', issuer: 'UT Austin', issued: 'May 2025' },
  { name: 'Deep Learning', issuer: 'UT Austin', issued: 'Aug 2024' },
  { name: 'Data Science for Health Discovery and Innovation', issuer: 'UT Austin', issued: 'May 2024' },
  { name: 'Foundations of Regression and Predictive Modeling', issuer: 'UT Austin', issued: 'May 2024' },
  { name: 'Machine Learning', issuer: 'edX', issued: 'Dec 2021' },
  { name: 'Probability and Simulation-Based Inference', issuer: 'edX', issued: 'Nov 2021' },
];

const SKILLS = [
  { cat: 'Languages', items: ['Python', 'SQL', 'TypeScript', 'Swift', 'R', 'SAS', 'Bash', 'PowerShell'] },
  { cat: 'Big Data', items: ['PySpark', 'Apache Spark', 'Hadoop', 'Hive', 'MapReduce', 'Kafka', 'Spark Streaming'] },
  { cat: 'Cloud / AWS', items: ['S3', 'EMR', 'Glue', 'Redshift', 'SQS', 'SNS', 'SES', 'Cognito', 'ECS', 'Lambda', 'Bedrock', 'EventBridge', 'Cost Explorer'] },
  { cat: 'Databases', items: ['PostgreSQL', 'Oracle Autonomous DB', 'MySQL', 'MongoDB', 'Cassandra'] },
  { cat: 'APIs / Integration', items: ['Square API', 'Stripe', 'REST API Design', 'OpenAI API'] },
  { cat: 'AI / LLM', items: ['AWS Bedrock', 'OpenAI API', 'GitHub Copilot', 'LLM Integration', 'AI-Assisted Engineering'] },
  { cat: 'ETL / ELT', items: ['Apache Airflow', 'Informatica', 'Talend', 'dbt', 'pandas', 'Event-Driven Pipelines'] },
  { cat: 'Data Quality', items: ['Great Expectations', 'Schema Validation', 'Anomaly Detection', 'Data Lineage', 'Governance Frameworks'] },
  { cat: 'ML Frameworks', items: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'Statistical Modeling', 'Predictive Analytics'] },
  { cat: 'BI / Viz', items: ['Tableau', 'Power BI', 'Recharts', 'Oracle Analytics Cloud'] },
  { cat: 'DevOps / Other', items: ['Docker', 'Kubernetes', 'AWS ECS', 'Git', 'Agile/Scrum', 'Vitest', 'Playwright'] },
];
