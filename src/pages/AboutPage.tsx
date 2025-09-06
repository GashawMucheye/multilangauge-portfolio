import ThreeImage from '@/components/three-image';
import { Card, CardContent } from '@/components/ui/card';
import { useTranslations } from 'next-intl';
import React, { FC } from 'react';

const AboutPage: FC = () => {
  const t = useTranslations('about');
  return (
    <section id='about' className='py-20 sm:py-32'>
      <div className='container mx-auto px-4'>
        <div className='mx-auto max-w-4xl'>
          <h2 className='font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl text-center'>
            {t('title')}
          </h2>
          <Card className='mt-12 overflow-hidden'>
            <CardContent className='p-0'>
              <div className='grid grid-cols-1 md:grid-cols-2'>
                <div className='p-8 md:p-12 flex flex-col justify-center'>
                  <p className='text-lg text-muted-foreground mb-6'>
                    {t('p1')}
                  </p>
                  <p className='text-lg text-muted-foreground'>{t('p2')}</p>
                </div>
                <div className='relative h-80 md:h-auto min-h-[400px]'>
                  <ThreeImage
                    imageUrl='/profile.png'
                    altText={t('image_alt')}
                    aiHint='person portrait'
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
