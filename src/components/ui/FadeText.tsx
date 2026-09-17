import { motion } from 'motion/react';
import { ElementType, ReactNode } from 'react';

interface FadeTextProps {
  children: ReactNode;
  className?: string;
  direction?: 'up' | 'down' | 'in';
  as?: ElementType;
  delay?: number;
}

const MOTION_TAGS: Record<string, any> = {
  div: motion.div,
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  p: motion.p,
  span: motion.span,
  section: motion.section,
};

export function FadeText({ 
  children, 
  className = '', 
  direction = 'up', 
  as: Component = 'div', 
  delay = 0 
}: FadeTextProps) {
  const ComponentTag = typeof Component === 'string' ? (MOTION_TAGS[Component] || motion.div) : motion.div;

  const yOffset = direction === 'up' ? 20 : direction === 'down' ? -20 : 0;
  
  const variants = {
    hidden: { 
      opacity: 0, 
      y: yOffset 
    },
    visible: { 
      opacity: 1, 
      y: 0 
    }
  };

  return (
    <ComponentTag
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.1 }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      variants={variants}
      className={className}
    >
      {children}
    </ComponentTag>
  );
}
