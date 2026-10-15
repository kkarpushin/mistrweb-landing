import { useRef, type CSSProperties, type ElementType, type ReactNode } from 'react';
import { useInView } from '../lib/hooks';

export type RevealAnim = 'fade-up' | 'fade-in' | 'scale-in' | 'border-draw' | 'rise' | 'wipe-right';

type Props = {
  as?: ElementType;
  anim?: RevealAnim;
  delay?: number;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  /** Pass an external in-view flag to animate a group together. */
  show?: boolean;
  id?: string;
};

/**
 * BuildShield gating pattern: the element sits at opacity-0 until it is on screen,
 * then gets its entrance class with an inline delay so the animation plays from the start.
 */
export default function Reveal({ as: Tag = 'div', anim = 'fade-up', delay = 0, className = '', style, children, show, id }: Props) {
  const ref = useRef<HTMLElement>(null);
  const seen = useInView(ref);
  const visible = show ?? seen;
  return (
    <Tag
      id={id}
      ref={ref}
      className={`${className} ${visible ? `animate-${anim}` : 'opacity-0'}`}
      style={{ ...style, animationDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}
