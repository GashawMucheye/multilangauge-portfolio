import ContactPage from '@/src/pages/ContactPage';
import { Mail } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React, { FC } from 'react';

const ContactScreen: FC = () => {
  const t = useTranslations('contact');
  return (
    <section id='contact' className='py-20 sm:py-32'>
      <div className='container mx-auto px-4'>
        <div className='mx-auto max-w-2xl lg:max-w-4xl text-center'>
          <div className='inline-block rounded-lg bg-accent px-3 py-1 text-sm text-accent-foreground'>
            <Mail className='inline-block -mt-1 mr-2 h-5 w-5' />
            {t('badge')}
          </div>
          <h2 className='mt-4 font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl'>
            {t('title')}
          </h2>
          <p className='mt-4 text-lg text-muted-foreground'>
            {t('description')}
          </p>
        </div>
        <div className='mx-auto mt-16 max-w-xl'>
          <ContactPage />
        </div>
      </div>
    </section>
  );
};

export default ContactScreen;
