import { useEffect, useState, type RefObject } from 'react';

type InViewOptions = { once?: boolean; rootMargin?: string; threshold?: number };

/** True once the element enters the viewport (or while it is inside, with once=false). */
export function useInView(
  ref: RefObject<Element | null>,
  { once = true, rootMargin = '0px 0px -10% 0px', threshold = 0.12 }: InViewOptions = {},
) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) io.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { rootMargin, threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, once, rootMargin, threshold]);

  return inView;
}

export function useScrolled(offset = 24) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > offset);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [offset]);
  return scrolled;
}

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() =>
    typeof window === 'undefined' ? false : window.matchMedia(query).matches,
  );
  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = () => setMatches(mq.matches);
    onChange();
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [query]);
  return matches;
}

/** Public-folder path that works with the relative Vite base. */
export const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`;

export const formatKc = (n: number) => `${Math.round(n).toLocaleString('ru-RU')}`;
