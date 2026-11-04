import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const GRAFANA_URL = 'https://grafana.tay737.co.uk';
const DASHBOARD_TOKEN = '98f7f83b26d04f569fe49576d9ccc1a7';
const DASHBOARD_URL = `${GRAFANA_URL}/public-dashboards/${DASHBOARD_TOKEN}?from=now-24h&to=now`;
const WINDOW_HOURS = 24;
const TIMELINE_BUCKETS = 48;
const OUTPUT = resolve(
  dirname(fileURLToPath(import.meta.url)),
  '../src/data/threat.json',
);

function frameRows(frame) {
  const names = (frame.schema?.fields ?? []).map((field) => field.name);
  const values = frame.data?.values ?? [];
  const length = values[0]?.length ?? 0;
  const rows = [];

  for (let index = 0; index < length; index += 1) {
    const row = {};
    names.forEach((name, column) => {
      row[name] = values[column]?.[index] ?? null;
    });
    rows.push(row);
  }

  return { name: frame.schema?.name ?? '', rows };
}

async function queryPanel(panelId, range) {
  const response = await fetch(
    `${GRAFANA_URL}/api/public/dashboards/${DASHBOARD_TOKEN}/panels/${panelId}/query`,
    {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'user-agent': 'tay737-portfolio/1.0 (+https://tay737.github.io)',
      },
      body: JSON.stringify({
        intervalMs: 120_000,
        maxDataPoints: 480,
        timeRange: {
          from: String(range.from),
          to: String(range.to),
          timezone: 'browser',
        },
      }),
      signal: AbortSignal.timeout(20_000),
    },
  );

  if (!response.ok) {
    throw new Error(`panel ${panelId}: HTTP ${response.status}`);
  }

  const payload = await response.json();
  const result = payload.results?.A;

  if (!result || result.error) {
    throw new Error(
      `panel ${panelId}: ${result?.error ?? 'missing result'}`,
    );
  }

  return (result.frames ?? []).map(frameRows);
}

function buildTimeline(rows, range) {
  const span = range.to - range.from;
  const bucketSize = span / TIMELINE_BUCKETS;
  const buckets = Array.from({ length: TIMELINE_BUCKETS }, (_, index) => ({
    at: Math.round(range.from + index * bucketSize),
    attempts: 0,
  }));

  for (const row of rows) {
    const index = Math.min(
      TIMELINE_BUCKETS - 1,
      Math.max(0, Math.floor((row.Time - range.from) / bucketSize)),
    );
    buckets[index].attempts += Number(row.Value) || 0;
  }

  return buckets;
}

async function main() {
  const now = Date.now();
  const range = {
    from: now - WINDOW_HOURS * 60 * 60 * 1000,
    to: now,
  };

  const [timelineFrames, statFrames, mapFrames, ipFrames, usernameFrames, countryFrames, recentFrames] =
    await Promise.all([
      queryPanel(1, range),
      queryPanel(2, range),
      queryPanel(3, range),
      queryPanel(4, range),
      queryPanel(5, range),
      queryPanel(6, range),
      queryPanel(8, range),
    ]);

  const total = Math.round(Number(statFrames[0]?.rows[0]?.Value) || 0);

  const points = (mapFrames[0]?.rows ?? [])
    .filter(
      (row) =>
        Number.isFinite(row.latitude) &&
        Number.isFinite(row.longitude) &&
        Number(row.attempts) > 0,
    )
    .map((row) => ({
      lat: Number(row.latitude.toFixed(3)),
      lon: Number(row.longitude.toFixed(3)),
      attempts: Math.round(Number(row.attempts)),
    }))
    .sort((a, b) => b.attempts - a.attempts);

  const allCountries = (countryFrames[0]?.rows ?? [])
    .filter((row) => Number(row.count) > 0)
    .map((row) => ({
      name: row.country ?? 'Unknown',
      attempts: Math.round(Number(row.count)),
    }))
    .sort((a, b) => b.attempts - a.attempts);

  const topCountries = allCountries.slice(0, 10);

  const usernames = usernameFrames
    .map(({ name, rows }) => {
      const username = name.match(/username:\s*(.+?)\s*\}/)?.[1];
      return {
        name: username ?? 'unknown',
        attempts: Math.round(Number(rows[0]?.Value) || 0),
      };
    })
    .filter((entry) => entry.attempts > 0)
    .sort((a, b) => b.attempts - a.attempts)
    .slice(0, 8);

  const uniqueIps = new Set(
    (ipFrames[0]?.rows ?? []).map((row) => row.ip).filter(Boolean),
  ).size;

  const seenAttempts = new Set();
  const recent = (recentFrames[0]?.rows ?? [])
    .filter((row) => row.Time && row.ip)
    .sort((a, b) => b.Time - a.Time)
    .filter((row) => {
      const key = `${row.ip}:${row.port}:${row.username}`;
      if (seenAttempts.has(key)) return false;
      seenAttempts.add(key);
      return true;
    })
    .slice(0, 12)
    .map((row) => ({
      at: Math.round(row.Time),
      ip: row.ip,
      username: row.username ?? 'unknown',
      port: row.port ?? '',
      isp: row.isp ?? '',
      location: row.location ?? '',
    }));

  const timeline = buildTimeline(
    timelineFrames[0]?.rows ?? [],
    range,
  );

  const snapshot = {
    generatedAt: new Date(now).toISOString(),
    windowHours: WINDOW_HOURS,
    dashboardUrl: DASHBOARD_URL,
    total,
    uniqueIps,
    countries: allCountries.length,
    sources: points.length,
    points,
    timeline,
    topCountries,
    topUsernames: usernames,
    recent,
  };

  await mkdir(dirname(OUTPUT), { recursive: true });
  await writeFile(OUTPUT, `${JSON.stringify(snapshot, null, 2)}\n`);

  console.log(
    `Threat feed: ${total} attempts, ${points.length} sources, ${allCountries.length} countries.`,
  );
}

main().catch((error) => {
  console.warn(`Threat feed: keeping the existing snapshot (${error.message}).`);
});
