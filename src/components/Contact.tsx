import { Section } from './Section';
import { profile } from '../data';
import { Mail, ArrowUpRight } from 'lucide-react';

export function Contact() {
  return (
    <Section id="contact" title="Get in touch." subtitle="Let's connect. I'm always open to discussing new opportunities.">
      <div className="py-12 md:py-24 text-center max-w-3xl mx-auto border-t border-border">
        <h3 className="text-4xl md:text-5xl font-semibold mb-6 tracking-tight text-foreground">Interested?</h3>
        <p className="text-xl text-muted mb-12 max-w-xl mx-auto leading-relaxed font-normal tracking-tight">
          Whether you have a question, an idea, or just want to say hi, feel free to drop me a message.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a 
            href={`mailto:${profile.email}`} 
            className="px-8 py-4 bg-foreground text-background font-medium rounded-full flex items-center justify-center gap-2 hover:opacity-90 transition-opacity text-lg"
          >
            <Mail size={20} /> Say hello.
          </a>
        </div>
        
        <div className="mt-24 pt-12 border-t border-border flex justify-center gap-8">
          <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-foreground transition-colors flex items-center gap-1.5 font-medium text-base">
            GitHub <ArrowUpRight size={16} />
          </a>
          <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-foreground transition-colors flex items-center gap-1.5 font-medium text-base">
            LinkedIn <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
    </Section>
  );
}
