import React from 'react';
import { Mail, Linkedin, Github } from 'lucide-react';
import SortableItem from './sortableitem';
import { ResumeStyle } from './styles';
import { ResumeFormData } from '@/types/resume';

interface ResumeContentProps {
  sections: string[];
  formData: ResumeFormData;
}

export const ResumeContent = ({ sections, formData }: ResumeContentProps) => {
  return (
    <div className="max-w-2xl mx-auto">
      <ResumeStyle data={formData}>
        <div className="space-y-6">
          {sections.map((section) => (
            <SortableItem key={section} id={section}>
              {section === 'Contact' && (
                <div className="text-center space-y-4">
                  <h1 className="text-2xl font-medium text-slate-900">
                    {formData?.firstName} {formData?.lastName}
                  </h1>
                  <p className="text-slate-600">{formData?.title}</p>
                  {(formData?.email ||
                    formData?.linkedin ||
                    formData?.github) && (
                    <div className="flex justify-center gap-4 text-sm text-slate-600">
                      {formData?.email && (
                        <div className="flex items-center gap-1">
                          <Mail className="w-4 h-4" />
                          <a
                            href={`mailto:${formData.email}`}
                            className="hover:text-blue-600"
                          >
                            {formData.email}
                          </a>
                        </div>
                      )}
                      {formData?.linkedin && (
                        <div className="flex items-center gap-1">
                          <Linkedin className="w-4 h-4" />
                          <a
                            href={formData.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-blue-600"
                          >
                            LinkedIn Profile
                          </a>
                        </div>
                      )}
                      {formData?.github && (
                        <div className="flex items-center gap-1">
                          <Github className="w-4 h-4" />
                          <a
                            href={formData.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-blue-600"
                          >
                            GitHub Profile
                          </a>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
              {section === 'Summary' && (
                <div className="space-y-2">
                  <p className="text-sm text-slate-600">{formData?.summary}</p>
                </div>
              )}
              {section === 'Skills' && formData?.skills?.length > 0 && (
                <div className="space-y-4">
                  <h2 className="text-lg font-medium border-b border-slate-200 pb-1 text-slate-900">
                    Skills
                  </h2>
                  <div className="grid grid-cols-2 gap-4">
                    {formData.skills.map((skill, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <span className="text-sm font-medium text-slate-900">
                          {skill.name}
                        </span>
                        <span className="text-sm text-slate-600">
                          {skill.level}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {section === 'Work Experience' &&
                formData?.workExperience?.length > 0 && (
                  <div className="space-y-4">
                    <h2 className="text-lg font-medium border-b border-slate-200 pb-1 text-slate-900">
                      Work Experience
                    </h2>
                    {formData.workExperience.map((exp: any, index: number) => (
                      <div key={index} className="space-y-2">
                        <h3 className="font-medium text-slate-900">
                          {exp.position}
                        </h3>
                        <p className="text-sm text-slate-600">{exp.company}</p>
                        <p className="text-sm text-slate-500">
                          {exp.startDate} - {exp.endDate}
                        </p>
                        <p className="text-sm text-slate-600">
                          {exp.description}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              {section === 'Education' && formData?.education?.length > 0 && (
                <div className="space-y-4">
                  <h2 className="text-lg font-medium border-b border-slate-200 pb-1 text-slate-900">
                    Education
                  </h2>
                  {formData.education.map((edu: any, index: number) => (
                    <div key={index} className="space-y-2">
                      <h3 className="font-medium text-slate-900">
                        {edu.school}
                      </h3>
                      <p className="text-sm text-slate-600">
                        {edu.degree} in {edu.field}
                      </p>
                      <p className="text-sm text-slate-500">
                        Graduated: {edu.graduationDate}
                      </p>
                    </div>
                  ))}
                </div>
              )}
              {section === 'Projects' && formData?.projects?.length > 0 && (
                <div className="space-y-4">
                  <h2 className="text-lg font-medium border-b border-slate-200 pb-1 text-slate-900">
                    Projects
                  </h2>
                  {formData.projects.map((project: any, index: number) => (
                    <div key={index} className="space-y-2">
                      <h3 className="font-medium text-slate-900">
                        {project.name}
                      </h3>
                      <p className="text-sm text-slate-600">
                        {project.technologies}
                      </p>
                      <p className="text-sm text-slate-600">
                        {project.description}
                      </p>
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 hover:underline"
                        >
                          View Project
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </SortableItem>
          ))}
        </div>
      </ResumeStyle>
    </div>
  );
};
