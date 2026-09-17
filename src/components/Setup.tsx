import { Section } from './Section';
import { setups } from '../data';
import { Monitor, Cpu, Keyboard, Mouse, Headphones, Mic, HardDrive } from 'lucide-react';

export function Setup() {
  const getIconForPeripheral = (type: string) => {
    const t = type.toLowerCase();
    if (t.includes('keyboard')) return <Keyboard size={18} />;
    if (t.includes('mouse')) return <Mouse size={18} />;
    if (t.includes('audio') || t.includes('headphone')) return <Headphones size={18} />;
    if (t.includes('mic')) return <Mic size={18} />;
    if (t.includes('monitor') || t.includes('display')) return <Monitor size={18} />;
    return <HardDrive size={18} />;
  };

  return (
    <Section id="setup" title="Hardware." subtitle="The technology and peripherals I use daily.">
      <div className="flex flex-col gap-24">
        {setups.map((setup) => (
          <div key={setup.id} className="flex flex-col border-t border-border pt-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-3xl glass flex items-center justify-center text-foreground shadow-sm">
                  {setup.operatingSystem.toLowerCase().includes('windows') ? <Monitor size={28} /> : 
                   setup.operatingSystem.toLowerCase().includes('macos') ? <Monitor size={28} /> : 
                   <Cpu size={28} />}
                </div>
                <div>
                  <h3 className="text-3xl font-semibold tracking-tight">{setup.name}</h3>
                  <p className="text-xl text-muted font-normal mt-1">{setup.operatingSystem}</p>
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
              <div className="lg:col-span-6">
                <h4 className="text-xl font-semibold mb-8 tracking-tight text-foreground">Specifications</h4>
                <div className="space-y-0 border-t border-border">
                  {Object.entries(setup.specs).map(([key, value]) => (
                    <div key={key} className="flex flex-col sm:flex-row py-4 border-b border-border/50 group">
                      <span className="text-base font-medium text-foreground min-w-[160px]">{key}</span>
                      <span className="text-base text-muted">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {setup.peripherals && setup.peripherals.length > 0 && (
                <div className="lg:col-span-6">
                  <h4 className="text-xl font-semibold mb-8 tracking-tight text-foreground">Peripherals</h4>
                  <div className="space-y-0 border-t border-border">
                    {setup.peripherals.map((peri, i) => (
                      <div key={i} className="flex flex-col sm:flex-row py-4 border-b border-border/50 group items-start gap-4 sm:gap-0">
                        <div className="flex items-center gap-3 min-w-[160px]">
                          <span className="text-muted">{getIconForPeripheral(peri.type)}</span>
                          <span className="text-base font-medium text-foreground">{peri.type}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-base text-muted">{peri.name}</span>
                          {peri.description && (
                            <span className="text-sm text-muted/70 mt-1">{peri.description}</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
