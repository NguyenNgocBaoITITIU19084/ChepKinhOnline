/**
 * Bốn vị Phật, Bồ Tát giới thiệu ở trang chủ.
 *
 * Nguyên tắc nội dung: chỉ ghi điều phổ biến, đã đối chiếu (tên Hán phồn thể, tên Phạn theo
 * chuẩn IAST, hình tướng nhận biết, ngày vía theo truyền thống Phật giáo Việt Nam, hồng danh
 * thường niệm). Không thêm con số hay chi tiết chưa chắc chắn.
 *
 * Ảnh (tranh trong public/storage hoặc ảnh chụp tượng thật) đã được xem và kiểm tra đúng hình tướng
 * từng vị. Vị nào chưa có ảnh đúng thì chưa đưa vào; đừng mượn ảnh của vị khác.
 * Lưu ý: vài file trong public/storage/real bị đặt tên sai (quan_am_linh_ung.jpg là tượng Phật,
 * quan_the_am.jpg là gian thờ Phật, buddha_thich_ca.jpg là tượng một vị sư), đừng dùng theo tên file.
 */
export interface HolyFigure {
  id: string;
  /** "Đức Phật" hoặc "Bồ Tát" */
  kind: "Đức Phật" | "Bồ Tát";
  name: string;
  /** Tên chữ Hán phồn thể */
  han: string;
  /** Tên tiếng Phạn (Sanskrit), phiên chuẩn IAST */
  sanskrit: string;
  intro: string;
  /** Hình tướng để nhận ra vị này trên tranh, tượng */
  appearance: string;
  /** Ngày vía, âm lịch */
  observance: string;
  /** Câu niệm hồng danh */
  invocation: string;
  /** caption: nơi đặt tượng, chỉ ghi với ảnh chụp tượng có thật */
  image: { src: string; alt: string; position?: string; caption?: string };
  /** Bài kinh có sẵn trên trang để chép; vị nào chưa có kinh trên trang thì bỏ trống */
  sutra?: { slug: string; label: string };
}

