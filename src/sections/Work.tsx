import { ArrowUpRight, Lock, Phone, Star } from 'lucide-react';
import { WORK } from '../content';
import { asset } from '../lib/hooks';
import Reveal from '../components/Reveal';
import { SectionHead } from '../components/ui';

type Item = (typeof WORK.items)[number];

const ACCENTS: Record<string, string> = {
  plumber: '#1E6BFF',
  electrician: '#F5B400',
  bathroom: '#1F9D74',
};

/** A light client site in miniature; scrolls on hover (and on its own on touch screens). */
function MiniSite({ item }: { item: Item }) {
  const accent = ACCENTS[item.image];
  const img = asset(`media/${item.image}.webp`);
  return (
    <div className="bg-[#F4F1EC] text-ink">
      <div className="flex items-center justify-between px-4 py-3">
        <span className="flex items-center gap-2">
          <span className="grid h-6 w-6 place-items-center rounded-[5px] text-[11px] font-black text-white" style={{ background: accent }}>
            {item.brand[0]}
          </span>
          <span className="text-[12.5px] font-bold">{item.brand}</span>
        </span>
        <span className="flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold text-white" style={{ background: accent }}>
          <Phone size={10} /> 24/7
        </span>
      </div>
      <div className="relative mx-3 h-[200px] overflow-hidden rounded-xl">
        <img src={img} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <p className="text-[19px] font-extrabold leading-[1.1] text-white">{item.headline}</p>
          <span className="mt-3 inline-flex rounded-md px-3 py-2 text-[10.5px] font-bold uppercase tracking-wider text-white" style={{ background: accent }}>
            {item.cta}
          </span>
        </div>
      </div>
      <div className="flex flex-wrap gap-1.5 px-3 pt-3">
        {item.services.map((s) => (
          <span key={s} className="rounded-full border border-black/10 bg-white px-2.5 py-1 text-[10.5px] font-semibold">
            {s}
          </span>
        ))}
      </div>
      <p className="px-4 pt-5 text-[11px] font-bold uppercase tracking-wider text-black/45">{WORK.mini.works}</p>
      <div className="grid grid-cols-3 gap-1.5 px-3 pt-2">
        {['20%_30%', '60%_50%', '90%_70%'].map((pos) => (
          <div key={pos} className="aspect-square overflow-hidden rounded-md">
            <img src={img} alt="" loading="lazy" className="h-full w-full scale-150 object-cover" style={{ objectPosition: pos.replace('_', ' ') }} />
          </div>
        ))}
      </div>
      <div className="mx-3 mt-4 rounded-xl bg-white p-3.5">
        <div className="flex items-center gap-1.5">
          {[0, 1, 2, 3, 4].map((s) => (
            <Star key={s} size={12} className="fill-hivis text-hivis" />
          ))}
          <span className="ml-1 text-[12px] font-bold">{item.rating}</span>
          <span className="ml-auto text-[10px] font-semibold uppercase tracking-wider text-black/40">{WORK.mini.reviews}</span>
        </div>
        <div className="mt-2.5 space-y-1.5">
          <span className="block h-2 w-full rounded-full bg-black/[0.07]" />
          <span className="block h-2 w-4/5 rounded-full bg-black/[0.07]" />
        </div>
      </div>
      <div className="mx-3 mb-4 mt-3 rounded-xl p-3.5 text-white" style={{ background: accent }}>
        <p className="text-[12px] font-bold uppercase tracking-wider">{WORK.mini.form}</p>
        <div className="mt-2.5 space-y-1.5">
          <span className="block h-7 rounded-md bg-white/25" />
          <span className="block h-7 rounded-md bg-white/25" />
          <span className="flex h-8 items-center justify-center rounded-md bg-white text-[10.5px] font-bold uppercase tracking-wider" style={{ color: accent }}>
            {WORK.mini.send}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function Work() {
  return (
    <section id="work" className="relative py-24 sm:py-32">
      <div className="relative mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHead index={WORK.index} eyebrow={WORK.eyebrow} title={WORK.title} lead={WORK.lead} />
        </div>
        <div className="mt-14 grid gap-6 sm:mt-16 md:grid-cols-3 lg:gap-7">
          {WORK.items.map((item, i) => (
            <Reveal key={item.brand} anim="fade-up" delay={i * 130} className="group">
              <div className="relative overflow-hidden rounded-md border border-white/10 bg-steel shadow-[0_30px_60px_-30px_rgba(0,0,0,0.9)] transition-all duration-500 ease-expo group-hover:-translate-y-1.5 group-hover:border-orange/40">
                <div className="flex items-center gap-2 border-b border-white/10 px-3.5 py-2.5">
                  <span className="h-2 w-2 rounded-full bg-[#FF5F57]" />
                  <span className="h-2 w-2 rounded-full bg-[#FEBC2E]" />
                  <span className="h-2 w-2 rounded-full bg-[#28C840]" />
                  <span className="ml-2 flex min-w-0 flex-1 items-center gap-1.5 rounded-sm bg-white/[0.06] px-2.5 py-1 text-[11px] text-white/55">
                    <Lock size={10} className="flex-shrink-0" />
                    <span className="truncate">{item.url}</span>
                  </span>
                </div>
                <div className="relative h-[360px] overflow-hidden">
                  <div className="transition-transform duration-[2600ms] ease-in-out group-hover:-translate-y-[47%] max-lg:animate-peek" style={{ animationDelay: `${i * 1.3}s` }}>
                    <MiniSite item={item} />
                  </div>
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/30 to-transparent" />
                </div>
              </div>
              <div className="mt-5 flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-display text-[21px] font-bold uppercase leading-tight text-white">{item.brand}</h3>
                  <p className="mt-1 text-[13.5px] text-white/50">
                    {item.trade} · {item.city}
                  </p>
                </div>
                <a
                  href="#contact"
                  className="flex flex-shrink-0 items-center gap-1.5 rounded-sm border border-white/15 px-3.5 py-2.5 text-[11.5px] font-semibold uppercase tracking-[0.08em] text-white/80 transition-colors hover:border-orange hover:bg-orange hover:text-ink"
                >
                  {WORK.button}
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
