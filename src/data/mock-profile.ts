import type { PracticeDay, UserProfileData } from "@/types/profile";

/**
 * Ảnh đại diện có sẵn để chọn (ảnh chụp thật trong public/storage/real).
 * Không đưa tượng Phật vào đây: dùng hình Phật làm ảnh cá nhân dễ bị xem là thiếu trang nghiêm.
 */
export const AVATAR_PHOTOS: { src: string; label: string }[] = [
  { src: "/storage/real/hoa_sen_that.jpg", label: "Hoa sen" },
  { src: "/storage/real/an_thu_but_long.jpg", label: "Bút lông" },
  { src: "/storage/real/chua_mot_cot.jpg", label: "Chùa Một Cột" },
  { src: "/storage/real/chua_bai_dinh.jpg", label: "Chùa Bái Đính" },
  { src: "/storage/real/banner_buddha_sunrise_1.jpg", label: "Bình minh" },
];

/**
 * Ảnh nền thẻ hành giả. Chữ nằm bên trái thẻ, nên chọn ảnh có công trình/tượng lệch phải;
 * `position` là khung lấy ảnh (object-position), `caption` là nơi chụp hiện ở góc thẻ.
 */
export const COVER_PHOTOS: { src: string; label: string; caption: string; position: string }[] = [
  { src: "/storage/real/chua_bai_dinh.jpg", label: "Chùa Bái Đính", caption: "Chùa Bái Đính · Ninh Bình", position: "70% 45%" },
  {
    src: "/storage/real/banner_buddha_fullwidth.jpg",
    label: "Đại Phật Thiên Đàn",
    caption: "Đại Phật Thiên Đàn · Lantau, Hồng Kông",
    position: "70% 0%",
  },
  { src: "/storage/real/chua_mot_cot.jpg", label: "Chùa Một Cột", caption: "Chùa Một Cột · Hà Nội", position: "60% 50%" },
  { src: "/storage/real/banner_buddha_sunrise_1.jpg", label: "Bình minh", caption: "Bình minh", position: "50% 55%" },
  { src: "/storage/real/hoa_sen_that.jpg", label: "Hoa sen", caption: "Hoa sen", position: "50% 50%" },
];

/**
 * Lịch tinh tấn 26 tuần, kết thúc hôm nay (thứ Bảy 7/11/2026). Số liệu sinh giả theo hạt giống cố định
 * để máy chủ và trình duyệt ra cùng kết quả. 14 ngày gần nhất đều có chép (chuỗi hiện tại 14 ngày),
 * ngày thứ 15 nghỉ.
 */
function buildPracticeDays(): PracticeDay[] {
  const TOTAL = 26 * 7;
  const end = Date.UTC(2026, 10, 7);
  let seed = 7;
  const rand = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
  return Array.from({ length: TOTAL }, (_, i) => {
    const daysAgo = TOTAL - 1 - i;
    const date = new Date(end - daysAgo * 86_400_000).toISOString().slice(0, 10);
    const r = rand();
    let chars: number;
    if (daysAgo < 14) chars = 120 + Math.round(r * 380);
    else if (daysAgo === 14) chars = 0;
    else chars = r < 0.32 ? 0 : Math.round(40 + r * 420);
    return { date, chars };
  });
}

