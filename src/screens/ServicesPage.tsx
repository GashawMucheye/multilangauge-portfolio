'use client';

import React from 'react';

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function ServicesPage() {
  const t = useTranslations('services');

  // Get items as raw array from translations
  const services = t.raw('items') as { title: string; description: string }[];

  return (
    <div className='flex min-h-screen flex-col'>
      <section id='services' className='py-20 sm:py-32'>
        <div className='container mx-auto px-4'>
          <div className='mx-auto max-w-4xl text-center'>
            <h1 className='font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl'>
              {t('title')}
            </h1>
            <p className='mt-4 text-lg text-muted-foreground'>
              {t('description')}
            </p>
          </div>

          <div className='mt-16 grid gap-8 md:grid-cols-1 lg:grid-cols-3'>
            {services.map((service, index) => (
              <Card key={index} className='text-center'>
                <CardHeader>
                  <div className='mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent text-accent-foreground'>
                    <CheckCircle className='h-6 w-6' />
                  </div>
                  <CardTitle className='font-headline text-2xl'>
                    {service.title}
                  </CardTitle>
                  <CardDescription className='pt-2'>
                    {service.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
