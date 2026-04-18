import React from 'react';
import { tmdb } from '@/lib/tmdb';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Play, Star, Calendar, Clock, ChevronRight } from 'lucide-react';
import CastList from '@/components/CastList';
import MovieCard from '@/components/MovieCard';
import Image from 'next/image';

interface WatchPageProps {
  params: Promise<{
    type: string;
    id: string;
  }>;
  searchParams: Promise<{
    season?: string;
    episode?: string;
  }>;
}

export default async function WatchPage({ params, searchParams }: WatchPageProps) {
  const { type: rawType, id } = await params;
  const { season = '1', episode = '1' } = await searchParams;

  const type = rawType === 'series' || rawType === 'tv' ? 'tv' : 'movie';
  
  if (rawType !== 'movie' && rawType !== 'tv' && rawType !== 'movies' && rawType !== 'series' && rawType !== 'watch') {
    notFound();
  }

  try {
    const data = type === 'tv' ? await tmdb.getTVDetails(id) : await tmdb.getMovieDetails(id);
    const title = data.title || data.name;
    const date = data.release_date || data.first_air_date;
    const backdropUrl = tmdb.getPosterUrl(data.backdrop_path, 'original');
    
    
    let episodes = [];
    let totalSeasons = 0;
    if (type === 'tv') {
      totalSeasons = data.number_of_seasons || 0;
      const seasonData = await tmdb.getSeasonDetails(id, parseInt(season));
      episodes = seasonData.episodes || [];
    }

    const videoUrl = type === 'movie' 
      ? `https://vidsrc.xyz/embed/movie/${id}`
      : `https://vidsrc.xyz/embed/tv/${id}/${season}/${episode}`;

    return (
      <div className="relative min-h-screen pb-20 -mt-10 -mx-10 animate-page-entrance">
        {}
        <div className="absolute top-0 left-0 w-full h-[60vh] -z-10 overflow-hidden">
          {backdropUrl && (
            <Image 
              src={backdropUrl}
              alt=""
              fill
              className="object-cover opacity-20 blur-sm scale-110"
              priority
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        </div>

        <div className="px-10 pt-10">
          {}
          <section className="relative w-full aspect-video rounded-3xl overflow-hidden bg-black shadow-2xl mb-12 group animate-soft-scale border border-white/5">
            <iframe
              src={videoUrl}
              className="absolute inset-0 w-full h-full border-0 shadow-2xl"
              allowFullScreen
              referrerPolicy="origin"
              allow="autoplay; encrypted-media"
              title={`${title} Player`}
            />
          </section>

          {}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-12 animate-reveal-up delay-100">
              <div className="space-y-6">
                <div className="flex flex-wrap items-center gap-4 text-xs font-black text-light uppercase tracking-widest">
                  <span className="flex items-center gap-1.5 text-brand bg-brand/10 px-2.5 py-1 rounded-md border border-brand/20">
                    <Star className="w-3.5 h-3.5 fill-current" /> {data.vote_average.toFixed(1)}
                  </span>
                  <span className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1 rounded-md"><Calendar className="w-3.5 h-3.5" /> {date?.split('-')[0]}</span>
                  <span className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1 rounded-md"><Clock className="w-3.5 h-3.5" /> {type === 'tv' ? `${totalSeasons} Seasons` : `${data.runtime || 124} min`}</span>
                  {data.status && <span className="text-brand/60">{data.status}</span>}
                </div>
                
                <h1 className="text-4xl md:text-7xl font-black text-white italic tracking-tight uppercase leading-[1.1] drop-shadow-2xl py-2">
                  {title}
                </h1>

                {data.tagline && (
                  <p className="text-brand font-bold italic text-lg tracking-tight opacity-80">"{data.tagline}"</p>
                )}

                <div className="flex flex-wrap gap-2">
                  {data.genres?.map(genre => (
                    <span key={genre.id} className="text-[10px] font-black uppercase tracking-tighter bg-dark text-white/70 px-3 py-1.5 rounded-full border border-white/5">
                      {genre.name}
                    </span>
                  ))}
                </div>

                <p className="text-light/90 text-xl leading-relaxed max-w-4xl font-medium">
                  {data.overview}
                </p>
              </div>

              {}
              {data.credits?.cast && (
                <CastList cast={data.credits.cast} />
              )}

              {}
              {data.recommendations?.results && data.recommendations.results.length > 0 && (
                <div className="space-y-8">
                  <h3 className="text-xl font-bold text-white uppercase tracking-tighter italic">Recommended For You</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                    {data.recommendations.results.slice(0, 4).map((item) => (
                      <MovieCard key={item.id} movie={item} type={type} />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {}
            <div className="space-y-8">
              {type === 'tv' && (
                <div className="space-y-6 animate-reveal-right delay-200 sticky top-24">
                  <div className="bg-dark rounded-3xl p-8 border border-white/5 shadow-2xl backdrop-blur-md bg-opacity-80">
                    <div className="flex flex-col gap-6 mb-8">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold text-white uppercase tracking-tighter italic">Episodes</h3>
                        <div className="text-xs font-black text-brand bg-brand/10 px-2 py-1 rounded">{episodes.length} Total</div>
                      </div>
                      
                      {}
                      <div className="flex flex-wrap gap-2">
                        {[...Array(totalSeasons)].map((_, i) => (
                          <Link 
                            key={i} 
                            href={`/watch/tv/${id}?season=${i + 1}`}
                            className={`text-[10px] font-black uppercase tracking-tighter px-3 py-1.5 rounded-md transition-all ${parseInt(season) === i + 1 ? 'bg-brand text-white shadow-lg shadow-brand/20' : 'bg-white/5 text-light hover:bg-white/10'}`}
                          >
                            S{i + 1}
                          </Link>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar no-scrollbar">
                      {episodes.map((ep: any) => (
                        <Link 
                          key={ep.episode_number} 
                          href={`/watch/tv/${id}?season=${season}&episode=${ep.episode_number}`}
                          className={`flex items-center justify-between p-4 rounded-xl transition-all border hover:translate-x-1 ${parseInt(episode) === ep.episode_number ? 'bg-brand border-brand text-white shadow-lg shadow-brand/20' : 'bg-background/20 border-white/5 text-light hover:border-white/20'}`}
                        >
                          <div className="flex flex-col gap-0.5">
                            <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Episode {ep.episode_number}</span>
                            <span className="text-sm font-bold line-clamp-1">{ep.name}</span>
                          </div>
                          <ChevronRight className="w-4 h-4 opacity-50 shrink-0" />
                        </Link>
                      ))}
                    </div>
                  </div>

                  {}
                  <div className="space-y-4 p-8 bg-dark rounded-3xl border border-white/5 shadow-2xl animate-reveal-up delay-400">
                    <h3 className="text-sm font-black uppercase tracking-widest text-white/30">Select Server</h3>
                    <div className="flex flex-col gap-4">
                      <Link href="#" className="w-full bg-brand text-white py-4 rounded-xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-brand/80 transition-all shadow-lg shadow-brand/20">
                        <Play className="w-4 h-4 fill-current" /> Server 1 (Main)
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {type === 'movie' && (
                <div className="space-y-4 p-8 bg-dark rounded-3xl border border-white/5 shadow-2xl animate-reveal-up delay-300">
                  <h3 className="text-sm font-black uppercase tracking-widest text-white/30">Select Server</h3>
                  <div className="flex flex-col gap-4">
                    <Link href="#" className="w-full bg-brand text-white py-4 rounded-xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-brand/80 transition-all shadow-lg shadow-brand/20">
                      <Play className="w-4 h-4 fill-current" /> Server 1 (Main)
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Failed to load details:", error);
    return notFound();
  }
}
