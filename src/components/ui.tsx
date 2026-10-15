import { useEffect, useRef, type ReactNode } from 'react';
import {
  ArrowRight,
  Bath,
  BellRing,
  Clock,
  Droplets,
  Flame,
  Grid3x3,
  Hammer,
  Languages,
  LayoutTemplate,
  ListChecks,
  MapPin,
  MessageCircle,
  MessagesSquare,
  Moon,
  PhoneMissed,
  Reply,
  SearchX,
  Star,
  Zap,
  type LucideIcon,
} from 'lucide-react';
import { BRAND } from '../content';
import { useInView } from '../lib/hooks';
import Reveal from './Reveal';

const ICONS: Record<string, LucideIcon> = {
  droplets: Droplets,
  zap: Zap,
  bath: Bath,
  flame: Flame,
  grid: Grid3x3,
  'phone-missed': PhoneMissed,
  messages: MessagesSquare,
  moon: Moon,
  'search-x': SearchX,
  layout: LayoutTemplate,
  bell: BellRing,
  reply: Reply,
  list: ListChecks,
  map: MapPin,
  star: Star,
  hammer: Hammer,
  clock: Clock,
  languages: Languages,
  message: MessageCircle,
};

export function Icon({ name, size = 20, className = '' }: { name: string; size?: number; className?: string }) {
  const Cmp = ICONS[name] ?? Hammer;
  return <Cmp size={size} strokeWidth={1.8} className={className} />;
}

export function LogoMark({ size = 32 }: { size?: number }) {
  return (
    <span className="relative inline-flex flex-shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden>
        <rect width="32" height="32" rx="5" fill="#FF6B1F" />
        <path d="M7 24V13.5L16 7l9 6.5V24" stroke="#0A0A0B" strokeWidth="2.6" strokeLinejoin="round" />
        <path d="M11.5 24v-7.5L16 20l4.5-3.5V24" stroke="#0A0A0B" strokeWidth="2.6" strokeLinejoin="round" />
      </svg>
      {/* the "new lead" dot */}
      <span className="absolute -right-1 -top-1 h-2.5 w-2.5">
        <span className="absolute inset-0 rounded-full bg-white animate-ping-soft" />
        <span className="absolute inset-0 rounded-full border-2 border-ink bg-white" />
      </span>
    </span>
  );
}

export function Logo({ className = '' }: { className?: string }) {
  return (
    <a href="#top" className={`group flex items-center gap-2.5 sm:gap-3 ${className}`} aria-label={`${BRAND.name}${BRAND.suffix}`}>
      <LogoMark />
      <span className="font-display text-[20px] font-bold uppercase leading-none tracking-tight text-white sm:text-[23px]">
        {BRAND.name}
        <span className="text-orange">{BRAND.suffix}</span>
      </span>
    </a>
  );
}

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: 'primary' | 'ghost' | 'dark';
  size?: 'md' | 'lg';
  className?: string;
  arrow?: boolean;
  onClick?: () => void;
};

export function Button({ href, children, variant = 'primary', size = 'md', className = '', arrow = true, onClick }: ButtonProps) {
  const base =
    'btn-shine group/btn relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-sm font-semibold uppercase tracking-[0.07em] transition-colors duration-300';
  const sizes = { md: 'px-6 py-3.5 text-[13px]', lg: 'px-7 py-4 text-[14px]' };
  const variants = {
    primary: 'bg-orange text-ink hover:bg-orange-soft',
    ghost: 'border border-white/20 bg-white/[0.06] text-white backdrop-blur-md hover:border-white/40 hover:bg-white/10',
    dark: 'bg-ink text-white hover:bg-black',
  };
  return (
    <a href={href} onClick={onClick} className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}>
      <span className="relative z-[1]">{children}</span>
      {arrow && <ArrowRight size={16} strokeWidth={2.2} className="relative z-[1] transition-transform duration-300 group-hover/btn:translate-x-1" />}
    </a>
  );
}

type HeadProps = {
  index?: string;
  eyebrow?: string;
  title: string[];
  lead?: string;
  align?: 'left' | 'center';
  className?: string;
};

/** Section heading: "01 / ПРОБЛЕМА" rule, big condensed title with the orange part, optional lead. */
export function SectionHead({ index, eyebrow, title, lead, align = 'left', className = '' }: HeadProps) {
  const center = align === 'center';
  return (
    <div className={`${center ? 'mx-auto text-center' : ''} max-w-[54rem] ${className}`}>
      {eyebrow && (
        <Reveal anim="fade-in" className={`mb-5 flex items-center gap-3 ${center ? 'justify-center' : ''}`}>
          {index && <span className="font-display text-[13px] font-semibold text-orange">{index}</span>}
          <span className="h-px w-8 bg-orange/60" />
          <span className="text-[12px] font-semibold uppercase tracking-[0.18em] text-white/60">{eyebrow}</span>
        </Reveal>
      )}
      <h2 className="font-display text-[clamp(2.1rem,5.4vw,4.4rem)] font-extrabold uppercase leading-[0.92] text-white text-balance">
        {title.map((part, i) => (
          <span key={i}>
            {i > 0 && ' '}
            <Reveal as="span" anim="fade-up" delay={80 + i * 120} className={`inline-block ${i % 2 === 1 ? 'text-orange' : ''}`}>
              {part.trim()}
            </Reveal>
          </span>
        ))}
      </h2>
      {lead && (
        <Reveal as="p" anim="fade-up" delay={320} className={`mt-6 max-w-[38rem] text-[16px] leading-relaxed text-white/65 sm:text-[17px] ${center ? 'mx-auto' : ''}`}>
          {lead}
        </Reveal>
      )}
    </div>
  );
}

type VideoProps = {
  src: string;
  poster: string;
  className?: string;
  eager?: boolean;
};

/** Muted looping video that only plays while on screen. */
export function LoopVideo({ src, poster, className = '', eager = false }: VideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const onScreen = useInView(ref, { once: false, rootMargin: '200px 0px', threshold: 0 });
  const everSeen = useRef(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    // React sets `muted` as a property only; iOS needs the attribute before it allows autoplay.
    v.muted = true;
    v.defaultMuted = true;
    v.setAttribute('muted', '');
    if (onScreen) {
      everSeen.current = true;
      v.play().catch(() => {});
    } else if (everSeen.current || !eager) {
      v.pause();
    }
  }, [onScreen, eager]);

  return (
    <video
      ref={ref}
      className={className}
      poster={poster}
      muted
      loop
      playsInline
      autoPlay={eager}
      preload={eager ? 'auto' : 'metadata'}
      aria-hidden
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
