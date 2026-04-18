'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Movie } from '@/lib/tmdb';
import MovieCard from './MovieCard';
import { Loader2 } from 'lucide-react';
import { fetchMoreMedia } from '@/app/actions';

interface InfiniteMovieListProps {
  initialItems: Movie[];
  type: 'movie' | 'tv';
  list: string;
  genreId?: number;
}

export default function InfiniteMovieList({ initialItems, type, list, genreId }: InfiniteMovieListProps) {
  const [items, setItems] = useState<Movie[]>(initialItems);
  const [page, setPage] = useState(4); 
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerTarget = useRef(null);

  const fetchMoreItems = async () => {
    if (loading || !hasMore) return;
    setLoading(true);

    try {
      const newItems = await fetchMoreMedia(type, list, page, genreId);

      if (!newItems || newItems.length === 0) {
        setHasMore(false);
      } else {
        setItems(prev => [...prev, ...newItems]);
        setPage(prev => prev + 1);
      }
    } catch (error) {
      console.error('Error fetching more items:', error);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore) {
          fetchMoreItems();
        }
      },
      { threshold: 1.0 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [observerTarget, hasMore, page, loading]);

  return (
    <div className="space-y-12">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-y-12 gap-x-6">
        {items.map((item, idx) => (
          <MovieCard key={`${item.id}-${idx}`} movie={item} type={type} />
        ))}
      </div>

      <div ref={observerTarget} className="flex justify-center py-12">
        {loading && (
          <div className="flex flex-col items-center gap-4">
             <Loader2 className="w-10 h-10 text-brand animate-spin" />
             <p className="text-sm font-bold text-light animate-pulse">Loading more magic...</p>
          </div>
        )}
        {!hasMore && items.length > 0 && (
          <p className="text-light/50 font-bold italic tracking-widest text-xs uppercase">You've reached the end of the universe</p>
        )}
      </div>
    </div>
  );
}
