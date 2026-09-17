import { useState, useEffect } from 'react';
import { Section } from './Section';
import { profile } from '../data';
import { Github, Star, GitFork, FolderGit2, ArrowUpRight } from 'lucide-react';

interface Repo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
}

export function GitHubRepos() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!profile.githubUsername || profile.githubUsername.includes('[YOUR GITHUB USERNAME]')) {
      setRepos([
        { 
          id: 1, 
          name: 'network-recon-tools', 
          description: 'Custom network scanners, banner grabbing utilities, and host discovery scripts.', 
          html_url: 'https://github.com', 
          stargazers_count: 16, 
          forks_count: 4, 
          language: 'Python' 
        },
        { 
          id: 2, 
          name: 'ctf-writeups', 
          description: 'Detailed walkthroughs, exploit notes, and methodology for Hack The Box, TryHackMe, and PicoCTF.', 
          html_url: 'https://github.com', 
          stargazers_count: 24, 
          forks_count: 6, 
          language: 'Markdown' 
        },
        { 
          id: 3, 
          name: 'web-exploit-scripts', 
          description: 'Targeted security automation scripts and proof-of-concept exploits for OWASP web flaws.', 
          html_url: 'https://github.com', 
          stargazers_count: 19, 
          forks_count: 5, 
          language: 'TypeScript' 
        },
        { 
          id: 4, 
          name: 'wireguard-manager', 
          description: 'Lightweight shell tooling for dynamic WireGuard tunnel deployment and mesh routing.', 
          html_url: 'https://github.com', 
          stargazers_count: 11, 
          forks_count: 3, 
          language: 'Bash' 
        },
      ]);
      setLoading(false);
      return;
    }

    fetch(`https://api.github.com/users/${profile.githubUsername}/repos?sort=updated&per_page=6`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setRepos(data);
        }
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  return (
    <Section 
      id="projects" 
      title="Repositories." 
      subtitle="Tools, projects, and writeups pushed to my public repositories."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {loading ? (
          <div className="col-span-2 text-center text-[#86868b] py-16">
            Loading repositories...
          </div>
        ) : repos.length > 0 ? (
          repos.map(repo => (
            <a 
              key={repo.id} 
              href={repo.html_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="group bg-white rounded-3xl p-6 sm:p-7 border border-black/[0.07] shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.06)] hover:border-black/[0.14] transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-[12px] bg-gradient-to-b from-white to-[#f5f5f7] border border-black/[0.08] shadow-[0_2px_6px_rgba(0,0,0,0.03),inset_0_1px_0_rgba(255,255,255,0.9)] flex items-center justify-center text-[#1d1d1f] flex-shrink-0">
                      <FolderGit2 size={18} strokeWidth={2} />
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold tracking-tight text-[#1d1d1f] group-hover:text-black transition-colors truncate">
                      {repo.name}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Github size={18} className="text-[#86868b] group-hover:text-[#1d1d1f] transition-colors" />
                    <ArrowUpRight size={16} className="text-[#86868b] opacity-0 group-hover:opacity-100 transition-opacity -ml-1" />
                  </div>
                </div>

                <p className="text-sm sm:text-base text-[#6e6e73] font-normal leading-relaxed mb-6 line-clamp-2">
                  {repo.description || 'Tools, projects, and writeups pushed to GitHub.'}
                </p>
              </div>

              <div className="flex items-center gap-3 text-xs font-medium text-[#86868b] pt-4 border-t border-black/[0.05]">
                {repo.language && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#f5f5f7] rounded-full border border-black/[0.04] text-[#1d1d1f]">
                    <span className="w-2 h-2 rounded-full bg-[#1d1d1f]" />
                    {repo.language}
                  </span>
                )}
                
                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#f5f5f7] rounded-full border border-black/[0.04]">
                  <Star size={12} className="text-[#86868b]" /> {repo.stargazers_count}
                </span>

                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#f5f5f7] rounded-full border border-black/[0.04]">
                  <GitFork size={12} className="text-[#86868b]" /> {repo.forks_count}
                </span>
              </div>
            </a>
          ))
        ) : (
          <div className="col-span-2 text-center text-[#86868b] py-16">
            No public repositories found.
          </div>
        )}
      </div>
    </Section>
  );
}
