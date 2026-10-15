type Props = {
  show: boolean;
  delay?: number;
  /** 'page' hugs a full-bleed section, 'card' sits flush on a block */
  variant?: 'page' | 'card';
  tone?: 'orange' | 'white';
};

const VARIANTS = {
  page: {
    outer: 'inset-2 sm:inset-3',
    inner: 'inset-3 sm:inset-[18px]',
    dots: ['top-2 left-2 sm:top-3 sm:left-3', 'top-2 right-2 sm:top-3 sm:right-3', 'bottom-2 left-2 sm:bottom-3 sm:left-3', 'bottom-2 right-2 sm:bottom-3 sm:right-3'],
  },
  card: {
    outer: 'inset-0',
    inner: 'inset-1.5',
    dots: ['top-0 left-0', 'top-0 right-0', 'bottom-0 left-0', 'bottom-0 right-0'],
  },
};

/**
 * The blueprint double frame: solid outer line, dashed inner line, square nodes in the corners.
 * Both lines wipe in diagonally from the top-left (border-draw).
 */
export default function Frame({ show, delay = 0, variant = 'page', tone = 'orange' }: Props) {
  const v = VARIANTS[variant];
  const dashed = tone === 'orange' ? 'border-orange/40' : 'border-white/15';
  const anim = (d: number) => ({ className: show ? 'animate-border-draw' : 'opacity-0', style: { animationDelay: `${delay + d}ms` } });
  const outer = anim(100);
  const inner = anim(250);

  return (
    <>
      <div aria-hidden className={`pointer-events-none absolute ${v.outer} z-[1] rounded-sm border border-white/[0.13] ${outer.className}`} style={outer.style} />
      <div aria-hidden className={`pointer-events-none absolute ${v.inner} z-[1] rounded-sm border border-dashed ${dashed} ${inner.className}`} style={inner.style} />
      {v.dots.map((pos, i) => (
        <span
          key={pos}
          aria-hidden
          className={`pointer-events-none absolute ${pos} z-[2] h-[5px] w-[5px] bg-orange ${
            pos.includes('right') ? 'translate-x-1/2' : '-translate-x-1/2'
          } ${pos.includes('bottom') ? 'translate-y-1/2' : '-translate-y-1/2'} ${show ? 'animate-fade-in' : 'opacity-0'}`}
          style={{ animationDelay: `${delay + 600 + i * 100}ms` }}
        />
      ))}
    </>
  );
}
