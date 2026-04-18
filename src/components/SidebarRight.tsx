'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Bell, 
  Settings, 
  LogOut, 
  Grid, 
  User,
  Play
} from 'lucide-react';

export default function SidebarRight() {
  return (
    <aside className="fixed right-0 top-0 h-full w-[300px] bg-usernav p-6 flex flex-col z-50 overflow-y-auto">
      {}
      <div className="flex items-center gap-4 mb-8">
        <div className="relative w-14 h-14 rounded-2xl overflow-hidden border-2 border-dark">
          <Image 
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Dummy" 
            alt="User Avatar" 
            fill 
            className="object-cover"
          />
        </div>
        <div>
          <h4 className="text-base font-bold text-foreground leading-tight">Dummy</h4>
          <p className="text-xs text-light">Avid Watcher</p>
        </div>
      </div>

      {}
      <div className="flex justify-between items-center mb-10 pb-8 border-b-2 border-dark relative">
        <div className="relative">
          <Grid className="w-8 h-8 text-red-custom cursor-pointer" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-600 text-white text-[10px] flex items-center justify-center rounded-full font-bold">12</span>
        </div>
        <div className="relative">
          <User className="w-8 h-8 text-light cursor-pointer" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-600 rounded-full"></span>
        </div>
        <Settings className="w-8 h-8 text-light cursor-pointer" />
        <LogOut className="w-8 h-8 text-light cursor-pointer" />
      </div>

      {}
      <div className="space-y-10">
        <section>
          <h5 className="text-base font-bold text-foreground mb-4">Continue Watching</h5>
          <div className="flex items-center gap-4 group cursor-pointer">
            <div className="w-10 h-10 flex items-center justify-center bg-dark/50 rounded-lg group-hover:bg-brand/20 transition-colors">
              <Play className="w-4 h-4 text-brand" />
            </div>
            <div>
              <p className="text-sm font-bold text-foreground group-hover:text-brand transition-colors">Archer</p>
              <p className="text-xs text-light">Season 10, Episode 9</p>
            </div>
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-4">
            <h5 className="text-base font-bold text-foreground">Notifications</h5>
          </div>
          <div className="space-y-4">
            <NotificationItem title="Mindhunter" subtitle="Season 2 Available" />
            <NotificationItem title="Archer" subtitle="New Episode Available" />
            <NotificationItem title="Stranger Things" subtitle="Season 3 Available" />
          </div>
          <button className="w-full mt-6 py-2 bg-dark rounded-lg text-xs font-bold text-light hover:text-foreground transition-colors">
            More
          </button>
        </section>

        <section>
          <h5 className="text-base font-bold text-foreground mb-4">Friends Online</h5>
          <div className="space-y-4">
            <FriendItem name="BoldHamster" status="Watching The Good Place" />
            <FriendItem name="SlowLamprey" status="Watching The Blacklist" />
            <FriendItem name="SmallDuck" status="Watching Daredevil" />
          </div>
          <button className="w-full mt-6 py-2 bg-dark rounded-lg text-xs font-bold text-light hover:text-foreground transition-colors">
            More
          </button>
        </section>
      </div>
    </aside>
  );
}

function NotificationItem({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="group cursor-pointer">
      <p className="text-sm font-bold text-foreground group-hover:text-brand transition-colors">{title}</p>
      <p className="text-xs text-light">{subtitle}</p>
    </div>
  );
}

function FriendItem({ name, status }: { name: string; status: string }) {
  return (
    <div className="group cursor-pointer">
      <p className="text-sm font-bold text-foreground group-hover:text-brand transition-colors">{name}</p>
      <p className="text-xs text-light">{status}</p>
    </div>
  );
}
