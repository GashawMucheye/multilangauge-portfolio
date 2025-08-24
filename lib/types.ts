export type Language = 'en' | 'es' | 'fr' | 'am' | 'he' | 'ru';

export const LANGUAGES: { value: Language; label: string }[] = [
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Español' },
  { value: 'fr', label: 'Français' },
  { value: 'am', label: 'አማርኛ' },
  { value: 'he', label: 'עברית' },
  { value: 'ru', label: 'Русский' },
];

export type LocalizedContent = {
  [key in Language]: string;
};

export type SkillCategory = 'frontend' | 'backend' | 'tools' | 'database';

export interface Skill {
  name: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  category: SkillCategory;
}
