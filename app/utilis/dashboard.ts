import { supabase } from '@/lib/supabase';
import { ChartDataPoint, StatsData } from '@/types/dashboard';
import { format, subDays } from 'date-fns';

const getDownloadCounts = async (
  resumeId?: string | null,
  startDate?: Date
): Promise<number> => {
  try {
    let query = supabase.from('pdf_downloads').select('*', { count: 'exact' });

    if (resumeId) {
      query = query.eq('resume_id', resumeId);
    }

    if (startDate) {
      query = query.gte('downloaded_at', startDate.toISOString());
    }

    const { count, error } = await query;

    if (error) {
      console.error('Error counting downloads:', error);
      throw error;
    }

    return count || 0;
  } catch (error) {
    console.error('Error counting downloads:', error);
    return 0;
  }
};

const getViewCounts = async (
  resumeId?: string | null,
  startDate?: Date
): Promise<number> => {
  try {
    let query = supabase.from('cv_views').select('*', { count: 'exact' });

    if (resumeId) {
      query = query.eq('resume_id', resumeId);
    }

    if (startDate) {
      query = query.gte('viewed_at', startDate.toISOString());
    }

    const { count, error } = await query;

    if (error) {
      console.error('Error counting views:', error);
      throw error;
    }

    return count || 0;
  } catch (error) {
    console.error('Error counting views:', error);
    return 0;
  }
};

export const fetchStats = async (
  resumeId?: string | null
): Promise<StatsData> => {
  try {
    const thirtyDaysAgo = subDays(new Date(), 30);

    const views = await getViewCounts(resumeId, thirtyDaysAgo);
    const downloads = await getDownloadCounts(resumeId, thirtyDaysAgo);

    return {
      totalViews: views,
      totalDownloads: downloads,
    };
  } catch (error) {
    console.error('Error fetching stats:', error);
    return {
      totalViews: 0,
      totalDownloads: 0,
    };
  }
};

export const fetchChartData = async (
  resumeId?: string | null
): Promise<ChartDataPoint[]> => {
  try {
    const thirtyDaysAgo = subDays(new Date(), 30);

    const dailyData = Array.from({ length: 30 }, (_, i) => ({
      date: format(subDays(new Date(), 29 - i), 'MMM dd'),
      views: 0,
      downloads: 0,
    }));

    let viewsQuery = supabase
      .from('cv_views')
      .select('viewed_at, resume_id')
      .gte('viewed_at', thirtyDaysAgo.toISOString());

    if (resumeId) {
      viewsQuery = viewsQuery.eq('resume_id', resumeId);
    }

    const { data: viewsData, error: viewsError } = await viewsQuery;

    if (viewsError) {
      console.error('Error fetching views data:', viewsError);
      throw viewsError;
    }

    let downloadsQuery = supabase
      .from('pdf_downloads')
      .select('downloaded_at, resume_id')
      .gte('downloaded_at', thirtyDaysAgo.toISOString());

    if (resumeId) {
      downloadsQuery = downloadsQuery.eq('resume_id', resumeId);
    }

    const { data: downloadsData, error: downloadsError } = await downloadsQuery;

    if (downloadsError) {
      console.error('Error fetching downloads data:', downloadsError);
      throw downloadsError;
    }

    if (viewsData) {
      viewsData.forEach((record) => {
        const recordDate = format(new Date(record.viewed_at), 'MMM dd');
        const dayData = dailyData.find((day) => day.date === recordDate);
        if (dayData) {
          dayData.views++;
        }
      });
    }

    if (downloadsData) {
      downloadsData.forEach((record) => {
        const recordDate = format(new Date(record.downloaded_at), 'MMM dd');
        const dayData = dailyData.find((day) => day.date === recordDate);
        if (dayData) {
          dayData.downloads++;
        }
      });
    }

    return dailyData;
  } catch (error) {
    console.error('Error fetching chart data:', error);
    return Array.from({ length: 30 }, (_, i) => ({
      date: format(subDays(new Date(), 29 - i), 'MMM dd'),
      views: 0,
      downloads: 0,
    }));
  }
};

export const trackResumeView = async (resumeId: string, userId?: string) => {
  try {
    const { error } = await supabase.from('cv_views').insert({
      resume_id: resumeId,
      user_id: userId || null,
    });

    if (error) {
      throw error;
    }
  } catch (error) {
    console.error('Error tracking view:', error);
  }
};
