import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { IconArrowRight, IconBooks } from "@tabler/icons-react";
import { SutraList } from "@/components/sutra/SutraList";
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
    image: "/storage/real/chua_bai_dinh.jpg",
    objectPosition: "45% center",
  },
  {
    title: "Chùa Một Cột (Diên Hựu)",
    location: "Thăng Long - Hà Nội",
    subtitle: "Đài Sen Ngàn Năm Tuổi",
    verse: ["Đài sen ngàn thuở nở ngát hương,", "Chứng kiến thăng trầm cõi thế gian."],
    image: "/storage/real/chua_mot_cot.jpg",
    objectPosition: "45% 40%",
  },
  {
    title: "Bạch Liên Nở Rộ Chốn Cửa Phật",
    location: "Tịnh Thủy Đạo Tràng",
    subtitle: "Tâm Sen Thanh Tịnh",
    verse: ["Gần bùn chẳng chút bợn mùi tanh,", "Tâm định hoa khai ngát hương lành."],
    image: "/storage/real/hoa_sen_that.jpg",
    objectPosition: "center 40%",
  },
];

// Dữ liệu cho Block Tin tức & Bài viết tu học (Sử dụng ảnh chụp thật)
const ARTICLES = [
  {
    id: "cong-duc-chep-kinh-duoc-su",
    title: "Công Đức Chép Kinh Dược Sư: Diệu Dược Trị Lành Thân Tâm Nơi Bụi Trần",
    category: "Kinh Điển",
    date: "Ngày 15 tháng 9 Âm Lịch",
    image: "/storage/real/hoa_sen_that.jpg",
    excerpt:
      "Mười hai đại nguyện của Đức Phật Dược Sư không chỉ xua tan ách nạn bệnh tật thể xác, mà cốt tủy là chữa lành những khổ đau do tham, sân, si nơi tự tâm.",
    readTime: "5 phút đọc",
  },
  {
    id: "y-nghia-kinh-lang-nghiem",
    title: "Oai Lực Thần Chú Lăng Nghiêm: Định Lực Kiên Cố Trong Thời Mạt Pháp",
    category: "Pháp Môn",
    date: "Ngày 01 tháng 10 Âm Lịch",
    image: "/storage/real/khoi_tram_huong.jpg",
    excerpt:
      "Được tôn vinh là 'Vua của các câu chú', Thủ Lăng Nghiêm hộ trì hành giả giữ vững tâm bồ đề, soi tỏ vọng tưởng điên đảo giữa bao cám dỗ trần gian.",
    readTime: "7 phút đọc",
  },
  {
    id: "cam-niem-chep-kinh-dia-tang",
    title: "Hiếu Đạo Nơi Trang Kinh Địa Tạng: Nguyện Cầu Cửu Huyền Thất Tổ Siêu Sanh",
    category: "Cảm Niệm",
    date: "Ngày 30 tháng 7 Âm Lịch",
    image: "/storage/real/an_thu_but_long.jpg",
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

// Kệ Khai Kinh: nguyên văn chữ Hán và âm Hán Việt, từng câu đi đôi
const KE_KHAI_KINH = [
  { han: "無上甚深微妙法", viet: "Vô thượng thâm thâm vi diệu pháp," },
  { han: "百千萬劫難遭遇", viet: "Bách thiên vạn kiếp nan tao ngộ." },
  { han: "我今見聞得受持", viet: "Ngã kim kiến văn đắc thọ trì," },
  { han: "願解如來真實義", viet: "Nguyện giải Như Lai chân thật nghĩa." },
];

// Bốn góc bọc đồng của khung Kệ Khai Kinh
const KINH_CORNERS = [
  "tw:top-6 tw:left-6 tw:border-t tw:border-l tw:rounded-tl-[10px]",
  "tw:top-6 tw:right-6 tw:border-t tw:border-r tw:rounded-tr-[10px]",
  "tw:bottom-6 tw:left-6 tw:border-b tw:border-l tw:rounded-bl-[10px]",
  "tw:bottom-6 tw:right-6 tw:border-b tw:border-r tw:rounded-br-[10px]",
];

// Nút "xem thêm" đặt giữa, dưới mỗi block danh sách (cảnh sắc, bộ kinh, bài viết)
function SeeMore({ href, label }: { href: string; label: string }) {
  return (
    <div className="tw:mt-10 tw:flex tw:justify-center">
      <Link href={href} className={site.seeMore}>
        <span className={site.seeMoreLabel}>{label}</span>
        <span className={site.seeMoreIcon} aria-hidden="true">
          <IconArrowRight size={17} stroke={2} />
        </span>
      </Link>
    </div>
  );
}

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
                Chép Bát Nhã Tâm Kinh
                <IconArrowRight size={18} stroke={2} className={copy.btnArrow} aria-hidden />
              </Link>
              <a href="#gioi-thieu-kinh" className={copy.ghostButton}>
                <IconBooks size={18} stroke={1.7} aria-hidden />
                Xem các bộ kinh
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
            src="/storage/real/quan_am_linh_ung.jpg"
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

          {/* Bố cục bento: ảnh lớn bên trái chiếm hai hàng, hai ảnh xếp chồng bên phải.
              Ảnh phủ kín ô, chữ nằm gọn ở chân ảnh. */}
          <div className="tw:grid tw:grid-cols-1 tw:gap-4 tw:sm:gap-5 tw:lg:grid-cols-12 tw:lg:grid-rows-[300px_300px]">
            {TEMPLE_SCENES.map((scene, idx) => {
              const featured = idx === 0;
              return (
                <figure
                  key={scene.title}
                  className={`tw:group tw:relative tw:m-0 tw:overflow-hidden tw:rounded-[22px] tw:bg-[#2a1d10] tw:shadow-[0_1px_2px_rgba(74,50,10,0.10),0_6px_14px_-6px_rgba(74,50,10,0.22),0_18px_32px_-16px_rgba(74,50,10,0.32)] tw:transition-shadow tw:duration-500 tw:hover:shadow-[0_2px_4px_rgba(74,50,10,0.10),0_14px_24px_-10px_rgba(74,50,10,0.28),0_30px_48px_-20px_rgba(74,50,10,0.42)] ${
                    featured
                      ? "tw:aspect-[4/3] tw:sm:aspect-[16/10] tw:lg:aspect-auto tw:lg:col-span-7 tw:lg:row-span-2"
                      : "tw:aspect-[4/3] tw:sm:aspect-[16/9] tw:lg:aspect-auto tw:lg:col-span-5"
                  }`}
                >
                  <Image
                    src={scene.image}
                    alt={`${scene.title}, ${scene.location}`}
                    fill
                    className="tw:object-cover tw:transition-transform tw:duration-[1400ms] tw:ease-out tw:group-hover:scale-[1.05]"
                    style={{ objectPosition: scene.objectPosition }}
                    sizes={featured ? "(max-width: 1024px) 100vw, 58vw" : "(max-width: 1024px) 100vw, 42vw"}
                  />

                  {/* Lớp tối mỏng ở chân ảnh để chữ đọc rõ, phần còn lại giữ nguyên màu cảnh */}
                  <div className="tw:absolute tw:inset-x-0 tw:bottom-0 tw:h-3/5 tw:bg-linear-to-t tw:from-[#140c05]/90 tw:via-[#140c05]/40 tw:to-transparent" />

                  {/* Viền chỉ vàng bên trong như khung tranh */}
                  <div className="tw:absolute tw:inset-2.5 tw:rounded-[16px] tw:border tw:border-[#ecc976]/0 tw:pointer-events-none tw:transition-colors tw:duration-500 tw:group-hover:border-[#ecc976]/45" />

                  <span className="font-zen-body tw:absolute tw:top-4 tw:left-4 tw:inline-flex tw:items-center tw:gap-1.5 tw:rounded-full tw:bg-[#140c05]/45 tw:backdrop-blur-md tw:px-3 tw:py-1.5 tw:text-[11px] tw:font-semibold tw:uppercase tw:tracking-[0.14em] tw:text-[#fff3dc] tw:ring-1 tw:ring-white/15">
                    <svg className="tw:w-3 tw:h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s-7-6.1-7-11.5a7 7 0 1 1 14 0C19 14.9 12 21 12 21Z" />
                      <circle cx="12" cy="9.5" r="2.5" />
                    </svg>
                    {scene.location}
                  </span>

                  <figcaption className={`tw:absolute tw:inset-x-0 tw:bottom-0 ${featured ? "tw:p-6 tw:sm:p-8" : "tw:p-5 tw:sm:p-6"}`}>
                    <span className="font-zen-body tw:inline-flex tw:items-center tw:gap-2 tw:text-[11px] tw:font-semibold tw:uppercase tw:tracking-[0.16em] tw:text-[#ecc976]">
                      <span className="tw:w-5 tw:h-px tw:bg-[#ecc976]/70" aria-hidden="true" />
                      {scene.subtitle}
                    </span>
                    <h3
                      className={`font-zen-title tw:mt-1.5 tw:font-semibold tw:leading-snug tw:text-[#fff8e6] tw:text-balance ${
                        featured ? "tw:text-2xl tw:sm:text-[28px]" : "tw:text-xl tw:sm:text-[22px]"
                      }`}
                    >
                      {scene.title}
                    </h3>

                    {/* Lời kệ: ẩn trên điện thoại để nhường chỗ cho ảnh, hiện trên máy tính bảng, máy tính thì mở ra khi rê chuột */}
                    <div className="tw:grid tw:grid-rows-[0fr] tw:sm:grid-rows-[1fr] tw:lg:grid-rows-[0fr] tw:lg:group-hover:grid-rows-[1fr] tw:transition-[grid-template-rows] tw:duration-500 tw:ease-out">
                      <div className="tw:overflow-hidden">
                        <div className="font-zen-title tw:mt-3 tw:border-l tw:border-[#ecc976]/50 tw:pl-3 tw:text-[13.5px] tw:sm:text-sm tw:italic tw:leading-relaxed tw:text-[#f3e6cc]/85 tw:opacity-0 tw:sm:opacity-100 tw:lg:opacity-0 tw:lg:group-hover:opacity-100 tw:transition-opacity tw:duration-500">
                          {scene.verse.map((line) => (
                            <p key={line} className="tw:m-0">
                              {line}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </figcaption>
                </figure>
              );
            })}
          </div>
          <SeeMore href="/canh-sac" label="Xem thêm cảnh sắc" />
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
          <SeeMore href="/kinh" label="Xem tất cả bộ kinh" />
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
          <SeeMore href="/bai-viet" label="Xem thêm bài viết" />
        </section>

        {/* ====================================================================
            6. BLOCK KỆ KHAI KINH CỔ ĐIỂN
            ==================================================================== */}
        <section id="khai-kinh" className="tw:pt-6 tw:pb-20">
          <div className="tw:relative tw:max-w-5xl tw:mx-auto tw:overflow-hidden tw:rounded-[28px] tw:bg-[radial-gradient(ellipse_80%_70%_at_30%_20%,#fffdf6_0%,#fbf3df_60%,#f5e6c4_100%)] tw:shadow-[0_1px_2px_rgba(74,50,10,0.08),0_10px_24px_-10px_rgba(74,50,10,0.22),0_30px_60px_-30px_rgba(74,50,10,0.35)]">
            {/* Khung chỉ vàng hai lớp và bốn góc bọc đồng */}
            <div className="tw:pointer-events-none tw:absolute tw:inset-3 tw:rounded-[20px] tw:border tw:border-[#a8741a]/35" aria-hidden="true" />
            <div className="tw:pointer-events-none tw:absolute tw:inset-[18px] tw:rounded-[16px] tw:border tw:border-[#a8741a]/15" aria-hidden="true" />
            {KINH_CORNERS.map((pos) => (
              <span key={pos} className={`tw:pointer-events-none tw:absolute tw:w-7 tw:h-7 tw:border-[#a8741a]/70 ${pos}`} aria-hidden="true" />
            ))}

            <div className="tw:relative tw:grid tw:grid-cols-1 tw:md:grid-cols-12 tw:items-stretch">
              {/* Bên trái: nguyên văn chữ Hán viết dọc, đọc từ phải sang trái, có triện son */}
              <div className="tw:md:col-span-5 tw:flex tw:items-center tw:justify-center tw:px-8 tw:pt-14 tw:pb-6 tw:md:py-16 tw:md:border-r tw:md:border-[#a8741a]/20">
                <div className="tw:relative">
                  <p
                    lang="zh-Hant"
                    className="font-zen-han tw:m-0 tw:text-[22px] tw:sm:text-[26px] tw:leading-[1.9] tw:tracking-[0.32em] tw:text-[#3d2906]"
                    style={{ writingMode: "vertical-rl" }}
                  >
                    {KE_KHAI_KINH.map((line) => (
                      <span key={line.han} className="tw:block">
                        {line.han}
                      </span>
                    ))}
                  </p>
                  <span
                    lang="zh-Hant"
                    className="font-zen-han tw:absolute tw:bottom-1.5 tw:-left-14 tw:grid tw:place-items-center tw:w-11 tw:h-11 tw:rounded-[6px] tw:bg-[#9b2c1a] tw:text-[#fff1dc] tw:text-[13px] tw:leading-none tw:tracking-normal tw:shadow-[0_4px_10px_-2px_rgba(120,30,10,0.45)] tw:ring-1 tw:ring-[#fff1dc]/40 tw:ring-inset"
                    style={{ writingMode: "vertical-rl" }}
                    aria-label="Triện Phật Tâm"
                  >
                    佛心
                  </span>
                </div>
              </div>

              {/* Bên phải: âm Hán Việt, lời dịch và lời niệm Phật */}
              <div className="tw:md:col-span-7 tw:px-6 tw:pb-14 tw:pt-6 tw:sm:px-12 tw:md:py-16 tw:md:pl-12 tw:md:pr-16 tw:text-center tw:md:text-left">
                <span className="font-zen-body tw:inline-flex tw:items-center tw:gap-2 tw:text-[11px] tw:font-semibold tw:uppercase tw:tracking-[0.2em] tw:text-[#a8741a]">
                  <LotusIcon size={16} strokeWidth={1.4} />
                  Trước giờ chép kinh
                </span>
                <h2 className="font-zen-title tw:mt-3 tw:mb-0 tw:text-3xl tw:sm:text-[34px] tw:font-semibold tw:leading-tight tw:text-[#231b14]">
                  Kệ Khai Kinh
                </h2>

                <ol className="font-zen-title tw:mt-7 tw:mb-0 tw:p-0 tw:list-none tw:space-y-2.5 tw:text-[16.5px] tw:sm:text-xl tw:italic tw:leading-relaxed tw:text-[#3a2c1c]">
                  {KE_KHAI_KINH.map((line, idx) => (
                    <li key={line.viet} className={idx === KE_KHAI_KINH.length - 1 ? "tw:text-[#7a3f0e] tw:font-medium" : undefined}>
                      {line.viet}
                    </li>
                  ))}
                </ol>

                <p className="font-zen-body tw:mt-7 tw:mb-0 tw:text-sm tw:leading-relaxed tw:text-stone-600 tw:md:border-l-2 tw:md:border-[#d6a440]/50 tw:md:pl-4">
                  Pháp vô thượng sâu xa mầu nhiệm, trăm nghìn muôn kiếp khó gặp. Nay con được thấy nghe, thọ trì,
                  nguyện hiểu thấu nghĩa chân thật của Như Lai.
                </p>

                <div className="tw:mt-9 tw:flex tw:flex-col tw:md:flex-row tw:md:flex-wrap tw:items-center tw:gap-5 tw:md:gap-x-6 tw:md:gap-y-4">
                  <Link href="/chep-kinh/bat-nha-tam-kinh" className={copy.goldButton}>
                    Khai kinh, bắt đầu chép
                    <IconArrowRight size={18} stroke={2} className={copy.btnArrow} aria-hidden />
                  </Link>
                  <span className="font-zen-title tw:whitespace-nowrap tw:text-[11px] tw:font-semibold tw:uppercase tw:tracking-[0.12em] tw:text-[#8a6a3a]">
                    Nam Mô Bổn Sư Thích Ca Mâu Ni Phật
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
