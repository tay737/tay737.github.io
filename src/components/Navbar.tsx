import { useState, useEffect, MouseEvent } from 'react';
import { motion } from 'motion/react';
import { Fingerprint, FolderGit2, Terminal, Laptop, Mail } from 'lucide-react';
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

      <div className="md:hidden fixed bottom-5 left-0 right-0 z-50 flex justify-center pointer-events-none px-4">
        <nav 
          aria-label="Mobile Navigation"
          className="pointer-events-auto flex items-center justify-around gap-1 p-1.5 bg-[#ffffff]/85 backdrop-blur-3xl border border-black/[0.08] rounded-[26px] shadow-[0_12px_36px_rgba(0,0,0,0.12),0_1px_2px_rgba(0,0,0,0.04)] w-full max-w-[390px]"
        >
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = activeSection === link.id;

            return (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`relative flex flex-col items-center justify-center flex-1 py-1 px-1 rounded-[20px] transition-all duration-200 ${
                  isActive ? 'text-[#000000]' : 'text-[#86868b] hover:text-[#1d1d1f]'
                }`}
                style={{ minHeight: '46px' }}
              >
                {isActive && (
                  <motion.div
                    layoutId="mobileNavActivePill"
                    className="absolute inset-0 bg-black/[0.06] rounded-[20px]"
                    transition={{ type: "spring", stiffness: 450, damping: 35 }}
                  />
                )}
                <span className="relative z-10 flex flex-col items-center gap-0.5">
                  <div className={`p-1 rounded-[8px] transition-colors ${isActive ? 'text-[#000000]' : 'text-[#86868b]'}`}>
                    <Icon size={18} strokeWidth={isActive ? 2.2 : 1.7} />
                  </div>
                  <span className={`text-[10px] tracking-tight ${isActive ? 'font-semibold text-[#000000]' : 'font-medium text-[#86868b]'}`}>
                    {link.name}
                  </span>
                </span>
              </a>
            );
          })}
        </nav>
      </div>
    </>
  );
}
