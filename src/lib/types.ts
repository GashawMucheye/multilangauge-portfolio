export const LANGUAGES: { value: string; label: string }[] = [
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Español' },
  { value: 'fr', label: 'Français' },
  { value: 'am', label: 'አማርኛ' },
  { value: 'he', label: 'עברית' },
  { value: 'ru', label: 'Русский' },
];

export interface Project {
  id: number;
  image: string;
  aiHint: string;
}

export type SkillCategory = 'frontend' | 'backend' | 'tools' | 'database';

export interface Skill {
  name: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  category: SkillCategory;
}
