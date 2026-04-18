'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Play, ChevronLeft, ChevronRight } from 'lucide-react';
import { Movie, tmdb } from '@/lib/tmdb';
import Link from 'next/link';

export default function HeroSlider({ movies }: { movies: Movie[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % movies.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [movies.length]);

  const currentMovie = movies[currentIndex];
  if (!currentMovie) return null;

  const backdropUrl = tmdb.getPosterUrl(currentMovie.backdrop_path, 'original');
  const title = currentMovie.title || currentMovie.name;
  const date = currentMovie.release_date || currentMovie.first_air_date;
  const type = currentMovie.media_type || 'movie';

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % movies.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + movies.length) % movies.length);

  return (
    <div className="relative w-full aspect-[21/9] rounded-2xl overflow-hidden mb-12 group">
      {}
      <div className="absolute inset-0 transition-opacity duration-1000">
        {backdropUrl && (
          <Image 
            src={backdropUrl}
            alt={title || 'Media'}
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-105"
            priority
          />
        )}
      </div>
      
      {}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-transparent to-transparent opacity-60" />
 
      {}
      <div 
        key={currentIndex} 
        className="absolute bottom-10 left-10 right-10 flex flex-col items-start max-w-2xl animate-hero-content"
      >
        {}
        <div className="flex items-center gap-3 mb-4 scale-110 origin-left">
           <span className="bg-red-custom text-foreground text-[10px] font-black px-1.5 py-0.5 rounded-md">R</span>
           <span className="bg-yellow-custom text-background text-[10px] font-bold px-1.5 py-0.5 rounded-md flex items-center gap-1">
              IMDb <span className="bg-background text-yellow-custom rounded-full px-1 text-[8px]">{currentMovie.vote_average.toFixed(1)}</span>
           </span>
           <span className="text-foreground/60 text-xs font-bold font-metropolis ml-2">
             {type === 'tv' ? 'Series' : '2h 14m'} • Action, Sci-Fi • {date?.split('-')[0]}
           </span>
        </div>
 
        {}
        <h1 className="text-4xl md:text-7xl font-black text-white italic tracking-tight mb-8 drop-shadow-2xl uppercase line-clamp-2 leading-[1.1] py-2">
          {title}
        </h1>
 
        {}
        <div className="flex items-center gap-4">
          <Link href={`/watch/${type}/${currentMovie.id}`}>
            <button className="flex items-center gap-3 px-8 py-3 bg-brand text-white rounded-full font-bold text-sm hover:bg-red-600 transition-all shadow-lg shadow-brand/20">
              <Play className="w-5 h-5 fill-current" />
              Watch the {type === 'tv' ? 'Series' : 'Movie'}
            </button>
          </Link>
        </div>
      </div>

      {}
      <div className="absolute bottom-10 right-10 flex gap-2">
        {movies.map((_, idx) => (
          <button 
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-2 h-2 rounded-full transition-all ${idx === currentIndex ? 'bg-brand w-8' : 'bg-white/30 hover:bg-white/50'}`}
          />
        ))}
      </div>

      {}
      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/20 backdrop-blur-sm rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/40"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/20 backdrop-blur-sm rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/40"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
}
