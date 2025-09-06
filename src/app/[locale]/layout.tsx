import Header from '@/components/header';
import { routing } from '@/src/i18n/routing';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { Toaster } from '@/components/ui/sonner';

import './globals.css';
import Footer from '@/components/footer';
import { ThemeProvider } from 'next-themes';
import { ScrollToTop } from '@/components/scroll-to-top';
import { AccessibilityMenu } from '@/components/accessibility-menu';
import { AccessibilityProvider } from '@/components/accessibility-provider';

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute='class'
          defaultTheme='light'
          enableSystem={false}
          disableTransitionOnChange
        >
          <AccessibilityProvider>
            <NextIntlClientProvider>
              <div className='flex min-h-screen flex-col'>
                <Header />
                <main className='flex-1'>{children}</main>
                <Toaster />
                <Footer />
                <ScrollToTop />
                <AccessibilityMenu />
              </div>
            </NextIntlClientProvider>
          </AccessibilityProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
