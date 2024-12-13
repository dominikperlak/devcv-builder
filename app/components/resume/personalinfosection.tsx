'use client';
import React from 'react';
import { UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { ResumeFormData } from '@/types/resume';

export interface PersonalInfoProps {
  register: UseFormRegister<ResumeFormData>;
  setValue: UseFormSetValue<ResumeFormData>;
}

export const PersonalInfoSection = ({ register }: PersonalInfoProps) => {
  return (
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
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>First Name</Label>
          <Input {...register('firstName')} placeholder="John" />
        </div>
        <div className="space-y-2">
          <Label>Last Name</Label>
          <Input {...register('lastName')} placeholder="Doe" />
        </div>
      </div>
      <div className="space-y-2">
        <Label>Professional Title</Label>
        <Input
          id="title"
          {...register('title')}
          placeholder="Full Stack Developer"
        />
      </div>
      <div className="space-y-2">
        <Label>Professional Summary</Label>
        <Textarea
          id="summary"
          {...register('summary')}
          placeholder="Brief overview of your professional background and key strengths..."
          className="h-32"
        />
      </div>
    </div>
  );
};
