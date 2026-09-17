import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Section } from './Section';
import { systems } from '../data';
import { FlagType } from '../types';
import { Laptop, Terminal as TerminalIcon, Monitor } from 'lucide-react';

const getFlagColors = (flag: FlagType) => {
  switch (flag) {
    case 'transgender': return ['#5BCEFA', '#F5A9B8', '#FFFFFF', '#F5A9B8', '#5BCEFA'];
    case 'nonbinary': return ['#FFF430', '#FFFFFF', '#9C59D1', '#000000'];
    case 'genderfluid': return ['#FF75A2', '#FFFFFF', '#BE18D6', '#000000', '#333EBD'];
    default: return ['#FFFFFF'];
  }
};

const ColoredAscii = ({ ascii, flag }: { ascii: string; flag: FlagType }) => {
  const palette = getFlagColors(flag);
  const parts = ascii.split(/(\$\d)/);
  let currentColor = palette[0];
  
  return (
    <pre className="font-mono text-[9px] xs:text-[10px] sm:text-xs md:text-sm leading-tight select-none m-0 p-0 text-left bg-transparent border-0 overflow-visible max-w-full">
      {parts.map((part, index) => {
        if (part.match(/^\$\d$/)) {
          const colorIndex = parseInt(part.substring(1), 10) - 1;
          currentColor = palette[colorIndex % palette.length];
          return null;
        }
        return <span key={index} style={{ color: currentColor }}>{part}</span>;
      })}
    </pre>
  );
};

const TerminalPrompt = ({ username, hostname, workingDirectory, isStart }: { username: string, hostname: string, workingDirectory: string, isStart: boolean }) => (
  <div className="font-mono text-xs sm:text-sm mb-3 leading-relaxed">
    <div className="hidden sm:block text-[#a1a1aa] whitespace-nowrap">
      <div>
        ┌─[<span className="text-[#38bdf8] font-bold">{username}@{hostname}</span>]─[<span className="text-white">{workingDirectory}</span>]
      </div>
      <div className="text-[#a1a1aa] flex items-center">
        └──╼ $<span className="text-white ml-1.5">{isStart ? 'hyfetch' : ''}</span>
        {!isStart && <span className="inline-block w-2 h-3.5 bg-white/70 animate-pulse ml-1.5 align-middle" />}
      </div>
    </div>

    <div className="sm:hidden flex items-center gap-1.5 text-xs text-[#a1a1aa]">
      <span className="text-[#38bdf8] font-semibold">{username}@{hostname}</span>
      <span>{workingDirectory} %</span>
      <span className="text-white font-medium">{isStart ? 'hyfetch' : ''}</span>
      {!isStart && <span className="inline-block w-1.5 h-3 bg-white/70 animate-pulse ml-0.5 align-middle" />}
    </div>
  </div>
);

