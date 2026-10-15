import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import { Check, CheckCheck, MapPin } from 'lucide-react';
import { HERO } from '../content';
import { asset, useMediaQuery } from '../lib/hooks';
import Frame from '../components/Frame';
import { Button, Icon, LoopVideo } from '../components/ui';

type FeedItem = { id: number; toast: (typeof HERO.toasts)[number] };

function LeadFeed() {
  const [feed, setFeed] = useState<FeedItem[]>([]);

  useEffect(() => {
    let n = 0;
    const push = () => {
      const item = { id: n, toast: HERO.toasts[n % HERO.toasts.length] };
      n += 1;
      setFeed((prev) => [...prev, item].slice(-2));
    };
    let interval: number | undefined;
    const start = window.setTimeout(() => {
      push();
      interval = window.setInterval(push, 3000);
    }, 1900);
    return () => {
      window.clearTimeout(start);
      if (interval) window.clearInterval(interval);
    };
  }, []);

  return (
    <div className="pointer-events-none absolute bottom-[10%] right-[3%] z-10 hidden w-[330px] lg:block xl:right-[4%]">
      <div className="animate-fade-in mb-3 flex items-center gap-2 pl-1" style={{ animationDelay: '1700ms' }}>
        <span className="relative flex h-2 w-2">
          <span className="absolute inset-0 rounded-full bg-ok animate-ping-soft" />
          <span className="relative h-2 w-2 rounded-full bg-ok" />
        </span>
        <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/70">{HERO.toastsCaption}</span>
      </div>
      <div className="flex flex-col gap-2.5">
        <AnimatePresence mode="popLayout" initial={false}>
          {feed.map((item, i) => {
            const old = i < feed.length - 1;
            const t = item.toast;
            return (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 48, scale: 0.9, filter: 'blur(8px)' }}
                animate={{ opacity: old ? 0.5 : 1, y: 0, scale: old ? 0.94 : 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -36, scale: 0.88, filter: 'blur(8px)' }}
                transition={{ type: 'spring', stiffness: 240, damping: 26 }}
                className="origin-bottom rounded-md border border-white/10 bg-ink/75 p-3.5 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.9)] backdrop-blur-xl"
              >
                <div className="flex items-start gap-3">
                  <div className="relative grid h-10 w-10 flex-shrink-0 place-items-center rounded-sm bg-orange text-ink">
                    <Icon name={t.icon} size={19} />
                    {!old && <span className="absolute -inset-0.5 rounded-sm border-2 border-orange animate-ping-ring" />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10.5px] font-bold uppercase tracking-[0.14em] text-orange">{HERO.toastsTitle}</span>
                      <span className="text-[11px] text-white/45">{HERO.toastsNow}</span>
                    </div>
                    <p className="mt-0.5 truncate text-[14px] font-semibold text-white">{t.title}</p>
                    <div className="mt-1.5 flex items-center gap-1.5 text-[11.5px] text-white/55">
                      <MapPin size={12} className="text-white/40" />
                      {t.place}
                      <span className="mx-0.5 h-1 w-1 rounded-full bg-white/30" />
                      {t.note}
                    </div>
                  </div>
                </div>
                <div className="mt-2 flex items-center justify-end gap-1 text-[10.5px] font-semibold text-ok">
                  <CheckCheck size={13} />
                  {HERO.toastsSent}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const small = useMediaQuery('(max-width: 767px)');
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -110]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section ref={ref} id="top" className="relative h-svh min-h-[680px] w-full overflow-hidden bg-ink">
      {/* the guys from the reference, alive */}
      <motion.div style={{ scale: videoScale }} className="absolute inset-0">
        <div className="absolute inset-0 animate-kenburns">
          <LoopVideo
            key={small ? 'mobile' : 'desktop'}
            eager
            src={asset(small ? 'media/hero-720.mp4' : 'media/hero.mp4')}
            poster={asset('media/hero.webp')}
            className="h-full w-full object-cover object-[74%_center] md:object-center"
          />
        </div>
      </motion.div>

      {/* readability + warmth */}
      <div className="absolute inset-0 bg-[linear-gradient(0deg,#0A0A0B_0%,rgba(10,10,11,0.94)_34%,rgba(10,10,11,0.35)_62%,rgba(10,10,11,0.55)_100%)] md:bg-[linear-gradient(90deg,#0A0A0B_0%,rgba(10,10,11,0.9)_26%,rgba(10,10,11,0.35)_52%,rgba(10,10,11,0)_70%)]" />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-ink/80 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(55%_45%_at_8%_100%,rgba(255,107,31,0.22),transparent)]" />

      <Frame show />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto flex h-full max-w-[1400px] flex-col justify-end px-6 pb-10 pt-28 sm:px-10 sm:pb-16 lg:justify-center lg:px-14 lg:pb-6 lg:pt-24"
      >
        <div
          className="animate-fade-up mb-6 inline-flex w-fit items-center gap-2.5 rounded-sm border border-orange/35 bg-orange/10 px-3 py-1.5 backdrop-blur-md"
          style={{ animationDelay: '400ms' }}
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inset-0 rounded-full bg-orange animate-ping-soft" />
            <span className="relative h-2 w-2 rounded-full bg-orange" />
          </span>
          <span className="text-[11.5px] font-semibold uppercase tracking-[0.16em] text-orange-soft">{HERO.eyebrow}</span>
        </div>

        <h1 className="font-display font-black uppercase leading-[0.86] text-white">
          {HERO.lines.map((line, i) => (
            <span key={line} className="block overflow-hidden pb-[0.07em]">
              <span
                className={`animate-rise block text-[clamp(2.7rem,8.4vw,6.6rem)] ${i === HERO.accentLine ? 'text-orange' : ''}`}
                style={{ animationDelay: `${520 + i * 130}ms` }}
              >
                {line}
              </span>
            </span>
          ))}
        </h1>

        <p
          className="animate-fade-up mt-6 max-w-[34rem] text-[15.5px] leading-relaxed text-white/80 sm:mt-7 sm:text-[17px]"
          style={{ animationDelay: '900ms' }}
        >
          {HERO.text}
        </p>

        <div className="mt-7 flex flex-wrap gap-3 sm:mt-9">
          <div className="animate-fade-up" style={{ animationDelay: '1050ms' }}>
            <Button href="#contact" size="lg">
              {HERO.primary}
            </Button>
          </div>
          <div className="animate-fade-up" style={{ animationDelay: '1150ms' }}>
            <Button href="#calc" size="lg" variant="ghost" arrow={false}>
              {HERO.secondary}
            </Button>
          </div>
        </div>

        <ul className="animate-fade-up mt-7 flex flex-wrap gap-x-5 gap-y-2 sm:mt-9" style={{ animationDelay: '1300ms' }}>
          {HERO.chips.map((chip) => (
            <li key={chip} className="flex items-center gap-2 text-[13px] font-medium text-white/70">
              <span className="grid h-4 w-4 place-items-center rounded-[2px] bg-orange/15 text-orange">
                <Check size={11} strokeWidth={3} />
              </span>
              {chip}
            </li>
          ))}
        </ul>
      </motion.div>

      <LeadFeed />

      <a
        href="#problem"
        className="animate-fade-in absolute bottom-[76px] left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-3 lg:flex"
        style={{ animationDelay: '1700ms' }}
      >
        <span className="text-[10.5px] font-semibold uppercase tracking-[0.3em] text-white/50">{HERO.scroll}</span>
        <span className="relative h-10 w-px overflow-hidden bg-white/15">
          <span className="animate-scroll-cue absolute inset-0 bg-orange" />
        </span>
      </a>
    </section>
  );
}
