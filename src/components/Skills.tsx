import { Section } from './Section';
import { TechIcon } from './ui/TechIcon';
import { ArrowUpRight } from 'lucide-react';

interface SkillItem {
  name: string;
  url: string;
  iconName: string;
}

const ctfPlatforms = [
  { name: "Hack The Box", url: "https://www.hackthebox.com", iconName: "hack the box" },
  { name: "TryHackMe", url: "https://tryhackme.com", iconName: "tryhackme" },
  { name: "PicoCTF", url: "https://picoctf.org", iconName: "picoctf" },
];

const cybersecuritySkills: SkillItem[] = [
  { name: "Burp Suite", url: "https://portswigger.net/burp", iconName: "burp" },
  { name: "OWASP Top 10", url: "https://owasp.org", iconName: "owasp" },
  { name: "Parrot OS", url: "https://www.parrotsec.org", iconName: "parrot" },
  { name: "Kali Linux", url: "https://www.kali.org", iconName: "kali" },
  { name: "Metasploit", url: "https://www.metasploit.com", iconName: "metasploit" },
  { name: "Nmap", url: "https://nmap.org", iconName: "nmap" },
  { name: "Wireshark", url: "https://www.wireshark.org", iconName: "wireshark" },
];

const languageSkills: SkillItem[] = [
  { name: "TypeScript", url: "https://www.typescriptlang.org", iconName: "typescript" },
  { name: "JavaScript", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript", iconName: "javascript" },
  { name: "React", url: "https://react.dev", iconName: "react" },
  { name: "Vite", url: "https://vite.dev", iconName: "vite" },
  { name: "HTML / CSS", url: "https://developer.mozilla.org/en-US/docs/Web/HTML", iconName: "html" },
  { name: "Python", url: "https://www.python.org", iconName: "python" },
  { name: "Bash", url: "https://www.gnu.org/software/bash/", iconName: "bash" },
  { name: "C#", url: "https://learn.microsoft.com/en-us/dotnet/csharp/", iconName: "c#" },
  { name: "Lua", url: "https://www.lua.org", iconName: "lua" },
];

const infrastructureSkills: SkillItem[] = [
  { name: "Linux", url: "https://www.kernel.org", iconName: "linux" },
  { name: "Docker", url: "https://www.docker.com", iconName: "docker" },
  { name: "Vercel", url: "https://vercel.com", iconName: "vercel" },
  { name: "WireGuard", url: "https://www.wireguard.com", iconName: "wireguard" },
  { name: "Git", url: "https://git-scm.com", iconName: "git" },
  { name: "PostgreSQL", url: "https://www.postgresql.org", iconName: "postgres" },
  { name: "Nginx", url: "https://nginx.org", iconName: "nginx" },
];

export function Skills() {
  return (
    <Section id="skills" title="Technical skills." subtitle="Technologies and tools I work with daily.">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-black/[0.07] shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_36px_rgba(0,0,0,0.06)] hover:border-black/[0.12] transition-all duration-200 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-semibold tracking-tight text-[#1d1d1f] mb-5">
              Cybersecurity & Exploitation
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5 mb-3.5">
              {cybersecuritySkills.map((skill) => (
                <a
                  key={skill.name}
                  href={skill.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between p-3 rounded-2xl bg-[#fafafc] hover:bg-[#f2f2f5] border border-black/[0.04] hover:border-black/[0.12] transition-all duration-200"
                  title={`Visit official ${skill.name} website`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-[10px] bg-gradient-to-b from-white to-[#f6f6f9] border border-black/[0.08] shadow-[0_1px_3px_rgba(0,0,0,0.05),inset_0_1px_0_rgba(255,255,255,0.9)] flex items-center justify-center p-1.5 flex-shrink-0">
                      <TechIcon name={skill.iconName} className="w-4 h-4 sm:w-5 sm:h-5 object-contain" />
                    </div>
                    <span className="text-sm font-medium text-[#1d1d1f] tracking-tight truncate">
                      {skill.name}
                    </span>
                  </div>

                  <ArrowUpRight
                    size={15}
                    className="text-[#86868b] opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 flex-shrink-0 ml-2"
                  />
                </a>
              ))}
            </div>

            <div className="p-3.5 rounded-2xl bg-[#fafafc] border border-black/[0.04]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-[#1d1d1f] tracking-tight">
                  CTFs & Lab Platforms
                </span>
                <span className="text-[10px] text-[#86868b] font-medium">Practice</span>
              </div>
              
              <div className="flex items-center gap-1.5 flex-wrap">
                {ctfPlatforms.map((platform) => (
                  <a
                    key={platform.name}
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-white border border-black/[0.06] hover:border-black/25 text-xs font-medium text-[#1d1d1f] transition-all duration-150 shadow-[0_1px_3px_rgba(0,0,0,0.03)]"
                    title={`Visit ${platform.name}`}
                  >
                    <TechIcon name={platform.iconName} className="w-3.5 h-3.5" />
                    <span>{platform.name}</span>
                    <ArrowUpRight size={11} className="text-[#86868b] opacity-50 group-hover:opacity-100" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-black/[0.07] shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_36px_rgba(0,0,0,0.06)] hover:border-black/[0.12] transition-all duration-200 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-semibold tracking-tight text-[#1d1d1f] mb-5">
              Languages & Frontend
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5">
              {languageSkills.map((skill) => (
                <a
                  key={skill.name}
                  href={skill.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between p-3 rounded-2xl bg-[#fafafc] hover:bg-[#f2f2f5] border border-black/[0.04] hover:border-black/[0.12] transition-all duration-200"
                  title={`Visit official ${skill.name} website`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-[10px] bg-gradient-to-b from-white to-[#f6f6f9] border border-black/[0.08] shadow-[0_1px_3px_rgba(0,0,0,0.05),inset_0_1px_0_rgba(255,255,255,0.9)] flex items-center justify-center p-1.5 flex-shrink-0">
                      <TechIcon name={skill.iconName} className="w-4 h-4 sm:w-5 sm:h-5 object-contain" />
                    </div>
                    <span className="text-sm font-medium text-[#1d1d1f] tracking-tight truncate">
                      {skill.name}
                    </span>
                  </div>

                  <ArrowUpRight
                    size={15}
                    className="text-[#86868b] opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 flex-shrink-0 ml-2"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-black/[0.07] shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_36px_rgba(0,0,0,0.06)] hover:border-black/[0.12] transition-all duration-200 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-semibold tracking-tight text-[#1d1d1f] mb-5">
              Systems & Infrastructure
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5">
              {infrastructureSkills.map((skill) => (
                <a
                  key={skill.name}
                  href={skill.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between p-3 rounded-2xl bg-[#fafafc] hover:bg-[#f2f2f5] border border-black/[0.04] hover:border-black/[0.12] transition-all duration-200"
                  title={`Visit official ${skill.name} website`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-[10px] bg-gradient-to-b from-white to-[#f6f6f9] border border-black/[0.08] shadow-[0_1px_3px_rgba(0,0,0,0.05),inset_0_1px_0_rgba(255,255,255,0.9)] flex items-center justify-center p-1.5 flex-shrink-0">
                      <TechIcon name={skill.iconName} className="w-4 h-4 sm:w-5 sm:h-5 object-contain" />
                    </div>
                    <span className="text-sm font-medium text-[#1d1d1f] tracking-tight truncate">
                      {skill.name}
                    </span>
                  </div>

                  <ArrowUpRight
                    size={15}
                    className="text-[#86868b] opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 flex-shrink-0 ml-2"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
