'use client';

import { useTranslations } from 'next-intl';
import About from './(auth)/about/page';
import HeroPage from '@/src/pages/HeroPage';
import ProjectScreen from '@/src/pages/ProjectScreen';
import AiReview from '@/src/pages/AiReview';
import { Separator } from '@/components/ui/separator';
import { useEffect, useState } from 'react';

export default function Home() {
  const t = useTranslations('nav');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }
  return (
    <div className='container mx-auto min-h-screen flex flex-col items-center justify-center'>
      <HeroPage />
      <Separator className='my-12' />

      <About />
      <Separator className='my-12' />

      <ProjectScreen />
      <Separator className='my-12' />
      <AiReview />
    </div>
  );
}
