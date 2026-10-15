import { useRef, useState, type FormEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Check, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { BRAND, CONTACT } from '../content';
import { asset, useInView } from '../lib/hooks';
import Frame from '../components/Frame';
import Reveal from '../components/Reveal';
import { SectionHead } from '../components/ui';

const F = CONTACT.form;

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-[11.5px] font-semibold uppercase tracking-[0.12em] text-white/50">{label}</span>
      <div className="mt-2">{children}</div>
    </label>
  );
}

const inputCls =
  'h-12 w-full rounded-sm border border-white/15 bg-white/[0.04] px-4 text-[15px] text-white placeholder:text-white/30 outline-none transition-colors duration-300 focus:border-orange focus:bg-white/[0.07]';

function LeadForm() {
  const [trade, setTrade] = useState(F.trades[0]);
  const [phone, setPhone] = useState('');
  const [error, setError] = useState(false);
  const [sent, setSent] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (phone.replace(/\D/g, '').length < 9) {
      setError(true);
      return;
    }
    setError(false);
    setSent(true);
  };

  return (
    <div className="relative overflow-hidden rounded-sm border border-white/10 bg-steel/80 p-6 backdrop-blur-xl sm:p-8">
      <AnimatePresence mode="wait">
        {!sent ? (
          <motion.form key="form" onSubmit={submit} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -12 }} className="space-y-5" noValidate>
            <p className="font-display text-[22px] font-bold uppercase">{F.title}</p>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label={F.name}>
                <input className={inputCls} placeholder={F.namePh} autoComplete="given-name" />
              </Field>
              <Field label={F.phone}>
                <input
                  className={`${inputCls} ${error ? 'border-[#FF5C5C]' : ''}`}
                  placeholder={F.phonePh}
                  inputMode="tel"
                  autoComplete="tel"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    if (error) setError(false);
                  }}
                />
              </Field>
            </div>
            {error && <p className="-mt-2 text-[13px] text-[#FF7A7A]">{F.phoneError}</p>}
            <Field label={F.trade}>
              <div className="flex flex-wrap gap-2">
                {F.trades.map((t) => (
                  <button
                    type="button"
                    key={t}
                    onClick={() => setTrade(t)}
                    className={`rounded-sm border px-3.5 py-2 text-[13px] font-semibold transition-all duration-300 ${
                      trade === t ? 'border-orange bg-orange text-ink' : 'border-white/15 text-white/70 hover:border-white/35'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </Field>
            <Field label={F.city}>
              <input className={inputCls} placeholder={F.cityPh} autoComplete="address-level2" />
            </Field>
            <button
              type="submit"
              className="btn-shine group/btn relative flex h-14 w-full items-center justify-center gap-2.5 overflow-hidden rounded-sm bg-orange text-[14px] font-bold uppercase tracking-[0.08em] text-ink transition-colors hover:bg-orange-soft"
            >
              {F.submit}
              <ArrowRight size={17} className="transition-transform duration-300 group-hover/btn:translate-x-1" />
            </button>
            <p className="text-center text-[12.5px] text-white/40">{F.note}</p>
          </motion.form>
        ) : (
          <motion.div
            key="done"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex min-h-[460px] flex-col items-center justify-center text-center"
          >
            <motion.span
              initial={{ scale: 0.3, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 0.1 }}
              className="grid h-20 w-20 place-items-center rounded-sm bg-orange text-ink shadow-[0_0_60px_-10px_rgba(255,107,31,0.8)]"
            >
              <Check size={40} strokeWidth={3} />
            </motion.span>
            <p className="mt-7 font-display text-[30px] font-black uppercase">{F.successTitle}</p>
            <p className="mt-3 max-w-[22rem] text-[15.5px] leading-relaxed text-white/65">{F.successText}</p>
            <button type="button" onClick={() => setSent(false)} className="mt-8 text-[13px] font-semibold uppercase tracking-[0.1em] text-orange underline-offset-4 hover:underline">
              {F.again}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { threshold: 0.12 });

  const contacts = [
    { icon: Phone, label: BRAND.phone, href: BRAND.phoneHref },
    { icon: MessageCircle, label: 'WhatsApp', href: BRAND.whatsappHref },
    { icon: Mail, label: BRAND.email, href: `mailto:${BRAND.email}` },
    { icon: MapPin, label: CONTACT.area, href: undefined },
  ];

  return (
    <section id="contact" className="relative py-16 sm:py-24">
      <div className="mx-auto max-w-[1440px] px-3 sm:px-5">
        <div ref={ref} className="relative overflow-hidden rounded-sm bg-coal">
          <img src={asset('media/helmet.webp')} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover object-[30%_center] opacity-75" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,17,19,0.55)_0%,rgba(17,17,19,0.92)_55%,#111113_100%)] lg:bg-[linear-gradient(90deg,rgba(17,17,19,0.35)_0%,rgba(17,17,19,0.7)_40%,rgba(17,17,19,0.96)_62%)]" />
          <Frame show={inView} />

          <div className="relative z-10 grid gap-12 px-6 py-16 sm:px-12 sm:py-20 lg:grid-cols-2 lg:gap-16 lg:px-16 lg:py-24">
            <div className="flex flex-col justify-between gap-10">
              <div>
                <SectionHead index={CONTACT.index} eyebrow={CONTACT.eyebrow} title={CONTACT.title} />
                <Reveal as="p" delay={300} className="mt-6 max-w-[30rem] text-[16px] leading-relaxed text-white/75 sm:text-[17px]">
                  {CONTACT.text}
                </Reveal>
              </div>
              <ul className="space-y-3">
                {contacts.map((c, i) => (
                  <Reveal as="li" key={c.label} delay={400 + i * 80}>
                    {c.href ? (
                      <a href={c.href} className="group flex items-center gap-4 text-[16px] font-semibold text-white/90 transition-colors hover:text-orange">
                        <span className="grid h-10 w-10 place-items-center rounded-sm border border-orange/40 bg-ink/50 text-orange backdrop-blur transition-colors group-hover:bg-orange group-hover:text-ink">
                          <c.icon size={17} />
                        </span>
                        {c.label}
                      </a>
                    ) : (
                      <span className="flex items-center gap-4 text-[15px] font-medium text-white/70">
                        <span className="grid h-10 w-10 place-items-center rounded-sm border border-white/15 bg-ink/50 text-white/60 backdrop-blur">
                          <c.icon size={17} />
                        </span>
                        {c.label}
                      </span>
                    )}
                  </Reveal>
                ))}
              </ul>
            </div>
            <Reveal anim="scale-in" delay={250}>
              <LeadForm />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
