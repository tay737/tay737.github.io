import { ArrowRight, Github, Mail } from 'lucide-react';
import { BlurIn } from './ui/BlurIn';
import { FadeText } from './ui/FadeText';
import { profile } from '../data';

export function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-20 overflow-hidden w-full">
      <div className="max-w-4xl mx-auto px-6 md:px-12 text-center z-10 w-full mb-12">
        <BlurIn as="h1" className="text-6xl md:text-8xl lg:text-9xl font-semibold tracking-tighter mb-8 text-foreground leading-[1.05]">
          Hi, <br className="hidden md:block" />
          I'm tay.
        </BlurIn>
        
        <FadeText as="p" direction="up" delay={0.1} className="text-xl md:text-2xl text-muted max-w-2xl mx-auto mb-12 leading-relaxed tracking-tight">
          Curious and passionate, with an insatiable desire to learn as much as I can.
        </FadeText>
        
        <FadeText direction="up" delay={0.2} className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <a
            href="#projects"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full font-medium text-base bg-foreground text-background hover:bg-foreground/90 active:scale-[0.98] transition-all duration-200 shadow-sm group"
          >
            <span>View Projects</span>
            <ArrowRight size={18} className="transition-transform duration-200 group-hover:translate-x-1" />
          </a>
          
          <div className="flex gap-4 justify-center">
            <a 
              href={profile.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3.5 glass border border-border rounded-full hover:bg-foreground/5 transition-colors flex items-center justify-center text-muted hover:text-foreground"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <a 
              href={`mailto:${profile.email}`}
              className="p-3.5 glass border border-border rounded-full hover:bg-foreground/5 transition-colors flex items-center justify-center text-muted hover:text-foreground"
              aria-label="Email"
            >
              <Mail size={20} />
            </a>
          </div>
        </FadeText>
      </div>

      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_100%)] rounded-full blur-3xl" />
      </div>
    </section>
  );
}
