import { Button } from '@/components/ui/button';
import { Link } from '@/src/i18n/navigation';
import { useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations('nav');
  return (
    <div className='bg-yellow-500 container mx-auto min-h-screen flex flex-col items-center justify-center'>
      <Link href='/about'>{t('about')}</Link>
      <Button>button</Button>
    </div>
  );
}
