import { useEffect, useState } from 'react';
import { profile } from '../data';

export interface Repo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
}

let cachedRepos: Repo[] | null = null;
let inFlight: Promise<Repo[]> | null = null;

async function fetchRepos(): Promise<Repo[]> {
  if (!profile.githubUsername || profile.githubUsername.includes('[YOUR GITHUB USERNAME]')) {
    return [];
  }

  const response = await fetch(
    `https://api.github.com/users/${profile.githubUsername}/repos?sort=updated&per_page=6`,
  );

  if (!response.ok) {
    throw new Error(`GitHub request failed with ${response.status}`);
  }

  const data = await response.json();
  return Array.isArray(data) ? data : [];
}

export function useRepos() {
  const [repos, setRepos] = useState<Repo[]>(() => cachedRepos ?? []);
  const [loading, setLoading] = useState(cachedRepos === null);

  useEffect(() => {
    if (cachedRepos) {
      setRepos(cachedRepos);
      setLoading(false);
      return;
    }

    let active = true;

    if (!inFlight) {
      inFlight = fetchRepos()
        .then((nextRepos) => {
          cachedRepos = nextRepos;
          return nextRepos;
        })
        .catch(() => {
          cachedRepos = [];
          return [];
        });
    }

    inFlight.then((nextRepos) => {
      if (!active) return;
      setRepos(nextRepos);
      setLoading(false);
    });

    return () => {
      active = false;
    };
  }, []);

  return { repos, loading };
}
