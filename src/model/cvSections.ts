export const cvSectionIds = [
  'summary',
  'experience',
  'education',
  'skills',
  'languages',
  'certifications',
  'projects',
  'publications',
  'awards',
  'customSections',
] as const;

export type CvSectionId = typeof cvSectionIds[number];

export const cvSectionLabels: Record<CvSectionId, string> = {
  summary: 'Profile',
  experience: 'Experience',
  education: 'Education',
  skills: 'Skills',
  languages: 'Languages',
  certifications: 'Certifications',
  projects: 'Projects',
  publications: 'Publications',
  awards: 'Awards & Recognition',
  customSections: 'Custom sections',
};
