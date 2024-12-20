export interface ResumeFormData {
  firstName: string;
  lastName: string;
  title: string;
  summary: string;
  email: string;
  linkedin?: string;
  github?: string;
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
    id: string;
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