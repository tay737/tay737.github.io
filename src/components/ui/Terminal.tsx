import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Copy, Check } from 'lucide-react';

interface TerminalProps {
  command: string;
  output?: string[];
  username?: string;
  hostname?: string;
  workingDirectory?: string;
  showLocalhost?: boolean;
  localhostMessage?: string;
  className?: string;
}

export function Terminal({
  command,
  output = [],
  username = "tay",
  hostname = "htb",
  workingDirectory = "~",
  showLocalhost = false,
  localhostMessage = "localhost:3000 — development server ready",
  className = ""
}: TerminalProps) {
  const [isTyping, setIsTyping] = useState(true);
  const [typedCommand, setTypedCommand] = useState("");
  const [showOutput, setShowOutput] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let i = 0;
    setTypedCommand("");
    setShowOutput(false);
    setIsTyping(true);

    const typingInterval = setInterval(() => {
      if (i < command.length) {
        setTypedCommand(command.slice(0, i + 1));
        i++;
      } else {
        clearInterval(typingInterval);
        setIsTyping(false);
        setTimeout(() => setShowOutput(true), 300);
      }
    }, 50);

    return () => clearInterval(typingInterval);
  }, [command]);

  const handleCopy = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`rounded-xl overflow-hidden border border-border shadow-2xl bg-black/60 backdrop-blur-xl relative font-mono text-sm ${className}`}>
      <div 
        className="absolute inset-0 opacity-[0.015] pointer-events-none" 
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
      />
      
      <div className="h-10 bg-white/5 border-b border-white/5 flex items-center justify-between px-4 relative z-10">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-[#FF5F56] border border-black/20" />
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-black/20" />
          <div className="w-3 h-3 rounded-full bg-[#27C93F] border border-black/20" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="text-xs font-medium text-white/40 font-mono tracking-wide">
            {username}@{hostname} : {workingDirectory}
          </span>
        </div>
        <button 
          onClick={handleCopy} 
          className="text-white/40 hover:text-white/80 transition-colors z-10"
          aria-label="Copy command"
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
        </button>
      </div>

      <div className="p-5 text-[#d4d4d8] relative z-10 overflow-x-auto hide-scrollbar">
        <div className="flex items-center whitespace-nowrap mb-2">
          <span className="text-[#38bdf8] font-bold mr-2">{username}@{hostname}</span>
          <span className="text-white mr-2">{workingDirectory}</span>
          <span className="text-[#a1a1aa] mr-2">$</span>
          <span className="text-white">{typedCommand}</span>
          {isTyping && (
            <span className="inline-block w-2.5 h-4 bg-white/70 animate-pulse ml-1 align-middle" />
          )}
        </div>

        {showOutput && output.length > 0 && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="flex flex-col gap-1 mt-3"
          >
            {output.map((line, idx) => (
              <div key={idx} className="whitespace-nowrap opacity-90">{line}</div>
            ))}
            
            {showLocalhost && (
              <div className="mt-4 inline-flex items-center gap-2 text-[#50FA7B] bg-[#50FA7B]/10 px-3 py-1.5 rounded-md border border-[#50FA7B]/20">
                <span className="w-2 h-2 rounded-full bg-[#50FA7B] animate-pulse" />
                {localhostMessage}
              </div>
            )}
            
            <div className="flex items-center whitespace-nowrap mt-4">
              <span className="text-[#38bdf8] font-bold mr-2">{username}@{hostname}</span>
              <span className="text-white mr-2">{workingDirectory}</span>
              <span className="text-[#a1a1aa] mr-2">$</span>
              <span className="inline-block w-2.5 h-4 bg-white/70 animate-pulse ml-1 align-middle" />
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
