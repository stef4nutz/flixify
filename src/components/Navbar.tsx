'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Search, ChevronDown, Film, Tv, Play, TrendingUp, Sparkles, X, Loader2 } from 'lucide-react';
import { getMovieGenres, getTVGenres, searchContent } from '@/app/actions';
import { Movie, tmdb } from '@/lib/tmdb';

export default function Navbar() {
  const [activeMenu, setActiveMenu] = useState<'movies' | 'series' | null>(null);
  const [movieGenres, setMovieGenres] = useState<{ id: number; name: string }[]>([]);
  const [tvGenres, setTVGenres] = useState<{ id: number; name: string }[]>([]);

  
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getMovieGenres().then(setMovieGenres);
    getTVGenres().then(setTVGenres);
  }, []);

  
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (searchQuery.trim().length >= 2) {
        setIsSearching(true);
        try {
          const results = await searchContent(searchQuery);
          setSearchResults(results.slice(0, 6)); 
          setShowResults(true);
        } catch (error) {
          console.error('Search failed:', error);
        } finally {
          setIsSearching(false);
        }
      } else {
        setSearchResults([]);
        setShowResults(false);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-[100]" onMouseLeave={() => setActiveMenu(null)}>
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-stagger {
          opacity: 0;
          animation: fadeSlideUp 0.3s ease-out forwards;
          will-change: transform, opacity;
        }
      `}} />

      {}
      <div className="flex items-center justify-between px-8 py-3 bg-[#0a0a0c]/90 backdrop-blur-xl border-b border-white/5 h-16 w-full">
        <div className="flex items-center gap-12 flex-1">
          {}
          <Link href="/" className="text-2xl font-black text-brand tracking-tighter shrink-0 hover:opacity-80 transition-opacity">
            Flixify
          </Link>

          {}
          <nav className="flex items-center gap-8">
            <button
              onMouseEnter={() => setActiveMenu('movies')}
              className={`text-xs font-black uppercase tracking-widest transition-all flex items-center gap-2 py-2 px-4 rounded-full ${activeMenu === 'movies' ? 'bg-brand text-white shadow-[0_0_20px_rgba(255,57,57,0.3)]' : 'text-white/50 hover:text-white hover:bg-white/5'}`}
            >
              Movies <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${activeMenu === 'movies' ? 'rotate-180' : ''}`} />
            </button>
            <button
              onMouseEnter={() => setActiveMenu('series')}
              className={`text-xs font-black uppercase tracking-widest transition-all flex items-center gap-2 py-2 px-4 rounded-full ${activeMenu === 'series' ? 'bg-brand text-white shadow-[0_0_20px_rgba(255,57,57,0.3)]' : 'text-white/50 hover:text-white hover:bg-white/5'}`}
            >
              Series <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${activeMenu === 'series' ? 'rotate-180' : ''}`} />
            </button>
          </nav>
        </div>

        {}
        <div className="relative flex-1 max-w-sm" ref={searchRef}>
          <div className="flex items-center w-full bg-white/5 rounded-full px-4 py-1.5 border border-white/5 focus-within:bg-white/10 focus-within:border-brand/20 focus-within:ring-1 focus-within:ring-brand/20 transition-all group">
            <label htmlFor="nav-search" className="cursor-pointer">
              {isSearching ? (
                <Loader2 className="w-4 h-4 text-brand animate-spin" />
              ) : (
                <Search className="w-4 h-4 text-white/40 group-focus-within:text-brand transition-colors" />
              )}
            </label>
            <input
              id="nav-search"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => searchQuery.length >= 2 && setShowResults(true)}
              placeholder="Search Movies, Shows..."
              className="bg-transparent border-none outline-none flex-1 px-4 text-sm text-white placeholder:text-white/20 font-medium h-7"
              autoComplete="off"
            />
            {searchQuery && (
              <button onClick={() => { setSearchQuery(''); setShowResults(false); }}>
                <X className="w-3 h-3 text-white/20 hover:text-white transition-colors" />
              </button>
            )}
          </div>

          {}
          {showResults && searchResults.length > 0 && (
            <div className="absolute top-full left-0 w-full mt-2 bg-[#121214] border border-white/5 rounded-2xl shadow-2xl overflow-hidden z-[110] animate-in fade-in slide-in-from-top-2 duration-200 backdrop-blur-xl">
              <div className="p-2">
                {searchResults.map((result) => (
                  <Link
                    key={`${result.media_type}-${result.id}`}
                    href={`/watch/${result.media_type || 'movie'}/${result.id}`}
                    onClick={() => { setShowResults(false); setSearchQuery(''); }}
                    className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 transition-colors group"
                  >
                    <div className="w-10 h-14 rounded-md overflow-hidden bg-white/5 shrink-0">
                      {result.poster_path ? (
                        <img
                          src={tmdb.getPosterUrl(result.poster_path, 'w500') || ''}
                          alt={result.title || result.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[10px] text-white/20">NO IMAGE</div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-white truncate group-hover:text-brand transition-colors">
                        {result.title || result.name}
                      </p>
                      <p className="text-[10px] text-white/40 font-medium uppercase tracking-wider">
                        {result.media_type === 'tv' ? 'TV Series' : 'Movie'} • {new Date(result.release_date || result.first_air_date || '').getFullYear() || 'N/A'}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {}
      {activeMenu && (
        <div className="absolute top-16 left-0 w-full bg-[#0a0a0c]/95 backdrop-blur-xl text-white shadow-[0_30px_60px_rgba(0,0,0,0.8)] border-b border-white/5 animate-in slide-in-from-top-2 fade-in duration-300 will-change-transform">
          <div className="max-w-7xl mx-auto grid grid-cols-12 min-h-[400px]">
            {}
            <div className="col-span-3 bg-white/[0.01] p-12 border-r border-white/5 overflow-hidden">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 mb-8 flex items-center gap-2 animate-stagger" style={{ animationDelay: '0.05s' }}>
                {activeMenu === 'movies' ? <Film className="w-3 h-3 text-brand" /> : <Tv className="w-3 h-3 text-brand" />} Explore
              </h4>
              <ul className="space-y-6">
                <ExploreLink href={`/${activeMenu}/newest`} label="Browse Newest" icon={<Sparkles className="w-4 h-4" />} delay="0.1s" />
                <ExploreLink href={`/${activeMenu}/popular`} label="Trending Content" icon={<TrendingUp className="w-4 h-4" />} delay="0.15s" />
                {activeMenu === 'series' && (
                  <ExploreLink href="/series/ongoing" label="Ongoing Series" icon={<Play className="w-4 h-4" />} delay="0.2s" />
                )}
              </ul>

              {}
            </div>

            {}
            <div className="col-span-9 p-12 overflow-y-auto max-h-[600px] custom-scrollbar">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 mb-12 animate-stagger" style={{ animationDelay: '0.05s' }}>Categories</h4>
              <div className="grid grid-cols-4 gap-y-6 gap-x-12">
                {(activeMenu === 'movies' ? movieGenres : tvGenres).map((genre, index) => (
                  <Link
                    key={genre.id}
                    href={`/${activeMenu}/genre-${genre.id}`}
                    onClick={() => setActiveMenu(null)}
                    className="text-sm font-bold text-white/60 hover:text-brand transition-all flex items-center gap-3 group/item animate-stagger"
                    style={{ animationDelay: `${0.05 + index * 0.02}s` }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-white/10 group-hover/item:bg-brand group-hover/item:scale-125 transition-all duration-300" />
                    {genre.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function ExploreLink({ href, label, icon, delay }: { href: string; label: string; icon: React.ReactNode; delay: string }) {
  return (
    <li className="animate-stagger" style={{ animationDelay: delay }}>
      <Link href={href} className="text-sm font-black text-white/70 hover:text-white transition-all flex items-center gap-4 group/link">
        <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center group-hover/link:bg-brand group-hover/link:border-brand/50 transition-all duration-300 shadow-lg">
          {React.isValidElement(icon) ? React.cloneElement(icon as React.ReactElement<any>, { className: 'w-4 h-4' }) : icon}
        </div>
        <span className="tracking-tight">{label}</span>
      </Link>
    </li>
  );
}
