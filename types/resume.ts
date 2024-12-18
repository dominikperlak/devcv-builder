export interface ResumeFormData {
  firstName: string;
  lastName: string;
  title: string;
  summary: string;
  email: string;
  linkedin?: string;
  github?: string;
  style: 'modern' | 'classic' | 'minimal' | 'creative';
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
}

export type ResumeData = ResumeFormData;