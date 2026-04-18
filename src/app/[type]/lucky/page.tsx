import { tmdb } from '@/lib/tmdb';
import { redirect } from 'next/navigation';

interface LuckyPageProps {
  params: Promise<{
    type: string;
  }>;
}

export default async function LuckyPage({ params }: LuckyPageProps) {
  const { type } = await params;

  try {
    const items = type === 'movies' ? await tmdb.getTrendingMovies() : await tmdb.getPopularSeries();
    
    if (items.length > 0) {
      const randomItem = items[Math.floor(Math.random() * items.length)];
      redirect(`/watch/${randomItem.id}`);
    }
  } catch (error) {
    console.error('Error in Feeling Lucky:', error);
  }

  redirect('/');
}
