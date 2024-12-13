export interface ResumeFormData {
    firstName: string;
    lastName: string;
    title: string;
    summary: string;
    email: string;
    linkedin: string;
    github: string;
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
      startDate: string;
      endDate: string;
    }>;
    projects: Array<{
      name: string;
      description: string;
      technologies: string;
      link: string;
    }>
}