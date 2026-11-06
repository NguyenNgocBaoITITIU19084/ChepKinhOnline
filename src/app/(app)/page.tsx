import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { SutraList } from "@/components/sutra/SutraList";
import { IconBooks, IconPencil } from "@tabler/icons-react";
import { LotusIcon, ZenDivider } from "@/components/icons/BuddhistIcons";
import copy from "@/components/copy/copy.module.css";
import site from "@/components/layout/site.module.css";

// 3 Cảnh Sắc Chùa & Thiền Môn (Ảnh chụp thật 100%, bản quyền Creative Commons / Public Domain)
const TEMPLE_SCENES = [
  {
    title: "Chùa Bái Đính & Tràng An",
    location: "Ninh Bình",
    subtitle: "Chốn Thiền Môn Non Nước",
    verse: ["Mái chùa cong bóng núi non soi,", "Tiếng mõ hồi chuông rũ bụi đời."],
    image: "/images/real/chua_bai_dinh.jpg",
  },
  {
    title: "Chùa Một Cột (Diên Hựu)",
    location: "Thăng Long - Hà Nội",
    subtitle: "Đài Sen Ngàn Năm Tuổi",
    verse: ["Đài sen ngàn thuở nở ngát hương,", "Chứng kiến thăng trầm cõi thế gian."],
    image: "/images/real/chua_mot_cot.jpg",
  },
  {
    title: "Bạch Liên Nở Rộ Chốn Cửa Phật",
    location: "Tịnh Thủy Đạo Tràng",
    subtitle: "Tâm Sen Thanh Tịnh",
    verse: ["Gần bùn chẳng chút bợn mùi tanh,", "Tâm định hoa khai ngát hương lành."],
    image: "/images/real/hoa_sen_that.jpg",
  },
];

// Dữ liệu cho Block Tin tức & Bài viết tu học (Sử dụng ảnh chụp thật)
const ARTICLES = [
  {
    id: "cong-duc-chep-kinh-duoc-su",
    title: "Công Đức Chép Kinh Dược Sư: Diệu Dược Trị Lành Thân Tâm Nơi Bụi Trần",
    category: "Kinh Điển",
    date: "Ngày 15 tháng 9 Âm Lịch",
    image: "/images/real/hoa_sen_that.jpg",
    excerpt:
      "Mười hai đại nguyện của Đức Phật Dược Sư không chỉ xua tan ách nạn bệnh tật thể xác, mà cốt tủy là chữa lành những khổ đau do tham, sân, si nơi tự tâm.",
    readTime: "5 phút đọc",
  },
  {
    id: "y-nghia-kinh-lang-nghiem",
    title: "Oai Lực Thần Chú Lăng Nghiêm: Định Lực Kiên Cố Trong Thời Mạt Pháp",
    category: "Pháp Môn",
    date: "Ngày 01 tháng 10 Âm Lịch",
    image: "/images/real/khoi_tram_huong.jpg",
    excerpt:
      "Được tôn vinh là 'Vua của các câu chú', Thủ Lăng Nghiêm hộ trì hành giả giữ vững tâm bồ đề, soi tỏ vọng tưởng điên đảo giữa bao cám dỗ trần gian.",
    readTime: "7 phút đọc",
  },
  {
    id: "cam-niem-chep-kinh-dia-tang",
    title: "Hiếu Đạo Nơi Trang Kinh Địa Tạng: Nguyện Cầu Cửu Huyền Thất Tổ Siêu Sanh",
    category: "Cảm Niệm",
    date: "Ngày 30 tháng 7 Âm Lịch",
    image: "/images/real/an_thu_but_long.jpg",
    excerpt:
      "Từng nét chữ chép kinh bằng lòng chí thành hiếu kính là chiếc cầu nối ánh sáng từ bi của Đức Địa Tạng Vương đến những hương linh thân quyến nơi u đồ.",
    readTime: "6 phút đọc",
  },
];

