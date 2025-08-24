'use client';

import React from 'react';
// import { content, skills, SkillCategory } from '@/lib/content';
import { Card, CardContent } from '@/components/ui/card';
import { skills } from '@/lib/content';
import { useTranslations } from 'next-intl';

const skillCategories: { id: any; name: string }[] = [
  { id: 'frontend', name: 'Frontend' },
  { id: 'backend', name: 'Backend' },
  { id: 'database', name: 'Database' },
  { id: 'tools', name: 'Tools' },
];

export default function SkillsPage() {
  const t = useTranslations('skills');
  return (
    <div className='flex min-h-screen flex-col'>
      <section id='skills' className='py-20 sm:py-32'>
        <div className='container mx-auto px-4'>
          <div className='mx-auto max-w-4xl text-center'>
            <h1 className='font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl'>
              {t('title')}
            </h1>
            <p className='mt-4 text-lg text-muted-foreground'>
              {t('description')}
            </p>
          </div>

          <div className='mt-16 space-y-16'>
            {skillCategories.map((category) => (
              <div key={category.id}>
                <h2 className='font-headline text-3xl font-bold tracking-tight text-foreground mb-8 text-center sm:text-left'>
                  {category.name}
                </h2>
                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6'>
                  {skills
                    .filter((skill) => skill.category === category.id)
                    .map((skill) => (
                      <Card
                        key={skill.name}
                        className='group flex aspect-square flex-col items-center justify-center p-4 text-center transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-2 bg-secondary/30 hover:bg-secondary'
                      >
                        <div className='relative h-16 w-16 mb-4 transition-transform duration-300 group-hover:scale-110 flex items-center justify-center'>
                          <skill.icon className='h-12 w-12 text-foreground transition-transform duration-500 ease-in-out group-hover:animate-spin' />
                        </div>
                        <CardContent className='p-0'>
                          <p className='font-semibold text-foreground'>
                            {skill.name}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
