import { Section } from './Section';
import { profile } from '../data';
import { MapPin, Mail, Github, Linkedin } from 'lucide-react';

export function About() {
  return (
    <Section id="about">
      <div className="grid md:grid-cols-12 gap-12 md:gap-20">
        <div className="md:col-span-4">
          <div className="w-24 h-24 rounded-full bg-background border border-border flex items-center justify-center mb-6 relative overflow-hidden group shadow-sm">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#5BCEFA]/20 via-[#F5A9B8]/20 to-[#FFFFFF]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <span className="text-3xl font-bold relative z-10">{profile.name.charAt(0) !== '[' ? profile.name.charAt(0).toUpperCase() : 'Me'}</span>
          </div>
          <h3 className="text-2xl font-semibold mb-2">{profile.name}</h3>
          <div className="text-muted text-lg mb-8 flex items-center gap-2">
            <MapPin size={18} />
            <span>{profile.location}</span>
          </div>
          
          <div className="space-y-4 text-base font-medium">
            <div className="flex items-center gap-3">
              <Mail size={18} className="text-muted" />
              <a href={`mailto:${profile.email}`} className="hover:text-foreground transition-colors">{profile.email}</a>
            </div>
            <div className="flex items-center gap-3">
              <Github size={18} className="text-muted" />
              <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">GitHub</a>
            </div>
            <div className="flex items-center gap-3">
              <Linkedin size={18} className="text-muted" />
              <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">LinkedIn</a>
            </div>
          </div>
        </div>
        
        <div className="md:col-span-8">
          <div className="max-w-3xl">
            <h3 className="text-3xl font-semibold mb-6 tracking-tight text-foreground">Where did it all start?</h3>
            <p className="text-xl leading-relaxed text-muted mb-12 font-normal tracking-tight">{profile.about.intro}</p>
            
            <h3 className="text-3xl font-semibold mb-6 tracking-tight text-foreground">What am I doing now?</h3>
            <p className="text-xl leading-relaxed text-muted font-normal tracking-tight">{profile.about.personality}</p>
          </div>
        </div>
      </div>
    </Section>
  );
}
