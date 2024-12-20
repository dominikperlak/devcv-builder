import { supabase } from '@/lib/supabase';
import { ChartDataPoint, StatsData } from '@/types/dashboard';

export const fetchStats = async (): Promise<StatsData> => {
  try {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const { data: viewsData, error: viewsError } = await supabase
      .from('cvs')
      .select('id')
      .gte('created_at', yesterday.toISOString())
      .lt('created_at', new Date().toISOString());

    if (viewsError) {
      throw viewsError;
    }

    const { data: downloadsData, error: downloadsError } = await supabase
      .from('cvs')
      .select('id')
      .gte('created_at', yesterday.toISOString())
      .lt('created_at', new Date().toISOString());

    if (downloadsError) {
      throw downloadsError;
    }

    return {
      totalViews: viewsData?.length || 0,
      totalDownloads: downloadsData?.length || 0,
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
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const { data, error } = await supabase
      .from('cvs')
      .select('created_at')
      .gte('created_at', yesterday.toISOString())
      .lt('created_at', new Date().toISOString());

    if (error) {
      throw error;
    }

    const hourlyData = Array.from({ length: 24 }, (_, i) => ({
      hour: i,
      views: 0,
    }));

    data?.forEach((record) => {
      const hour = new Date(record.created_at).getHours();
      hourlyData[hour].views++;
    });

    return hourlyData;
  } catch (error) {
    console.error('Error fetching chart data:', error);

    return Array.from({ length: 24 }, (_, i) => ({
      hour: i,
      views: 0,
    }));
  }
};
