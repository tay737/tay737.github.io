import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const USERNAME = 'tay737';
const PROFILE_URL = `https://www.credly.com/users/${USERNAME}`;
const OUTPUT = resolve(
  dirname(fileURLToPath(import.meta.url)),
  '../src/data/credly.json',
);

async function main() {
  const response = await fetch(`${PROFILE_URL}/badges.json`, {
    headers: {
      accept: 'application/json',
      'user-agent': 'tay737-portfolio/1.0 (+https://tay737.github.io)',
    },
    signal: AbortSignal.timeout(15_000),
  });

  if (!response.ok) {
    throw new Error(`Credly returned HTTP ${response.status}`);
  }

  const payload = await response.json();
  const badges = (payload.data ?? [])
    .filter((badge) => badge.state === 'accepted' && badge.public !== false)
    .map((badge) => {
      const template = badge.badge_template ?? {};
      const issuer =
        template.issuer?.name ??
        badge.issuer?.entities?.[0]?.entity?.name ??
        'Credly';

      return {
        id: badge.id,
        name: template.name ?? 'Credly badge',
        issuer,
        issuedAt: badge.issued_at_date ?? badge.issued_at?.slice(0, 10) ?? null,
        image: template.image_url ?? badge.image_url ?? null,
        url: `https://www.credly.com/badges/${badge.id}`,
        description: template.description ?? '',
        skills: (template.skills ?? []).slice(0, 4).map((skill) => skill.name),
      };
    })
    .filter((badge) => badge.image)
    .sort((a, b) => (b.issuedAt ?? '').localeCompare(a.issuedAt ?? ''));

  if (badges.length === 0) {
    throw new Error('Credly returned no public badges');
  }

  await mkdir(dirname(OUTPUT), { recursive: true });
  await writeFile(
    OUTPUT,
    `${JSON.stringify(
      {
        username: USERNAME,
        profileUrl: PROFILE_URL,
        syncedAt: new Date().toISOString(),
        badges,
      },
      null,
      2,
    )}\n`,
  );

  console.log(`Credly: synced ${badges.length} badges.`);
}

main().catch((error) => {
  console.warn(`Credly: keeping the existing snapshot (${error.message}).`);
});
