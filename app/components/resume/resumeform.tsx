import React from 'react';
import { useForm } from 'react-hook-form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/ui/select';
import { PersonalInfoSection } from './personalinfosection';
import { ContactSection } from '@/app/components/resume/contactsection';
import { ImportSection } from './importsection';
import { WorkExperienceSection } from './workexperience';
import { EducationSection } from './educationsection';
import { ProjectsSection } from './projectsection';
import { useToast } from '@/hooks/use-toast';

import { ResumeFormData } from '@/types/resume';

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
      workExperience: [],
      education: [],
      projects: [],
    },
  });

  const formData = watch();

  React.useEffect(() => {
    onUpdate(formData);
  }, [formData, onUpdate]);

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

        <ImportSection setValue={setValue} />
        <PersonalInfoSection register={register} setValue={setValue} />
        <ContactSection register={register} />
        <WorkExperienceSection
          register={register}
          control={control}
          setValue={setValue}
        />
        <EducationSection register={register} control={control} />
        <ProjectsSection register={register} control={control} />
      </div>
    </form>
  );
};
