import Image from 'next/image';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ProjectCardProps {
  project: any;
  language: any;
}

export function ProjectCard({ project, language }: ProjectCardProps) {
  return (
    <Card className='flex h-full flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1'>
      <CardHeader>
        <div className='aspect-video relative w-full mb-4'>
          <Image
            src={project.image}
            alt={project.title[language]}
            fill
            className='rounded-lg object-cover'
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            data-ai-hint={project.aiHint}
          />
        </div>
        <CardTitle className='font-headline text-2xl'>
          {project.title[language]}
        </CardTitle>
      </CardHeader>
      <CardContent className='flex flex-col flex-grow'>
        <CardDescription className='flex-grow'>
          {project.description[language]}
        </CardDescription>
        <div className='mt-4 flex flex-wrap gap-2'>
          {project.tags.map((tag: any, index: any) => (
            <Badge key={index} variant='secondary'>
              {tag[language]}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
