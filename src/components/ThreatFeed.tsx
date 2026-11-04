import { useMemo, useState } from 'react';
import {
  Activity,
  ArrowUpRight,
  Crosshair,
  Fingerprint,
  Globe2,
  Radio,
} from 'lucide-react';
import threat from '../data/threat.json';
import { WORLD_DOTS } from '../data/worldDots';

const MAP_WIDTH = 1000;
const MAP_HEIGHT = 466;
const LAT_TOP = 84;
const LAT_BOTTOM = -58;

const numberFormat = new Intl.NumberFormat('en-GB');

const legend = [
  { label: '1', color: '#5BCEFA' },
  { label: '5+', color: '#F5D06F' },
  { label: '20+', color: '#FFB340' },
  { label: '50+', color: '#FF5C5C' },
];

function project(lat: number, lon: number) {
  return [
    ((lon + 180) / 360) * MAP_WIDTH,
    ((LAT_TOP - lat) / (LAT_TOP - LAT_BOTTOM)) * MAP_HEIGHT,
  ] as const;
}

function markerColor(attempts: number) {
  if (attempts >= 50) return '#FF5C5C';
  if (attempts >= 20) return '#FFB340';
  if (attempts >= 5) return '#F5D06F';
  return '#5BCEFA';
}

function markerRadius(attempts: number) {
  return Math.min(13, 4.5 + Math.sqrt(attempts) * 0.75);
}

