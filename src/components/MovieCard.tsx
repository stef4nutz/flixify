import Image from 'next/image';
import Link from 'next/link';
import { Movie, tmdb } from '@/lib/tmdb';

export default function MovieCard({ movie, type = 'movie' }: { movie: Movie; type?: 'movie' | 'tv' }) {
  const posterUrl = tmdb.getPosterUrl(movie.poster_path);
  const title = movie.title || movie.name;
  const date = movie.release_date || movie.first_air_date;

  return (
    <Link 
      href={`/watch/${type}/${movie.id}`}
      className="group relative block aspect-[2/3] overflow-hidden rounded-xl bg-dark shadow-xl hover:shadow-brand/10 transition-all duration-300 hover-lift"
    >
      {posterUrl ? (
        <Image
          src={posterUrl}
          alt={title || 'Media'}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
        />
      ) : (
        <div className="flex h-full items-center justify-center p-4 text-center text-light bg-dark/40">
          <span className="text-sm font-bold">{title}</span>
        </div>
      )}
      
      {}
      <div className="absolute inset-0 bg-background/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
        <div className="flex gap-2 mb-3">
          <span className="bg-red-custom text-foreground text-[10px] font-black px-1.5 py-0.5 rounded-md">R</span>
          <span className="bg-yellow-custom text-background text-[10px] font-bold px-1.5 py-0.5 rounded-md flex items-center gap-1">
            IMDb <span className="bg-background text-yellow-custom rounded-full px-1 text-[8px]">{movie.vote_average.toFixed(1)}</span>
          </span>
        </div>
        
        <h4 className="text-base font-bold text-foreground mb-2 line-clamp-2 leading-tight font-metropolis">{title}</h4>
        
        <div className="space-y-0.5">
          <p className="text-light text-[11px] font-black">{type === 'tv' ? 'Series' : '124 min'}</p>
          <p className="text-light text-[11px]">Action, Adventure, Sci-Fi</p>
          <p className="text-light/50 text-[11px] italic font-medium">{date?.split('-')[0]}</p>
        </div>
      </div>
    </Link>
  );
}
