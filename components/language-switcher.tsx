'use client';
import { useLocale } from 'next-intl';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useEffect, useTransition, useRef } from 'react';
import { LANGUAGES } from '../src/lib/types';
import { usePathname, useRouter } from '../src/i18n/navigation';

// Define the key for localStorage to save the user's preference
const LOCAL_STORAGE_KEY = 'userPreferredLocale';

export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale() as string;
  const [isPending, startTransition] = useTransition();

  // Use a ref to ensure the initialization logic runs exactly once on the client mount
  const isInitialLoad = useRef(true);

  useEffect(() => {
    // --- 1. INITIALIZATION & PERSISTENCE LOGIC ---
    // This logic ensures 'en' is set as default on first visit and persists choices.
    if (isInitialLoad.current) {
      isInitialLoad.current = false;

      const storedLocale = localStorage.getItem(LOCAL_STORAGE_KEY);
      let targetLocale = 'en'; // Default language is English

      if (storedLocale) {
        // If a language preference is stored, use that
        targetLocale = storedLocale;
      } else {
        // If it's the very first visit (no storage), set the default preference to 'en'
        localStorage.setItem(LOCAL_STORAGE_KEY, 'en');
      }

      // If the determined language (stored or default 'en') doesn't match the current URL locale,
      // trigger a transition to set the correct route.
      if (targetLocale !== locale) {
        startTransition(() => {
          router.replace(pathname, { locale: targetLocale });
        });
        // Exit early if we are redirecting
        return;
      }
    }

    // --- 2. RTL/LTR Logic (Runs after initial check and whenever the locale changes) ---
    if (locale === 'he') {
      document.documentElement.dir = 'rtl';
    } else {
      document.documentElement.dir = 'ltr';
    }
  }, [locale, router, pathname, startTransition]);

  const onSelectChange = (value: string) => {
    const nextLocale = value;

    // Always store the user's new, explicit selection
    localStorage.setItem(LOCAL_STORAGE_KEY, nextLocale);

    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  };

  return (
    <Select value={locale} onValueChange={onSelectChange} disabled={isPending}>
      <SelectTrigger className='w-[120px]'>
        <SelectValue placeholder='Language' />
      </SelectTrigger>
      <SelectContent className='bg-blue-500 text-white hover:bg-blue-600'>
        {LANGUAGES.map((lang) => (
          <SelectItem key={lang.value} value={lang.value}>
            {lang.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
