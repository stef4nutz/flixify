'use client';

import React from 'react';
import Image from 'next/image';
import { tmdb } from '@/lib/tmdb';

interface CastListProps {
  cast: {
    id: number;
    name: string;
    character: string;
    profile_path: string | null;
  }[];
}

export default function CastList({ cast }: CastListProps) {
  if (!cast || cast.length === 0) return null;

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-white uppercase tracking-tighter italic">Top Cast</h3>
      <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide no-scrollbar">
        {cast.slice(0, 15).map((person) => (
          <div key={person.id} className="flex-shrink-0 w-24 text-center group">
            <div className="relative w-24 h-24 rounded-full overflow-hidden mb-3 border-2 border-transparent group-hover:border-brand transition-all duration-300 shadow-xl">
              {person.profile_path ? (
                <Image
                  src={tmdb.getPosterUrl(person.profile_path, 'w200')!}
                  alt={person.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-dark flex items-center justify-center">
                  <span className="text-xs font-bold text-light">{person.name.charAt(0)}</span>
                </div>
              )}
            </div>
            <p className="text-xs font-black text-white line-clamp-1 leading-tight mb-1">{person.name}</p>
            <p className="text-[10px] text-light line-clamp-1 italic">{person.character}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
