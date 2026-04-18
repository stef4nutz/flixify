'use client';

import React from 'react';
import { Movie } from '@/lib/tmdb';
import MovieCard from './MovieCard';
import Link from 'next/link';

interface MovieSectionProps {
  title: string;
  movies: Movie[];
  viewAllHref?: string;
  type?: 'movie' | 'tv';
}

export default function MovieSection({ title, movies, viewAllHref, type = 'movie' }: MovieSectionProps) {
  return (
    <section className="mb-14">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-2xl font-bold text-foreground font-metropolis">{title}</h3>
        {viewAllHref && (
          <Link href={viewAllHref} className="text-sm font-bold text-light hover:text-foreground transition-colors">
            View All →
          </Link>
        )}
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} type={movie.media_type || type} />
        ))}
      </div>
    </section>
  );
}
