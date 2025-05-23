export interface ResumeFormData {
  id?: string;
  title: string;
  lastModified?: string;
  firstName: string;
  lastName: string;
  jobTitle: string;
  summary: string;
  email: string;
  github?: string;
  linkedin?: string;
  workExperience: Array<{
    position: string;
    company: string;
    startDate: string;
    endDate: string;
    description: string;
  }>;
  education: Array<{
    school: string;
    degree: string;
    field: string;
    graduationDate: string;
  }>;
  projects: Array<{
    id: number;
    name: string;
    description: string;
    technologies: string;
    link?: string;
  }>;
  skills: Array<{
    name: string;
    level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  }>;
  style: 'modern' | 'classic' | 'minimal' | 'creative';
}

export type ResumeData = ResumeFormData;