// import { content } from '@/lib/content';
import type { Language } from '@/lib/types';
import { CodeXml, Github, Linkedin } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button';
import { useTranslations } from 'next-intl';

// WhatsApp Icon component
const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='currentColor'
    {...props}
  >
    <path d='M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99 0-3.903-.52-5.58-1.452l-6.354 1.654zm.004-.001.003.001a.013.013 0 0 1 0 0zM6.481 19.352c1.556.914 3.398 1.401 5.27 1.401 5.454 0 9.901-4.447 9.902-9.902.001-2.67-1.031-5.18-2.9-7.05-1.869-1.87-4.38-2.901-7.05-2.902-5.454 0-9.901 4.447-9.902 9.902 0 2.021.59 3.943 1.636 5.616l-1.058 3.864 3.992-1.041zM8.381 6.985c-.328-.683-.655-1.365-1.03-1.365-.328 0-.547.055-.765.22-.22.163-.491.546-.655.912-.164.368-.275.792-.385 1.271-.11.48-.165.96-.165 1.441 0 .934.33 1.819.985 2.651 1.271 1.549 2.94 2.85 4.815 3.691 1.875.84 3.495 1.321 4.815 1.321s1.378-.11 1.875-.33c.497-.22 1.309-.655 1.473-1.271.164-.616.164-1.156 0-1.271s-.22-.165-.491-.33c-.273-.165-1.215-.601-1.379-.656-.165-.055-.33-.055-.495.055-.165.11-.275.33-.385.495-.11.165-.22.275-.385.44-.165.165-.33.22-.495.165-.165-.055-.655-.22-1.271-.44s-1.03-1.03-1.194-1.24c-.164-.22-.055-.33.055-.44.11-.11.22-.275.33-.44.11-.165.165-.275.22-.44.055-.165.055-.33 0-.44s-.495-1.155-.655-1.576z' />
  </svg>
);

// interface FooterProps {
//   language: Language;
// }

export default function Footer() {
  const t = useTranslations('footer');
  const currentYear = new Date().getFullYear();

  return (
    <footer className='bg-secondary/50'>
      <div className='container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row'>
        {/* <div className='flex items-center gap-2'>
          <CodeXml className='h-6 w-6 text-accent' />
          <span className='font-bold font-headline'>GMDFOLIO</span>
        </div> */}
        <p className='text-sm text-muted-foreground text-center sm:text-left'>
          &copy; {currentYear} ❤️GMDFOLIO. {t('copy')}
        </p>
        <div className='flex items-center gap-2'>
          <Button variant='ghost' size='icon' asChild>
            <a
              href='https://github.com/GashawMucheye?tab=repositories'
              target='_blank'
              aria-label='GitHub'
            >
              <Github className='h-5 w-5' />
            </a>
          </Button>
          <Button variant='ghost' size='icon' asChild>
            <a
              href='https://www.linkedin.com/in/gashawmucheye'
              target='_blank'
              aria-label='LinkedIn'
            >
              <Linkedin className='h-5 w-5' />
            </a>
          </Button>
          <Button variant='ghost' size='icon' asChild>
            <a
              href='https://wa.me/your-whatsapp-number'
              target='_blank'
              aria-label='WhatsApp'
              className='hover:text-[#25D366]'
            >
              <WhatsAppIcon className='h-5 w-5' />
            </a>
          </Button>
        </div>
      </div>
    </footer>
  );
}
