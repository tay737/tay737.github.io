import { useEffect, useState } from 'react';
import { MotionConfig } from 'motion/react';
import { ThemeProvider } from './components/ThemeProvider';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Career } from './components/Career';
import { GitHubRepos } from './components/GitHubRepos';
import { Skills } from './components/Skills';
import { Certifications } from './components/Certifications';
import { Systems } from './components/Systems';
import { Setup } from './components/Setup';
import { Interests } from './components/Interests';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { SplashScreen } from './components/SplashScreen';
import { ScrollProgress } from './components/ScrollProgress';
import { SmoothCursor } from './components/ui/smooth-cursor';

export default function App() {
  const [splashFinished, setSplashFinished] = useState(false);

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  useEffect(() => {
    if (window.location.hash === '#design-system') {
      window.history.replaceState(null, '', window.location.pathname);
    }
  }, []);

  const handleReplaySplash = () => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    setSplashFinished(false);
  };

  return (
    <MotionConfig reducedMotion="user">
      <ThemeProvider defaultTheme="light">
        <div className="min-h-screen bg-background text-foreground">
          {!splashFinished && <SplashScreen onComplete={() => setSplashFinished(true)} />}

          <div className="ambient-glow" />
          <ScrollProgress />

          <Navbar onReplaySplash={handleReplaySplash} />

          <main>
            <Hero />
            <About />
            <Career />
            <GitHubRepos />
            <Skills />
            <Certifications />
            <Systems />
            <Setup />
            <Interests />
            <Contact />
          </main>

          <Footer />
          <SmoothCursor />
        </div>
      </ThemeProvider>
    </MotionConfig>
  );
}
