import { Section } from './Section';
import { projects } from '../data';
import { ExternalLink, Github, Lock, Beaker, Clock } from 'lucide-react';
import { FadeText } from './ui/FadeText';
import { TechBadge } from './ui/TechBadge';

export function Projects() {
  const getBadgeIcon = (type: string) => {
    switch(type) {
      case 'private': return <Lock size={14} />;
      case 'experiment': return <Beaker size={14} />;
      case 'coming-soon': return <Clock size={14} />;
      default: return null;
    }
  };
  
  const getBadgeText = (type: string) => {
    switch(type) {
      case 'private': return 'Private Project';
      case 'experiment': return 'Experiment';
      case 'coming-soon': return 'Coming Soon';
      default: return 'Public';
    }
  };

  return (
    <Section id="projects" title="Projects." subtitle="A mix of tools, automation scripts, and full-stack web applications." >
      <div className="flex flex-col gap-32 md:gap-48">
        {projects.map((project, index) => (
          <div 
            key={index} 
            className="flex flex-col md:grid md:grid-cols-12 gap-12 md:gap-16 items-center"
          >
            {project.image ? (
              <>
                <div className={`md:col-span-6 lg:col-span-7 ${index % 2 === 1 ? 'md:order-last' : ''}`}>
                  <div className="rounded-2xl overflow-hidden glass-card p-2">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-auto object-cover rounded-[14px]"
                    />
                  </div>
                </div>
                <div className="md:col-span-6 lg:col-span-5 flex flex-col justify-center">
                  <FadeText direction="up">
                    <div className="flex flex-wrap items-center gap-3 text-sm font-medium text-muted mb-6">
                      <span className="px-3 py-1.5 rounded-full glass">{project.year}</span>
                      <span className="px-3 py-1.5 rounded-full glass flex items-center gap-1.5">
                        {getBadgeIcon(project.type)} {getBadgeText(project.type)}
                      </span>
                    </div>
                    <h3 className="text-4xl lg:text-5xl font-semibold mb-6 tracking-tight text-foreground">{project.title}</h3>
                    <p className="text-xl text-muted leading-relaxed mb-8 font-normal tracking-tight">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap items-center gap-2 mb-10">
                      {project.technologies.map((tech) => (
                        <TechBadge key={tech} name={tech} />
                      ))}
                    </div>

                    <div className="flex items-center gap-6">
                      {project.demo && (
                        <a 
                          href={project.demo} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium glass border border-border/80 hover:border-foreground/40 hover:bg-foreground/5 text-foreground transition-all duration-200 active:scale-[0.98] shadow-sm group"
                        >
                          <span>View Live</span>
                          <ExternalLink size={15} className="text-muted group-hover:text-foreground transition-colors" />
                        </a>
                      )}
                      {project.github && project.type !== 'private' && (
                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-base font-medium hover:text-[#5BCEFA] transition-colors flex items-center gap-2">
                          GitHub <Github size={18} />
                        </a>
                      )}
                    </div>
                  </FadeText>
                </div>
              </>
            ) : (
              <div className="md:col-span-12 max-w-4xl mx-auto w-full">
                <FadeText direction="up" className="glass-card p-10 md:p-16">
                  <div className="flex flex-wrap items-center gap-3 text-sm font-medium text-muted mb-6">
                    <span className="px-3 py-1.5 rounded-full glass">{project.year}</span>
                    <span className="px-3 py-1.5 rounded-full glass flex items-center gap-1.5">
                      {getBadgeIcon(project.type)} {getBadgeText(project.type)}
                    </span>
                  </div>
                  <h3 className="text-4xl lg:text-5xl font-semibold mb-6 tracking-tight text-foreground">{project.title}</h3>
                  <p className="text-xl text-muted leading-relaxed mb-8 font-normal tracking-tight">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap items-center gap-2 mb-10">
                    {project.technologies.map((tech) => (
                      <TechBadge key={tech} name={tech} />
                    ))}
                  </div>

                  <div className="flex items-center gap-6">
                    {project.demo && (
                      <a 
                        href={project.demo} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium glass border border-border/80 hover:border-foreground/40 hover:bg-foreground/5 text-foreground transition-all duration-200 active:scale-[0.98] shadow-sm group"
                      >
                        <span>View Live</span>
                        <ExternalLink size={15} className="text-muted group-hover:text-foreground transition-colors" />
                      </a>
                    )}
                    {project.github && project.type !== 'private' && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-base font-medium hover:text-[#5BCEFA] transition-colors flex items-center gap-2">
                        GitHub <Github size={18} />
                      </a>
                    )}
                  </div>
                </FadeText>
              </div>
            )}
          </div>
        ))}
      </div>
    </Section>
  );
}
