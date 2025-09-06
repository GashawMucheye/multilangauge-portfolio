'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Menu, CodeXml } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
// import { ThemeSwitcher } from '@/components/theme-switcher';
import { cn } from '@/lib/utils';
import { LanguageSwitcher } from './language-switcher';
import { Button } from './ui/button';
import { usePathname } from '../src/i18n/navigation';
import Link from 'next/link';
import { ThemeSwitcher } from './theme-switcher';

function Header() {
  const t = useTranslations('nav');
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '/about', label: t('about') },
    { href: '/services', label: t('services') },
    { href: '/skills', label: t('skills') },
    { href: '/projects', label: t('projects') },
    { href: '/ai-review', label: t('aiReview') },
    { href: '/contact', label: t('contact') },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled || !isHome
          ? 'bg-background/80 backdrop-blur-sm shadow-md'
          : 'bg-transparent text-foreground'
      )}
    >
      <div className='container mx-auto flex h-20 items-center justify-between px-4'>
        <Link href='/' className='flex items-center gap-2 font-bold text-xl'>
          <CodeXml className='h-7 w-7 text-accent' />
          <span className='font-headline'>LinguaFolio</span>
        </Link>
        <nav className='hidden items-center gap-1 md:flex'>
          {navItems.map((item) => (
            <Button key={item.label} variant='ghost' asChild>
              <Link href={item.href}>{item.label}</Link>
            </Button>
          ))}
          <LanguageSwitcher />
          <ThemeSwitcher />
        </nav>
        <div className='md:hidden flex items-center gap-2'>
          <ThemeSwitcher />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant='outline' size='icon' aria-label='Open menu'>
                <Menu className='h-6 w-6' />
                <span className='sr-only'>Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side='right'>
              <SheetHeader>
                <SheetTitle className='font-headline text-lg'>
                  LinguaFolio
                </SheetTitle>
              </SheetHeader>
              <nav className='flex flex-col gap-4 mt-8'>
                {navItems.map((item) => (
                  <Button
                    key={item.label}
                    variant='ghost'
                    asChild
                    className='text-lg'
                  >
                    <Link href={item.href}>{item.label}</Link>
                  </Button>
                ))}
                <div className='mt-4 flex justify-center'>
                  <LanguageSwitcher />
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
export default Header;
