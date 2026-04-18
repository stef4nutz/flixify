import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';

interface GenrePageProps {
  params: Promise<{
    type: string;
  }>;
}

const MOVIE_GENRES = [
  { id: 28, name: 'Action' },
  { id: 12, name: 'Adventure' },
  { id: 16, name: 'Animation' },
  { id: 35, name: 'Comedy' },
  { id: 80, name: 'Crime' },
  { id: 18, name: 'Drama' },
  { id: 27, name: 'Horror' },
  { id: 9648, name: 'Mystery' },
  { id: 10749, name: 'Romance' },
  { id: 878, name: 'Sci-Fi' },
  { id: 53, name: 'Thriller' },
];

const SERIES_GENRES = [
  { id: 10759, name: 'Action & Adventure' },
  { id: 16, name: 'Animation' },
  { id: 35, name: 'Comedy' },
  { id: 80, name: 'Crime' },
  { id: 18, name: 'Drama' },
  { id: 9648, name: 'Mystery' },
  { id: 10765, name: 'Sci-Fi & Fantasy' },
];

export default async function GenrePage({ params }: GenrePageProps) {
  const { type } = await params;

  if (type !== 'movies' && type !== 'series') {
    notFound();
  }

  const genres = type === 'movies' ? MOVIE_GENRES : SERIES_GENRES;

  return (
    <div className="pb-20">
      <header className="mb-12">
        <h1 className="text-4xl font-black text-white italic tracking-tighter uppercase border-l-4 border-brand pl-4">
          {type === 'movies' ? 'Movies' : 'Series'} <span className="text-brand">/ Pick a Genre</span>
        </h1>
      </header>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {genres.map((genre) => (
          <Link 
            key={genre.id} 
            href={`/${type}/genre-${genre.id}`}
            className="group relative h-32 rounded-2xl overflow-hidden bg-dark hover:bg-brand transition-all flex items-center justify-center p-6 text-center"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="text-xl font-black text-white italic transition-transform group-hover:scale-110">
              {genre.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
