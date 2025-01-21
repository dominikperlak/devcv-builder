'use client';

import React from 'react';
import { Card } from '@/app/components/ui/card';
import { Download, Eye } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { fetchStats } from '@/app/utilis/dashboard';
import { ResumeFormData } from '@/types/resume';

interface StatsProps {
  resumes: ResumeFormData[];
  selectedResumeId: string | null;
}

export const Stats = ({ resumes, selectedResumeId }: StatsProps) => {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['cv-stats', selectedResumeId],
    queryFn: () => {
      if (resumes.length === 0) {
        return { totalViews: 0, totalDownloads: 0 };
      }
      return fetchStats(selectedResumeId);
    },
    refetchInterval: 30000,
    initialData: { totalViews: 0, totalDownloads: 0 },
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card className="p-6 flex items-center space-x-4 hover:shadow-lg transition-shadow duration-200 bg-white/50 backdrop-blur-sm">
        <div className="h-12 w-12 bg-[#D3E4FD] rounded-lg flex items-center justify-center">
          <Eye className="h-6 w-6 text-[#0EA5E9]" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Total Views</p>
          <h3 className="text-2xl font-bold">
            {isLoading ? '...' : stats.totalViews}
          </h3>
        </div>
      </Card>

      <Card className="p-6 flex items-center space-x-4 hover:shadow-lg transition-shadow duration-200 bg-white/50 backdrop-blur-sm">
        <div className="h-12 w-12 bg-[#D3E4FD] rounded-lg flex items-center justify-center">
          <Download className="h-6 w-6 text-[#0EA5E9]" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Total Downloads</p>
          <h3 className="text-2xl font-bold">
            {isLoading ? '...' : stats.totalDownloads}
          </h3>
        </div>
      </Card>
    </div>
  );
};

export default Stats;
