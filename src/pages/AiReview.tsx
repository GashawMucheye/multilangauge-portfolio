import { LanguageReview } from '@/components/language-review';
import { BotMessageSquare } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

const AiReview = () => {
  const t = useTranslations('review');

  return (
    <section id='ai-review' className='py-20 sm:py-32 bg-secondary/50'>
      <div className='container mx-auto px-4'>
        <div className='grid grid-cols-1 items-center gap-12 lg:grid-cols-2'>
          {/* Left side text */}
          <div className='text-center lg:text-left'>
            <div className='inline-block rounded-lg bg-accent px-3 py-1 text-sm text-accent-foreground'>
              <BotMessageSquare className='inline-block -mt-1 mr-2 h-5 w-5' />
              {t('badge')}
            </div>
            <h2 className='mt-4 font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl'>
              {t('title')}
            </h2>
            <p className='mt-6 text-lg text-muted-foreground'>
              {t('description')}
            </p>
          </div>

          {/* Right side review component */}
          <div className='flex justify-center'>
            <LanguageReview languageContent={t.raw('content')} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AiReview;
