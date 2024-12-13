import React from 'react';
import { UseFormRegister, useFieldArray } from 'react-hook-form';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Plus, Trash2, Github } from 'lucide-react';
interface ProjectsProps {
  register: UseFormRegister<any>;
  control: any;
}
export const ProjectsSection = ({ register, control }: ProjectsProps) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'projects',
  });
  return (
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
          onClick={() =>
            append({
              name: '',
              description: '',
              technologies: '',
              link: '',
            })
          }
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Project
        </Button>
      </div>
      {fields.map((field, index) => (
        <div key={field.id} className="space-y-4 p-4 bg-slate-50 rounded-lg">
          <div className="flex justify-between items-start">
            <div className="flex-1 grid grid-cols-2 gap-4">
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
              {...register(`projects.${index}.description`)}
              placeholder="Describe the project and your role..."
              className="h-32"
            />
          </div>
        </div>
      ))}
    </div>
  );
};