export function Systems() {
  const [activeTab, setActiveTab] = useState(systems[0].id);
  const activeSystem = systems.find(s => s.id === activeTab) || systems[0];

  return (
    <Section id="systems" title="Operating systems." subtitle="My current daily-drivers.">
      <div className="flex justify-start sm:justify-center mb-8">
        <div className="inline-flex items-center p-1 bg-[#EBEBED] rounded-full border border-black/[0.06] shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)] overflow-x-auto hide-scrollbar max-w-full">
          {systems.map((sys) => {
            const isActive = activeTab === sys.id;
            return (
              <button
                key={sys.id}
                onClick={() => setActiveTab(sys.id)}
                className={`relative px-4 sm:px-6 py-2 text-xs sm:text-sm font-medium rounded-full transition-colors duration-200 whitespace-nowrap flex items-center gap-2 select-none ${
                  isActive ? 'text-[#1d1d1f] font-semibold' : 'text-[#6e6e73] hover:text-[#1d1d1f]'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="appleSystemSegmentedTab"
                    className="absolute inset-0 bg-white rounded-full shadow-[0_1px_3px_rgba(0,0,0,0.1),0_4px_12px_rgba(0,0,0,0.05)] border border-black/[0.04]"
                    transition={{ type: "spring", stiffness: 450, damping: 35 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  {sys.id.includes('mac') && <Laptop size={14} className={isActive ? 'text-[#1d1d1f]' : 'text-[#86868b]'} />}
                  {sys.id.includes('vm') && <TerminalIcon size={14} className={isActive ? 'text-[#1d1d1f]' : 'text-[#86868b]'} />}
                  {sys.id.includes('pc') && <Monitor size={14} className={isActive ? 'text-[#1d1d1f]' : 'text-[#86868b]'} />}
                  <span>{sys.displayName}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="rounded-2xl sm:rounded-3xl overflow-hidden border border-black/10 shadow-[0_20px_50px_rgba(0,0,0,0.14)] bg-[#18181b] text-[#d4d4d8] relative max-w-full">
        <div className="h-10 bg-[#242429] border-b border-white/[0.08] flex items-center px-4 justify-between relative z-10 select-none">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#FF5F56] border border-black/20" />
            <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-black/20" />
            <div className="w-3 h-3 rounded-full bg-[#27C93F] border border-black/20" />
          </div>
          
          <div className="text-[11px] sm:text-xs font-medium text-white/55 font-mono truncate px-2">
            {activeSystem.displayName.toLowerCase()} — {activeSystem.terminal.username}@{activeSystem.terminal.hostname}
          </div>
          
          <div className="w-12 flex justify-end">
            <span className="text-[10px] font-mono text-white/35 hidden sm:inline">zsh</span>
          </div>
        </div>
        
        <div className="p-4 sm:p-6 md:p-8 relative z-10 w-full overflow-hidden">
          <div className="w-full">
            <div className="grid grid-cols-1 grid-rows-1">
              <AnimatePresence initial={false} mode="wait">
                <motion.div
                  key={activeSystem.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className="col-start-1 row-start-1 flex flex-col w-full"
                >
                  <TerminalPrompt {...activeSystem.terminal} isStart={true} />
                  
                  <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8 my-2 w-full">
                    <div className="flex-shrink-0 flex justify-center w-full md:w-auto overflow-hidden py-1">
                      <ColoredAscii ascii={activeSystem.ascii} flag={activeSystem.flag} />
                    </div>

                    <div className="flex-grow font-mono text-xs sm:text-sm w-full min-w-0">
                      <div className="mb-0.5 text-xs sm:text-sm">
                        <span style={{ color: getFlagColors(activeSystem.flag)[0] }} className="font-bold">
                          {activeSystem.terminal.username}
                        </span>
                        <span className="text-[#a1a1aa]">@</span>
                        <span style={{ color: getFlagColors(activeSystem.flag)[0] }} className="font-bold">
                          {activeSystem.terminal.hostname}
                        </span>
                      </div>
                      
                      <div className="text-[#a1a1aa] mb-2.5 select-none text-xs">
                        {Array.from({ length: Math.min(activeSystem.terminal.username.length + activeSystem.terminal.hostname.length + 1, 32) }).map(() => '-').join('')}
                      </div>
                      
                      <div className="flex flex-col gap-1 w-full">
                        {activeSystem.systemInfo.map((info, idx) => (
                          <div key={idx} className="flex flex-wrap sm:flex-nowrap items-baseline gap-x-2 text-[11px] sm:text-xs md:text-sm leading-snug">
                            <span className="font-bold select-none flex-shrink-0" style={{ color: getFlagColors(activeSystem.flag)[0] }}>
                              {info.label}:
                            </span>
                            <span className="text-white/90 break-words min-w-0">
                              {info.value}
                            </span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-4 flex gap-1 select-none">
                        <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 bg-[#1E1E1E] rounded-xs" />
                        <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 bg-[#FF5555] rounded-xs" />
                        <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 bg-[#50FA7B] rounded-xs" />
                        <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 bg-[#F1FA8C] rounded-xs" />
                        <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 bg-[#BD93F9] rounded-xs" />
                        <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 bg-[#FF79C6] rounded-xs" />
                        <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 bg-[#8BE9FD] rounded-xs" />
                        <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 bg-[#F8F8F2] rounded-xs" />
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <TerminalPrompt {...activeSystem.terminal} isStart={false} />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-6 min-h-[24px] flex items-center justify-center">
        <p className="text-sm text-[#86868b] text-center max-w-2xl mx-auto leading-relaxed">
          {activeSystem.role}
        </p>
      </div>
    </Section>
  );
}