function timeAgo(timestamp: number) {
  const seconds = Math.max(0, Math.round((Date.now() - timestamp) / 1000));
  if (seconds < 45) return 'just now';
  const minutes = Math.round(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 48) return `${hours}h ago`;
  const days = Math.round(hours / 24);
  if (days < 14) return `${days}d ago`;
  return new Date(timestamp).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

function RankList({
  title,
  caption,
  rows,
  tone = 'blue',
}: {
  title: string;
  caption: string;
  rows: { name: string; attempts: number }[];
  tone?: 'blue' | 'dark';
}) {
  const max = rows[0]?.attempts ?? 1;

  return (
    <div className="rounded-3xl border border-black/[0.07] bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="text-sm font-semibold tracking-tight text-foreground">{title}</h3>
        <span className="text-[11px] font-medium text-[#86868b]">{caption}</span>
      </div>

      <ul className="mt-5 space-y-3.5">
        {rows.slice(0, 6).map((row, index) => (
          <li key={row.name}>
            <div className="flex items-baseline justify-between gap-3 text-sm">
              <span className="flex min-w-0 items-center gap-2">
                <span className="w-4 flex-shrink-0 font-mono text-[10px] text-[#b0b0b5]">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span
                  className={`truncate ${
                    tone === 'dark'
                      ? 'font-mono text-xs font-medium text-[#1d1d1f]'
                      : 'font-medium text-[#1d1d1f]'
                  }`}
                >
                  {row.name}
                </span>
              </span>
              <span className="flex-shrink-0 font-mono text-[11px] text-[#6e6e73]">
                {numberFormat.format(row.attempts)}
              </span>
            </div>
            <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-[#f2f2f5]">
              <div
                className={`h-full rounded-full ${
                  tone === 'dark'
                    ? 'bg-[#1d1d1f]'
                    : 'bg-gradient-to-r from-[#5BCEFA] to-[#F5A9B8]'
                }`}
                style={{ width: `${Math.max(4, (row.attempts / max) * 100)}%` }}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ThreatFeed() {
  const [hovered, setHovered] = useState<{
    lat: number;
    lon: number;
    attempts: number;
    x: number;
    y: number;
  } | null>(null);

  const syncedAt = new Date(threat.generatedAt).getTime();
  const isFresh = Date.now() - syncedAt < 6 * 60 * 60 * 1000;
  const maxTimeline = Math.max(...threat.timeline.map((bucket) => bucket.attempts), 1);

  const worldLayer = useMemo(
    () => (
      <g fill="#2c3648">
        {WORLD_DOTS.map(([x, y], index) => (
          <circle key={index} cx={x} cy={y} r={2.1} />
        ))}
      </g>
    ),
    [],
  );

  const stats = [
    { label: 'Attempts', value: threat.total, icon: Activity },
    { label: 'Unique IPs', value: threat.uniqueIps, icon: Fingerprint },
    { label: 'Countries', value: threat.countries, icon: Globe2 },
    { label: 'Source cells', value: threat.sources, icon: Crosshair },
  ];

  return (
    <section aria-labelledby="threat-heading" className="mt-14">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#86868b]">
            <Radio size={13} className={isFresh ? 'text-[#2fb344]' : 'text-[#b0b0b5]'} />
            {isFresh ? 'Live honeypot telemetry' : 'Honeypot telemetry'}
          </p>
          <h2
            id="threat-heading"
            className="mt-3 text-3xl font-semibold tracking-tight text-foreground md:text-4xl"
          >
            Threat map.
          </h2>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-muted-foreground">
            Brute-force attempts against the honeypot over the last {threat.windowHours} hours,
            geolocated by source and pulled from InfluxDB through Grafana.
          </p>
        </div>

        <a
          href={threat.dashboardUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 rounded-full border border-black/[0.08] bg-white px-5 py-2.5 text-sm font-medium text-[#1d1d1f] shadow-[0_2px_10px_rgba(0,0,0,0.03)] transition-colors hover:border-black/[0.18] hover:bg-[#fafafc]"
        >
          Open live dashboard
          <ArrowUpRight size={15} className="text-[#86868b] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>

      <div className="mt-7 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="rounded-2xl border border-black/[0.07] bg-white p-4 shadow-[0_2px_10px_rgba(0,0,0,0.02)]"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-[#86868b]">
                  {stat.label}
                </span>
                <Icon size={14} className="text-[#b0b0b5]" />
              </div>
              <p className="mt-2 text-2xl font-semibold tracking-tight text-[#1d1d1f] md:text-3xl">
                {numberFormat.format(stat.value)}
              </p>
            </div>
          );
        })}
      </div>

      <div className="mt-4 overflow-hidden rounded-[28px] border border-black/[0.08] bg-[#090d15] text-white shadow-[0_24px_60px_rgba(10,14,23,0.24)]">
        <div className="relative flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.07] px-5 py-4">
          <div className="flex items-center gap-3">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#5BCEFA] opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#5BCEFA]" />
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/60">
              SSH attack map
            </span>
            <span className="rounded-full border border-white/[0.08] bg-white/[0.04] px-2.5 py-1 text-[10px] font-medium text-white/50">
              Last {threat.windowHours}h
            </span>
          </div>

          <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-white/35">
            {threat.sources} geohash cells · synced {timeAgo(syncedAt)}
          </span>
        </div>

        <div className="relative">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-70 [background-image:linear-gradient(to_right,rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.045)_1px,transparent_1px)] [background-size:48px_48px]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_100%_at_50%_0%,rgba(91,206,250,0.10),transparent_60%),radial-gradient(70%_90%_at_50%_100%,rgba(245,169,184,0.08),transparent_65%)]"
          />

          <svg
            viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
            className="relative block w-full"
            role="img"
            aria-label={`World map of ${numberFormat.format(threat.total)} SSH brute-force attempts from ${threat.sources} source cells over the last ${threat.windowHours} hours.`}
          >
            {worldLayer}

            {threat.points.map((point, index) => {
              const [x, y] = project(point.lat, point.lon);
              const color = markerColor(point.attempts);
              const radius = markerRadius(point.attempts);

              return (
                <g
                  key={`${point.lat}-${point.lon}-${index}`}
                  tabIndex={0}
                  role="img"
                  aria-label={`${numberFormat.format(point.attempts)} attempts from ${point.lat.toFixed(1)}, ${point.lon.toFixed(1)}`}
                  className="cursor-pointer outline-none"
                  onMouseEnter={() => setHovered({ ...point, x, y })}
                  onMouseLeave={() => setHovered(null)}
                  onFocus={() => setHovered({ ...point, x, y })}
                  onBlur={() => setHovered(null)}
                >
                  {point.attempts >= 20 && (
                    <circle
                      cx={x}
                      cy={y}
                      r={radius}
                      fill={color}
                      className="threat-ping"
                      style={{ animationDelay: `${(index % 7) * 0.35}s` }}
                    />
                  )}
                  <circle cx={x} cy={y} r={radius + 5} fill={color} opacity={0.12} />
                  <circle
                    cx={x}
                    cy={y}
                    r={radius}
                    fill={color}
                    stroke="rgba(255,255,255,0.55)"
                    strokeWidth={0.8}
                  />
                </g>
              );
            })}
          </svg>

          {hovered && (
            <div
              className="pointer-events-none absolute z-10 -translate-x-1/2 translate-y-3 rounded-xl border border-white/10 bg-[#111a29]/95 px-3 py-2 text-[11px] text-white shadow-[0_10px_30px_rgba(0,0,0,0.35)] backdrop-blur"
              style={{
                left: `${(hovered.x / MAP_WIDTH) * 100}%`,
                top: `${(hovered.y / MAP_HEIGHT) * 100}%`,
              }}
            >
              <p className="font-semibold text-white">
                {numberFormat.format(hovered.attempts)} attempts
              </p>
              <p className="mt-0.5 font-mono text-[10px] text-white/50">
                {hovered.lat.toFixed(2)}, {hovered.lon.toFixed(2)}
              </p>
            </div>
          )}
        </div>

        <div className="relative border-t border-white/[0.07] px-5 pt-4" role="img" aria-label={`Attempts over the last ${threat.windowHours} hours, peaking at ${maxTimeline} per half hour.`}>
          <div className="flex h-12 items-end gap-[2px]">
            {threat.timeline.map((bucket) => (
              <span
                key={bucket.at}
                title={`${numberFormat.format(bucket.attempts)} attempts`}
                className="flex-1 rounded-t-[2px] bg-gradient-to-t from-[#5BCEFA]/35 to-[#5BCEFA]"
                style={{ height: `${Math.max(3, (bucket.attempts / maxTimeline) * 100)}%` }}
              />
            ))}
          </div>
          <div className="mt-1.5 flex justify-between text-[10px] font-medium uppercase tracking-[0.14em] text-white/30">
            <span>{threat.windowHours}h ago</span>
            <span>now</span>
          </div>
        </div>

        <div className="relative flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.07] px-5 py-3.5">
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/35">
              Attempts
            </span>
            {legend.map((entry) => (
              <span key={entry.label} className="inline-flex items-center gap-1.5 text-[10px] text-white/55">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: entry.color, boxShadow: `0 0 10px ${entry.color}66` }}
                />
                {entry.label}
              </span>
            ))}
          </div>

          <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-white/35">
            Bubble size = volume
          </span>
        </div>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <RankList
          title="Attempts by country"
          caption={`${threat.countries} countries`}
          rows={threat.topCountries}
        />
        <RankList
          title="Most targeted usernames"
          caption="top 8"
          rows={threat.topUsernames}
          tone="dark"
        />
      </div>

      <div className="mt-4 overflow-hidden rounded-3xl border border-black/[0.07] bg-white shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-black/[0.05] px-6 py-4">
          <div>
            <h3 className="text-sm font-semibold tracking-tight text-foreground">
              Latest observed attempts
            </h3>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Newest distinct login attempts in the dashboard window.
            </p>
          </div>
          <span className="text-[11px] font-medium text-[#86868b]">{threat.uniqueIps} unique IPs</span>
        </div>

        <ul className="divide-y divide-black/[0.05]">
          {threat.recent.slice(0, 8).map((attempt) => (
            <li
              key={`${attempt.at}-${attempt.ip}-${attempt.port}`}
              className="flex items-center justify-between gap-4 px-6 py-3.5"
            >
              <div className="min-w-0">
                <p className="font-mono text-xs font-medium text-[#1d1d1f]">{attempt.ip}</p>
                <p className="mt-0.5 truncate text-xs text-muted-foreground">
                  <span className="font-medium text-[#1d1d1f]">{attempt.username}</span>
                  {attempt.location ? ` · ${attempt.location}` : ''}
                  {attempt.isp ? ` · ${attempt.isp}` : ''}
                </p>
              </div>
              <time
                dateTime={new Date(attempt.at).toISOString()}
                className="flex-shrink-0 text-[11px] font-medium text-[#86868b]"
              >
                {timeAgo(attempt.at)}
              </time>
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-4 text-xs leading-relaxed text-[#86868b]">
        Snapshot taken {new Date(threat.generatedAt).toLocaleString('en-GB', {
          dateStyle: 'medium',
          timeStyle: 'short',
        })} from the Grafana public dashboard. The feed refreshes on every deploy; the
        dashboard itself is always live.
      </p>
    </section>
  );
}
