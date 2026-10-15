import { useRef } from 'react';
import { CheckCheck, MousePointer2, Search, Star } from 'lucide-react';
import { useInView } from '../lib/hooks';
import { SERVICES } from '../content';
import Reveal from '../components/Reveal';
import { Icon, SectionHead } from '../components/ui';

const V = SERVICES.visuals;

function StarsVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { threshold: 0.6 });
  return (
    <div ref={ref} className="flex items-center gap-3">
      <div className="relative flex">
        {[0, 1, 2, 3, 4].map((s) => (
          <Star key={s} size={20} className="text-white/15" />
        ))}
        <div
          className={`absolute inset-0 flex ${inView ? '[animation:star-fill_1.8s_var(--ease-expo)_both]' : 'opacity-0'}`}
          style={{ animationDelay: '400ms' }}
        >
          {[0, 1, 2, 3, 4].map((s) => (
            <Star key={s} size={20} className="fill-hivis text-hivis" />
          ))}
        </div>
      </div>
      <span className="font-display text-[20px] font-bold text-white">{V.rating}</span>
      <span className="text-[12px] text-white/45">{V.reviews}</span>
    </div>
  );
}

function Visual({ kind }: { kind: string }) {
  switch (kind) {
    case 'site':
      return (
        <div className="relative overflow-hidden rounded-sm border border-white/10 bg-ink/60">
          <div className="flex items-center gap-1.5 border-b border-white/10 px-3 py-2">
            <span className="h-1.5 w-1.5 rounded-full bg-white/25" />
            <span className="h-1.5 w-1.5 rounded-full bg-white/25" />
            <span className="h-1.5 w-1.5 rounded-full bg-white/25" />
            <span className="ml-2 h-2 w-24 rounded-full bg-white/10" />
          </div>
          <div className="flex items-center justify-between gap-3 p-3">
            <div className="flex-1 space-y-1.5">
              <span className="block h-2 w-4/5 rounded-full bg-white/20" />
              <span className="block h-2 w-3/5 rounded-full bg-white/10" />
            </div>
            <span className="relative rounded-sm bg-orange px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-ink transition-transform duration-300 group-hover:scale-95">
              Вызвать
              <MousePointer2
                size={16}
                className="absolute -bottom-3 -right-2 fill-white text-ink transition-transform duration-700 ease-expo group-hover:-translate-x-2 group-hover:-translate-y-2"
              />
            </span>
          </div>
        </div>
      );
    case 'push':
      return (
        <div className="flex items-start gap-3 rounded-md border border-white/10 bg-ink/60 p-3">
          <span className="grid h-8 w-8 flex-shrink-0 place-items-center rounded-full bg-ok/15 text-ok">
            <Icon name="message" size={15} />
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between text-[10.5px] text-white/45">
              <span className="font-semibold uppercase tracking-wider">{V.push.app}</span>
              <span>сейчас</span>
            </div>
            <p className="mt-0.5 text-[12.5px] font-medium leading-snug text-white/85">{V.push.text}</p>
          </div>
        </div>
      );
    case 'reply':
      return (
        <div className="flex justify-end">
          <div className="max-w-[85%] rounded-md rounded-br-none border border-orange/30 bg-orange/15 px-3.5 py-2.5">
            <p className="text-[12.5px] font-medium leading-snug text-white/90">{V.reply}</p>
            <span className="mt-1 flex items-center justify-end gap-1 text-[10px] text-orange-soft">
              авто <CheckCheck size={12} />
            </span>
          </div>
        </div>
      );
    case 'board':
      return (
        <div className="grid grid-cols-3 gap-2">
          {V.board.map((col, i) => (
            <div key={col.label} className="rounded-sm border border-white/10 bg-ink/60 p-2.5">
              <span className="block text-[10px] font-semibold uppercase tracking-wider text-white/45">{col.label}</span>
              <span className={`mt-1 flex items-center gap-1.5 font-display text-[22px] font-bold ${i === 0 ? 'text-orange' : 'text-white/85'}`}>
                {col.count}
                {i === 0 && (
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inset-0 rounded-full bg-orange animate-ping-soft" />
                    <span className="relative h-1.5 w-1.5 rounded-full bg-orange" />
                  </span>
                )}
              </span>
            </div>
          ))}
        </div>
      );
    case 'search':
      return (
        <div className="space-y-2">
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-ink/60 px-3.5 py-2 text-[12.5px] text-white/80">
            <Search size={13} className="text-white/40" />
            {V.search}
            <span className="h-3.5 w-px bg-orange animate-caret" />
          </div>
          <div className="flex items-center gap-2 rounded-sm border-l-2 border-orange bg-white/[0.04] px-3 py-2">
            <span className="text-[12px] font-semibold text-white/85">Ваша фирма</span>
            <span className="ml-auto flex items-center gap-1 text-[11px] text-hivis">
              <Star size={11} className="fill-current" /> {V.rating}
            </span>
          </div>
        </div>
      );
    case 'stars':
      return <StarsVisual />;
    default:
      return null;
  }
}

export default function Services() {
  return (
    <section id="services" className="relative py-24 sm:py-32">
      <div className="pointer-events-none absolute -left-40 top-40 h-[420px] w-[420px] rounded-full bg-orange/10 blur-[120px]" />
      <div className="relative mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-12">
        <SectionHead index={SERVICES.index} eyebrow={SERVICES.eyebrow} title={SERVICES.title} lead={SERVICES.lead} />
        <div className="mt-14 grid gap-4 sm:mt-16 md:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {SERVICES.items.map((item, i) => (
            <Reveal
              key={item.title}
              anim="fade-up"
              delay={(i % 3) * 110}
              className="group relative flex flex-col overflow-hidden rounded-sm border border-white/10 bg-coal p-6 transition-colors duration-500 hover:border-orange/40 sm:p-7"
            >
              <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-orange to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="flex items-start justify-between">
                <div className="grid h-12 w-12 place-items-center rounded-sm border border-orange/30 bg-orange/10 text-orange transition-colors duration-500 group-hover:bg-orange group-hover:text-ink">
                  <Icon name={item.icon} size={22} />
                </div>
                <span className="font-display text-[13px] text-white/25">0{i + 1}</span>
              </div>
              <h3 className="mt-6 font-display text-[22px] font-bold uppercase leading-[1.05] text-white">{item.title}</h3>
              <p className="mt-3 text-[14.5px] leading-relaxed text-white/60">{item.text}</p>
              <div className="mt-auto pt-6">
                <Visual kind={item.visual} />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
