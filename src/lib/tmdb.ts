const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

export interface Movie {
  id: number;
  title?: string;
  name?: string; 
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date?: string;
  first_air_date?: string; 
  vote_average: number;
  media_type?: 'movie' | 'tv';
  genres?: { id: number; name: string }[];
  runtime?: number;
  status?: string;
  tagline?: string;
  number_of_seasons?: number;
  credits?: {
    cast: {
      id: number;
      name: string;
      character: string;
      profile_path: string | null;
    }[];
  };
  recommendations?: {
    results: Movie[];
  };
}

export interface TMDBResponse<T> {
  results: T[];
  page: number;
  total_pages: number;
  total_results: number;
}

async function fetchFromTMDB<T>(endpoint: string, params: Record<string, string> = {}): Promise<T> {
  const apiKey = process.env.TMDB_API_KEY;

  if (!apiKey || apiKey === 'your_tmdb_api_key_here') {
    throw new Error('TMDB API Key is not configured');
  }

  const queryParams = new URLSearchParams({
    api_key: apiKey,
    ...params,
  });

  const url = `${TMDB_BASE_URL}${endpoint}?${queryParams.toString()}`;
  const response = await fetch(url, { next: { revalidate: 3600 } }); 

  if (!response.ok) {
    throw new Error(`TMDB API error: ${response.statusText}`);
  }

  return response.json();
}

export const tmdb = {
  getTrendingMovies: async (page = 1): Promise<Movie[]> => {
    const data = await fetchFromTMDB<TMDBResponse<Movie>>('/trending/movie/day', { page: page.toString() });
    return data.results;
  },
  getNowPlayingMovies: async (page = 1): Promise<Movie[]> => {
    const data = await fetchFromTMDB<TMDBResponse<Movie>>('/movie/now_playing', { page: page.toString() });
    return data.results;
  },
  searchMovies: async (query: string, page = 1): Promise<Movie[]> => {
    const data = await fetchFromTMDB<TMDBResponse<Movie>>('/search/movie', { query, page: page.toString() });
    return data.results;
  },
  getMovieDetails: async (id: string): Promise<Movie> => {
    return fetchFromTMDB<Movie>(`/movie/${id}`, { append_to_response: 'credits,recommendations' });
  },
  getMoviesByGenre: async (genreId: number, page = 1): Promise<Movie[]> => {
    const data = await fetchFromTMDB<TMDBResponse<Movie>>('/discover/movie', { with_genres: genreId.toString(), page: page.toString() });
    return data.results;
  },
  getSeriesByGenre: async (genreId: number, page = 1): Promise<Movie[]> => {
    const data = await fetchFromTMDB<TMDBResponse<Movie>>('/discover/tv', { with_genres: genreId.toString(), page: page.toString() });
    return data.results;
  },
  getPopularMovies: async (page = 1): Promise<Movie[]> => {
    const data = await fetchFromTMDB<TMDBResponse<Movie>>('/movie/popular', { page: page.toString() });
    return data.results;
  },
  getPopularSeries: async (page = 1): Promise<Movie[]> => {
    const data = await fetchFromTMDB<TMDBResponse<Movie>>('/tv/popular', { page: page.toString() });
    return data.results;
  },
  getUpcomingMovies: async (page = 1): Promise<Movie[]> => {
    const data = await fetchFromTMDB<TMDBResponse<Movie>>('/movie/upcoming', { page: page.toString() });
    return data.results;
  },
  getTopRatedMovies: async (page = 1): Promise<Movie[]> => {
    const data = await fetchFromTMDB<TMDBResponse<Movie>>('/movie/top_rated', { page: page.toString() });
    return data.results;
  },
  getTopRatedSeries: async (page = 1): Promise<Movie[]> => {
    const data = await fetchFromTMDB<TMDBResponse<Movie>>('/tv/top_rated', { page: page.toString() });
    return data.results;
  },
  getAiringTodaySeries: async (page = 1): Promise<Movie[]> => {
    const data = await fetchFromTMDB<TMDBResponse<Movie>>('/tv/airing_today', { page: page.toString() });
    return data.results;
  },
  getOnTheAirSeries: async (page = 1): Promise<Movie[]> => {
    const data = await fetchFromTMDB<TMDBResponse<Movie>>('/tv/on_the_air', { page: page.toString() });
    return data.results;
  },
  getTVDetails: async (id: string): Promise<Movie> => {
    return fetchFromTMDB<Movie>(`/tv/${id}`, { append_to_response: 'credits,recommendations' });
  },
  getSeasonDetails: async (tvId: string, seasonNumber: number): Promise<any> => {
    return fetchFromTMDB<any>(`/tv/${tvId}/season/${seasonNumber}`);
  },
  getMovieGenres: async (): Promise<{ id: number; name: string }[]> => {
    const data = await fetchFromTMDB<{ genres: { id: number; name: string }[] }>('/genre/movie/list');
    return data.genres;
  },
  getTVGenres: async (): Promise<{ id: number; name: string }[]> => {
    const data = await fetchFromTMDB<{ genres: { id: number; name: string }[] }>('/genre/tv/list');
    return data.genres;
  },
  searchMulti: async (query: string, page: number = 1): Promise<Movie[]> => {
    const data = await fetchFromTMDB<{ results: Movie[] }>('/search/multi', { 
      query, 
      page: page.toString() 
    });
    return data.results;
  },
  getPosterUrl: (path: string | null, size: 'w200' | 'w500' | 'original' = 'w500') => {
    return path ? `https://image.tmdb.org/t/p/${size}${path}` : null;
  },
};
