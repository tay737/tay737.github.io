import { Section } from './Section';
import { useRepos } from '../hooks/useRepos';
import { Github, Star, GitFork, FolderGit2, ArrowUpRight } from 'lucide-react';

export function GitHubRepos() {
  const { repos, loading } = useRepos();

  return (
    <Section
      id="projects"
      title="Projects."
      subtitle="Tools, projects and writeups from my public repositories. Open a card to view it on GitHub."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {loading && repos.length === 0 ? (
          <div className="col-span-2 text-center text-[#6e6e73] py-16">
            Loading repositories...
          </div>
        ) : repos.length > 0 ? (
          repos.map(repo => (
            <article
              key={repo.id}
              className="group relative bg-white rounded-3xl p-6 sm:p-7 border border-black/[0.07] shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.06)] hover:border-black/[0.14] transition-all duration-200 flex flex-col justify-between"
            >
              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 z-10 rounded-3xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#5BCEFA]"
                aria-label={`Open ${repo.name} on GitHub`}
              />

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
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative z-20 rounded-full p-1 text-[#6e6e73] hover:text-[#1d1d1f] hover:bg-black/[0.04] transition-colors"
                      aria-label={`Open ${repo.name} on GitHub`}
                    >
                      <Github size={18} />
                    </a>
                    <ArrowUpRight size={16} className="text-[#6e6e73] opacity-0 group-hover:opacity-100 transition-opacity -ml-1" />
                  </div>
                </div>

                <p className="text-sm sm:text-base text-[#6e6e73] font-normal leading-relaxed mb-6 line-clamp-2">
                  {repo.description || 'Tools, projects, and writeups pushed to GitHub.'}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-[#6e6e73] pt-4 border-t border-black/[0.05]">
                {repo.language && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#f5f5f7] rounded-full border border-black/[0.04] text-[#1d1d1f]">
                    <span className="w-2 h-2 rounded-full bg-[#1d1d1f]" />
                    {repo.language}
                  </span>
                )}

                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#f5f5f7] rounded-full border border-black/[0.04]">
                  <Star size={12} className="text-[#6e6e73]" /> {repo.stargazers_count}
                </span>

                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#f5f5f7] rounded-full border border-black/[0.04]">
                  <GitFork size={12} className="text-[#6e6e73]" /> {repo.forks_count}
                </span>

                <span className="ml-auto inline-flex items-center gap-1 text-[11px] text-[#6e6e73] group-hover:text-[#1d1d1f] transition-colors">
                  View repository
                  <ArrowUpRight size={12} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </article>
          ))
        ) : (
          <div className="col-span-2 text-center text-[#6e6e73] py-16">
            No public repositories found.
          </div>
        )}
      </div>
    </Section>
  );
}
