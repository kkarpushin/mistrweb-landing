import { TAPES } from '../content';

function Track({ items }: { items: string[] }) {
  return (
    <div className="flex shrink-0 items-center">
      {items.map((t) => (
        <span key={t} className="flex items-center gap-7 pl-7">
          <span className="whitespace-nowrap">{t}</span>
          <span className="h-2 w-2 rotate-45 bg-current opacity-70" />
        </span>
      ))}
    </div>
  );
}

/** Two crossing site tapes: trades on the orange one, promises on the dark one. */
export default function Tapes() {
  return (
    <section aria-hidden className="relative z-20 -mt-10 h-[150px] overflow-hidden sm:-mt-14 sm:h-[200px]">
      <div className="absolute -left-[8%] -right-[8%] top-[22%] rotate-[2.4deg] border-y border-white/10 bg-steel">
        <div className="flex w-max animate-marquee-rev py-3 font-display text-[15px] font-semibold uppercase tracking-[0.12em] text-white/80 sm:py-3.5 sm:text-[18px]">
          <Track items={TAPES.b} />
          <Track items={TAPES.b} />
          <Track items={TAPES.b} />
          <Track items={TAPES.b} />
        </div>
      </div>
      <div className="absolute -left-[8%] -right-[8%] top-[40%] -rotate-[3deg] shadow-[0_20px_50px_-10px_rgba(0,0,0,0.7)]">
        <div className="hazard h-[7px]" />
        <div className="flex w-max animate-marquee bg-orange py-2.5 font-display text-[22px] font-black uppercase tracking-wide text-ink sm:py-3 sm:text-[30px]">
          <Track items={TAPES.a} />
          <Track items={TAPES.a} />
        </div>
        <div className="hazard h-[7px]" />
      </div>
    </section>
  );
}
