'use client';

import { useLocale } from 'next-intl';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
// import type { Language } from '@/lib/types';
// import { LANGUAGES } from '@/lib/types';
import { useEffect, useTransition } from 'react';
import { LANGUAGES } from '../src/lib/types';
import { usePathname, useRouter } from '../src/i18n/navigation';

export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale() as string;
  const [isPending, startTransition] = useTransition();
  useEffect(() => {
    if (locale === 'he') {
      document.documentElement.dir = 'rtl';
    } else {
      document.documentElement.dir = 'ltr';
    }
  }, [locale]);
  const onSelectChange = (value: string) => {
    const nextLocale = value;
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  };

  return (
    <Select value={locale} onValueChange={onSelectChange} disabled={isPending}>
      <SelectTrigger className='w-[120px]'>
        <SelectValue placeholder='Language' />
      </SelectTrigger>
      <SelectContent>
        {LANGUAGES.map((lang) => (
          <SelectItem key={lang.value} value={lang.value}>
            {lang.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