// Bốn công đức của pháp chép kinh (khối giới thiệu)
const MERITS = [
  {
    title: "Định tâm khử vọng",
    text: "Tập trung trọn vẹn vào từng chữ, buông xả tạp niệm, đưa tâm về an định và tĩnh lặng.",
  },
  {
    title: "Thấu triệt diệu pháp",
    text: "Từng chữ gõ chậm rãi thấm sâu vào tâm, ghi nhớ lời Phật rõ ràng hơn đọc lướt.",
  },
  {
    title: "Gieo duyên Bồ Đề",
    text: "Vun bồi công đức, gieo mầm giác ngộ và nuôi dưỡng lòng từ bi với muôn loài.",
  },
  {
    title: "Hồi hướng phước báu",
    text: "Đem công đức chép kinh cầu an cho cha mẹ, người thân và hồi hướng cửu huyền thất tổ.",
  },
];

export default function Home() {
  return (
    <div className="tw:relative">

      {/* ====================================================================
          1. BANNER: lời mời chép kinh bên trái, một tờ kinh đang chép dở bên phải
          ==================================================================== */}
      <section className={site.hero}>
        <div className={site.heroInner}>
          <div className={site.heroText}>
            <span className={site.heroEyebrow}>Không gian chép kinh trực tuyến</span>
            <h1 className={site.heroTitle}>
              Từng nét chữ
              <em>lắng đọng tâm hương</em>
            </h1>
            <p className={site.heroLead}>
              Mượn ngón tay làm bút, bàn phím làm nghiên mực. Mỗi câu kinh được chép là một niệm buông bỏ muộn
              phiền, nuôi lớn tuệ giác và gieo mầm an lạc trong hiện tại.
            </p>
            <div className={site.heroActions}>
              <Link href="/chep-kinh/bat-nha-tam-kinh" className={copy.goldButton}>
                <IconPencil size={18} /> Chép Bát Nhã Tâm Kinh
              </Link>
              <a href="#gioi-thieu-kinh" className={copy.ghostButton}>
                <IconBooks size={18} /> Xem các bộ kinh
              </a>
            </div>
            <ul className={site.heroPillars}>
              <li>
                <strong>Chánh niệm</strong>
                <span>Thân khẩu ý tương ứng</span>
              </li>
              <li>
                <strong>Viên mãn</strong>
                <span>Đủ nghi thức hồi hướng</span>
              </li>
              <li>
                <strong>Tịch tịnh</strong>
                <span>Không gian không phân tâm</span>
              </li>
            </ul>
          </div>

          {/* Minh họa trang chép kinh: chữ đã chép thấm mực, con trỏ, chữ mờ hướng dẫn */}
          <div className={site.heroVisual} aria-hidden>
            <div className={site.sheet}>
              <div className={site.sheetHead}>
                <div>
                  <span className={site.sheetEyebrow}>Khai kinh kệ</span>
                  <p className={site.sheetTitle}>Ma Ha Bát Nhã Ba La Mật Đa Tâm Kinh</p>
                </div>
                <span className={site.sheetHan}>心經</span>
              </div>
              <div className={site.sheetVerse}>
                <p className={site.inked}>Vô thượng thâm thâm vi diệu pháp,</p>
                <p>
                  <span className={site.inked}>Bách thiên vạn kiếp</span>
                  <span className={site.caret} />
                  <span className={site.ghost}> nan tao ngộ,</span>
                </p>
                <p className={site.ghost}>Ngã kim kiến văn đắc thọ trì,</p>
                <p className={site.ghost}>Nguyện giải Như Lai chân thật nghĩa.</p>
              </div>
              <div className={site.sheetFoot}>
                <span>Trang 1/6 · 12%</span>
                <span className={site.sheetBar}>
                  <i style={{ width: "12%" }} />
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          2. GIỚI THIỆU: ảnh tràn viền, bên dưới là tờ giấy nổi lên mép ảnh chứa tiêu đề và bốn công đức
          ==================================================================== */}
      <section id="gioi-thieu" className={site.intro}>
        <div className={site.introPhoto}>
          <Image
            src="/images/real/quan_am_linh_ung.jpg"
            alt="Tượng Phật Thích Ca trắng trên đồi, chùa Linh Ứng Bà Nà, Đà Nẵng"
            fill
            sizes="100vw"
            className={site.introImage}
          />
          {/* Không đặt chữ lên ảnh để khỏi che tượng Phật; chỉ phủ nhạt mép dưới cho liền với tờ giấy */}
          <div className={site.introOverlay} />
          <span className={site.introCaption}>Tượng Phật Thích Ca · Chùa Linh Ứng, Bà Nà</span>
        </div>

        <div className={site.introSheet}>
          <span className={site.introEyebrow}>Về Chép Kinh Online</span>
          <h2 className={site.introTitle}>
            Biên chép lời Phật, <em>huân tu chánh niệm giữa đời thường</em>
          </h2>
          <p className={site.introLead}>
            Từ ngàn xưa, biên chép kinh văn được xem là một trong mười pháp tu thù thắng của Phật giáo Đại
            Thừa. Giữa nhịp sống hối hả, <strong>Chép Kinh Online</strong> là một tịnh thất trên không gian số,
            để quý Phật tử dành ra những phút lắng đọng thọ trì kinh điển.
          </p>
          <ul className={site.merits}>
            {MERITS.map((merit, i) => (
              <li key={merit.title}>
                <span className={site.meritNo}>{String(i + 1).padStart(2, "0")}</span>
                <h3>{merit.title}</h3>
                <p>{merit.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="tw:max-w-6xl tw:mx-auto tw:px-4 tw:sm:px-6 tw:lg:px-8 tw:relative tw:z-10">

        <ZenDivider symbol="lotus" />

        {/* ====================================================================
            3. BLOCK CẢNH SẮC THIỀN MÔN (ẢNH CHỤP THẬT CHÙA CHIỀN VIỆT NAM)
            ==================================================================== */}
        <section id="thien-mon" className="tw:pt-8 tw:pb-16">
          <div className="tw:text-center tw:max-w-2xl tw:mx-auto tw:mb-12">
            <span className="tw:text-xs tw:font-semibold tw:tracking-widest tw:uppercase tw:text-amber-900/80 font-zen-body">
              Chốn Thiền Tịnh An Lạc
            </span>
            <h2 className="font-zen-title tw:text-2xl tw:sm:text-3xl tw:font-semibold tw:text-[#231b14] tw:mt-2 tw:mb-3 tw:leading-tight tw:text-balance">
              Cảnh Sắc Thiền Môn & Danh Lam
            </h2>
            <p className="font-zen-body tw:text-sm tw:sm:text-base tw:text-stone-600 tw:leading-relaxed">
              Chiêm ngưỡng những thánh tích danh lam cổ kính và đóa sen tịnh khiết của Phật giáo Việt Nam, giúp tâm hồn thanh thản trước khi bước vào giờ phút chép kinh.
            </p>
          </div>

          <div className="tw:grid tw:grid-cols-1 tw:md:grid-cols-3 tw:gap-8">
            {TEMPLE_SCENES.map((scene) => (
              <div
                key={scene.title}
                className="tw:group tw:flex tw:flex-col tw:bg-[#faf7f0] tw:rounded-2xl tw:overflow-hidden tw:border tw:border-amber-900/15 tw:hover:border-amber-700/40 tw:shadow-[0_4px_20px_rgba(44,36,28,0.04)] tw:hover:shadow-[0_12px_32px_rgba(44,36,28,0.1)] tw:transition-all tw:duration-500"
              >
                {/* Ảnh chụp thật phong cảnh chùa chiền */}
                <div className="tw:relative tw:w-full tw:aspect-[16/10] tw:overflow-hidden tw:bg-stone-200">
                  <Image
                    src={scene.image}
                    alt={scene.title}
                    fill
                    className="tw:object-cover tw:object-center tw:group-hover:scale-105 tw:transition-transform tw:duration-700"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="tw:absolute tw:inset-0 tw:bg-linear-to-t tw:from-[#faf7f0] tw:via-transparent tw:to-transparent" />
                  <div className="tw:absolute tw:top-3.5 tw:left-3.5 tw:px-3 tw:py-1 tw:rounded-md tw:bg-[#1f1a14]/75 tw:backdrop-blur-md tw:text-[11px] tw:font-semibold tw:tracking-wider tw:uppercase tw:text-amber-100 font-zen-body">
                    {scene.location}
                  </div>
                </div>

                {/* Tên chùa và lời kệ */}
                <div className="tw:p-6 tw:pt-3 tw:flex tw:flex-col tw:flex-1 tw:justify-between">
                  <div>
                    <div className="tw:text-xs tw:font-medium tw:text-amber-800 tw:mb-1 font-zen-body">
                      {scene.subtitle}
                    </div>
                    <h3 className="font-zen-title tw:text-lg tw:sm:text-xl tw:font-semibold tw:text-[#2c2218] tw:mb-3">
                      {scene.title}
                    </h3>
                    <div className="font-zen-title tw:text-sm tw:text-stone-700 tw:italic tw:leading-relaxed tw:border-l-2 tw:border-amber-800/30 tw:pl-3 tw:space-y-1">
                      {scene.verse.map((line, idx) => (
                        <p key={idx}>{line}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <ZenDivider symbol="wheel" />

        {/* ====================================================================
            4. BLOCK GIỚI THIỆU CÁC CUỐN KINH CÓ THỂ CHÉP (SUTRA COLLECTION)
            ==================================================================== */}
        <section id="gioi-thieu-kinh" className="tw:pt-8 tw:pb-16">
          <div className="tw:text-center tw:max-w-2xl tw:mx-auto tw:mb-12">
            <span className="tw:text-xs tw:font-semibold tw:tracking-widest tw:uppercase tw:text-amber-900/80 font-zen-body">
              Án Thư Kinh Tạng
            </span>
            <h2 className="font-zen-title tw:text-2xl tw:sm:text-3xl tw:font-semibold tw:text-[#231b14] tw:mt-2 tw:mb-3 tw:leading-tight tw:text-balance">
              Kinh Điển Huân Tu
            </h2>
            <p className="font-zen-body tw:text-sm tw:sm:text-base tw:text-stone-600 tw:leading-relaxed">
              Chọn một bản kinh để gieo hạt giống trí tuệ và bình an trong ngày hôm nay.
            </p>
          </div>

          <Suspense
            fallback={
              <div className="tw:text-center tw:p-12 tw:text-stone-500 font-zen-body">
                Đang mở án thư kinh tạng...
              </div>
            }
          >
            <SutraList />
          </Suspense>
        </section>

        <ZenDivider symbol="lotus" />

        {/* ====================================================================
            5. BLOCK TIN TỨC & BÀI VIẾT TU HỌC (ẢNH CHỤP THẬT)
            ==================================================================== */}
        <section id="tin-tuc" className="tw:pt-8 tw:pb-16">
          <div className="tw:flex tw:flex-col tw:sm:flex-row tw:sm:items-end tw:sm:justify-between tw:mb-10 tw:gap-4">
            <div>
              <span className="tw:text-xs tw:font-semibold tw:tracking-widest tw:uppercase tw:text-amber-900/80 font-zen-body">
                Phật Sự & Cảm Niệm
              </span>
              <h2 className="font-zen-title tw:text-2xl tw:sm:text-3xl tw:font-semibold tw:text-[#231b14] tw:mt-2 tw:leading-tight tw:text-balance">
                Bài Viết & Tri Thức Tu Học
              </h2>
            </div>
            <p className="font-zen-body tw:text-sm tw:text-stone-600 tw:max-w-md tw:sm:text-right tw:leading-relaxed">
              Chia sẻ những lời khai thị của chư tôn đức, kinh nghiệm chép kinh an định và
              ý nghĩa các ngày vía linh thiêng.
            </p>
          </div>

          <div className="tw:grid tw:grid-cols-1 tw:md:grid-cols-3 tw:gap-8">
            {ARTICLES.map((article) => (
              <article
                key={article.id}
                className="tw:group tw:flex tw:flex-col tw:bg-[#faf7f0] tw:rounded-2xl tw:overflow-hidden tw:border tw:border-amber-900/15 tw:hover:border-amber-700/40 tw:shadow-[0_4px_20px_rgba(44,36,28,0.04)] tw:hover:shadow-[0_12px_32px_rgba(44,36,28,0.1)] tw:transition-all tw:duration-500"
              >
                {/* Ảnh bài viết thật */}
                <div className="tw:relative tw:w-full tw:aspect-[16/10] tw:overflow-hidden tw:bg-stone-200">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="tw:object-cover tw:object-center tw:group-hover:scale-105 tw:transition-transform tw:duration-700"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="tw:absolute tw:inset-0 tw:bg-linear-to-t tw:from-[#faf7f0] tw:via-transparent tw:to-transparent" />
                  <div className="tw:absolute tw:top-3.5 tw:left-3.5 tw:px-3 tw:py-1 tw:rounded-md tw:bg-[#1f1a14]/75 tw:backdrop-blur-md tw:text-[11px] tw:font-semibold tw:tracking-wider tw:uppercase tw:text-amber-100 font-zen-body">
                    {article.category}
                  </div>
                </div>

                {/* Nội dung bài viết */}
                <div className="tw:p-6 tw:pt-3 tw:flex tw:flex-col tw:flex-1 tw:justify-between">
                  <div>
                    <div className="tw:text-xs tw:text-stone-500 tw:mb-2 font-zen-body">
                      {article.date} · {article.readTime}
                    </div>
                    <h3 className="font-zen-title tw:text-lg tw:sm:text-xl tw:font-semibold tw:text-[#2c2218] tw:group-hover:text-amber-900 tw:transition-colors tw:leading-snug tw:mb-3">
                      {article.title}
                    </h3>
                    <p className="font-zen-body tw:text-sm tw:text-stone-600 tw:line-clamp-3 tw:leading-relaxed tw:mb-6">
                      {article.excerpt}
                    </p>
                  </div>

                  <div className="tw:pt-4 tw:border-t tw:border-amber-900/10 tw:flex tw:items-center tw:justify-between tw:text-xs">
                    <span className="font-zen-title tw:text-amber-900 tw:font-semibold tw:flex tw:items-center tw:gap-1 tw:group-hover:translate-x-1 tw:transition-transform">
                      Đọc chi tiết
                      <span aria-hidden="true">&rarr;</span>
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ====================================================================
            6. BLOCK KỆ KHAI KINH CỔ ĐIỂN
            ==================================================================== */}
        <section id="khai-kinh" className="tw:pt-6 tw:pb-16">
          <div className="tw:max-w-2xl tw:mx-auto tw:p-8 tw:sm:p-12 tw:rounded-2xl tw:bg-[#faf6ee] tw:border tw:border-amber-900/20 tw:text-center tw:shadow-[0_8px_30px_rgba(44,36,28,0.04)] tw:relative">
            <div className="tw:absolute tw:top-6 tw:right-6 tw:w-9 tw:h-9 tw:rounded tw:border tw:border-red-800/40 tw:bg-red-900/10 tw:flex tw:items-center tw:justify-center font-zen-han tw:text-xs tw:font-semibold tw:text-red-900">
              佛心
            </div>

            <LotusIcon size={30} className="tw:mx-auto tw:text-amber-800 tw:mb-4" strokeWidth={1.2} />

            <h3 className="font-zen-title tw:text-xl tw:sm:text-2xl tw:font-semibold tw:text-[#2c2218] tw:mb-6">
              Kệ Khai Kinh
            </h3>

            <div className="font-zen-title tw:text-base tw:sm:text-lg tw:italic tw:text-stone-800 tw:space-y-2.5 tw:leading-relaxed">
              <p>Vô thượng thâm thâm vi diệu pháp,</p>
              <p>Bách thiên vạn kiếp nan tao ngộ.</p>
              <p>Ngã kim kiến văn đắc thọ trì,</p>
              <p className="tw:text-amber-950 tw:font-medium">
                Nguyện giải Như Lai chân thật nghĩa.
              </p>
            </div>

            <div className="tw:mt-8 tw:pt-6 tw:border-t tw:border-amber-900/10 tw:text-xs tw:font-semibold tw:tracking-wider tw:uppercase tw:text-stone-500 font-zen-title">
              Nam Mô Bổn Sư Thích Ca Mâu Ni Phật
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
