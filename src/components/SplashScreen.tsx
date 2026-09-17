import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const GREETINGS = [
  { text: 'Hello.', sub: 'Welcome to my portfolio.' },
  { text: 'Bonjour.', sub: 'Bienvenue sur mon portfolio.' },
  { text: 'Hola.', sub: 'Bienvenido a mi portafolio.' },
  { text: 'Ciao.', sub: 'Benvenuto nel mio portfolio.' },
  { text: 'Hallo.', sub: 'Willkommen in meinem Portfolio.' },
  { text: 'Olá.', sub: 'Bem-vindo ao meu portfólio.' },
  { text: 'こんにちは。', sub: 'ポートフォリオへようこそ。' },
  { text: '안녕하세요.', sub: '포트폴리오에 오신 것을 환영합니다.' },
  { text: '你好。', sub: '欢迎访问我的作品集。' },
  { text: '你好。', sub: '歡迎蒞臨我嘅個人作品集。' },
  { text: 'Привет.', sub: 'Добро пожаловать в моё портфолио.' },
  { text: 'Привіт.', sub: 'Ласкаво просимо до мого портфоліо.' },
  { text: 'خوش آمدید۔', sub: 'میرے پورٹ فولیو میں خوش آمدید۔' },
  { text: 'नमस्ते।', sub: 'मेरे पोर्टफोलियो में आपका स्वागत है।' },
  { text: 'ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ।', sub: 'ਮੇਰੇ ਪੋਰਟਫੋਲੀਓ ਵਿੱਚ ਤੁਹਾਡਾ ਸਵਾਗਤ ਹੈ।' },
  { text: 'Salut.', sub: 'Bine ai venit pe portofoliul meu.' },
  { text: 'Здраво.', sub: 'Добродошли у мој портфолио.' },
  { text: 'Ahoj.', sub: 'Vitajte v mojom portfóliu.' },
  { text: 'Welkom.', sub: 'Welkom op mijn portfolio.' },
  { text: 'Cześć.', sub: 'Witaj w moim portfolio.' },
  { text: 'Merhaba.', sub: 'Portfolyoma hoş geldiniz.' },
];

interface SplashScreenProps {
  onComplete?: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [greeting] = useState(() => {
    const idx = Math.floor(Math.random() * GREETINGS.length);
    return GREETINGS[idx];
  });

  const [isVisible, setIsVisible] = useState(true);

  const handleFinish = useCallback(() => {
    setIsVisible(false);
    document.body.style.overflow = '';
    setTimeout(() => {
      onComplete?.();
    }, 1000);
  }, [onComplete]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === ' ' || e.key === 'Enter') {
        handleFinish();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleFinish]);

  useEffect(() => {
    if (!isVisible) return;

    const timer = setTimeout(() => {
      handleFinish();
    }, 2400);

    return () => clearTimeout(timer);
  }, [isVisible, handleFinish]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            filter: 'blur(20px)',
            transition: { 
              duration: 1.0, 
              ease: [0.16, 1, 0.3, 1] 
            } 
          }}
          onClick={handleFinish}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background text-foreground cursor-pointer select-none overflow-hidden transition-colors duration-300"
          style={{ willChange: 'opacity, filter' }}
          role="dialog"
          aria-label="Welcome greeting"
        >
          <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
            <div className="w-[640px] h-[640px] rounded-full bg-foreground/[0.025] blur-3xl" />
          </div>

          <div className="relative z-10 flex flex-col items-center justify-center px-6 text-center max-w-2xl mx-auto w-full">
            <motion.h1
              initial={{ opacity: 0, filter: 'blur(20px)', scale: 0.96 }}
              animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
              exit={{ opacity: 0, filter: 'blur(16px)', scale: 1.02 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              dir="auto"
              className="text-5xl sm:text-7xl md:text-8xl font-semibold tracking-tighter text-foreground leading-tight mb-3 select-none text-center"
            >
              {greeting.text}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, filter: 'blur(12px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, filter: 'blur(10px)' }}
              transition={{ duration: 1.2, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              dir="auto"
              className="text-lg sm:text-xl md:text-2xl text-muted font-normal tracking-tight text-center"
            >
              {greeting.sub}
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
