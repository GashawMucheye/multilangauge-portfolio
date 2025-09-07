import Image from 'next/image';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ProjectTag {
  [language: string]: string;
}

interface Project {
  image: string;
  title: { [language: string]: string };
  description: { [language: string]: string };
  tags: ProjectTag[];
  aiHint?: string;
}

interface ProjectCardProps {
  project: Project;
  language: string;
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
          />
        </div>
        <CardTitle>{project.title[language]}</CardTitle>
        <CardDescription>{project.description[language]}</CardDescription>
        <div className='mt-2 flex flex-wrap gap-2'>
          {project.tags.map((tag, index) => (
            <Badge key={index} variant='secondary'>
              {tag[language]}
            </Badge>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        {project.aiHint && (
          <p className='text-sm text-muted-foreground'>{project.aiHint}</p>
        )}
      </CardContent>
    </Card>
  );
}
