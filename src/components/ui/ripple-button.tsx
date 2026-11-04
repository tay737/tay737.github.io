import {
  useCallback,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type MouseEvent,
} from 'react';
import { useReducedMotion } from 'motion/react';

import { cn } from '@/lib/utils';

/**
 * Ripplix-style click feedback.
 *
 * Ripplix (ripplix.com) is an animation reference catalogue rather than an
 * installable package, so this is a local implementation of its signature
 * pointer ripple. It respects prefers-reduced-motion and cleans up its ink
 * spans after the animation finishes.
 */
interface Ripple {
  id: number;
  x: number;
  y: number;
  size: number;
}

function useRipples() {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const nextId = useRef(0);
  const prefersReducedMotion = useReducedMotion();

  const spawnRipple = useCallback(
    (event: MouseEvent<HTMLElement>) => {
      if (prefersReducedMotion) return;

      const rect = event.currentTarget.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const id = nextId.current++;

      setRipples((current) => [
        ...current,
        {
          id,
          size,
          x: event.clientX - rect.left - size / 2,
          y: event.clientY - rect.top - size / 2,
        },
      ]);

      window.setTimeout(() => {
        setRipples((current) => current.filter((ripple) => ripple.id !== id));
      }, 650);
    },
    [prefersReducedMotion],
  );

  return { ripples, spawnRipple };
}

function RippleInk({ ripples }: { ripples: Ripple[] }) {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]"
    >
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="ripple-ink"
          style={{
            width: ripple.size,
            height: ripple.size,
            left: ripple.x,
            top: ripple.y,
          }}
        />
      ))}
    </span>
  );
}

export function RippleLink({
  children,
  className,
  onClick,
  ...props
}: ComponentPropsWithoutRef<'a'>) {
  const { ripples, spawnRipple } = useRipples();

  return (
    <a
      {...props}
      className={cn('relative isolate overflow-hidden', className)}
      onClick={(event) => {
        spawnRipple(event);
        onClick?.(event);
      }}
    >
      {children}
      <RippleInk ripples={ripples} />
    </a>
  );
}

export function RippleButton({
  children,
  className,
  onClick,
  ...props
}: ComponentPropsWithoutRef<'button'>) {
  const { ripples, spawnRipple } = useRipples();

  return (
    <button
      type="button"
      {...props}
      className={cn('relative isolate overflow-hidden', className)}
      onClick={(event) => {
        spawnRipple(event);
        onClick?.(event);
      }}
    >
      {children}
      <RippleInk ripples={ripples} />
    </button>
  );
}
