import { useRef } from 'react';
import { ABOUT } from '../content';
import { asset, useInView } from '../lib/hooks';
import Frame from '../components/Frame';
import Reveal from '../components/Reveal';
import { Button, LoopVideo, SectionHead } from '../components/ui';

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { threshold: 0.15 });

  return (
    <section id="about" className="relative py-16 sm:py-24">
      <div className="mx-auto max-w-[1440px] px-3 sm:px-5">
        <div ref={ref} className="relative overflow-hidden rounded-sm bg-coal lg:min-h-[700px]">
          <div className="relative aspect-[4/3] sm:aspect-[16/9] lg:absolute lg:inset-0 lg:aspect-auto">
            <LoopVideo src={asset('media/about.mp4')} poster={asset('media/about.webp')} className="absolute inset-0 h-full w-full object-cover object-[78%_center]" />
            <div className="absolute inset-0 hidden bg-[linear-gradient(90deg,#111113_0%,rgba(17,17,19,0.92)_30%,rgba(17,17,19,0.35)_58%,rgba(17,17,19,0)_74%)] lg:block" />
            <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-coal to-transparent lg:hidden" />
            <div className="absolute inset-0 bg-[radial-gradient(40%_50%_at_0%_100%,rgba(255,107,31,0.18),transparent)]" />
          </div>

          <Frame show={inView} />

          <div className="relative z-10 px-6 pb-14 pt-2 sm:px-12 lg:flex lg:min-h-[700px] lg:max-w-[680px] lg:flex-col lg:justify-center lg:px-16 lg:py-20">
            <SectionHead index={ABOUT.index} eyebrow={ABOUT.eyebrow} title={ABOUT.title} />
            <Reveal as="p" delay={300} className="mt-6 max-w-[34rem] text-[16px] leading-relaxed text-white/70 sm:text-[17px]">
              {ABOUT.text}
            </Reveal>

            <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-white/10 bg-white/10 sm:grid-cols-4">
              {ABOUT.stats.map((s, i) => (
                <Reveal key={s.label} delay={420 + i * 90} className="bg-coal/95 p-4 backdrop-blur sm:p-5">
                  <p className="font-display text-[34px] font-black leading-none text-orange sm:text-[40px]">
                    {s.value}
                    {s.unit && <span className="ml-1 font-sans text-[13px] font-semibold text-white/80">{s.unit}</span>}
                  </p>
                  <p className="mt-2 text-[12.5px] leading-snug text-white/55">{s.label}</p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={800} className="mt-9">
              <Button href="#contact" size="lg">
                {ABOUT.cta}
              </Button>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
