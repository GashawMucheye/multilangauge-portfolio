'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { LANGUAGES } from '@/lib/types';
import { ScrollArea } from './ui/scroll-area';
import {
  LanguageReviewOutput,
  reviewLanguage,
} from '@/src/ai/flows/language-review';
import { useLocale } from 'next-intl';

interface LanguageReviewProps {
  languageContent: Record<string, any>; // translations keyed by locale
}

export function LanguageReview({ languageContent }: LanguageReviewProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [reviewResult, setReviewResult] = useState<LanguageReviewOutput | null>(
    null
  );

  const locale = useLocale();

  const formSchema = z.object({
    language: z.string().nonempty(),
    content: z.string().min(10, 'Content must be at least 10 characters long.'),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      language: 'en',
      content: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setReviewResult(null);
    try {
      const result = await reviewLanguage(values);
      setReviewResult(result);
    } catch (error) {
      console.error('AI review failed:', error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          size='lg'
          className='bg-accent text-accent-foreground hover:bg-accent/90'
        >
          {languageContent.submitButton?.[locale] ?? 'Submit'}
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-4xl'>
        <DialogHeader>
          <DialogTitle className='font-headline text-2xl'>
            {languageContent.dialogTitle?.[locale]}
          </DialogTitle>
          <DialogDescription>
            {languageContent.dialogDescription?.[locale]}
          </DialogDescription>
        </DialogHeader>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 py-4'>
          {/* LEFT FORM */}
          <div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-8'
              >
                <FormField
                  control={form.control}
                  name='language'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {languageContent.languageLabel?.[locale]}
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='Select a language' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {LANGUAGES.map((lang) => (
                            <SelectItem key={lang.value} value={lang.value}>
                              {lang.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='content'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {languageContent.contentLabel?.[locale]}
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder={
                            languageContent.contentPlaceholder?.[locale]
                          }
                          className='resize-none h-48'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type='submit' disabled={isLoading} className='w-full'>
                  {isLoading ? (
                    <>
                      <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                      {languageContent.loading?.[locale] ?? 'Loading...'}
                    </>
                  ) : (
                    languageContent.submitButton?.[locale] ?? 'Submit'
                  )}
                </Button>
              </form>
            </Form>
          </div>

          {/* RIGHT OUTPUT */}
          <div className='flex flex-col gap-4'>
            <Card className='flex-1'>
              <CardHeader>
                <CardTitle>
                  {languageContent.reviewedContentTitle?.[locale]}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className='h-40'>
                  <p className='text-sm text-muted-foreground whitespace-pre-wrap'>
                    {reviewResult?.reviewedContent ||
                      'AI review will appear here.'}
                  </p>
                </ScrollArea>
              </CardContent>
            </Card>

            <Card className='flex-1'>
              <CardHeader>
                <CardTitle>{languageContent.feedbackTitle?.[locale]}</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className='h-40'>
                  <p className='text-sm text-muted-foreground whitespace-pre-wrap'>
                    {reviewResult?.feedback || 'AI feedback will appear here.'}
                  </p>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
