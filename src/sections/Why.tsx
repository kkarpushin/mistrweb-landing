import { WHY } from '../content';
import Reveal from '../components/Reveal';
import { Icon } from '../components/ui';

export default function Why() {
  return (
    <section className="relative border-y border-white/[0.06] bg-coal">
      <div className="mx-auto max-w-[1320px] px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
        <Reveal as="h2" className="text-center font-display text-[clamp(2rem,4.6vw,3.4rem)] font-extrabold uppercase leading-none">
          {WHY.title[0]}
          <span className="text-orange">{WHY.title[1]}</span>
          <span className="text-orange">?</span>
        </Reveal>
        <div className="mt-12 grid gap-px overflow-hidden rounded-sm border border-dashed border-white/15 sm:grid-cols-2 lg:grid-cols-4">
          {WHY.items.map((item, i) => (
            <Reveal key={item.title} delay={i * 110} className="group relative bg-coal p-6 transition-colors duration-500 hover:bg-steel sm:p-8">
              <span className="grid h-12 w-12 place-items-center rounded-sm border border-orange/40 text-orange transition-all duration-500 group-hover:rotate-[-6deg] group-hover:bg-orange group-hover:text-ink">
                <Icon name={item.icon} size={22} />
              </span>
              <h3 className="mt-5 font-display text-[19px] font-bold uppercase leading-tight text-white">{item.title}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-white/55">{item.text}</p>
              {i < WHY.items.length - 1 && <span className="absolute right-0 top-8 hidden h-[calc(100%-4rem)] border-r border-dashed border-white/15 lg:block" />}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
