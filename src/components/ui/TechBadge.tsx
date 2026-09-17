import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TechIcon } from './TechIcon';

interface TechBadgeProps {
  name: string;
  className?: string;
  key?: string | number;
}

export function TechBadge({ name, className = '' }: TechBadgeProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      layout
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsHovered(!isHovered)}
      className={`group relative inline-flex items-center h-9 px-3 rounded-full bg-white border border-black/[0.08] hover:border-black/25 hover:bg-[#fafafc] transition-all duration-200 cursor-pointer select-none shadow-[0_1px_4px_rgba(0,0,0,0.04)] ${className}`}
      transition={{ type: "spring", stiffness: 450, damping: 32 }}
      title={name}
      aria-label={name}
    >
      <div className="flex-shrink-0 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
        <TechIcon name={name} className="w-4 h-4" />
      </div>

      <AnimatePresence initial={false}>
        {isHovered && (
          <motion.span
            initial={{ width: 0, opacity: 0, marginLeft: 0 }}
            animate={{ width: 'auto', opacity: 1, marginLeft: 8 }}
            exit={{ width: 0, opacity: 0, marginLeft: 0 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden whitespace-nowrap text-xs md:text-sm font-medium text-[#1d1d1f] tracking-tight"
          >
            {name}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
