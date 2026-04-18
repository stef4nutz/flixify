'use client';

import React from 'react';
import Image from 'next/image';
import { Play, Plus, Info } from 'lucide-react';

import { Movie, tmdb } from '@/lib/tmdb';

export default function Hero({ movie }: { movie: Movie }) {
  if (!movie) return null;
  
  const backdropUrl = tmdb.getPosterUrl(movie.backdrop_path, 'original');

  return (
    <div className="relative w-full aspect-[21/9] rounded-2xl overflow-hidden mb-12 group">
      {}
      {backdropUrl ? (
        <Image 
          src={backdropUrl}
          alt={movie.title || movie.name || 'Movie'}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-1000"
          priority
        />
      ) : (
        <div className="absolute inset-0 bg-dark" />
      )}
      
      {}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-transparent to-transparent opacity-60" />

      {}
      <div className="absolute bottom-10 left-10 right-10 flex flex-col items-start max-w-2xl">
        {}
        <div className="flex items-center gap-3 mb-4 scale-110 origin-left">
           <span className="bg-red-custom text-foreground text-[10px] font-black px-1.5 py-0.5 rounded-md">R</span>
           <span className="bg-yellow-custom text-background text-[10px] font-bold px-1.5 py-0.5 rounded-md flex items-center gap-1">
              IMDb <span className="bg-background text-yellow-custom rounded-full px-1 text-[8px]">{movie.vote_average.toFixed(1)}</span>
           </span>
           <span className="text-foreground/60 text-xs font-bold font-metropolis ml-2">2h 14m • Action, Sci-Fi • {movie.release_date?.split('-')[0] || movie.first_air_date?.split('-')[0]}</span>
        </div>

        {}
        <h1 className="text-6xl font-black text-white italic tracking-tighter mb-8 drop-shadow-2xl uppercase">
          {movie.title || movie.name}
        </h1>

        {}
        <div className="flex items-center gap-4">
          <Link href={`/watch/${movie.media_type || 'movie'}/${movie.id}`}>
            <HeroButton icon={<Play className="w-5 h-5" />} label="Watch the Movie" primary />
          </Link>
        </div>
      </div>
    </div>
  );
}

import Link from 'next/link';

function HeroButton({ icon, label, primary }: { icon: React.ReactNode; label: string; primary?: boolean }) {
  return (
    <button 
      className={`flex items-center gap-3 px-6 py-2.5 rounded-full font-bold text-sm transition-all ${
        primary 
          ? 'bg-brand text-white hover:bg-red-600 shadow-lg shadow-brand/20' 
          : 'bg-background/80 text-foreground backdrop-blur-sm border border-white/10 hover:bg-background transition-colors'
      }`}
    >
      <span className="opacity-50 group-hover:opacity-100 transition-opacity">{icon}</span>
      {label}
    </button>
  );
}
