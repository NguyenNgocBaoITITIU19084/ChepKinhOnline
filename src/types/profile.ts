export interface MeritMetrics {
  totalCharsTyped: number;
  completedSutrasCount: number;
  totalHoursSpent: number;
}

export interface InProgressSutra {
  id: string;
  slug: string;
  title: string;
  originalTitle?: string;
  cover: string;
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
  cover: string;
  completedAt: string;
  totalChars: number;
}

export interface SavedArticle {
  id: string;
  slug: string;
  title: string;
  cover: string;
  readTime: string;
  category: string;
  savedAt: string;
}

export interface LoginSession {
  id: string;
  device: string;
  location: string;
  lastActive: string;
  current?: boolean;
}

export interface MeritMilestone {
  id: string;
  /** Con số đại diện cho chặng, vd. "10.000", "30". */
  mark: string;
  /** Đơn vị đi kèm con số, vd. "chữ", "ngày liền". */
  unit: string;
  title: string;
  /** Chỉ ghi khi nói thêm điều tên chưa nói. */
  description?: string;
  /** Ngày đạt; bỏ trống nếu chưa đạt. */
  achievedAt?: string;
  /** Tiến độ của dấu ấn chưa đạt, vd. 14/30 ngày. */
  progress?: { current: number; target: number; unit: string };
}

/** Một ngày trong lịch tinh tấn. */
export interface PracticeDay {
  /** yyyy-mm-dd */
  date: string;
  /** Số chữ đã chép trong ngày; 0 là không chép. */
  chars: number;
}

export interface PracticeStreak {
  current: number;
  longest: number;
  /** Số ngày đặt mục tiêu chép mỗi tuần. */
  weeklyGoal: number;
  /** Số ngày "an trú" còn lại trong tháng: nghỉ một ngày mà chuỗi không đứt. */
  restDaysLeft: number;
  reminderTime: string;
  /** Lịch các ngày gần đây, cũ đến mới, ngày cuối là hôm nay. */
  days: PracticeDay[];
}

export interface LearningPath {
  category: string;
  slug: string;
  done: number;
  total: number;
}

export interface QuizResult {
  id: string;
  articleSlug: string;
  title: string;
  takenAt: string;
  score: number;
  total: number;
}

export interface CommonMistake {
  expected: string;
  typed: string;
  count: number;
  sutra: string;
}

export interface LearningReport {
  /** Độ chính xác chép kinh 30 ngày qua, %. */
  accuracy: number;
  accuracyDelta: number;
  /** Tốc độ chép trung bình, chữ/phút. */
  speed: number;
  speedDelta: number;
  articlesRead: number;
  articlesReadDelta: number;
  /** Điểm trung bình bài kiểm tra hiểu bài, thang 10. */
  quizAverage: number;
  quizAverageDelta: number;
  /** Độ chính xác từng tuần, cũ đến mới. */
  weeklyAccuracy: { label: string; value: number }[];
  paths: LearningPath[];
  quizzes: QuizResult[];
  mistakes: CommonMistake[];
  /** Nhận xét ngắn của tuần, viết sẵn theo số liệu. */
  weeklyNote: string;
}

/** Các trường người dùng tự sửa được trong mục Hồ sơ cá nhân. */
export type EditableProfile = Pick<
  UserProfileData,
  "name" | "dharmaName" | "dharmaNameHan" | "email" | "intention" | "avatar" | "cover" | "favoriteVerse" | "favoriteVerseSource"
>;

export interface UserProfileData {
  id: string;
  name: string;
  dharmaName: string;
  /** Pháp danh viết chữ Hán, chỉ để trang trí (ấn triện trên thẻ hành giả). */
  dharmaNameHan: string;
  email: string;
  joinedDate: string;
  /** Số ngày đã đồng hành cùng Chép Kinh Online. */
  companionDays: number;
  /** Đường dẫn ảnh đại diện; rỗng thì hiện chữ cái đầu tên. */
  avatar: string;
  /** Ảnh nền thẻ hành giả: ảnh có sẵn trong COVER_PHOTOS, hoặc ảnh tự tải lên. */
  cover: string;
  favoriteVerse: string;
  favoriteVerseSource: string;
  intention: string;
  metrics: MeritMetrics;
  streak: PracticeStreak;
  learning: LearningReport;
  inProgressSutras: InProgressSutra[];
  completedSutras: CompletedSutra[];
  savedArticles: SavedArticle[];
  sessions: LoginSession[];
  milestones: MeritMilestone[];
}
