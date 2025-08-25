import { Button } from '@/components/ui/button';
import { Link } from '@/src/i18n/navigation';
import { useTranslations } from 'next-intl';
import About from './(auth)/about/page';
import HeroPage from '@/src/pages/HeroPage';

export default function Home() {
  const t = useTranslations('nav');
  return (
    <div className='bg-yellow-500 container mx-auto min-h-screen flex flex-col items-center justify-center'>
      {/* <Link href='/about'>{t('about')}</Link> */}
      <HeroPage />
      {/* <Button>button</Button> */}
      <About />
    </div>
  );
}