export const HOLY_FIGURES: HolyFigure[] = [
  {
    id: "thich-ca",
    kind: "Đức Phật",
    name: "Thích Ca Mâu Ni Phật",
    han: "釋迦牟尼佛",
    sanskrit: "Śākyamuni",
    intro:
      "Vị Phật lịch sử, vốn là thái tử Tất Đạt Đa của dòng họ Thích Ca. Ngài xuất gia tìm đạo, thành đạo dưới cội Bồ Đề, rồi đi khắp nơi thuyết pháp cho đến khi nhập Niết Bàn.",
    appearance: "Ngồi kiết già trên tòa sen, hai tay kết ấn thiền định, hoặc tay phải chạm đất (ấn xúc địa).",
    observance: "Phật Đản rằm tháng Tư · Thành đạo mùng 8 tháng Chạp",
    invocation: "Nam mô Bổn Sư Thích Ca Mâu Ni Phật",
    image: {
      src: "/storage/phat-thich-ca.jpg",
      alt: "Tranh Đức Phật Thích Ca ngồi thiền định trên tòa sen, sau lưng là vầng hào quang",
      position: "50% 30%",
    },
    sutra: { slug: "kinh-phap-cu", label: "Chép Kinh Pháp Cú" },
  },
  {
    id: "a-di-da",
    kind: "Đức Phật",
    name: "A Di Đà Phật",
    han: "阿彌陀佛",
    sanskrit: "Amitābha",
    intro:
      "Giáo chủ cõi Tây Phương Cực Lạc. Khi còn là Tỳ kheo Pháp Tạng, Ngài phát bốn mươi tám đại nguyện, nguyện tiếp dẫn người chí thành niệm danh hiệu Ngài về cõi nước an lành ấy.",
    appearance: "Thường ngồi kết ấn thiền định; tượng đứng thì tay phải buông xuống như đưa tay tiếp dẫn.",
    observance: "17 tháng 11 âm lịch",
    invocation: "Nam mô A Di Đà Phật",
    image: {
      src: "/storage/real/tuong_phat_kamakura.jpg",
      alt: "Tượng Đại Phật A Di Đà bằng đồng ngồi kết ấn thiền định ngoài trời, chùa Kōtoku-in, Kamakura",
      position: "50% 25%",
      caption: "Đại Phật Kamakura · Nhật Bản",
    },
  },
  {
    id: "duoc-su",
    kind: "Đức Phật",
    name: "Dược Sư Lưu Ly Quang Như Lai",
    han: "藥師琉璃光如來",
    sanskrit: "Bhaiṣajyaguru",
    intro:
      "Giáo chủ cõi Tịnh Lưu Ly ở phương Đông. Khi còn hành đạo Bồ Tát, Ngài phát mười hai đại nguyện, nguyện chữa lành bệnh khổ nơi thân và tâm của chúng sinh.",
    appearance: "Thân màu xanh lưu ly, tay nâng bát thuốc.",
    observance: "30 tháng 9 âm lịch",
    invocation: "Nam mô Dược Sư Lưu Ly Quang Như Lai",
    image: {
      src: "/storage/phat-duoc-su.jpg",
      alt: "Tranh Đức Phật Dược Sư thân xanh lưu ly, hai tay nâng bát thuốc, ngồi trên tòa sen",
      position: "50% 30%",
    },
    sutra: { slug: "kinh-duoc-su", label: "Chép Kinh Dược Sư" },
  },
  {
    id: "quan-the-am",
    kind: "Bồ Tát",
    name: "Quán Thế Âm Bồ Tát",
    han: "觀世音菩薩",
    sanskrit: "Avalokiteśvara",
    intro:
      "Vị Bồ Tát của lòng đại bi, lắng nghe tiếng kêu khổ của chúng sinh mà đến cứu giúp. Hạnh nguyện của Ngài được kể trong phẩm Phổ Môn, Kinh Pháp Hoa.",
    appearance: "Thường mặc áo trắng, tay cầm cành dương liễu và bình nước tịnh thủy.",
    observance: "19 tháng 2 · 19 tháng 6 · 19 tháng 9 âm lịch",
    invocation: "Nam mô Đại Từ Đại Bi Quán Thế Âm Bồ Tát",
    image: {
      src: "/storage/quan-the-am.jpg",
      alt: "Tranh Bồ Tát Quán Thế Âm áo trắng ngồi trên hoa sen, tay cầm cành dương liễu, bình tịnh thủy rót nước xuống",
      position: "50% 30%",
    },
    sutra: { slug: "chu-dai-bi", label: "Chép Chú Đại Bi" },
  },
  {
    id: "dia-tang",
    kind: "Bồ Tát",
    name: "Địa Tạng Vương Bồ Tát",
    han: "地藏王菩薩",
    sanskrit: "Kṣitigarbha",
    intro:
      "Vị Bồ Tát của đại nguyện cứu độ chúng sinh nơi cõi khổ, với lời nguyện quen thuộc: địa ngục chưa trống, thề không thành Phật. Kinh Địa Tạng còn được xem là kinh hiếu của nhà Phật.",
    appearance: "Hình tướng vị tăng, tay cầm tích trượng và viên minh châu, có khi đội mão Tỳ Lư.",
    observance: "30 tháng 7 âm lịch",
    invocation: "Nam mô Đại Nguyện Địa Tạng Vương Bồ Tát",
    image: {
      src: "/storage/dia-tang-bo-tat.jpg",
      alt: "Tranh Bồ Tát Địa Tạng đội mão, tay cầm tích trượng và viên minh châu sáng, ngồi trên tòa sen giữa mây",
      position: "50% 30%",
    },
    sutra: { slug: "kinh-dia-tang", label: "Chép Kinh Địa Tạng" },
  },
];
