import { Section } from './Section';
import { interests } from '../data';
import { Tv, Gamepad2, Sparkles, Film, Heart } from 'lucide-react';

export function Interests() {
  const getCategoryIcon = (category: string) => {
    const cat = category.toLowerCase();
    if (cat.includes('media') || cat.includes('anime') || cat.includes('film')) {
      return <Tv size={20} strokeWidth={2} />;
    }
    if (cat.includes('game')) {
      return <Gamepad2 size={20} strokeWidth={2} />;
    }
    if (cat.includes('hobbi') || cat.includes('hobby')) {
      return <Sparkles size={20} strokeWidth={2} />;
    }
    return <Heart size={20} strokeWidth={2} />;
  };

  return (
    <Section id="interests" title="Personal interests." subtitle="Other things that I enjoy.">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {interests.map((group, index) => (
          <div
            key={index}
            className="bg-white rounded-3xl p-6 sm:p-7 border border-black/[0.07] shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_36px_rgba(0,0,0,0.06)] hover:border-black/[0.12] transition-all duration-200 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-10 h-10 rounded-[12px] bg-gradient-to-b from-white to-[#f5f5f7] border border-black/[0.08] shadow-[0_2px_6px_rgba(0,0,0,0.03),inset_0_1px_0_rgba(255,255,255,0.9)] flex items-center justify-center text-[#1d1d1f]">
                  {getCategoryIcon(group.category)}
                </div>
                <span className="text-[11px] font-medium tracking-tight text-[#86868b] uppercase">
                  0{index + 1}
                </span>
              </div>

              <h3 className="text-xl font-semibold tracking-tight text-[#1d1d1f] mb-4">
                {group.category}
              </h3>

              <div className="space-y-3">
                {group.items.map((item, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-2xl bg-[#fafafc] border border-black/[0.04] hover:bg-[#f5f5f8] transition-colors duration-200"
                  >
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-sm sm:text-base text-[#1d1d1f] tracking-tight">
                        {item.title}
                      </h4>
                    </div>

                    {item.description && (
                      <p className="text-xs sm:text-sm text-[#6e6e73] mt-1 leading-relaxed font-normal">
                        {item.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
