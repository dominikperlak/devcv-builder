'use client';
import React from 'react';
import { Input } from '../ui/input';
import { Label } from '@radix-ui/react-label';
import { UseFormRegister } from 'react-hook-form';
interface ContactSectionProps {
  register: UseFormRegister<any>;
}
export const ContactSection = ({ register }: ContactSectionProps) => {
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
  );
};
