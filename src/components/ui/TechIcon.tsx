import { CIcon } from '@coreui/icons-react';
import {
  cibNginx,
  cibDocker,
  cibGit,
  cibLinux,
  cibPython,
  cibPostgresql,
  cibReact,
  cibJavascript,
  cibTypescript,
  cibHtml5,
  cibCss3,
  cibWireguard,
  cibLua,
  cibDotNet,
  cibGnu,
  cibNextJs,
  cibDebian,
  cibApple,
  cibWindows,
  cilTerminal,
  cilShieldAlt,
  cilBug,
  cilSearch,
  cilLan,
  cilBolt,
  cilTriangle,
  cilFlagAlt,
  cilLockLocked,
  cilCode,
} from '@coreui/icons';

interface TechIconProps {
  name: string;
  className?: string;
}

export function TechIcon({ name, className = "w-5 h-5" }: TechIconProps) {
  const norm = name.toLowerCase().trim();
  const iconClass = `${className} text-[#1d1d1f] fill-current shrink-0`;

  if (norm.includes('nginx')) {
    return <CIcon icon={cibNginx} className={iconClass} style={{ color: '#1d1d1f' }} />;
  }
  if (norm.includes('docker') || norm.includes('container')) {
    return <CIcon icon={cibDocker} className={iconClass} style={{ color: '#1d1d1f' }} />;
  }
  if (norm.includes('git')) {
    return <CIcon icon={cibGit} className={iconClass} style={{ color: '#1d1d1f' }} />;
  }
  if (norm.includes('wireguard') || norm.includes('vpn')) {
    return <CIcon icon={cibWireguard} className={iconClass} style={{ color: '#1d1d1f' }} />;
  }
  if (norm.includes('postgres') || norm.includes('sql') || norm.includes('database')) {
    return <CIcon icon={cibPostgresql} className={iconClass} style={{ color: '#1d1d1f' }} />;
  }
  if (norm.includes('linux')) {
    return <CIcon icon={cibLinux} className={iconClass} style={{ color: '#1d1d1f' }} />;
  }

  if (norm.includes('python')) {
    return <CIcon icon={cibPython} className={iconClass} style={{ color: '#1d1d1f' }} />;
  }
  if (norm.includes('react')) {
    return <CIcon icon={cibReact} className={iconClass} style={{ color: '#1d1d1f' }} />;
  }
  if (norm.includes('typescript') || norm === 'ts') {
    return <CIcon icon={cibTypescript} className={iconClass} style={{ color: '#1d1d1f' }} />;
  }
  if (norm.includes('javascript') || norm === 'js') {
    return <CIcon icon={cibJavascript} className={iconClass} style={{ color: '#1d1d1f' }} />;
  }
  if (norm.includes('html')) {
    return <CIcon icon={cibHtml5} className={iconClass} style={{ color: '#1d1d1f' }} />;
  }
  if (norm.includes('css')) {
    return <CIcon icon={cibCss3} className={iconClass} style={{ color: '#1d1d1f' }} />;
  }
  if (norm.includes('c#') || norm.includes('csharp') || norm.includes('dotnet') || norm.includes('.net')) {
    return <CIcon icon={cibDotNet} className={iconClass} style={{ color: '#1d1d1f' }} />;
  }
  if (norm.includes('lua')) {
    return <CIcon icon={cibLua} className={iconClass} style={{ color: '#1d1d1f' }} />;
  }
  if (norm.includes('bash') || norm.includes('shell')) {
    return <CIcon icon={cibGnu} className={iconClass} style={{ color: '#1d1d1f' }} />;
  }
  if (norm.includes('terminal')) {
    return <CIcon icon={cilTerminal} className={iconClass} style={{ color: '#1d1d1f' }} />;
  }
  if (norm.includes('vite')) {
    return <CIcon icon={cilBolt} className={iconClass} style={{ color: '#1d1d1f' }} />;
  }
  if (norm.includes('vercel')) {
    return <CIcon icon={cilTriangle} className={iconClass} style={{ color: '#1d1d1f' }} />;
  }
  if (norm.includes('next')) {
    return <CIcon icon={cibNextJs} className={iconClass} style={{ color: '#1d1d1f' }} />;
  }

  if (norm.includes('parrot') || norm.includes('kali') || norm.includes('debian')) {
    return <CIcon icon={cibDebian} className={iconClass} style={{ color: '#1d1d1f' }} />;
  }
  if (norm.includes('apple') || norm.includes('mac') || norm.includes('macos')) {
    return <CIcon icon={cibApple} className={iconClass} style={{ color: '#1d1d1f' }} />;
  }
  if (norm.includes('windows')) {
    return <CIcon icon={cibWindows} className={iconClass} style={{ color: '#1d1d1f' }} />;
  }

  if (norm.includes('owasp') || norm.includes('security') || norm.includes('vulnerability') || norm.includes('penetration')) {
    return <CIcon icon={cilShieldAlt} className={iconClass} style={{ color: '#1d1d1f' }} />;
  }
  if (norm.includes('metasploit') || norm.includes('exploit') || norm.includes('bug')) {
    return <CIcon icon={cilBug} className={iconClass} style={{ color: '#1d1d1f' }} />;
  }
  if (norm.includes('nmap') || norm.includes('recon') || norm.includes('scan')) {
    return <CIcon icon={cilSearch} className={iconClass} style={{ color: '#1d1d1f' }} />;
  }
  if (norm.includes('wireshark') || norm.includes('networking') || norm.includes('network') || norm.includes('packet')) {
    return <CIcon icon={cilLan} className={iconClass} style={{ color: '#1d1d1f' }} />;
  }
  if (norm.includes('burp') || norm.includes('proxy') || norm.includes('lock')) {
    return <CIcon icon={cilLockLocked} className={iconClass} style={{ color: '#1d1d1f' }} />;
  }
  if (norm.includes('ctf') || norm.includes('tryhackme') || norm.includes('pico') || norm.includes('hack the box') || norm.includes('htb')) {
    return <CIcon icon={cilFlagAlt} className={iconClass} style={{ color: '#1d1d1f' }} />;
  }
  if (norm.includes('markdown') || norm.includes('code')) {
    return <CIcon icon={cilCode} className={iconClass} style={{ color: '#1d1d1f' }} />;
  }

  return <CIcon icon={cilCode} className={iconClass} style={{ color: '#1d1d1f' }} />;
}
