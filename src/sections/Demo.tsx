import { useEffect, useRef, useState, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BatteryFull, Camera, Check, Menu, MessageCircle, Send, Signal, Star, Wifi } from 'lucide-react';
import { DEMO } from '../content';
import { asset, useInView } from '../lib/hooks';
import Reveal from '../components/Reveal';
import { SectionHead } from '../components/ui';

// phases: 0 empty form, 1 typing, 2 phone+photo, 3 send, 4 push on master phone, 5 client success, 6 lead list
const DUR = [1000, 1700, 900, 1200, 1900, 1700, 3000];
const STEP_OF_PHASE = [0, 0, 0, 0, 1, 2, 3];
const STEP_DUR = [0, 1, 2, 3].map((s) => DUR.reduce((sum, d, p) => (STEP_OF_PHASE[p] === s ? sum + d : sum), 0));
const BRAND_BLUE = '#1E6BFF';

function useDemo(active: boolean) {
  const [phase, setPhase] = useState(0);
  const [cycle, setCycle] = useState(0);
  const [chars, setChars] = useState(0);

  useEffect(() => {
    if (!active) return;
    const t = window.setTimeout(() => {
      const next = (phase + 1) % DUR.length;
      setPhase(next);
      if (next === 0) setCycle((c) => c + 1);
    }, DUR[phase]);
    return () => window.clearTimeout(t);
  }, [phase, active]);

  useEffect(() => {
    const full = DEMO.site.typed.length;
    if (phase === 0) {
      setChars(0);
      return;
    }
    if (phase !== 1) {
      setChars(full);
      return;
    }
    const id = window.setInterval(() => setChars((c) => Math.min(c + 1, full)), (DUR[1] - 250) / full);
    return () => window.clearInterval(id);
  }, [phase]);

  return { phase, cycle, chars };
}

function StatusBar({ dark = false }: { dark?: boolean }) {
  return (
    <div className={`relative z-20 flex items-center justify-between px-6 pt-3 text-[11px] font-semibold ${dark ? 'text-ink' : 'text-white'}`}>
      <span>{DEMO.lock.time}</span>
      <span className="flex items-center gap-1">
        <Signal size={11} strokeWidth={2.5} />
        <Wifi size={11} strokeWidth={2.5} />
        <BatteryFull size={14} strokeWidth={2} />
      </span>
    </div>
  );
}

function Phone({ children, label, shake = false, glow = false }: { children: ReactNode; label: string; shake?: boolean; glow?: boolean }) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <div
          className={`absolute -inset-8 rounded-[3.5rem] bg-orange/30 blur-3xl transition-opacity duration-700 ${glow ? 'opacity-100' : 'opacity-0'}`}
          aria-hidden
        />
        <div
          className={`relative h-[520px] w-[256px] rounded-[2.7rem] border border-white/15 bg-[#0d0d0f] p-[9px] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9)] ${
            shake ? 'animate-phone-shake' : ''
          }`}
        >
          <div className="relative h-full w-full overflow-hidden rounded-[2.15rem] bg-ink">
            <div className="absolute left-1/2 top-2 z-30 h-[22px] w-[82px] -translate-x-1/2 rounded-full bg-black" />
            {children}
          </div>
        </div>
      </div>
      <span className="mt-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/50">{label}</span>
    </div>
  );
}

