export interface MeritMetrics {
  totalCharsTyped: number;
  completedSutrasCount: number;
  streakDays: number;
  totalHoursSpent: number;
}

export interface InProgressSutra {
  id: string;
  slug: string;
  title: string;
  originalTitle?: string;
  progressPercent: number;
  typedChars: number;
  totalChars: number;
  lastPracticedAt: string;
}

export interface CompletedSutra {
  id: string;
  slug: string;
  title: string;
  originalTitle?: string;
  completedAt: string;
  totalChars: number;
}

export interface SavedArticle {
  id: string;
  slug: string;
  title: string;
  readTime: string;
  category: string;
  savedAt: string;
}

export interface UserProfileData {
  id: string;
  name: string;
  dharmaName: string;
  email: string;
  joinedDate: string;
  avatarUrl?: string;
  intention: string;
  metrics: MeritMetrics;
  inProgressSutras: InProgressSutra[];
  completedSutras: CompletedSutra[];
  savedArticles: SavedArticle[];
}
