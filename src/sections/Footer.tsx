import { useEffect, useState } from 'react';
import { MessageCircle, Phone } from 'lucide-react';
import { BRAND, FOOTER, MOBILE_CTA, NAV } from '../content';
import { Logo } from '../components/ui';

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06] pb-28 pt-14 lg:pb-14">
      <div className="mx-auto flex max-w-[1320px] flex-col gap-10 px-5 sm:px-8 lg:flex-row lg:items-start lg:justify-between lg:px-12">
        <div className="max-w-[22rem]">
          <Logo />
          <p className="mt-4 text-[14px] leading-relaxed text-white/50">{FOOTER.text}</p>
        </div>
        <nav className="grid grid-cols-2 gap-x-10 gap-y-3 sm:grid-cols-3">
          {NAV.map((item) => (
            <a key={item.href} href={item.href} className="text-[13px] font-medium uppercase tracking-[0.08em] text-white/60 transition-colors hover:text-orange">
              {item.label}
            </a>
          ))}
        </nav>
        <div className="space-y-2 text-[14px]">
          <a href={BRAND.phoneHref} className="block font-semibold text-white/85 hover:text-orange">
            {BRAND.phone}
          </a>
          <a href={`mailto:${BRAND.email}`} className="block text-white/55 hover:text-orange">
            {BRAND.email}
          </a>
        </div>
      </div>
      <div className="mx-auto mt-12 flex max-w-[1320px] flex-col gap-2 border-t border-dashed border-white/10 px-5 pt-6 text-[12px] text-white/35 sm:flex-row sm:justify-between sm:px-8 lg:px-12">
        <span>{FOOTER.copy}</span>
        <span>{FOOTER.note}</span>
        <span>{FOOTER.made}</span>
      </div>
    </footer>
  );
}

/** Thumb-reach call bar on phones, shown once the hero is scrolled past. */
export function MobileCta() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const contact = document.getElementById('contact');
      const pastHero = window.scrollY > window.innerHeight * 0.8;
      const atContact = contact ? contact.getBoundingClientRect().top < window.innerHeight * 0.6 : false;
      setShow(pastHero && !atContact);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-ink/85 px-3 pb-[max(12px,env(safe-area-inset-bottom))] pt-3 backdrop-blur-xl transition-all duration-500 ease-expo lg:hidden ${
        show ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-full opacity-0'
      }`}
    >
      <div className="flex gap-2.5">
        <a href={BRAND.phoneHref} className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-sm border border-white/15 text-white" aria-label={MOBILE_CTA.call}>
          <Phone size={18} />
        </a>
        <a href={BRAND.whatsappHref} className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-sm border border-white/15 text-ok" aria-label="WhatsApp">
          <MessageCircle size={18} />
        </a>
        <a href="#contact" className="flex h-12 flex-1 items-center justify-center rounded-sm bg-orange text-[14px] font-bold uppercase tracking-[0.08em] text-ink">
          {MOBILE_CTA.main}
        </a>
      </div>
    </div>
  );
}
