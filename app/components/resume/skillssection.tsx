'use client';

import React from 'react';
import { UseFormRegister, useFieldArray } from 'react-hook-form';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Plus, Trash2, Code2 } from 'lucide-react';

interface SkillsSectionProps {
  register: UseFormRegister<any>;
  control: any;
}

export const SkillsSection = ({ register, control }: SkillsSectionProps) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'skills',
  });

  return (
    <div className="space-y-4 bg-white rounded-xl border border-slate-200 p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium flex items-center gap-2 text-slate-900">
          <span className="h-8 w-8 bg-blue-100 rounded-lg flex items-center justify-center">
            <Code2 className="w-4 h-4 text-blue-600" />
          </span>
          Skills
        </h3>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => append({ name: '', level: 'Intermediate' })}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Skill
        </Button>
      </div>

      {fields.map((field, index) => (
        <div key={field.id} className="space-y-4 p-4 bg-slate-50 rounded-lg">
          <div className="flex justify-between items-start">
            <div className="flex-1 grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Skill Name</Label>
                <Input
                  {...register(`skills.${index}.name`)}
                  placeholder="e.g., JavaScript, React, Node.js"
                />
              </div>
              <div className="space-y-2">
                <Label>Proficiency Level</Label>
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
