'use client';

import React from 'react';
import Image from 'next/image';

export default function FriendsActivity() {
  const activities = [
    { title: 'The Good Place', season: 'Season 2, Episode 4', user: 'BoldHamster', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bold' },
    { title: 'The Blacklist', season: 'Season 4, Episode 10', user: 'SlowLamprey', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Slow' },
    { title: 'Daredevil', season: 'Season 1, Episode 9', user: 'SmallDuck', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Small' },
  ];

  return (
    <section className="mb-14">
      <h3 className="text-2xl font-bold text-foreground font-metropolis mb-8">From Your Friends' Network</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {activities.map((item, idx) => (
          <div key={idx} className="bg-dark/20 p-4 rounded-2xl flex gap-4 hover:bg-dark/40 transition-colors cursor-pointer border border-transparent hover:border-brand/10">
             {}
             <div className="relative w-24 h-24 rounded-xl overflow-hidden shadow-lg">
                <div className="absolute inset-0 bg-brand/20 flex items-center justify-center font-bold text-brand uppercase text-[10px] text-center px-1">
                  {item.title}
                </div>
             </div>
             <div className="flex flex-col justify-center flex-1">
                <h4 className="text-sm font-bold text-foreground leading-tight">{item.title}</h4>
                <p className="text-[11px] text-light mb-3">{item.season}</p>
                <div className="flex items-center gap-2">
                   <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-dark">
                      <Image src={item.avatar} alt={item.user} fill className="object-cover" />
                   </div>
                   <div className="flex flex-col">
                      <span className="text-[11px] font-bold text-foreground">{item.user}</span>
                      <button className="text-[10px] font-bold text-background bg-foreground px-2 py-0.5 rounded hover:bg-brand hover:text-white transition-colors">
                        Watch Along
                      </button>
                   </div>
                </div>
             </div>
          </div>
        ))}
      </div>
    </section>
  );
}
