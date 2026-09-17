import { ReactNode } from 'react';
import { motion } from 'motion/react';

interface SectionProps {
  id: string;
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  surface?: 'default' | 'secondary' | 'tertiary';
}

export function Section({ id, title, subtitle, children, className = '', surface = 'default' }: SectionProps) {
  const surfaceClasses = {
    default: 'bg-transparent',
    secondary: 'bg-transparent',
    tertiary: 'bg-[var(--surface-tertiary)]',
  };

  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.08, margin: "0px 0px -40px 0px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`py-24 md:py-36 w-full ${surfaceClasses[surface]} ${className}`}
    >
      <div className="px-6 md:px-12 max-w-7xl mx-auto w-full">
        {(title || subtitle) && (
          <div className="mb-14 md:mb-20">
            {title && (
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight mb-4 text-foreground">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-[#86868b] text-xl md:text-2xl max-w-2xl font-normal tracking-tight">
                {subtitle}
              </p>
            )}
          </div>
        )}
        <div>
          {children}
        </div>
      </div>
    </motion.section>
  );
}
