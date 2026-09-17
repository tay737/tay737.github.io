import { forwardRef, AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react';

type ButtonBaseProps = {
  className?: string;
};

type AnchorProps = ButtonBaseProps & AnchorHTMLAttributes<HTMLAnchorElement> & { as?: 'a' };
type ButtonProps = ButtonBaseProps & ButtonHTMLAttributes<HTMLButtonElement> & { as: 'button' };

type AnimatedShinyButtonProps = AnchorProps | ButtonProps;

export const AnimatedShinyButton = forwardRef<HTMLElement, AnimatedShinyButtonProps>(
  ({ children, className = '', as = 'a', ...props }, ref) => {
    const Component = as as any;

    return (
      <Component
        ref={ref}
        className={`group relative inline-flex items-center justify-center overflow-hidden rounded-full p-[1px] transition-transform active:scale-[0.98] ${className}`}
        {...props}
      >
        <span className="absolute inset-[-1000%] animate-[shimmer_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,var(--color-identity-blue)_25%,var(--color-identity-pink)_50%,transparent_75%)] opacity-30 group-hover:opacity-100 transition-opacity duration-700" />
        
        <span className="relative flex h-full w-full items-center justify-center gap-2 rounded-full glass px-8 py-3.5 text-sm font-medium text-foreground transition-all duration-300 group-hover:bg-foreground/5 shadow-sm">
          <div 
            className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none rounded-full" 
            style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} 
          />
          <span className="relative z-10 flex items-center gap-2">
            {children}
          </span>
        </span>
      </Component>
    );
  }
);

AnimatedShinyButton.displayName = 'AnimatedShinyButton';
