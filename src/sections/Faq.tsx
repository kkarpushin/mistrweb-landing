import { useState } from 'react';
import { MessageCircle, Plus } from 'lucide-react';
import { BRAND, FAQ } from '../content';
import Reveal from '../components/Reveal';
import { Button, SectionHead } from '../components/ui';

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-24 sm:py-32">
      <div className="mx-auto grid max-w-[1320px] gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-10 lg:px-12">
        <div className="lg:col-span-5">
          <SectionHead index={FAQ.index} eyebrow={FAQ.eyebrow} title={FAQ.title} />
          <Reveal delay={300} className="relative mt-10 overflow-hidden rounded-sm border border-white/10 bg-coal p-6 sm:p-7">
            <div className="hazard absolute inset-x-0 top-0 h-1.5" />
            <span className="grid h-11 w-11 place-items-center rounded-full bg-ok/15 text-ok">
              <MessageCircle size={20} />
            </span>
            <p className="mt-4 font-display text-[20px] font-bold uppercase">{FAQ.askTitle}</p>
            <p className="mt-2 text-[14.5px] leading-relaxed text-white/60">{FAQ.askText}</p>
            <Button href={BRAND.whatsappHref} variant="ghost" className="mt-5">
              {FAQ.askCta}
            </Button>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <div className="divide-y divide-dashed divide-white/15 border-y border-dashed border-white/15">
            {FAQ.items.map((item, i) => {
              const isOpen = open === i;
              return (
                <Reveal key={item.q} delay={i * 70}>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="group flex w-full items-center justify-between gap-6 py-6 text-left"
                  >
                    <span className={`font-display text-[18px] font-bold uppercase leading-snug transition-colors duration-300 sm:text-[21px] ${isOpen ? 'text-orange' : 'text-white group-hover:text-orange-soft'}`}>
                      {item.q}
                    </span>
                    <span
                      className={`grid h-9 w-9 flex-shrink-0 place-items-center rounded-sm border transition-colors duration-500 ${
                        isOpen ? 'border-orange bg-orange text-ink' : 'border-white/20 text-white/70'
                      }`}
                    >
                      <Plus size={18} className={`transition-transform duration-500 ease-expo ${isOpen ? 'rotate-45' : 'rotate-0'}`} />
                    </span>
                  </button>
                  <div className={`grid transition-[grid-template-rows] duration-500 ease-expo ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                    <div className="overflow-hidden">
                      <p className="max-w-[40rem] pb-6 text-[15.5px] leading-relaxed text-white/65">{item.a}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
