import React from 'react';
import { UseFormRegister, useFieldArray } from 'react-hook-form';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Plus, Trash2, Briefcase } from 'lucide-react';

interface WorkExperienceProps {
  register: UseFormRegister<any>;
  control: any;
}

export const WorkExperienceSection = ({
  register,
  control,
}: WorkExperienceProps) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'workExperience',
  });

  return (
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
          onClick={() =>
            append({
              position: '',
              company: '',
              startDate: '',
              endDate: '',
              description: '',
            })
          }
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Experience
        </Button>
      </div>

      {fields.map((field, index) => (
        <div key={field.id} className="space-y-4 p-4 bg-slate-50 rounded-lg">
          <div className="flex justify-between items-start">
            <div className="flex-1 grid grid-cols-2 gap-4">
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
                  placeholder="Tech Company"
                />
              </div>
              <div className="space-y-2">
                <Label>Start Date</Label>
                <Input
                  {...register(`workExperience.${index}.startDate`)}
                  type="date"
                />
              </div>
              <div className="space-y-2">
                <Label>End Date</Label>
                <Input
                  {...register(`workExperience.${index}.endDate`)}
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
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              {...register(`workExperience.${index}.description`)}
              placeholder="Describe your responsibilities and achievements..."
              className="h-32"
            />
          </div>
        </div>
      ))}
    </div>
  );
};
