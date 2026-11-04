import { Section } from './Section';
import { BackgroundBeams } from './ui/background-beams';
import { RippleLink } from './ui/ripple-button';
import { MailIcon } from './animate-ui/icons/mail';
import { profile } from '../data';
import { ArrowUpRight } from 'lucide-react';

export function Contact() {
  return (
    <Section id="contact" title="Get in touch." subtitle="Let's connect. I'm always open to discussing new opportunities.">
      <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[#0b0c10] px-6 py-16 md:px-16 md:py-24 text-center shadow-[0_30px_80px_rgba(0,0,0,0.18)]">
        <BackgroundBeams className="opacity-80" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

        <div className="relative z-10 max-w-2xl mx-auto">
          <h3 className="text-4xl md:text-6xl font-semibold tracking-tighter text-white mb-6">
            Interested?
          </h3>
          <p className="text-lg md:text-xl text-white/55 mb-12 leading-relaxed font-normal tracking-tight">
            Whether you have a question, an idea, or just want to say hi, feel free to drop me a message.
          </p>

          <RippleLink
            href={`mailto:${profile.email}`}
            className="inline-flex items-center justify-center gap-2.5 rounded-full bg-white px-8 py-4 text-lg font-medium text-[#0b0c10] transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            <MailIcon size={20} animateOnHover animateOnTap />
            Say hello.
          </RippleLink>

          <div className="mt-16 pt-10 border-t border-white/10 flex justify-center gap-8">
            <a
              href={profile.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/55 hover:text-white transition-colors flex items-center gap-1.5 font-medium text-base"
            >
              GitHub <ArrowUpRight size={16} />
            </a>
            <a
              href={profile.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/55 hover:text-white transition-colors flex items-center gap-1.5 font-medium text-base"
            >
              LinkedIn <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </Section>
  );
}
