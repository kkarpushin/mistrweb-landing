import { useRef, useState } from 'react';
import { motion, useMotionValueEvent, useScroll, useSpring } from 'framer-motion';
import { PROCESS } from '../content';
import Reveal from '../components/Reveal';
import { SectionHead } from '../components/ui';

export default function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 55%'] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const [reached, setReached] = useState(0);

  useMotionValueEvent(progress, 'change', (v) => {
    const n = PROCESS.steps.length;
    setReached(Math.min(n, Math.floor(v * n + 0.35)));
  });

  return (
    <section id="process" className="relative py-24 sm:py-32">
      <div className="relative mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-12">
        <SectionHead index={PROCESS.index} eyebrow={PROCESS.eyebrow} title={PROCESS.title} />

        <div ref={ref} className="relative mt-14 sm:mt-20">
          {/* rail: vertical on mobile, horizontal on desktop */}
          <div className="absolute bottom-0 left-[15px] top-0 w-px bg-white/10 lg:bottom-auto lg:left-0 lg:right-0 lg:top-[15px] lg:h-px lg:w-auto">
            <motion.div className="absolute inset-0 hidden origin-left bg-orange lg:block" style={{ scaleX: progress }} />
            <motion.div className="absolute inset-0 origin-top bg-orange lg:hidden" style={{ scaleY: progress }} />
          </div>

          <ol className="relative grid gap-10 lg:grid-cols-4 lg:gap-8">
            {PROCESS.steps.map((s, i) => {
              const on = i < reached;
              return (
                <li key={s.title} className="relative pl-12 lg:pl-0 lg:pt-14">
                  <span
                    className={`absolute left-0 top-0 grid h-[31px] w-[31px] place-items-center rounded-sm border font-display text-[13px] font-bold transition-all duration-500 ${
                      on ? 'border-orange bg-orange text-ink shadow-[0_0_24px_-2px_rgba(255,107,31,0.7)]' : 'border-white/20 bg-ink text-white/50'
                    }`}
                  >
                    {i + 1}
                  </span>
                  <Reveal delay={i * 100}>
                    <span className={`text-[12px] font-bold uppercase tracking-[0.16em] transition-colors duration-500 ${on ? 'text-orange' : 'text-white/40'}`}>{s.day}</span>
                    <h3 className="mt-2 font-display text-[22px] font-bold uppercase leading-tight text-white">{s.title}</h3>
                    <p className="mt-2.5 max-w-[22rem] text-[14.5px] leading-relaxed text-white/55">{s.text}</p>
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
