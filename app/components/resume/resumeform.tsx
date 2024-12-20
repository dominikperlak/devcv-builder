'use client';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/ui/select';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Textarea } from '@/app/components/ui/textarea';
import { Button } from '@/app/components/ui/button';
import {
  Plus,
  Trash2,
  FileText,
  Briefcase,
  GraduationCap,
  Github,
  Wrench,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ResumeFormData } from '@/types/resume';
import { ImportSection } from './importsection';

type ResumeStyle = 'modern' | 'classic' | 'minimal' | 'creative';

export const ResumeForm = ({
  onUpdate,
}: {
  onUpdate: (data: ResumeFormData) => void;
}) => {
  const { toast } = useToast();
  const { register, control, watch, setValue } = useForm<ResumeFormData>({
    defaultValues: {
      firstName: '',
      lastName: '',
      title: '',
      summary: '',
      email: '',
      github: '',
      linkedin: '',
      workExperience: [],
      education: [],
      projects: [],
      skills: [],
      style: 'modern',
    },
  });

  useEffect(() => {
    const subscription = watch((value) => {
      console.log('Form data updated:', value);
      onUpdate(value as ResumeFormData);
    });

    return () => subscription.unsubscribe();
  }, [watch, onUpdate]);

  const handleStyleChange = (value: ResumeStyle) => {
    setValue('style', value);
    toast({
      title: 'Style Updated',
      description: `Resume style changed to ${value}`,
    });
  };

  return (
    <form className="space-y-8">
      <div className="space-y-6">
        <div className="flex items-center justify-between bg-white rounded-xl border border-slate-200 p-4">
          <Select defaultValue="modern" onValueChange={handleStyleChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select style" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="modern">Modern</SelectItem>
              <SelectItem value="classic">Classic</SelectItem>
              <SelectItem value="minimal">Minimal</SelectItem>
              <SelectItem value="creative">Creative</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <ImportSection setValue={setValue} />
        <div className="space-y-4 bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="text-lg font-medium flex items-center gap-2 text-slate-900">
            <span className="h-8 w-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText className="w-4 h-4 text-blue-600" />
            </span>
            Contact Information
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>First Name</Label>
              <Input {...register('firstName')} placeholder="John" />
            </div>
            <div className="space-y-2">
              <Label>Last Name</Label>
              <Input {...register('lastName')} placeholder="Doe" />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                {...register('email')}
                type="email"
                placeholder="john@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label>Title</Label>
              <Input {...register('title')} placeholder="Software Engineer" />
            </div>
            <div className="space-y-2">
              <Label>LinkedIn</Label>
              <Input
                {...register('linkedin')}
                placeholder="https://linkedin.com/in/johndoe"
              />
            </div>
            <div className="space-y-2">
              <Label>GitHub</Label>
              <Input
                {...register('github')}
                placeholder="https://github.com/johndoe"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4 bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="text-lg font-medium flex items-center gap-2 text-slate-900">
            <span className="h-8 w-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText className="w-4 h-4 text-blue-600" />
            </span>
            Professional Summary
          </h3>
          <div className="space-y-2">
            <Label>Summary</Label>
            <Textarea
              {...register('summary')}
              placeholder="Brief overview of your professional background..."
              className="h-32"
            />
          </div>
        </div>

        <div className="space-y-4 bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium flex items-center gap-2 text-slate-900">
              <span className="h-8 w-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <Wrench className="w-4 h-4 text-blue-600" />
              </span>
              Skills
            </h3>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                const currentSkills = watch('skills') || [];
                setValue('skills', [
                  ...currentSkills,
                  { name: '', level: 'Intermediate' },
                ]);
              }}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Skill
            </Button>
          </div>
          {watch('skills')?.map((_, index) => (
            <div
              key={index}
              className="grid grid-cols-2 gap-4 p-4 bg-slate-50 rounded-lg"
            >
              <div className="space-y-2">
                <Label>Skill Name</Label>
                <Input
                  {...register(`skills.${index}.name`)}
                  placeholder="e.g., JavaScript"
                />
              </div>
              <div className="space-y-2">
                <Label>Level</Label>
                <select
                  {...register(`skills.${index}.level`)}
                  className="w-full border border-slate-200 rounded-md h-10 px-3"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Expert">Expert</option>
                </select>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="col-span-2"
                onClick={() => {
                  const currentSkills = watch('skills');
                  setValue(
                    'skills',
                    currentSkills.filter((_, i) => i !== index)
                  );
                }}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Remove Skill
              </Button>
            </div>
          ))}
        </div>

        <div className="space-y-4 bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium flex items-center gap-2 text-slate-900">
              <span className="h-8 w-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <Briefcase className="w-4 h-4 text-blue-600" />
              </span>
              Work Experience
            </h3>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                const currentExp = watch('workExperience') || [];
                setValue('workExperience', [
                  ...currentExp,
                  {
                    position: '',
                    company: '',
                    startDate: '',
                    endDate: '',
                    description: '',
                  },
                ]);
              }}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Experience
            </Button>
          </div>
          {watch('workExperience')?.map((_, index) => (
            <div key={index} className="space-y-4 p-4 bg-slate-50 rounded-lg">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Position</Label>
                  <Input
                    {...register(`workExperience.${index}.position`)}
                    placeholder="Software Engineer"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Company</Label>
                  <Input
                    {...register(`workExperience.${index}.company`)}
                    placeholder="Company Name"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <Input
                    {...register(`workExperience.${index}.startDate`)}
                    placeholder="MM/YYYY"
                  />
                </div>
                <div className="space-y-2">
                  <Label>End Date</Label>
                  <Input
                    {...register(`workExperience.${index}.endDate`)}
                    placeholder="MM/YYYY or Present"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  {...register(`workExperience.${index}.description`)}
                  placeholder="Describe your responsibilities and achievements..."
                  className="h-32"
                />
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => {
                  const currentExp = watch('workExperience');
                  setValue(
                    'workExperience',
                    currentExp.filter((_, i) => i !== index)
                  );
                }}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Remove Experience
              </Button>
            </div>
          ))}
        </div>

        <div className="space-y-4 bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium flex items-center gap-2 text-slate-900">
              <span className="h-8 w-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-4 h-4 text-blue-600" />
              </span>
              Education
            </h3>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                const currentEdu = watch('education') || [];
                setValue('education', [
                  ...currentEdu,
                  {
                    school: '',
                    degree: '',
                    field: '',
                    graduationDate: '',
                  },
                ]);
              }}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Education
            </Button>
          </div>
          {watch('education')?.map((_, index) => (
            <div key={index} className="space-y-4 p-4 bg-slate-50 rounded-lg">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>School</Label>
                  <Input
                    {...register(`education.${index}.school`)}
                    placeholder="University Name"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Degree</Label>
                  <Input
                    {...register(`education.${index}.degree`)}
                    placeholder="Bachelor's"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Field of Study</Label>
                  <Input
                    {...register(`education.${index}.field`)}
                    placeholder="Computer Science"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Graduation Date</Label>
                  <Input
                    {...register(`education.${index}.graduationDate`)}
                    placeholder="MM/YYYY"
                  />
                </div>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => {
                  const currentEdu = watch('education');
                  setValue(
                    'education',
                    currentEdu.filter((_, i) => i !== index)
                  );
                }}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Remove Education
              </Button>
            </div>
          ))}
        </div>

        <div className="space-y-4 bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium flex items-center gap-2 text-slate-900">
              <span className="h-8 w-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <Github className="w-4 h-4 text-blue-600" />
              </span>
              Projects
            </h3>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                const currentProjects = watch('projects') || [];
                setValue('projects', [
                  ...currentProjects,
                  {
                    id: Date.now().toString(),
                    name: '',
                    description: '',
                    technologies: '',
                    link: '',
                  },
                ]);
              }}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Project
            </Button>
          </div>
          {watch('projects')?.map((project, index) => (
            <div
              key={project.id || index}
              className="space-y-4 p-4 bg-slate-50 rounded-lg"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Project Name</Label>
                  <Input
                    {...register(`projects.${index}.name`)}
                    placeholder="Project Name"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Technologies Used</Label>
                  <Input
                    {...register(`projects.${index}.technologies`)}
                    placeholder="React, Node.js, etc."
                  />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label>Project Link</Label>
                  <Input
                    {...register(`projects.${index}.link`)}
                    placeholder="https://github.com/..."
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  {...register(`projects.${index}.description`)}
                  placeholder="Describe the project and your role..."
                  className="h-32"
                />
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => {
                  const currentProjects = watch('projects');
                  setValue(
                    'projects',
                    currentProjects.filter((_, i) => i !== index)
                  );
                }}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Remove Project
              </Button>
            </div>
          ))}
        </div>
      </div>
    </form>
  );
};
