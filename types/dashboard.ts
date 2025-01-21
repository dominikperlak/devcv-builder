export interface ChartDataPoint {
  date: string;
  views: number;
  downloads: number;
}

export interface StatsData {
  totalViews: number;
  totalDownloads: number;
}

export interface ResumeOption {
  id: string;
  title: string;
}