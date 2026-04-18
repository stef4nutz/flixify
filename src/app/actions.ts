'use server';

import { tmdb, Movie } from '@/lib/tmdb';

export async function fetchMoreMedia(type: 'movie' | 'tv', list: string, page: number, genreId?: number) {
  try {
    if (genreId) {
      return type === 'movie' ? await tmdb.getMoviesByGenre(genreId, page) : await tmdb.getSeriesByGenre(genreId, page);
    }

    if (list.startsWith('genre-')) {
      const id = parseInt(list.split('-')[1]);
      return type === 'movie' ? await tmdb.getMoviesByGenre(id, page) : await tmdb.getSeriesByGenre(id, page);
    }

    if (type === 'movie') {
      switch (list) {
        case 'popular': return await tmdb.getPopularMovies(page);
        case 'newest': return await tmdb.getUpcomingMovies(page);
        case 'trending': return await tmdb.getTrendingMovies(page);
        default: return await tmdb.getPopularMovies(page);
      }
    } else {
      switch (list) {
        case 'popular': return await tmdb.getPopularSeries(page);
        case 'newest': return await tmdb.getTrendingMovies(page);
        case 'ongoing': return await tmdb.getOnTheAirSeries(page);
        case 'today': return await tmdb.getAiringTodaySeries(page);
        default: return await tmdb.getPopularSeries(page);
      }
    }
  } catch (error) {
    console.error('Error in fetchMoreMedia server action:', error);
    return [];
  }
}

export async function getMovieGenres() {
  try {
    return await tmdb.getMovieGenres();
  } catch (error) {
    console.error('Error fetching movie genres:', error);
    return [];
  }
}

export async function getTVGenres() {
  try {
    return await tmdb.getTVGenres();
  } catch (error) {
    console.error('Error fetching tv genres:', error);
    return [];
  }
}

export async function searchContent(query: string) {
  try {
    if (!query || query.length < 2) return [];
    return await tmdb.searchMulti(query);
  } catch (error) {
    console.error('Error searching content:', error);
    return [];
  }
}
