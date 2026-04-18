'use client';

import React from 'react';
import Image from 'next/image';
import { Movie, tmdb } from '@/lib/tmdb';
import Link from 'next/link';

export default function RandomMovieBanner({ movies }: { movies: Movie[] }) {
  const [movie, setMovie] = React.useState<Movie | null>(null);

  React.useEffect(() => {
    if (movies && movies.length > 0) {
      const randomIndex = Math.floor(Math.random() * movies.length);
      setMovie(movies[randomIndex]);
    }
  }, [movies]);

  if (!movie) return (
    <div className="w-full aspect-[25/7] rounded-2xl bg-dark animate-pulse mb-14" />
  );

  const backdropUrl = tmdb.getPosterUrl(movie.backdrop_path, 'original');
  const title = movie.title || movie.name;
  const date = movie.release_date || movie.first_air_date;

  return (
    <Link href={`/watch/${movie.media_type || 'movie'}/${movie.id}`} className="relative w-full aspect-[25/7] rounded-2xl overflow-hidden mb-14 group block shadow-2xl">
      {backdropUrl ? (
        <Image 
          src={backdropUrl}
          alt={title || 'Media'}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-1000"
        />
      ) : (
        <div className="absolute inset-0 bg-dark" />
      )}
      
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-transparent to-transparent opacity-60" />
      
      <div className="absolute inset-0 flex flex-col items-start justify-center p-12">
         <div className="max-w-2xl">
            <h2 className="text-5xl font-black text-white italic tracking-tighter mb-4 shadow-2xl uppercase group-hover:text-brand transition-colors">
              {title}
            </h2>
            <div className="flex items-center gap-4 text-xs font-bold text-foreground/80 font-metropolis uppercase tracking-widest">
               <span className="bg-white/10 px-2 py-1 rounded">Latest Release</span>
               <span>{date?.split('-')[0]}</span>
               <span className="flex items-center gap-1">★ {movie.vote_average.toFixed(1)}</span>
            </div>
         </div>
      </div>
    </Link>
  );
}
