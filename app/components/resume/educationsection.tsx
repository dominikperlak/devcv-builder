import React from 'react';
import {
  UseFormRegister,
  useFieldArray,
  Control,
  UseFormSetValue,
} from 'react-hook-form';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Plus, Trash2, GraduationCap } from 'lucide-react';
import { ResumeFormData } from '@/types/resume';

interface EducationProps {
  register: UseFormRegister<ResumeFormData>;
  control: Control<ResumeFormData>;
  setValue: UseFormSetValue<ResumeFormData>;
}

export const EducationSection = ({ register, control }: EducationProps) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'education',
  });
  return (
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
          onClick={() =>
            append({
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
      {fields.map((field, index) => (
        <div key={field.id} className="space-y-4 p-4 bg-slate-50 rounded-lg">
          <div className="flex justify-between items-start">
            <div className="flex-1 grid grid-cols-2 gap-4">
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
                  type="date"
                />
              </div>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="ml-2"
              onClick={() => remove(index)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};
