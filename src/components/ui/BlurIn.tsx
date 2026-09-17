import { motion } from 'motion/react';
import { ElementType, ReactNode } from 'react';

interface BlurInProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  delay?: number;
  duration?: number;
}

const MOTION_TAGS: Record<string, any> = {
  div: motion.div,
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  p: motion.p,
  span: motion.span,
};

export function BlurIn({ 
  children, 
  className = '', 
  as: Component = 'div', 
  delay = 0, 
  duration = 0.8 
}: BlurInProps) {
  const ComponentTag = typeof Component === 'string' ? (MOTION_TAGS[Component] || motion.div) : motion.div;

  return (
    <ComponentTag
      initial={{ filter: 'blur(8px)', opacity: 0 }}
      animate={{ filter: 'blur(0px)', opacity: 1 }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </ComponentTag>
  );
}
