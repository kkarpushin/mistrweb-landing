import { useEffect, useState } from 'react';
import { Menu, Phone, X } from 'lucide-react';
import { BRAND, NAV, NAV_CTA } from '../content';
import { useScrolled } from '../lib/hooks';
import { Button, Logo } from '../components/ui';

export default function Navbar() {
  const scrolled = useScrolled(40);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`transition-all duration-500 ease-expo ${
          scrolled || open ? 'mx-0 mt-0 border-b border-white/10 bg-ink/80 backdrop-blur-xl' : 'mx-3 mt-3 border-b border-dashed border-orange/30 sm:mx-[18px] sm:mt-[18px]'
        }`}
      >
        <nav
          className={`mx-auto flex max-w-[1400px] items-center justify-between px-5 transition-all duration-500 ease-expo sm:px-8 lg:px-10 ${
            scrolled ? 'h-16' : 'h-16 sm:h-[84px]'
          }`}
        >
          <div className="animate-fade-up" style={{ animationDelay: '400ms' }}>
            <Logo />
          </div>

          <div className="hidden items-center gap-1 lg:flex">
            {NAV.map((item, i) => (
              <a
                key={item.href}
                href={item.href}
                className="animate-fade-up rounded-sm px-4 py-2.5 text-[12.5px] font-medium uppercase tracking-[0.08em] text-white/75 transition-colors hover:bg-white/[0.07] hover:text-white"
                style={{ animationDelay: `${500 + i * 80}ms` }}
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="hidden items-center gap-5 lg:flex">
            <a
              href={BRAND.phoneHref}
              className="animate-fade-up flex items-center gap-2 text-[13px] font-semibold tracking-wide text-white/80 transition-colors hover:text-orange"
              style={{ animationDelay: '880ms' }}
            >
              <Phone size={15} className="text-orange" />
              {BRAND.phone}
            </a>
            <div className="animate-fade-up" style={{ animationDelay: '960ms' }}>
              <Button href="#contact" arrow={false}>
                {NAV_CTA}
              </Button>
            </div>
          </div>

          <button
            type="button"
            aria-label="Меню"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="animate-fade-in flex h-11 w-11 items-center justify-center rounded-sm border border-white/15 bg-white/[0.06] backdrop-blur-md transition-colors hover:bg-white/10 lg:hidden"
            style={{ animationDelay: '500ms' }}
          >
            <span className="relative h-5 w-5">
              <Menu
                size={20}
                className={`absolute inset-0 transition-all duration-300 ${open ? 'rotate-90 scale-75 opacity-0' : 'rotate-0 scale-100 opacity-100'}`}
              />
              <X
                size={20}
                className={`absolute inset-0 text-orange transition-all duration-300 ${open ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-75 opacity-0'}`}
              />
            </span>
          </button>
        </nav>
      </div>

      {/* mobile menu */}
      <div
        className={`fixed inset-x-0 bottom-0 top-16 bg-ink/95 backdrop-blur-xl transition-all duration-500 ease-expo lg:hidden ${
          open ? 'pointer-events-auto translate-y-0 opacity-100' : 'pointer-events-none -translate-y-4 opacity-0'
        }`}
      >
        <div className="bg-blueprint absolute inset-0 opacity-60" aria-hidden />
        <div className="relative flex h-full flex-col px-5 pb-10 pt-8 sm:px-8">
          <div className="flex flex-col gap-2">
            {NAV.map((item, i) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`flex items-center justify-between rounded-sm border border-white/10 bg-white/[0.04] px-5 py-4 font-display text-[22px] font-bold uppercase tracking-wide transition-all duration-500 ${
                  open ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
                }`}
                style={{ transitionDelay: open ? `${80 + i * 50}ms` : '0ms' }}
              >
                {item.label}
                <span className="font-sans text-[12px] font-semibold text-orange">0{i + 1}</span>
              </a>
            ))}
          </div>
          <div
            className={`mt-6 flex flex-col gap-3 transition-all duration-500 ${open ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'}`}
            style={{ transitionDelay: open ? `${80 + NAV.length * 50}ms` : '0ms' }}
          >
            <Button href="#contact" size="lg" onClick={() => setOpen(false)}>
              {NAV_CTA}
            </Button>
            <a href={BRAND.phoneHref} className="flex items-center justify-center gap-2 py-3 text-[15px] font-semibold text-white/80">
              <Phone size={16} className="text-orange" />
              {BRAND.phone}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
