import { useState, useEffect, MouseEvent } from 'react';
import { motion } from 'motion/react';
import { Fingerprint, FolderGit2, Terminal, Laptop, Mail } from 'lucide-react';
import { Dock, DockIcon } from './ui/dock';
import { profile } from '../data';

interface NavbarProps {
  onReplaySplash?: () => void;
}

export function Navbar({ onReplaySplash }: NavbarProps) {
  const [isPastHero, setIsPastHero] = useState(false);
  const [activeSection, setActiveSection] = useState('about');

  useEffect(() => {
    const handleScroll = () => {
      const heroEl = document.getElementById('hero');
      if (heroEl) {
        const rect = heroEl.getBoundingClientRect();
        setIsPastHero(rect.bottom <= 80);
      } else {
        setIsPastHero(window.scrollY > 380);
      }

      const sections = ['about', 'career', 'projects', 'skills', 'systems', 'setup', 'interests', 'contact'];
      const scrollPos = window.scrollY + 200;
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            if (sectionId === 'career') {
              setActiveSection('about');
            } else if (sectionId === 'skills') {
              setActiveSection('projects');
            } else if (sectionId === 'interests') {
              setActiveSection('setup');
            } else {
              setActiveSection(sectionId);
            }
            break;
          }
        }
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about', id: 'about', icon: Fingerprint },
    { name: 'Projects', href: '#projects', id: 'projects', icon: FolderGit2 },
    { name: 'Setups', href: '#systems', id: 'systems', icon: Terminal },
    { name: 'Hardware', href: '#setup', id: 'setup', icon: Laptop },
    { name: 'Contact', href: '#contact', id: 'contact', icon: Mail },
  ];

  const handleNavClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <div 
        className={`hidden md:flex fixed top-0 left-0 right-0 z-50 justify-center pointer-events-none transition-all duration-300 ${
          isPastHero ? 'pt-4 px-4' : 'pt-6 px-6'
        }`}
      >
        <motion.header 
          layout
          transition={{ 
            type: "spring", 
            stiffness: 380, 
            damping: 32,
            mass: 0.8
          }}
          className={`pointer-events-auto flex items-center justify-between rounded-full transition-all duration-300 ${
            isPastHero
              ? 'py-2 px-5 bg-white/85 backdrop-blur-2xl border border-black/10 shadow-[0_8px_30px_rgba(0,0,0,0.08)] gap-6'
              : 'py-2.5 px-7 bg-white/70 backdrop-blur-xl border border-black/[0.06] shadow-[0_2px_12px_rgba(0,0,0,0.03)] gap-10'
          }`}
        >
          <button 
            type="button"
            onClick={(e) => {
              e.preventDefault();
              onReplaySplash?.();
            }}
            className="font-bold tracking-tight text-[#1d1d1f] select-none cursor-pointer hover:opacity-75 active:scale-95 transition-all duration-200"
            title="Return to top & replay splash screen"
          >
            <span className={`transition-all duration-200 ${isPastHero ? 'text-xs' : 'text-sm'}`}>
              {profile.name || "tay"}
            </span>
          </button>

          <nav className="flex items-center gap-1.5">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a 
                  key={link.name} 
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`font-medium transition-all duration-200 rounded-full select-none ${
                    isPastHero 
                      ? 'text-xs px-3 py-1' 
                      : 'text-sm px-3.5 py-1.5'
                  } ${
                    isActive 
                      ? 'text-[#1d1d1f] bg-black/[0.06] font-semibold' 
                      : 'text-[#86868b] hover:text-[#1d1d1f] hover:bg-black/[0.03]'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>
        </motion.header>
      </div>

      <div className="md:hidden fixed top-0 left-0 right-0 z-40 px-5 pt-4 pb-2 flex justify-between items-center pointer-events-none">
        <button 
          type="button"
          onClick={(e) => {
            e.preventDefault();
            onReplaySplash?.();
          }}
          className="pointer-events-auto inline-flex items-center py-1.5 px-3.5 rounded-full bg-white/90 backdrop-blur-2xl border border-black/[0.08] shadow-[0_2px_10px_rgba(0,0,0,0.04)] text-xs font-semibold text-[#1d1d1f] cursor-pointer active:scale-95 transition-transform"
          title="Return to top & replay splash screen"
        >
          <span>{profile.name || "tay"}</span>
        </button>
      </div>

      <div className="md:hidden fixed bottom-5 inset-x-0 z-50 flex justify-center pointer-events-none px-2">
        <nav aria-label="Mobile Navigation" className="pointer-events-auto">
          <Dock
            iconSize={42}
            iconMagnification={56}
            iconDistance={120}
            className="mt-0 h-[62px] gap-1.5 rounded-[26px] border-black/[0.08] bg-white/85 px-2.5 py-2 shadow-[0_12px_36px_rgba(0,0,0,0.12),0_1px_2px_rgba(0,0,0,0.04)] backdrop-blur-3xl"
          >
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeSection === link.id;

              return (
                <DockIcon
                  key={link.id}
                  title={link.name}
                  className={
                    isActive
                      ? 'bg-[#1d1d1f] text-white shadow-[0_4px_12px_rgba(0,0,0,0.18)]'
                      : 'text-[#86868b] hover:bg-black/[0.04] hover:text-[#1d1d1f]'
                  }
                >
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    aria-label={link.name}
                    aria-current={isActive ? 'page' : undefined}
                    className="flex h-full w-full items-center justify-center rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5BCEFA]"
                  >
                    <Icon size={19} strokeWidth={isActive ? 2.2 : 1.7} />
                  </a>
                </DockIcon>
              );
            })}
          </Dock>
        </nav>
      </div>
    </>
  );
}
