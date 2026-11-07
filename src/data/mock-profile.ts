import type { UserProfileData } from "@/types/profile";

export const initialMockProfile: UserProfileData = {
  id: "user_thien_duyen_01",
  name: "Nguyễn Văn An",
  dharmaName: "Thiện Duyên",
  email: "thienduyen.an@gmail.com",
  joinedDate: "15 tháng 03, 2026",
  avatarUrl: "",
  intention:
    "Nguyện đem công đức chép kinh này, hồi hướng cho cha mẹ hiện tiền an khang, chúng sinh muôn loài đồng giải thoát và tâm bồ đề ngày một kiên cố.",
  metrics: {
    totalCharsTyped: 12450,
    completedSutrasCount: 3,
    streakDays: 14,
    totalHoursSpent: 28,
  },
  inProgressSutras: [
    {
      id: "prog_01",
      slug: "bat-nha-tam-kinh",
      title: "Ma Ha Bát Nhã Ba La Mật Đa Tâm Kinh",
      originalTitle: "摩訶般若波羅蜜多心經",
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
      title: "Ma Ha Bát Nhã Ba La Mật Đa Tâm Kinh (Biến thứ 1)",
      originalTitle: "摩訶般若波羅蜜多心經",
      completedAt: "28 tháng 10, 2026",
      totalChars: 560,
    },
    {
      id: "comp_02",
      slug: "kinh-duoc-su",
      title: "Kinh Dược Sư Lưu Ly Quang Vương Phật",
      originalTitle: "藥師琉璃光如來本願功德經",
      completedAt: "12 tháng 09, 2026",
      totalChars: 3450,
    },
    {
      id: "comp_03",
      slug: "kinh-vu-lan-bao-hieu",
      title: "Kinh Vu Lan Báo Hiếu (Vu Lan Bồn)",
      originalTitle: "佛說盂蘭盆經",
      completedAt: "15 tháng 07, 2026",
      totalChars: 1890,
    },
  ],
  savedArticles: [
    {
      id: "art_01",
      slug: "y-nghia-sau-mau-bat-nha-tam-kinh",
      title: "Ý nghĩa sâu mầu của Bát Nhã Ba La Mật Đa Tâm Kinh",
      readTime: "7 phút",
      category: "Giải nghĩa kinh",
      savedAt: "01 tháng 11, 2026",
    },
    {
      id: "art_02",
      slug: "huong-dan-nghi-thuc-chep-kinh-tai-gia",
      title: "Nghi thức chép kinh tại gia cho người bận rộn",
      readTime: "5 phút",
      category: "Nghi thức tu tập",
      savedAt: "25 tháng 10, 2026",
    },
    {
      id: "art_03",
      slug: "nghi-thuc-hoi-huong-sau-khi-chep-kinh",
      title: "Ý nghĩa của nghi thức hồi hướng công đức sau khi chép kinh",
      readTime: "4 phút",
      category: "Cẩm nang",
      savedAt: "10 tháng 10, 2026",
    },
  ],
};

export function getMockUserProfile(): UserProfileData {
  return initialMockProfile;
}
