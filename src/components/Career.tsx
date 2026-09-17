import { Section } from './Section';
import { Network, ShieldAlert, Lock, Globe } from 'lucide-react';

export function Career() {
  const pursuits = [
    {
      icon: Network,
      title: "Network Engineering",
      focus: "Cisco · Azure AD / Entra ID · AWS",
    },
    {
      icon: ShieldAlert,
      title: "Offensive Security",
      focus: "Exploitation · PrivEsc · Password Attacks",
    },
    {
      icon: Lock,
      title: "Network Security",
      focus: "Nmap · Wireshark",
    },
    {
      icon: Globe,
      title: "Web Exploitation",
      focus: "Burp Suite · OWASP ZAP · ffuf",
    }
  ];

  return (
    <Section 
      id="career" 
      title="Areas I'm pursuing." 
      subtitle="Niches that intrigue me, and spark my passion further."
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
        {pursuits.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-black/[0.07] shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.06)] hover:border-black/[0.14] transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-[14px] bg-gradient-to-b from-white to-[#f5f5f7] border border-black/[0.08] shadow-[0_2px_8px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.9)] flex items-center justify-center text-[#1d1d1f]">
                    <Icon size={22} strokeWidth={2} />
                  </div>
                  <span className="text-[11px] font-medium tracking-tight text-[#86868b] uppercase">
                    0{index + 1}
                  </span>
                </div>

                <h3 className="text-xl font-semibold tracking-tight text-[#1d1d1f] leading-snug">
                  {item.title}
                </h3>
              </div>

              <div className="pt-4 mt-6 border-t border-black/[0.05]">
                <p className="text-xs font-medium text-[#6e6e73] tracking-tight">
                  {item.focus}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