function ClientScreen({ phase, chars }: { phase: number; chars: number }) {
  const s = DEMO.site;
  return (
    <div className="absolute inset-0 bg-[#F4F1EC] text-ink">
      <StatusBar dark />
      <div className="mt-2 flex items-center justify-between px-4 py-2">
        <span className="flex items-center gap-1.5">
          <span className="grid h-5 w-5 place-items-center rounded-[4px] text-white" style={{ background: BRAND_BLUE }}>
            <span className="text-[9px] font-black">K</span>
          </span>
          <span className="text-[11px] font-bold">{s.brand}</span>
        </span>
        <Menu size={14} />
      </div>
      <div className="relative mx-3 h-[118px] overflow-hidden rounded-xl">
        <img src={asset('media/plumber.webp')} alt="" className="absolute inset-0 h-full w-full object-cover object-[70%_center]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <span className="absolute right-2 top-2 flex items-center gap-0.5 rounded-full bg-white/90 px-1.5 py-0.5 text-[9px] font-bold">
          <Star size={9} className="fill-hivis text-hivis" /> {s.rating}
        </span>
        <p className="absolute bottom-2.5 left-3 right-3 text-[14px] font-extrabold leading-[1.1] text-white">{s.headline}</p>
      </div>

      <div className="mx-3 mt-3 rounded-xl bg-white p-3 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.25)]">
        <span className="text-[9px] font-bold uppercase tracking-wider text-black/45">{s.field1}</span>
        <div className={`mt-1 flex h-8 items-center rounded-md border px-2.5 text-[11.5px] font-medium ${phase === 1 ? 'border-[#1E6BFF]' : 'border-black/10'}`}>
          {s.typed.slice(0, chars)}
          {phase === 1 && <span className="ml-px h-3.5 w-px bg-ink animate-caret" />}
        </div>
        <span className="mt-2.5 block text-[9px] font-bold uppercase tracking-wider text-black/45">{s.field2}</span>
        <div className="mt-1 flex h-8 items-center rounded-md border border-black/10 px-2.5 text-[11.5px] font-medium">
          <span className={`transition-opacity duration-300 ${phase >= 2 ? 'opacity-100' : 'opacity-0'}`}>{s.phone}</span>
        </div>
        <div className={`mt-2.5 flex items-center gap-1.5 text-[10.5px] font-medium text-black/60 transition-all duration-500 ${phase >= 2 ? 'opacity-100' : 'translate-y-1 opacity-0'}`}>
          <span className="grid h-6 w-6 place-items-center rounded bg-black/5">
            <Camera size={12} />
          </span>
          {s.photo}
          <Check size={12} className="ml-auto text-[#18A957]" strokeWidth={3} />
        </div>
        <div
          className={`relative mt-3 flex h-9 items-center justify-center overflow-hidden rounded-md text-[11px] font-bold uppercase tracking-wider text-white transition-transform duration-200 ${
            phase === 3 ? 'scale-95' : 'scale-100'
          }`}
          style={{ background: BRAND_BLUE }}
        >
          {s.button}
          {phase === 3 && <span className="absolute inset-0 animate-ping-soft rounded-md bg-white/40" />}
        </div>
      </div>

      <AnimatePresence>
        {phase >= 5 && (
          <motion.div
            key="ok"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#F4F1EC]/95 px-6 text-center backdrop-blur-sm"
          >
            <motion.span
              initial={{ scale: 0.4, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 320, damping: 18, delay: 0.1 }}
              className="grid h-16 w-16 place-items-center rounded-full bg-[#18A957] text-white shadow-[0_12px_30px_-8px_rgba(24,169,87,0.6)]"
            >
              <Check size={32} strokeWidth={3} />
            </motion.span>
            <p className="mt-5 text-[17px] font-extrabold">{s.success}</p>
            <p className="mt-1.5 text-[12px] leading-snug text-black/55">{s.successText}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MasterScreen({ phase }: { phase: number }) {
  const p = DEMO.push;
  return (
    <div className="absolute inset-0">
      <img src={asset('media/hero.webp')} alt="" className="absolute inset-0 h-full w-full scale-110 object-cover object-[70%_center] opacity-50 blur-[2px]" />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/30 via-ink/40 to-ink/90" />
      <StatusBar />
      <div className="relative z-10 mt-10 text-center">
        <p className="font-display text-[64px] font-semibold leading-none text-white">{DEMO.lock.time}</p>
        <p className="mt-2 text-[12px] font-medium text-white/75">{DEMO.lock.date}</p>
      </div>

      <AnimatePresence>
        {phase >= 4 && phase < 6 && (
          <motion.div
            key="push"
            initial={{ opacity: 0, y: -40, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 300, damping: 24 }}
            className="absolute inset-x-3 top-[168px] z-10 rounded-2xl border border-white/20 bg-white/15 p-3 backdrop-blur-xl"
          >
            <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-white/70">
              <span className="grid h-5 w-5 place-items-center rounded-md bg-[#25D366] text-white">
                <MessageCircle size={12} strokeWidth={2.5} />
              </span>
              {p.app}
              <span className="ml-auto normal-case tracking-normal text-white/50">{p.when}</span>
            </div>
            <p className="mt-2 text-[13px] font-bold text-white">{p.title}</p>
            <p className="mt-0.5 text-[12px] leading-snug text-white/85">{p.text}</p>
            <p className="mt-1 text-[11.5px] font-semibold text-orange-soft">{p.phone}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {phase === 6 && (
          <motion.div
            key="list"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 z-20 bg-ink"
          >
            <StatusBar />
            <div className="px-4 pt-6">
              <p className="font-display text-[24px] font-bold uppercase text-white">{DEMO.list.title}</p>
              <div className="mt-3 flex gap-1.5 text-[9.5px] font-semibold uppercase tracking-wider">
                <span className="rounded-sm bg-orange px-2 py-1 text-ink">Новые 1</span>
                <span className="rounded-sm bg-white/10 px-2 py-1 text-white/70">В работе 1</span>
                <span className="rounded-sm bg-white/10 px-2 py-1 text-white/70">Готово 2</span>
              </div>
              <div className="mt-4 space-y-2">
                {DEMO.list.items.map((it, i) => (
                  <motion.div
                    key={it.t}
                    initial={i === 0 ? { opacity: 0, y: -16, scale: 0.96 } : { opacity: 0 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: i === 0 ? 0.35 : 0.1 + i * 0.06, type: 'spring', stiffness: 260, damping: 22 }}
                    className={`rounded-lg border p-2.5 ${i === 0 ? 'border-orange bg-orange/10 shadow-[0_0_24px_-6px_rgba(255,107,31,0.7)]' : 'border-white/10 bg-white/[0.04]'}`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="truncate text-[12px] font-semibold text-white">{it.t}</span>
                      <span
                        className={`flex-shrink-0 rounded-sm px-1.5 py-0.5 text-[9px] font-bold uppercase ${
                          i === 0 ? 'bg-orange text-ink' : it.s === 'Готово' ? 'bg-ok/15 text-ok' : 'bg-white/10 text-white/70'
                        }`}
                      >
                        {it.s}
                      </span>
                    </div>
                    <span className="mt-0.5 block text-[10.5px] text-white/45">{it.p}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Connector({ phase }: { phase: number }) {
  const sending = phase === 3;
  return (
    <div className="relative mt-[230px] h-14 w-14 flex-shrink-0">
      <span className="absolute left-0 right-0 top-1/2 border-t-2 border-dashed border-white/15" />
      <span
        className={`absolute left-1/2 top-1/2 grid h-10 w-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border transition-colors duration-300 ${
          sending ? 'border-orange bg-orange text-ink' : 'border-white/15 bg-ink text-white/50'
        }`}
      >
        <Send size={16} />
      </span>
      {sending && (
        <motion.span
          className="absolute top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-orange shadow-[0_0_14px_4px_rgba(255,107,31,0.7)]"
          initial={{ left: '-30%' }}
          animate={{ left: '120%' }}
          transition={{ duration: 0.9, ease: 'easeInOut', delay: 0.2 }}
        />
      )}
    </div>
  );
}

export default function Demo() {
  const ref = useRef<HTMLDivElement>(null);
  const onScreen = useInView(ref, { once: false, threshold: 0.25 });
  const { phase, cycle, chars } = useDemo(onScreen);
  const step = STEP_OF_PHASE[phase];

  return (
    <section id="how" className="relative overflow-hidden border-y border-white/[0.06] bg-coal py-24 sm:py-32">
      <div className="bg-blueprint pointer-events-none absolute inset-0 opacity-70" />
      <div className="pointer-events-none absolute right-[-10%] top-1/3 h-[520px] w-[520px] rounded-full bg-orange/10 blur-[140px]" />
      <div className="relative mx-auto grid max-w-[1320px] gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-10 lg:px-12">
        <div className="lg:col-span-5">
          <SectionHead index={DEMO.index} eyebrow={DEMO.eyebrow} title={DEMO.title} lead={DEMO.lead} />
          <ol className="mt-10 space-y-2.5">
            {DEMO.steps.map((st, i) => {
              const active = i === step;
              return (
                <Reveal
                  as="li"
                  key={st.title}
                  delay={200 + i * 90}
                  className={`relative overflow-hidden rounded-sm border p-4 transition-colors duration-500 sm:p-5 ${
                    active ? 'border-orange/50 bg-white/[0.05]' : 'border-white/[0.08] bg-transparent'
                  }`}
                >
                  <div className="flex gap-4">
                    <span
                      className={`grid h-8 w-8 flex-shrink-0 place-items-center rounded-sm font-display text-[14px] font-bold transition-colors duration-500 ${
                        active ? 'bg-orange text-ink' : 'bg-white/[0.07] text-white/50'
                      }`}
                    >
                      {i + 1}
                    </span>
                    <div>
                      <p className={`font-display text-[17px] font-bold uppercase transition-colors duration-500 ${active ? 'text-white' : 'text-white/60'}`}>{st.title}</p>
                      <p className={`mt-1 text-[14px] leading-relaxed transition-colors duration-500 ${active ? 'text-white/70' : 'text-white/40'}`}>{st.text}</p>
                    </div>
                  </div>
                  {active && onScreen && (
                    <span
                      key={`${cycle}-${i}`}
                      className="absolute bottom-0 left-0 h-[2px] w-full origin-left bg-orange"
                      style={{ animation: `bar-grow ${STEP_DUR[i]}ms linear both` }}
                    />
                  )}
                </Reveal>
              );
            })}
          </ol>
        </div>

        <div ref={ref} className="lg:col-span-7 lg:self-center">
          <Reveal
            anim="scale-in"
            delay={150}
            className="relative mx-auto w-full overflow-hidden [--s:0.54] min-[400px]:[--s:0.6] sm:[--s:0.92] md:[--s:1]"
            style={{ height: 'calc(560px * var(--s))' }}
          >
            <div className="absolute left-1/2 top-0 flex w-[600px] origin-top items-start justify-between" style={{ transform: 'translateX(-50%) scale(var(--s))' }}>
              <Phone label={DEMO.clientLabel}>
                <ClientScreen phase={phase} chars={chars} />
              </Phone>
              <Connector phase={phase} />
              <Phone label={DEMO.masterLabel} shake={phase === 4} glow={phase === 4 || phase === 6}>
                <MasterScreen phase={phase} />
              </Phone>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
