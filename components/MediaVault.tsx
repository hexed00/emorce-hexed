'use client';

import { Film, Clapperboard, ExternalLink } from 'lucide-react';

const movieSites = [
  { name: 'FMovies', url: 'https://www.fmovies.gd/', tag: 'movies' },
  { name: 'Cineby', url: 'https://www.cineby.sc/tv/220102', tag: 'tv' },
  { name: 'XPrime', url: 'https://xprime.su/', tag: 'movies' },
  { name: 'Indica', url: 'https://indica.bond/', tag: 'movies' },
  { name: 'PStream', url: 'https://pstream.net/', tag: 'stream' },
  { name: 'IDLIX', url: 'https://z2.idlixku.com/', tag: 'movies' },
  { name: 'HuraWatch', url: 'https://hurawatch.cx/', tag: 'movies' },
  { name: 'DBMovies', url: 'https://dbmovies.net/home/', tag: 'movies' },
];

const animeSites = [
  { name: 'Miruro', url: 'https://www.miruro.com/', tag: 'anime' },
  { name: 'PStream', url: 'https://pstream.net/', tag: 'stream' },
  { name: 'ZoroTV', url: 'https://zorotv.com.ro/', tag: 'anime' },
  { name: 'ReAnime', url: 'https://reanime.to/home', tag: 'anime' },
  { name: 'AniWatch', url: 'https://aniwatch.co.at/', tag: 'anime' },
  { name: 'AnimeVerse', url: 'https://animeverse.to/', tag: 'anime' },
  { name: '9AnimeTVs', url: 'https://9animestvs.com/', tag: 'anime' },
  { name: 'Anime Nexus', url: 'https://anime.nexus/', tag: 'anime' },
  { name: '123Animes', url: 'https://w1.123animes.ru/', tag: 'anime' },
  { name: 'AniStream', url: 'https://anistream.one/', tag: 'anime' },
  { name: 'Senshi', url: 'https://senshi.live/watch/trz65/9', tag: 'anime' },
];

function SiteGrid({ sites, title, icon: Icon }: { sites: typeof movieSites; title: string; icon: any }) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <Icon className="w-4 h-4 text-hex-crimson" />
        <h3 className="font-display font-semibold text-hex-bone tracking-wide">{title}</h3>
        <div className="section-line flex-1" />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
        {sites.map((site) => (
          <a
            key={site.url + site.name}
            href={site.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hex-card rounded-xl px-4 py-3.5 group flex items-center justify-between"
          >
            <div>
              <p className="text-sm font-medium text-hex-bone group-hover:text-white transition-colors">
                {site.name}
              </p>
              <p className="text-[10px] text-hex-muted font-mono uppercase tracking-wider mt-0.5">
                {site.tag}
              </p>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-hex-muted group-hover:text-hex-crimson transition-colors opacity-0 group-hover:opacity-100" />
          </a>
        ))}
      </div>
    </div>
  );
}

export default function MediaVault() {
  return (
    <div className="space-y-10">
      <div className="hex-card rounded-2xl p-6 md:p-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-hex-blood/60 to-hex-ash flex items-center justify-center">
            <Film className="w-5 h-5 text-hex-crimson" />
          </div>
          <div>
            <h2 className="font-display font-bold text-xl text-hex-bone">Media Vault</h2>
            <p className="text-xs text-hex-muted font-mono">movies \u00b7 tv \u00b7 anime \u00b7 curated for emorce</p>
          </div>
        </div>
        <p className="text-sm text-hex-muted mt-4 leading-relaxed">
          Quick-access vault. All links open in a new tab. Sites rotate \u2014 if one is down, try the next.
        </p>
      </div>

      <SiteGrid sites={movieSites} title="Movies & TV \u2661" icon={Clapperboard} />
      <SiteGrid sites={animeSites} title="Anime \u271e" icon={Film} />

      <div className="rounded-xl border border-hex-smoke/50 bg-hex-ash/30 p-4">
        <p className="text-[11px] text-hex-muted font-mono leading-relaxed">
          \u2691 Use an adblocker. Some domains change often. This list is for personal / offline viewing only.
        </p>
      </div>
    </div>
  );
}
