'use client';
import React from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Github, Linkedin, Plus, Trash2, Wand2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useFieldArray, useForm } from 'react-hook-form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

export const ResumeForm = ({ onUpdate }: { onUpdate: (data: any) => void }) => {
  const { toast } = useToast();

  const { register, control, watch } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      title: '',
      summary: '',
      email: '',
      linkedin: '',
      github: '', // Added GitHub field
      jobs: [
        { title: '', company: '', startDate: '', endDate: '', description: '' },
      ],
      education: [{ school: '', degree: '', field: '', graduationDate: '' }],
    },
  });

  const formData = watch();

  React.useEffect(() => {
    onUpdate(formData);
  }, [formData, onUpdate]);

  const {
    fields: jobs,
    append: appendJob,
    remove: removeJob,
  } = useFieldArray({
    control,
    name: 'jobs',
  });

  const {
    fields: education,
    append: appendEducation,
    remove: removeEducation,
  } = useFieldArray({
    control,
    name: 'education',
  });

  const enhanceWithAI = async (field: string) => {
    toast({
      title: 'AI Enhancement',
      description: 'Enhancing your ' + field + ' with AI...',
    });
  };

  return (
    <form className="space-y-8">
      <div className="space-y-6">
        <div className="flex items-center justify-between bg-white rounded-xl border border-slate-200 p-4">
          <Select
            onValueChange={(value) => console.log('Selected style:', value)}
          >
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

        <div className="space-y-4 bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="text-lg font-medium flex items-center gap-2 text-slate-900">
            <span className="h-8 w-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg
                className="w-4 h-4 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </span>
            Quick Import
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <Button
              variant="outline"
              className="h-16 gap-3 border-slate-200 text-slate-700 hover:bg-slate-50"
            >
              <Github className="w-5 h-5" />
              Import from GitHub
            </Button>
            <Button
              variant="outline"
              className="h-16 gap-3 border-slate-200 text-slate-700 hover:bg-slate-50"
            >
              <Linkedin className="w-5 h-5" />
              Import from LinkedIn
            </Button>
          </div>
        </div>

        <div className="space-y-4 bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="text-lg font-medium flex items-center gap-2 text-slate-900">
            <span className="h-8 w-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg
                className="w-4 h-4 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </span>
            Personal Information
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-slate-700">
                First Name
              </Label>
              <Input
                id="firstName"
                placeholder="John"
                className="border-slate-200"
                {...register('firstName')}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName" className="text-slate-700">
                Last Name
              </Label>
              <Input
                id="lastName"
                placeholder="Doe"
                className="border-slate-200"
                {...register('lastName')}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="title" className="text-slate-700">
              Professional Title
            </Label>
            <div className="flex gap-2">
              <Input
                id="title"
                placeholder="Senior Software Engineer"
                className="border-slate-200"
                {...register('title')}
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="shrink-0"
                onClick={() => enhanceWithAI('title')}
              >
                <Wand2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="summary" className="text-slate-700">
              Professional Summary
            </Label>
            <div className="flex gap-2">
              <Textarea
                id="summary"
                placeholder="Brief overview of your experience and skills..."
                className="h-32 border-slate-200"
                {...register('summary')}
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="shrink-0"
                onClick={() => enhanceWithAI('summary')}
              >
                <Wand2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-4 bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="text-lg font-medium flex items-center gap-2 text-slate-900">
            <span className="h-8 w-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg
                className="w-4 h-4 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </span>
            Contact Information
          </h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-700">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                className="border-slate-200"
                {...register('email')}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="linkedin" className="text-slate-700">
                LinkedIn URL
              </Label>
              <Input
                id="linkedin"
                placeholder="https://linkedin.com/in/johndoe"
                className="border-slate-200"
                {...register('linkedin')}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="github" className="text-slate-700">
                GitHub URL
              </Label>
              <Input
                id="github"
                placeholder="https://github.com/johndoe"
                className="border-slate-200"
                {...register('github')}
              />
            </div>
          </div>
        </div>

        <div className="space-y-4 bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium flex items-center gap-2 text-slate-900">
              <span className="h-8 w-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </span>
              Work Experience
            </h3>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() =>
                appendJob({
                  title: '',
                  company: '',
                  startDate: '',
                  endDate: '',
                  description: '',
                })
              }
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Job
            </Button>
          </div>

          {jobs.map((field, index) => (
            <div
              key={field.id}
              className="space-y-4 p-4 bg-slate-50 rounded-lg"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1 grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`jobs.${index}.title`}>Job Title</Label>
                    <Input
                      {...register(`jobs.${index}.title`)}
                      placeholder="Senior Developer"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`jobs.${index}.company`}>Company</Label>
                    <Input
                      {...register(`jobs.${index}.company`)}
                      placeholder="Tech Corp"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`jobs.${index}.startDate`}>
                      Start Date
                    </Label>
                    <Input
                      {...register(`jobs.${index}.startDate`)}
                      type="date"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`jobs.${index}.endDate`}>End Date</Label>
                    <Input {...register(`jobs.${index}.endDate`)} type="date" />
                  </div>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="ml-2"
                  onClick={() => removeJob(index)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              <div className="space-y-2">
                <Label htmlFor={`jobs.${index}.description`}>Description</Label>
                <div className="flex gap-2">
                  <Textarea
                    {...register(`jobs.${index}.description`)}
                    placeholder="Describe your responsibilities and achievements..."
                    className="h-32"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="shrink-0"
                    onClick={() =>
                      enhanceWithAI(`job ${index + 1} description`)
                    }
                  >
                    <Wand2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Education Section */}
        <div className="space-y-4 bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium flex items-center gap-2 text-slate-900">
              <span className="h-8 w-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 14l9-5-9-5-9 5 9 5z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 14l9-5-9-5-9 5 9 5z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 14l9-5-9-5-9 5 9 5z"
                  />
                </svg>
              </span>
              Education
            </h3>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() =>
                appendEducation({
                  school: '',
                  degree: '',
                  field: '',
                  graduationDate: '',
                })
              }
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Education
            </Button>
          </div>

          {education.map((field, index) => (
            <div
              key={field.id}
              className="space-y-4 p-4 bg-slate-50 rounded-lg"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1 grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`education.${index}.school`}>School</Label>
                    <Input
                      {...register(`education.${index}.school`)}
                      placeholder="University Name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`education.${index}.degree`}>Degree</Label>
                    <Input
                      {...register(`education.${index}.degree`)}
                      placeholder="Bachelor's"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`education.${index}.field`}>
                      Field of Study
                    </Label>
                    <Input
                      {...register(`education.${index}.field`)}
                      placeholder="Computer Science"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`education.${index}.graduationDate`}>
                      Graduation Date
                    </Label>
                    <Input
                      {...register(`education.${index}.graduationDate`)}
                      type="date"
                    />
                  </div>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="ml-2"
                  onClick={() => removeEducation(index)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </form>
  );
};
