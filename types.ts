
export type Language = 'en' | 'zh';

export interface ScoringDimension {
  name: string;
  score: number; // 0-100
  description: string;
  advice: string;
}

export interface ViralVariation {
  title: string;
  angle: string;
  reasoning: string;
}

export interface SimilarContent {
  title: string;
  platform: string;
  publishedDate?: string; // Optional relative date e.g. "3 months ago"
  metrics: {
    views: string;
    likes: string;
    shares: string;
  };
  keyInsight: string;
}

export interface AnalysisResult {
  totalScore: number;
  verdict: string; // e.g., "Potential Viral Hit", "Niche Success", "Needs Rework"
  dimensions: ScoringDimension[];
  summaryAnalysis: string;
  viralVariations: ViralVariation[];
  similarContentAnalysis: SimilarContent[];
}

export enum LoadingState {
  IDLE = 'IDLE',
  ANALYZING = 'ANALYZING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}

export interface OptimizedStandardPoint {
  original: string;
  optimized: string;
  reason: string;
}
