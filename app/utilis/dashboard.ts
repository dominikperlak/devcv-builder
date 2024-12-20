import { supabase } from '@/lib/supabase';
import { ChartDataPoint, StatsData } from '@/types/dashboard';
import { format, subDays } from 'date-fns';

export const fetchStats = async (): Promise<StatsData> => {
  try {
    const thirtyDaysAgo = subDays(new Date(), 30);

    const { data: viewsData, error: viewsError } = await supabase
      .from('cvs')
      .select('id')
      .gte('created_at', thirtyDaysAgo.toISOString())
      .lt('created_at', new Date().toISOString());

    if (viewsError) {
      console.error('Error fetching views:', viewsError);
      throw viewsError;
    }

    const downloads = parseInt(
      localStorage.getItem('pdf_downloads_count') || '0'
    );

    return {
      totalViews: viewsData?.length || 0,
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

export const fetchChartData = async (): Promise<ChartDataPoint[]> => {
  try {
    const thirtyDaysAgo = subDays(new Date(), 30);

    const { data: viewsData, error: viewsError } = await supabase
      .from('cvs')
      .select('created_at')
      .gte('created_at', thirtyDaysAgo.toISOString())
      .lt('created_at', new Date().toISOString());

    if (viewsError) {
      console.error('Error fetching chart data:', viewsError);
      throw viewsError;
    }

    const dailyData = Array.from({ length: 30 }, (_, i) => ({
      date: format(subDays(new Date(), 29 - i), 'MMM dd'),
      views: 0,
    }));

    viewsData?.forEach((record) => {
      const recordDate = format(new Date(record.created_at), 'MMM dd');
      const dayData = dailyData.find((day) => day.date === recordDate);
      if (dayData) {
        dayData.views++;
      }
    });

    return dailyData;
  } catch (error) {
    console.error('Error fetching chart data:', error);
    return Array.from({ length: 30 }, (_, i) => ({
      date: format(subDays(new Date(), 29 - i), 'MMM dd'),
      views: 0,
    }));
  }
};
