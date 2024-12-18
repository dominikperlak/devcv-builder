import React from 'react';
import { ResumeData } from '@/types/resume';
import { Mail, Linkedin, Github } from 'lucide-react';
export const ModernStyle = ({ data }: { data: ResumeData }) => {
  return (
    <div className="space-y-6 font-sans">
      <div className="text-center space-y-4 bg-blue-50 py-8 rounded-lg">
        <h1 className="text-3xl font-bold text-blue-900">
          {data.firstName} {data.lastName}
        </h1>
        <p className="text-blue-600 font-medium">{data.title}</p>
        <div className="flex justify-center gap-6 text-sm text-blue-700">
          {data.email && (
            <div className="flex items-center gap-1">
              <Mail className="w-4 h-4" />
              <a href={`mailto:${data.email}`} className="hover:text-blue-900">
                {data.email}
              </a>
            </div>
          )}
          {data.linkedin && (
            <div className="flex items-center gap-1">
              <Linkedin className="w-4 h-4" />
              <a
                href={data.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-900"
              >
                LinkedIn
              </a>
            </div>
          )}
          {data.github && (
            <div className="flex items-center gap-1">
              <Github className="w-4 h-4" />
              <a
                href={data.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-900"
              >
                GitHub
              </a>
            </div>
          )}
        </div>
      </div>
      {data.summary && (
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-blue-900 border-b-2 border-blue-200 pb-2">
            Summary
          </h2>
          <p className="text-slate-600 leading-relaxed">{data.summary}</p>
        </div>
      )}
      {data.workExperience?.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-blue-900 border-b-2 border-blue-200 pb-2">
            Work Experience
          </h2>
          {data.workExperience.map((exp, index) => (
            <div key={index} className="space-y-2">
              <h3 className="font-semibold text-slate-900">{exp.position}</h3>
              <p className="text-blue-600">{exp.company}</p>
              <p className="text-sm text-slate-500">
                {exp.startDate} - {exp.endDate}
              </p>
              <p className="text-slate-600">{exp.description}</p>
            </div>
          ))}
        </div>
      )}
      {/* Education */}
      {data.education?.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-blue-900 border-b-2 border-blue-200 pb-2">
            Education
          </h2>
          {data.education.map((edu, index) => (
            <div key={index} className="space-y-2">
              <h3 className="font-semibold text-slate-900">{edu.school}</h3>
              <p className="text-blue-600">
                {edu.degree} in {edu.field}
              </p>
              <p className="text-sm text-slate-500">
                Graduated: {edu.graduationDate}
              </p>
            </div>
          ))}
        </div>
      )}
      {data.projects?.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-blue-900 border-b-2 border-blue-200 pb-2">
            Projects
          </h2>
          {data.projects.map((project, index) => (
            <div key={index} className="space-y-2">
              <h3 className="font-semibold text-slate-900">{project.name}</h3>
              <p className="text-blue-600">{project.technologies}</p>
              <p className="text-slate-600">{project.description}</p>
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline text-sm"
                >
                  View Project
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
