import { useState, useEffect } from 'react';
import { MotionConfig } from 'motion/react';
import { ThemeProvider } from './components/ThemeProvider';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Career } from './components/Career';
import { GitHubRepos } from './components/GitHubRepos';
import { Skills } from './components/Skills';
import { Systems } from './components/Systems';
import { Setup } from './components/Setup';
import { Interests } from './components/Interests';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { SplashScreen } from './components/SplashScreen';
import { ScrollProgress } from './components/ScrollProgress';

export default function App() {
  const [splashFinished, setSplashFinished] = useState(false);

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
    <MotionConfig reducedMotion="never">
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
            <Systems />
            <Setup />
            <Interests />
            <Contact />
          </main>
          
          <Footer />
        </div>
      </ThemeProvider>
    </MotionConfig>
  );
}
