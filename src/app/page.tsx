import React from 'react';
import Link from "next/link";
import { Globe, Share2 } from "lucide-react";
import { tmdb } from "@/lib/tmdb";
import HeroSlider from "@/components/HeroSlider";
import MovieSection from "@/components/MovieSection";
import FriendsActivity from "@/components/FriendsActivity";
import BigBanner from "@/components/BigBanner";

import RandomMovieBanner from "@/components/RandomMovieBanner";

async function getTrendingMovies() {
  try {
    return await tmdb.getTrendingMovies();
  } catch (error) {
    console.error("Failed to fetch trending movies:", error);
    return [];
  }
}

async function getNowPlayingMovies() {
  try {
    return await tmdb.getNowPlayingMovies();
  } catch (error) {
    console.error("Failed to fetch now playing movies:", error);
    return [];
  }
}

async function getMoviesByGenre(genreId: number) {
  try {
    return await tmdb.getMoviesByGenre(genreId);
  } catch (error) {
    console.error(`Failed to fetch movies for genre ${genreId}:`, error);
    return [];
  }
}

async function getSeriesByGenre(genreId: number) {
  try {
    return await tmdb.getSeriesByGenre(genreId);
  } catch (error) {
    console.error(`Failed to fetch series for genre ${genreId}:`, error);
    return [];
  }
}

export default async function Home() {
  const [
    trendingMovies,
    nowPlayingMovies,
    actionMovies,
    animationMovies,
    dramaMovies,
    comedyMovies,
    horrorMovies,
    actionSeries,
    animationSeries,
    dramaSeries,
    comedySeries,
  ] = await Promise.all([
    getTrendingMovies(),
    getNowPlayingMovies(),
    getMoviesByGenre(28),
    getMoviesByGenre(16),
    getMoviesByGenre(18),
    getMoviesByGenre(35),
    getMoviesByGenre(27),
    getSeriesByGenre(10759),
    getSeriesByGenre(16),
    getSeriesByGenre(18),
    getSeriesByGenre(35),
  ]);

  const heroMovies = trendingMovies.slice(0, 5);

  return (
    <div className="w-full space-y-20 pb-20">
      <div className="animate-soft-scale">
        <HeroSlider movies={heroMovies} />
      </div>

      <div className="px-8 space-y-24">
        {}
        <section className="animate-reveal-up delay-100">
          <h2 className="text-3xl font-black text-white italic tracking-tighter mb-10 uppercase border-l-4 border-brand pl-4">Movies</h2>
          
          <div className="space-y-16">
            <MovieSection title="Action" movies={actionMovies.slice(0, 5)} viewAllHref="/movies/action" type="movie" />
            <MovieSection title="Animation" movies={animationMovies.slice(0, 5)} viewAllHref="/movies/animation" type="movie" />
            <MovieSection title="Drama" movies={dramaMovies.slice(0, 5)} viewAllHref="/movies/drama" type="movie" />
            <MovieSection title="Comedy" movies={comedyMovies.slice(0, 5)} viewAllHref="/movies/comedy" type="movie" />
            <MovieSection title="Horror" movies={horrorMovies.slice(0, 5)} viewAllHref="/movies/horror" type="movie" />
          </div>
        </section>

        {}
        <section className="reveal-on-scroll">
          <h3 className="text-2xl font-bold text-foreground font-metropolis mb-8 uppercase tracking-widest text-brand">Latest Releases</h3>
          <RandomMovieBanner movies={nowPlayingMovies} />
        </section>

        {}
        <section className="reveal-on-scroll">
          <h2 className="text-3xl font-black text-white italic tracking-tighter mb-10 uppercase border-l-4 border-brand pl-4">Series</h2>
          
          <div className="space-y-16">
            <MovieSection title="Action & Adventure" movies={actionSeries.slice(0, 5)} viewAllHref="/series/action" type="tv" />
            <MovieSection title="Animation" movies={animationSeries.slice(0, 5)} viewAllHref="/series/animation" type="tv" />
            <MovieSection title="Drama" movies={dramaSeries.slice(0, 5)} viewAllHref="/series/drama" type="tv" />
            <MovieSection title="Comedy" movies={comedySeries.slice(0, 5)} viewAllHref="/series/comedy" type="tv" />
          </div>
        </section>
      </div>
    </div>
  );
}
