import { useEffect, useRef, useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { PhoneMissed } from 'lucide-react';
import { CALC, PROBLEM } from '../content';
import { asset, formatKc, useInView } from '../lib/hooks';
import Frame from '../components/Frame';
import Reveal from '../components/Reveal';
import { Button, Icon, LoopVideo, SectionHead } from '../components/ui';

function MissedCallVideo() {
  const c = PROBLEM.missedCall;
  return (
    <Reveal anim="scale-in" className="relative min-h-[320px] overflow-hidden rounded-sm border border-white/10 bg-coal sm:min-h-[420px] lg:col-span-7 lg:min-h-0">
      <LoopVideo
        src={asset('media/plumber.mp4')}
        poster={asset('media/plumber-poster.webp')}
        className="absolute inset-0 h-full w-full object-cover object-[60%_center]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/10 to-ink/30" />

      <div className="absolute right-4 top-4 flex items-center gap-2 rounded-sm border border-white/10 bg-ink/70 px-3 py-1.5 backdrop-blur-md">
        <span className="relative flex h-2 w-2">
          <span className="absolute inset-0 rounded-full bg-[#FF4D4D] animate-ping-soft" />
          <span className="relative h-2 w-2 rounded-full bg-[#FF4D4D]" />
        </span>
        <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/80">{c.count}</span>
      </div>

      <div className="absolute bottom-4 left-4 right-4 flex max-w-[340px] items-center gap-3.5 rounded-md border border-white/10 bg-ink/75 p-3.5 backdrop-blur-xl sm:bottom-6 sm:left-6">
        <div className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-full bg-[#FF4D4D]/15 text-[#FF5C5C]">
          <PhoneMissed size={20} className="animate-buzz" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[13.5px] font-semibold text-[#FF6B6B]">{c.label}</span>
            <span className="text-[12px] text-white/45">{c.time}</span>
          </div>
          <p className="mt-0.5 font-display text-[15px] tracking-wide text-white/90">{c.number}</p>
        </div>
      </div>
    </Reveal>
  );
}

function LeakCard({ leak, i }: { leak: (typeof PROBLEM.leaks)[number]; i: number }) {
  return (
    <Reveal
      anim="fade-up"
      delay={i * 110}
      className="group relative overflow-hidden rounded-sm border border-white/10 bg-coal p-5 transition-colors duration-500 hover:border-orange/40 hover:bg-steel sm:p-6"
    >
      <div className="flex items-start gap-4">
        <div className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-sm border border-orange/25 bg-orange/10 text-orange transition-colors duration-500 group-hover:bg-orange group-hover:text-ink">
          <Icon name={leak.icon} size={20} />
        </div>
        <div className="min-w-0">
          <h3 className="font-display text-[19px] font-bold uppercase leading-tight text-white">{leak.title}</h3>
          <p className="mt-1.5 text-[14px] leading-relaxed text-white/60">{leak.text}</p>
        </div>
        <span className="ml-auto font-display text-[12px] text-white/25">0{i + 1}</span>
      </div>
      <span className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-orange transition-transform duration-700 ease-expo group-hover:scale-x-100" />
    </Reveal>
  );
}

function AnimatedNumber({ value, start }: { value: number; start: boolean }) {
  const spring = useSpring(0, { stiffness: 70, damping: 20, mass: 0.9 });
  useEffect(() => {
    if (start) spring.set(value);
  }, [value, start, spring]);
  const text = useTransform(spring, (v) => formatKc(v));
  return <motion.span>{text}</motion.span>;
}

type SliderProps = {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  format: (v: number) => string;
  hint: [string, string];
};

function Slider({ label, value, min, max, step, onChange, format, hint }: SliderProps) {
  const p = ((value - min) / (max - min)) * 100;
  return (
    <label className="block">
      <span className="flex items-end justify-between gap-4">
        <span className="text-[14px] font-medium text-white/70">{label}</span>
        <span className="font-display text-[22px] font-bold leading-none text-orange sm:text-[26px]">{format(value)}</span>
      </span>
      <input
        type="range"
        className="range mt-3"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ ['--p' as string]: `${p}%` }}
      />
      <span className="mt-1 flex justify-between text-[11px] font-medium uppercase tracking-[0.1em] text-white/30">
        <span>{hint[0]}</span>
        <span>{hint[1]}</span>
      </span>
    </label>
  );
}

function Calculator() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { threshold: 0.2 });
  const [missed, setMissed] = useState(3);
  const [check, setCheck] = useState(12000);
  const [conv, setConv] = useState(30);

  const monthly = Math.round((missed * 4.33 * check * (conv / 100)) / 100) * 100;
  const yearly = monthly * 12;

  return (
    <div id="calc" ref={ref} className="relative mt-20 scroll-mt-24 sm:mt-28">
      <Frame show={inView} variant="card" />
      <div className="relative grid gap-10 p-6 sm:p-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14 lg:p-14">
        <div>
          <Reveal as="h3" show={inView} className="font-display text-[clamp(1.8rem,3.6vw,2.9rem)] font-extrabold uppercase leading-[0.95]">
            {CALC.title[0]}
            <span className="text-orange">{CALC.title[1]}</span>
          </Reveal>
          <Reveal as="p" show={inView} delay={120} className="mt-4 max-w-[30rem] text-[15px] text-white/55">
            {CALC.sub}
          </Reveal>
          <Reveal show={inView} delay={220} className="mt-10 space-y-8">
            <Slider label={CALC.missed} value={missed} min={1} max={20} step={1} onChange={setMissed} format={(v) => `${v}`} hint={['1', '20']} />
            <Slider
              label={CALC.check}
              value={check}
              min={2000}
              max={100000}
              step={1000}
              onChange={setCheck}
              format={(v) => `${formatKc(v)} ${CALC.currency}`}
              hint={[`2 000 ${CALC.currency}`, `100 000 ${CALC.currency}`]}
            />
            <Slider label={CALC.conv} value={conv} min={10} max={80} step={5} onChange={setConv} format={(v) => `${v}%`} hint={['10%', '80%']} />
          </Reveal>
        </div>

        <Reveal show={inView} anim="scale-in" delay={300} className="relative flex flex-col justify-between overflow-hidden rounded-sm bg-orange p-7 text-ink sm:p-9">
          <div className="hazard absolute inset-x-0 top-0 h-2 opacity-90" />
          <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/20 blur-3xl" />
          <div className="relative">
            <span className="text-[12px] font-bold uppercase tracking-[0.16em] text-ink/65">{CALC.lossLabel}</span>
            <div className="mt-3 flex flex-wrap items-baseline gap-x-2 font-display text-[clamp(2.6rem,7vw,5.4rem)] font-black leading-[0.9] tracking-tight">
              <AnimatedNumber value={monthly} start={inView} />
              <span className="text-[0.38em] font-extrabold">{CALC.currency}</span>
            </div>
            <p className="mt-3 max-w-[16rem] text-[15px] font-semibold leading-snug">{CALC.resultLabel}</p>
          </div>
          <div className="relative mt-10">
            <div className="flex items-baseline justify-between border-t border-ink/20 pt-4">
              <span className="text-[13px] font-semibold uppercase tracking-[0.12em] text-ink/60">{CALC.yearLabel}</span>
              <span className="font-display text-[26px] font-extrabold sm:text-[30px]">
                <AnimatedNumber value={yearly} start={inView} /> {CALC.currency}
              </span>
            </div>
            <Button href="#contact" variant="dark" size="lg" className="mt-6 w-full">
              {CALC.cta}
            </Button>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

export default function Problem() {
  return (
    <section id="problem" className="relative pb-24 pt-16 sm:pb-32 sm:pt-20">
      <div className="bg-blueprint pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black_20%,transparent_70%)]" />
      <div className="relative mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-12">
        <SectionHead index={PROBLEM.index} eyebrow={PROBLEM.eyebrow} title={PROBLEM.title} lead={PROBLEM.lead} />
        <div className="mt-12 grid gap-4 sm:mt-14 lg:grid-cols-12 lg:gap-5">
          <MissedCallVideo />
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
            {PROBLEM.leaks.map((leak, i) => (
              <LeakCard key={leak.title} leak={leak} i={i} />
            ))}
          </div>
        </div>
        <Calculator />
      </div>
    </section>
  );
}
