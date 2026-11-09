/**
 * Các ngày lễ, ngày vía Phật giáo trong năm, theo âm lịch và truyền thống Phật giáo Bắc tông Việt Nam.
 *
 * Nguyên tắc nội dung: chỉ ghi ngày và ý nghĩa phổ biến, đã đối chiếu; không thêm con số hay chi tiết
 * chưa chắc chắn. Ngày dương lịch không ghi tay mà tính bằng src/lib/lunar.ts.
 */
export interface BuddhistEvent {
  id: string;
  /** Ngày, tháng âm lịch. Ngày 30 gặp tháng thiếu (29 ngày) thì làm vào ngày 29. */
  lunarDay: number;
  lunarMonth: number;
  name: string;
  description: string;
  /** Bài kinh có sẵn trên trang, gắn với ngày lễ (nếu có) */
  sutra?: { slug: string; label: string };
}

export const BUDDHIST_EVENTS: BuddhistEvent[] = [
  {
    id: "di-lac",
    lunarDay: 1,
    lunarMonth: 1,
    name: "Vía Đức Phật Di Lặc",
    description: "Ngày đầu năm mới, Phật tử đi lễ chùa, đảnh lễ Đức Phật Di Lặc, vị Phật tương lai, nguyện một năm an lạc.",
  },
  {
    id: "ram-thang-gieng",
    lunarDay: 15,
    lunarMonth: 1,
    name: "Rằm tháng Giêng",
    description: "Rằm đầu tiên của năm (Tết Thượng Nguyên), nhiều chùa làm lễ cầu an cho Phật tử.",
  },
  {
    id: "xuat-gia",
    lunarDay: 8,
    lunarMonth: 2,
    name: "Vía Đức Phật Thích Ca xuất gia",
    description: "Kỷ niệm ngày thái tử Tất Đạt Đa rời hoàng cung, xuất gia tìm đạo giải thoát.",
  },
  {
    id: "niet-ban",
    lunarDay: 15,
    lunarMonth: 2,
    name: "Vía Đức Phật Thích Ca nhập Niết Bàn",
    description: "Kỷ niệm ngày Đức Phật nhập Niết Bàn tại Câu Thi Na (Kuśinagara).",
  },
  {
    id: "quan-am-dan-sanh",
    lunarDay: 19,
    lunarMonth: 2,
    name: "Vía Bồ Tát Quán Thế Âm đản sanh",
    description: "Ngày vía đản sanh của Bồ Tát Quán Thế Âm, vị Bồ Tát của lòng đại bi.",
    sutra: { slug: "chu-dai-bi", label: "Chép Chú Đại Bi" },
  },
  {
    id: "phat-dan",
    lunarDay: 15,
    lunarMonth: 4,
    name: "Đại lễ Phật Đản",
    description: "Kỷ niệm ngày Đức Phật đản sanh tại vườn Lâm Tỳ Ni (Lumbinī). Ngày lễ lớn nhất trong năm của Phật giáo.",
    sutra: { slug: "kinh-phap-cu", label: "Chép Kinh Pháp Cú" },
  },
  {
    id: "an-cu",
    lunarDay: 16,
    lunarMonth: 4,
    name: "Chư Tăng Ni bắt đầu An cư kiết hạ",
    description: "Ba tháng mùa hạ, chư Tăng Ni ở yên một trụ xứ để chuyên tâm tu học.",
  },
  {
    id: "quan-am-thanh-dao",
    lunarDay: 19,
    lunarMonth: 6,
    name: "Vía Bồ Tát Quán Thế Âm thành đạo",
    description: "Ngày vía thành đạo của Bồ Tát Quán Thế Âm.",
    sutra: { slug: "chu-dai-bi", label: "Chép Chú Đại Bi" },
  },
  {
    id: "vu-lan",
    lunarDay: 15,
    lunarMonth: 7,
    name: "Lễ Vu Lan báo hiếu",
    description:
      "Ngày báo hiếu cha mẹ, theo tích Tôn giả Mục Kiền Liên cứu mẹ trong Kinh Vu Lan Bồn. Cũng là ngày chư Tăng Ni mãn hạ, làm lễ Tự tứ.",
    sutra: { slug: "kinh-vu-lan-bao-hieu", label: "Chép Kinh Vu Lan" },
  },
  {
    id: "dia-tang",
    lunarDay: 30,
    lunarMonth: 7,
    name: "Vía Bồ Tát Địa Tạng",
    description: "Ngày vía Bồ Tát Địa Tạng, vị Bồ Tát của đại nguyện cứu độ chúng sanh nơi cõi khổ.",
    sutra: { slug: "kinh-dia-tang", label: "Chép Kinh Địa Tạng" },
  },
  {
    id: "quan-am-xuat-gia",
    lunarDay: 19,
    lunarMonth: 9,
    name: "Vía Bồ Tát Quán Thế Âm xuất gia",
    description: "Ngày vía xuất gia của Bồ Tát Quán Thế Âm.",
    sutra: { slug: "chu-dai-bi", label: "Chép Chú Đại Bi" },
  },
  {
    id: "duoc-su",
    lunarDay: 30,
    lunarMonth: 9,
    name: "Vía Đức Phật Dược Sư",
    description: "Ngày vía Đức Phật Dược Sư Lưu Ly Quang Như Lai, vị Phật nguyện chữa lành bệnh khổ thân tâm.",
    sutra: { slug: "kinh-duoc-su", label: "Chép Kinh Dược Sư" },
  },
  {
    id: "a-di-da",
    lunarDay: 17,
    lunarMonth: 11,
    name: "Vía Đức Phật A Di Đà",
    description: "Ngày vía Đức Phật A Di Đà, giáo chủ cõi Tây Phương Cực Lạc.",
  },
  {
    id: "thanh-dao",
    lunarDay: 8,
    lunarMonth: 12,
    name: "Lễ Thành Đạo",
    description: "Kỷ niệm ngày Đức Phật thành đạo dưới cội Bồ Đề tại Bồ Đề Đạo Tràng (Bodh Gaya).",
    sutra: { slug: "kinh-phap-cu", label: "Chép Kinh Pháp Cú" },
  },
];