export const initialMockProfile: UserProfileData = {
  id: "user_thien_duyen_01",
  name: "Nguyễn Văn An",
  dharmaName: "Thiện Duyên",
  dharmaNameHan: "善緣",
  email: "thienduyen.an@gmail.com",
  joinedDate: "15 tháng 3, 2026",
  companionDays: 237,
  avatar: "/storage/real/hoa_sen_that.jpg",
  cover: "/storage/real/chua_bai_dinh.jpg",
  favoriteVerse: "Ưng vô sở trụ nhi sanh kỳ tâm.",
  favoriteVerseSource: "Kinh Kim Cang",
  intention:
    "Nguyện đem công đức chép kinh này, hồi hướng cho cha mẹ hiện tiền an khang, chúng sinh muôn loài đồng giải thoát và tâm bồ đề ngày một kiên cố.",
  metrics: {
    totalCharsTyped: 12450,
    completedSutrasCount: 3,
    totalHoursSpent: 28,
  },
  streak: {
    current: 14,
    longest: 21,
    weeklyGoal: 5,
    restDaysLeft: 2,
    reminderTime: "20:30",
    days: buildPracticeDays(),
  },
  learning: {
    accuracy: 96.4,
    accuracyDelta: 2.1,
    speed: 18,
    speedDelta: 3,
    articlesRead: 23,
    articlesReadDelta: 5,
    quizAverage: 8.6,
    quizAverageDelta: -0.2,
    weeklyAccuracy: [
      { label: "14/9", value: 89.2 },
      { label: "21/9", value: 90.5 },
      { label: "28/9", value: 91.8 },
      { label: "5/10", value: 91.1 },
      { label: "12/10", value: 93.4 },
      { label: "19/10", value: 94.0 },
      { label: "26/10", value: 95.6 },
      { label: "2/11", value: 96.4 },
    ],
    paths: [
      { category: "Giải nghĩa kinh", slug: "giai-nghia", done: 6, total: 12 },
      { category: "Nghi thức tụng niệm", slug: "nghi-thuc", done: 4, total: 8 },
      { category: "Cẩm nang tu học", slug: "cam-nang", done: 9, total: 10 },
      { category: "Lời Phật dạy", slug: "phat-ngon", done: 4, total: 15 },
    ],
    quizzes: [
      {
        id: "qz_01",
        articleSlug: "y-nghia-sau-mau-bat-nha-tam-kinh",
        title: "Ý nghĩa sâu mầu của Bát Nhã Ba La Mật Đa Tâm Kinh",
        takenAt: "05 tháng 11, 2026",
        score: 9,
        total: 10,
      },
      {
        id: "qz_02",
        articleSlug: "tim-hieu-chu-dai-bi-va-84-hoa-than-quan-am",
        title: "Tìm hiểu Chú Đại Bi và 84 hóa thân Quan Âm",
        takenAt: "01 tháng 11, 2026",
        score: 7,
        total: 10,
      },
      {
        id: "qz_03",
        articleSlug: "nghi-thuc-hoi-huong-sau-khi-chep-kinh",
        title: "Nghi thức hồi hướng sau khi chép kinh",
        takenAt: "24 tháng 10, 2026",
        score: 10,
        total: 10,
      },
      {
        id: "qz_04",
        articleSlug: "thap-thien-nghiep-kim-chi-nam-an-vui",
        title: "Thập thiện nghiệp: kim chỉ nam an vui",
        takenAt: "18 tháng 10, 2026",
        score: 8,
        total: 10,
      },
    ],
    mistakes: [
      { expected: "Bồ Đề Tát Bà Ha", typed: "Bồ Đề Tác Bà Ha", count: 6, sutra: "Bát Nhã Tâm Kinh" },
      { expected: "Ma Ha Ca Lô Ni Ca Da", typed: "Ma Ha Ca Lo Ni Ca Da", count: 4, sutra: "Chú Đại Bi" },
      { expected: "Yết đế yết đế", typed: "Yết để yết để", count: 3, sutra: "Bát Nhã Tâm Kinh" },
    ],
    weeklyNote:
      "Tuần này chép đều mỗi ngày, độ chính xác tăng 0,8%. Chữ hay sai chủ yếu ở dấu thanh trong thần chú, nên chép chậm lại ở đoạn này.",
  },
  inProgressSutras: [
    {
      id: "prog_01",
      slug: "bat-nha-tam-kinh",
      title: "Ma Ha Bát Nhã Ba La Mật Đa Tâm Kinh",
      originalTitle: "摩訶般若波羅蜜多心經",
      cover: "/storage/real/phat_thich_ca_bodh_gaya.jpg",
      progressPercent: 68,
      typedChars: 382,
      totalChars: 560,
      lastPracticedAt: "Hôm nay, 08:30",
    },
    {
      id: "prog_02",
      slug: "chu-dai-bi",
      title: "Đại Bi Tâm Đà La Ni (Chú Đại Bi)",
      originalTitle: "千手千眼無礙大悲心陀羅尼",
      cover: "/storage/real/quan_am_linh_ung.jpg",
      progressPercent: 35,
      typedChars: 412,
      totalChars: 1180,
      lastPracticedAt: "Hôm qua, 21:15",
    },
    {
      id: "prog_03",
      slug: "kinh-phap-cu",
      title: "Kinh Pháp Cú (Dhammapada)",
      originalTitle: "法句經",
      cover: "/storage/real/phat_borobudur.jpg",
      progressPercent: 12,
      typedChars: 320,
      totalChars: 2600,
      lastPracticedAt: "3 ngày trước",
    },
  ],
  completedSutras: [
    {
      id: "comp_01",
      slug: "bat-nha-tam-kinh",
      title: "Ma Ha Bát Nhã Ba La Mật Đa Tâm Kinh",
      originalTitle: "摩訶般若波羅蜜多心經",
      cover: "/storage/real/phat_thich_ca_bodh_gaya.jpg",
      completedAt: "28 tháng 10, 2026",
      totalChars: 560,
    },
    {
      id: "comp_02",
      slug: "kinh-duoc-su",
      title: "Kinh Dược Sư Lưu Ly Quang Vương Phật",
      originalTitle: "藥師琉璃光如來本願功德經",
      cover: "/storage/real/phat_duoc_su_kim_than.jpg",
      completedAt: "12 tháng 9, 2026",
      totalChars: 3450,
    },
    {
      id: "comp_03",
      slug: "kinh-vu-lan-bao-hieu",
      title: "Kinh Vu Lan Báo Hiếu",
      originalTitle: "佛說盂蘭盆經",
      cover: "/storage/real/kinh_vu_lan_muc_kien_lien.jpg",
      completedAt: "15 tháng 7, 2026",
      totalChars: 1890,
    },
  ],
  savedArticles: [
    {
      id: "art_01",
      slug: "y-nghia-sau-mau-bat-nha-tam-kinh",
      title: "Ý nghĩa sâu mầu của Bát Nhã Ba La Mật Đa Tâm Kinh",
      cover: "/storage/real/tian_tan_3.jpg",
      readTime: "7 phút",
      category: "Giải nghĩa kinh",
      savedAt: "01 tháng 11, 2026",
    },
    {
      id: "art_02",
      slug: "huong-dan-nghi-thuc-chep-kinh-tai-gia",
      title: "Nghi thức chép kinh tại gia cho người bận rộn",
      cover: "/storage/real/an_thu_but_long.jpg",
      readTime: "5 phút",
      category: "Nghi thức tu tập",
      savedAt: "25 tháng 10, 2026",
    },
    {
      id: "art_03",
      slug: "nghi-thuc-hoi-huong-sau-khi-chep-kinh",
      title: "Ý nghĩa của nghi thức hồi hướng công đức sau khi chép kinh",
      cover: "/storage/real/chuong_chua_that.jpg",
      readTime: "4 phút",
      category: "Cẩm nang",
      savedAt: "10 tháng 10, 2026",
    },
  ],
  milestones: [
    {
      id: "ms_01",
      mark: "1",
      unit: "lần chép đầu",
      title: "Phát tâm",
      description: "Những dòng kinh đầu tiên",
      achievedAt: "15 tháng 3, 2026",
    },
    { id: "ms_02", mark: "1", unit: "bộ kinh", title: "Viên mãn đầu tiên", achievedAt: "15 tháng 7, 2026" },
    { id: "ms_03", mark: "10.000", unit: "chữ", title: "Vạn chữ", achievedAt: "20 tháng 10, 2026" },
    { id: "ms_04", mark: "7", unit: "ngày liền", title: "Tinh tấn bảy ngày", achievedAt: "31 tháng 10, 2026" },
    {
      id: "ms_05",
      mark: "30",
      unit: "ngày liền",
      title: "Tinh tấn ba mươi ngày",
      progress: { current: 14, target: 30, unit: "ngày" },
    },
    {
      id: "ms_06",
      mark: "8",
      unit: "bộ kinh",
      title: "Tám bộ viên mãn",
      progress: { current: 3, target: 8, unit: "bộ" },
    },
  ],
  sessions: [
    { id: "ses_01", device: "Chrome · macOS", location: "TP. Hồ Chí Minh", lastActive: "Đang hoạt động", current: true },
    { id: "ses_02", device: "Safari · iPhone", location: "TP. Hồ Chí Minh", lastActive: "Hôm qua, 21:15" },
    { id: "ses_03", device: "Chrome · Windows", location: "Đà Lạt", lastActive: "02 tháng 11, 2026" },
  ],
};

export function getMockUserProfile(): UserProfileData {
  return initialMockProfile;
}
