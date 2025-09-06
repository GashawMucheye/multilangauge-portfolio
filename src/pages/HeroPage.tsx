import ThreeScene from '@/components/three-scene';
import { Button } from '@/components/ui/button';
import { ArrowDown, Award } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

const HeroPage = () => {
  const t = useTranslations('hero');
  return (
    <section
      id='hero'
      className='relative flex h-[100svh] w-full flex-col items-center justify-center overflow-hidden'
    >
      <ThreeScene />
      <div className='relative z-10 flex flex-col items-center text-center text-primary-foreground p-4'>
        <h1 className='font-headline text-5xl md:text-7xl lg:text-8xl font-bold drop-shadow-lg text-foreground'>
          {t('title')}
        </h1>
        <p className='mt-4 max-w-2xl text-lg md:text-xl text-foreground/80'>
          {t('subtitle')}
        </p>
        <div className='mt-8 flex flex-col sm:flex-row gap-4'>
          <Button
            asChild
            size='lg'
            className='bg-accent text-accent-foreground hover:bg-accent/90'
          >
            <a href='#projects'>
              {t('cta')}
              <ArrowDown className='ml-2 h-5 w-5' />
            </a>
          </Button>
          <Button
            asChild
            size='lg'
            variant='outline'
            className='bg-background/10 text-foreground hover:bg-background/20 border-foreground/20'
          >
            <a href='/certificate.pdf' target='_blank'>
              {t('certificateCta')}
              <Award className='ml-2 h-5 w-5' />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroPage;
