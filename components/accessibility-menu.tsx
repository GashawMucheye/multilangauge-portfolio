'use client';

import React from 'react';
import {
  Accessibility,
  Plus,
  Minus,
  RotateCcw,
  Contrast,
  Link,
  RefreshCw,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useAccessibility } from './accessibility-provider';
import { useTranslations } from 'next-intl';

export function AccessibilityMenu() {
  const t = useTranslations('accessibility');
  const {
    fontSize,
    increaseFontSize,
    decreaseFontSize,
    resetFontSize,
    highContrast,
    toggleHighContrast,
    letterSpacing,
    increaseLetterSpacing,
    decreaseLetterSpacing,
    resetLetterSpacing,
    wordSpacing,
    increaseWordSpacing,
    decreaseWordSpacing,
    resetWordSpacing,
    lineHeight,
    increaseLineHeight,
    decreaseLineHeight,
    resetLineHeight,
    highlightLinks,
    toggleHighlightLinks,
    resetAll,
  } = useAccessibility();

  return (
    <div className='fixed bottom-8 left-8 z-50 btn-accessibility-menu'>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant='outline'
            size='icon'
            className='rounded-full shadow-lg text-accent-foreground hover:bg-accent/90 h-14 w-14'
            aria-label={t('menuLabel')}
          >
            <Accessibility className='h-7 w-7' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          side='top'
          align='start'
          className='w-80'
          style={{
            backgroundColor: 'steelblue',
            color: 'black',
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
          }}
        >
          <div className='flex items-center justify-between pr-2'>
            <DropdownMenuLabel>{t('menuOptions')}</DropdownMenuLabel>
            <Button
              variant='ghost'
              size='icon'
              onClick={resetAll}
              aria-label={t('resetLabel')}
            >
              <RefreshCw className='h-4 w-4' />
            </Button>
          </div>
          <DropdownMenuSeparator />

          <div className='p-2 space-y-4'>
            {/* Font Size */}
            <div>
              <Label className='text-xs font-normal text-muted-foreground'>
                {t('fontSize.label')}
              </Label>
              <div className='flex items-center justify-between mt-1'>
                <Button
                  variant='outline'
                  size='icon'
                  onClick={decreaseFontSize}
                  disabled={fontSize <= 80}
                  aria-label={t('fontSize.decrease')}
                >
                  <Minus className='h-4 w-4' />
                </Button>
                <span className='w-16 text-center tabular-nums'>
                  {fontSize}%
                </span>
                <Button
                  variant='outline'
                  size='icon'
                  onClick={increaseFontSize}
                  disabled={fontSize >= 140}
                  aria-label={t('fontSize.increase')}
                >
                  <Plus className='h-4 w-4' />
                </Button>
                <Button
                  variant='outline'
                  size='icon'
                  onClick={resetFontSize}
                  aria-label={t('fontSize.reset')}
                  className='ml-2'
                >
                  <RotateCcw className='h-4 w-4' />
                </Button>
              </div>
            </div>

            {/* High Contrast */}
            <div className='flex items-center justify-between'>
              <Label
                htmlFor='high-contrast-switch'
                className='flex items-center gap-2 cursor-pointer'
              >
                <Contrast className='h-4 w-4' />
                <span>{t('highContrast')}</span>
              </Label>
              <Switch
                id='high-contrast-switch'
                checked={highContrast}
                onCheckedChange={toggleHighContrast}
              />
            </div>

            <DropdownMenuSeparator />

            {/* Letter Spacing */}
            <div>
              <Label className='text-xs font-normal text-muted-foreground'>
                {t('letterSpacing.increase')}
              </Label>
              <div className='flex items-center justify-between mt-1'>
                <Button
                  variant='outline'
                  size='icon'
                  onClick={decreaseLetterSpacing}
                  disabled={letterSpacing <= 100}
                  aria-label={t('letterSpacing.decrease')}
                >
                  <Minus className='h-4 w-4' />
                </Button>
                <span className='w-16 text-center tabular-nums'>
                  {letterSpacing}%
                </span>
                <Button
                  variant='outline'
                  size='icon'
                  onClick={increaseLetterSpacing}
                  disabled={letterSpacing >= 150}
                  aria-label={t('letterSpacing.increase')}
                >
                  <Plus className='h-4 w-4' />
                </Button>
                <Button
                  variant='outline'
                  size='icon'
                  onClick={resetLetterSpacing}
                  aria-label={t('letterSpacing.reset')}
                  className='ml-2'
                >
                  <RotateCcw className='h-4 w-4' />
                </Button>
              </div>
            </div>

            {/* Word Spacing */}
            <div>
              <Label className='text-xs font-normal text-muted-foreground'>
                {t('wordSpacing.label')}
              </Label>
              <div className='flex items-center justify-between mt-1'>
                <Button
                  variant='outline'
                  size='icon'
                  onClick={decreaseWordSpacing}
                  disabled={wordSpacing <= 100}
                  aria-label={t('wordSpacing.decrease')}
                >
                  <Minus className='h-4 w-4' />
                </Button>
                <span className='w-16 text-center tabular-nums'>
                  {wordSpacing}%
                </span>
                <Button
                  variant='outline'
                  size='icon'
                  onClick={increaseWordSpacing}
                  disabled={wordSpacing >= 150}
                  aria-label={t('wordSpacing.increase')}
                >
                  <Plus className='h-4 w-4' />
                </Button>
                <Button
                  variant='outline'
                  size='icon'
                  onClick={resetWordSpacing}
                  aria-label={t('wordSpacing.reset')}
                  className='ml-2'
                >
                  <RotateCcw className='h-4 w-4' />
                </Button>
              </div>
            </div>

            {/* Line Height */}
            <div>
              <Label className='text-xs font-normal text-muted-foreground'>
                {t('lineHeight.label')}
              </Label>
              <div className='flex items-center justify-between mt-1'>
                <Button
                  variant='outline'
                  size='icon'
                  onClick={decreaseLineHeight}
                  disabled={lineHeight <= 100}
                  aria-label={t('lineHeight.decrease')}
                >
                  <Minus className='h-4 w-4' />
                </Button>
                <span className='w-16 text-center tabular-nums'>
                  {lineHeight}%
                </span>
                <Button
                  variant='outline'
                  size='icon'
                  onClick={increaseLineHeight}
                  disabled={lineHeight >= 150}
                  aria-label={t('lineHeight.increase')}
                >
                  <Plus className='h-4 w-4' />
                </Button>
                <Button
                  variant='outline'
                  size='icon'
                  onClick={resetLineHeight}
                  aria-label={t('lineHeight.reset')}
                  className='ml-2'
                >
                  <RotateCcw className='h-4 w-4' />
                </Button>
              </div>
            </div>

            {/* Highlight Links */}
            <div className='flex items-center justify-between'>
              <Label
                htmlFor='highlight-links-switch'
                className='flex items-center gap-2 cursor-pointer'
              >
                <Link className='h-4 w-4' />
                <span>{t('highlightLinks')}</span>
              </Label>
              <Switch
                id='highlight-links-switch'
                checked={highlightLinks}
                onCheckedChange={toggleHighlightLinks}
              />
            </div>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
