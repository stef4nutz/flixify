import React from 'react';
import { tmdb, Movie } from '@/lib/tmdb';
import MovieCard from '@/components/MovieCard';
import { notFound } from 'next/navigation';
import InfiniteMovieList from '@/components/InfiniteMovieList';

interface ListPageProps {
  params: Promise<{
    type: string;
    list: string;
  }>;
}

const LIST_TITLES: Record<string, string> = {
  popular: 'Popular',
  newest: 'Newest',
  trending: 'Trending',
  watchlist: 'My Watch-List',
  favorites: 'My Favorites',
  ongoing: 'Ongoing',
  today: "Today's Episodes",
  genre: 'Action',
  action: 'Action',
  animation: 'Animation',
  drama: 'Drama',
  comedy: 'Comedy',
  horror: 'Horror',
};

const GENRE_MAP: Record<string, Record<string, number>> = {
  movies: {
    genre: 28,
    action: 28,
    animation: 16,
    drama: 18,
    comedy: 35,
    horror: 27,
  },
  series: {
    genre: 10759,
    action: 10759,
    animation: 16,
    drama: 18,
    comedy: 35,
  }
};

export default async function ListPage({ params }: ListPageProps) {
  const { type, list } = await params;

  if (type !== 'movies' && type !== 'series') {
    notFound();
  }

  let items: Movie[] = [];
  let title = LIST_TITLES[list] || (list.startsWith('genre-') ? '' : list.charAt(0).toUpperCase() + list.slice(1));

  try {
    const mediaType = type === 'movies' ? 'movies' : 'series';
    const genreId = GENRE_MAP[mediaType][list];

    const fetchers = [];
    for (let i = 1; i <= 3; i++) {
      if (genreId) {
        fetchers.push(type === 'movies' ? tmdb.getMoviesByGenre(genreId, i) : tmdb.getSeriesByGenre(genreId, i));
      } else if (list.startsWith('genre-')) {
        const id = parseInt(list.split('-')[1]);
        fetchers.push(type === 'movies' ? tmdb.getMoviesByGenre(id, i) : tmdb.getSeriesByGenre(id, i));
      } else if (type === 'movies') {
        switch (list) {
          case 'popular': fetchers.push(tmdb.getPopularMovies(i)); break;
          case 'newest': fetchers.push(tmdb.getUpcomingMovies(i)); break;
          case 'trending': fetchers.push(tmdb.getTrendingMovies(i)); break;
          default: fetchers.push(tmdb.getPopularMovies(i));
        }
      } else {
        switch (list) {
          case 'popular': fetchers.push(tmdb.getPopularSeries(i)); break;
          case 'newest': fetchers.push(tmdb.getTrendingMovies(i)); break;
          case 'ongoing': fetchers.push(tmdb.getOnTheAirSeries(i)); break;
          case 'today': fetchers.push(tmdb.getAiringTodaySeries(i)); break;
          default: fetchers.push(tmdb.getPopularSeries(i));
        }
      }
    }

    const pages = await Promise.all(fetchers);
    items = pages.flat();

    if (list.startsWith('genre-')) {
      title = `Genre Results`;
    } else if (genreId) {
      title = LIST_TITLES[list] || list.charAt(0).toUpperCase() + list.slice(1);
    }
  } catch (error) {
    console.error(`Error fetching ${list} for ${type}:`, error);
  }

  return (
    <div className="pb-20">
      <header className="mb-12">
        <h1 className="text-4xl font-black text-white italic tracking-tighter uppercase border-l-4 border-brand pl-4">
          {type === 'movies' ? 'Movies' : 'Series'} <span className="text-brand">/ {title}</span>
        </h1>
      </header>
      
      {items.length > 0 ? (
        <InfiniteMovieList 
          initialItems={items} 
          type={type === 'movies' ? 'movie' : 'tv'} 
          list={list}
          genreId={GENRE_MAP[type === 'movies' ? 'movies' : 'series'][list]}
        />
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-light">
          <p className="text-xl font-bold mb-4">No {title.toLowerCase()} found.</p>
          <p className="text-sm">This section is currently empty or still under development.</p>
        </div>
      )}
    </div>
  );
}
