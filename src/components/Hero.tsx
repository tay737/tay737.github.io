import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { Github } from 'lucide-react';
import { BlurIn } from './ui/BlurIn';
import { FadeText } from './ui/FadeText';
import { Spotlight } from './ui/spotlight';
import { AnimatedShinyText } from './ui/animated-shiny-text';
import { RippleLink } from './ui/ripple-button';
import { ArrowRightIcon } from './animate-ui/icons/arrow-right';
import { MailIcon } from './animate-ui/icons/mail';
import { profile } from '../data';

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.1]);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-20 overflow-hidden w-full"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <Spotlight
          className="-top-[34rem] left-1/2 md:-top-[30rem] md:w-[76%]"
          fill="#5BCEFA"
        />
        <Spotlight
          className="-top-[38rem] left-[62%] md:-top-[34rem] md:w-[64%]"
          fill="#F5A9B8"
        />
      </div>

      <motion.div
        style={prefersReducedMotion ? undefined : { y: contentY, opacity: contentOpacity }}
        className="max-w-4xl mx-auto px-6 md:px-12 text-center z-10 w-full mb-12"
      >

        <BlurIn as="h1" className="text-6xl md:text-8xl lg:text-9xl font-semibold tracking-tighter mb-8 text-foreground leading-[1.05]">
          Hi, <br className="hidden md:block" />
          I'm tay.
        </BlurIn>

        <FadeText as="p" direction="up" delay={0.1} className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed tracking-tight">
          Curious and passionate, with an insatiable desire to learn as much as I can.
        </FadeText>

        <FadeText direction="up" delay={0.2} className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <RippleLink
            href="#projects"
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full font-medium text-base bg-foreground text-background hover:bg-foreground/90 active:scale-[0.98] transition-all duration-200 shadow-sm"
          >
            <span>View Projects</span>
            <ArrowRightIcon size={18} animateOnHover animateOnTap />
          </RippleLink>

          <div className="flex gap-4 justify-center">
            <a
              href={profile.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-3.5 glass border border-border rounded-full hover:bg-foreground/5 transition-colors flex items-center justify-center text-muted-foreground hover:text-foreground"
              aria-label="GitHub"
            >
              <Github size={20} className="transition-transform duration-300 group-hover:-rotate-12" />
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="p-3.5 glass border border-border rounded-full hover:bg-foreground/5 transition-colors flex items-center justify-center text-muted-foreground hover:text-foreground"
              aria-label="Email"
            >
              <MailIcon size={20} animateOnHover animateOnTap />
            </a>
          </div>
        </FadeText>
      </motion.div>

      <div className="absolute inset-0 pointer-events-none z-0 bg-[radial-gradient(circle_at_center,rgba(245,169,184,0.10),rgba(91,206,250,0.08)_60%,transparent_100%)]" />
    </section>
  );
}
