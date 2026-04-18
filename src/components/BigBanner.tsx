'use client';

import React from 'react';
import Image from 'next/image';

export default function BigBanner() {
  return (
    <div className="relative w-full aspect-[25/7] rounded-2xl overflow-hidden mb-14 group">
       <Image 
        src="https://image.tmdb.org/t/p/original/m96Y9Nn92F7jQvN8D6VpBghSInX.jpg" 
        alt="Once Upon a Time in Hollywood Banner"
        fill
        className="object-cover group-hover:scale-105 transition-transform duration-1000"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
      
      <div className="absolute inset-0 flex flex-col items-start justify-center p-12">
         {}
         <div className="max-w-md">
            <h2 className="text-4xl font-black text-white italic tracking-tighter mb-2 shadow-2xl">
              ONCE UPON A TIME IN...
              <div className="text-6xl text-white not-italic mt-2">HOLLYWOOD</div>
            </h2>
         </div>
      </div>
    </div>
  );
}
