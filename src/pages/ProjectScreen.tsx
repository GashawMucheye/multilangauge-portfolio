// import Image from 'next/image';
// import { Badge } from '@/components/ui/badge';
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from '@/components/ui/card';
// import { useTranslations } from 'next-intl';
// import React from 'react';

// const ProjectScreen = () => {
//   const t = useTranslations('projects');
//   const projects = t.raw('projectItems') as {
//     title: string;
//     description: string;
//     tags: string[];
//     image: string;
//     id: number;
//   }[];

//   return (
//     <section id='projects' className='py-20 sm:py-32'>
//       <div className='container mx-auto px-4'>
//         <div className='mx-auto max-w-2xl lg:max-w-4xl text-center'>
//           <h2 className='font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl'>
//             {t('title')}
//           </h2>
//           <p className='mt-4 text-lg text-muted-foreground'>
//             {t('description')}
//           </p>
//         </div>

//         <div className='mt-16 grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
//           {projects.map((project) => (
//             <Card
//               key={project.id}
//               className='flex h-full flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1'
//             >
//               <CardHeader>
//                 <div className='aspect-video relative w-full mb-4'>
//                   <Image
//                     src={project.image}
//                     alt={project.title}
//                     fill
//                     className='rounded-lg object-cover'
//                     sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
//                   />
//                 </div>
//                 <CardTitle className='font-headline text-2xl'>
//                   {project.title}
//                 </CardTitle>
//               </CardHeader>

//               <CardContent className='flex flex-col flex-grow'>
//                 <CardDescription className='flex-grow'>
//                   {project.description}
//                 </CardDescription>
//                 <div className='mt-4 flex flex-wrap gap-2'>
//                   {project.tags.map((tag, index) => (
//                     <Badge key={index} variant='secondary'>
//                       {tag}
//                     </Badge>
//                   ))}
//                 </div>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ProjectScreen;

import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useTranslations } from 'next-intl';
import React from 'react';

const ProjectScreen = () => {
  const t = useTranslations('projects');
  const projects = t.raw('projectItems') as {
    title: string;
    description: string;
    tags: string[];
    image: string;
    id: number;
  }[];

  return (
    <section id='projects' className='py-20 sm:py-32'>
      <div className='container mx-auto px-4'>
        <div className='mx-auto max-w-2xl lg:max-w-4xl text-center'>
          <h2 className='font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl'>
            {t('title')}
          </h2>
          <p className='mt-4 text-lg text-muted-foreground'>
            {t('description')}
          </p>
        </div>

        <div className='mt-16 grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
          {projects.map((project) => (
            <Card
              key={project.id}
              className='flex h-full flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1'
            >
              <CardHeader>
                {project.image ? (
                  <div className='aspect-video relative w-full mb-4'>
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className='rounded-lg object-cover'
                      sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                    />
                  </div>
                ) : (
                  <div className='aspect-video w-full mb-4 bg-gray-200 flex items-center justify-center rounded-lg'>
                    <span className='text-muted-foreground'>No Image</span>
                  </div>
                )}
                <CardTitle className='font-headline text-2xl'>
                  {project.title}
                </CardTitle>
              </CardHeader>

              <CardContent className='flex flex-col flex-grow'>
                <CardDescription className='flex-grow'>
                  {project.description}
                </CardDescription>
                <div className='mt-4 flex flex-wrap gap-2'>
                  {project.tags.map((tag, index) => (
                    <Badge key={index} variant='secondary'>
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectScreen;
