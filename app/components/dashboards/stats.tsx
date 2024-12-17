'use client';
import React from 'react';
import { Card } from '../ui/card';
import { Download, Users, FileText } from 'lucide-react';

const mockData = {
  totalDownloads: 2890,
  totalUsers: 1234,
  totalResumes: 567,
};

export const Stats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="p-6 flex items-center space-x-4 hover:shadow-lg transition-shadow duration-200">
        <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
          <Download className="h-6 w-6 text-blue-600" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Total Downloads</p>
          <h3 className="text-2xl font-bold">{mockData.totalDownloads}</h3>
        </div>
      </Card>

      <Card className="p-6 flex items-center space-x-4 hover:shadow-lg transition-shadow duration-200">
        <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
          <Users className="h-6 w-6 text-blue-600" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Total Users</p>
          <h3 className="text-2xl font-bold">{mockData.totalUsers}</h3>
        </div>
      </Card>

      <Card className="p-6 flex items-center space-x-4 hover:shadow-lg transition-shadow duration-200">
        <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
          <FileText className="h-6 w-6 text-blue-600" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Total Resumes</p>
          <h3 className="text-2xl font-bold">{mockData.totalResumes}</h3>
        </div>
      </Card>
    </div>
  );
};
