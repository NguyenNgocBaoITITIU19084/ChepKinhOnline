import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { IconArrowRight, IconBooks, IconMail } from "@tabler/icons-react";
import { PhotoBanner } from "@/components/layout/PhotoBanner";
import { ZenDivider } from "@/components/icons/BuddhistIcons";

export const metadata: Metadata = {
  title: "Về Chép Kinh Online | Chép Kinh Online",
  description:
    "Chép Kinh Online là một tịnh thất nhỏ trên không gian số: chép kinh từng chữ như ngồi trước một cuốn kinh thật, rồi hồi hướng công đức.",
};

// Thập pháp hành (十法行): mười cách thọ trì kinh điển, biên chép đứng đầu
const TEN_PRACTICES = [
  { han: "書寫", vi: "Biên chép" },
  { han: "供養", vi: "Cúng dường" },
  { han: "施他", vi: "Thí tha" },
  { han: "諦聽", vi: "Lắng nghe" },
  { han: "披讀", vi: "Phi độc" },
  { han: "受持", vi: "Thọ trì" },
  { han: "開演", vi: "Khai diễn" },
  { han: "諷誦", vi: "Phúng tụng" },
  { han: "思惟", vi: "Tư duy" },
  { han: "修習", vi: "Tu tập" },
];

// Một buổi chép kinh, đúng theo những gì trang chép kinh đang có
const SESSION_STEPS = [
  {
    title: "Chọn kinh theo tâm nguyện",
    text: "Thư viện kinh chia theo bốn tâm nguyện: khai mở trí tuệ, cầu an, cầu siêu và sám hối. Mỗi bộ kinh ghi sẵn thời gian chép ước chừng.",
  },
  {
    title: "Chép theo chữ mờ",
    text: "Chữ kinh hiện mờ trên trang giấy. Gõ đúng chữ nào, chữ ấy thấm mực nâu. Gõ sai thì có gạch lượn sóng nhắc nhẹ để sửa lại.",
  },
  {
    title: "Chép theo cách của mình",
    text: "Chép trên cuốn sách mở hai trang hoặc từng tờ giấy rời, bật toàn màn hình để chỉ còn trang kinh, chỉnh cỡ chữ cho vừa mắt. Mục lục ghi tiến độ từng chương.",
  },
  {
    title: "Hồi hướng công đức",
    text: "Chép xong một bộ kinh, bài kệ hồi hướng hiện ra để khép lại buổi chép, gửi công đức đến người thân và muôn loài.",
  },
];

// Nguyên tắc giao diện, lấy từ docs/design-system/README.md
const PRINCIPLES = [
  {
    eyebrow: "Giấy ngà · Mực nâu",
    title: "Chữ kinh là thứ rõ nhất",
    text: "Cả trang chỉ dùng sắc giấy, mực và viền vàng. Không màu sặc sỡ chen vào trang kinh, để mắt chỉ dừng ở lời Phật.",
  },
  {
    eyebrow: "Tĩnh lặng",
    title: "Ít chuyển động",
    text: "Chỉ có trang sách lật và mực thấm chữ. Khi máy bật chế độ giảm chuyển động, mọi hiệu ứng chỉ còn mờ dần nhẹ nhàng.",
  },
  {
    eyebrow: "Trang nghiêm",
    title: "Giữ đúng bản kinh",
    text: "Tên kinh, tên chương viết như bản in. Chữ Hán chỉ để chiêm ngưỡng, người chép gõ theo âm Việt quen thuộc.",
  },
  {
    eyebrow: "Lắng nghe",
    title: "Cùng nhau hiệu đính",
    text: "Thấy một chữ chưa đúng, một câu thiếu dấu, quý vị gửi thư cho Ban biên tập. Mỗi góp ý giúp bản kinh trọn vẹn hơn cho người chép sau.",
    link: { href: "/lien-he", label: "Gửi góp ý" },
  },
];

const EYEBROW =
  "tw:inline-flex tw:items-center tw:gap-2.5 tw:text-[0.74rem] tw:font-semibold tw:tracking-[0.22em] tw:uppercase tw:text-gold-700 tw:before:content-[''] tw:before:w-7 tw:before:h-px tw:before:bg-gold-500";
const H2 =
  "tw:m-0 tw:font-title tw:text-[clamp(1.6rem,3vw,2.2rem)] tw:font-semibold tw:leading-[1.25] tw:text-brown-900 tw:text-balance tw:[&_em]:italic tw:[&_em]:font-medium tw:[&_em]:text-gold-700";
const BODY = "tw:m-0 tw:text-[1rem] tw:leading-[1.8] tw:text-brown-800 tw:text-pretty";
// Khung nội dung cùng lề với tờ giấy của PhotoBanner (24 / 20 / 16px, rộng tối đa 1152px)
const CONTAINER = "tw:w-full tw:max-w-[1152px] tw:mx-auto tw:px-6 tw:box-border tw:upto-1024:px-5 tw:upto-768:px-4";
const PAPER =
  "tw:bg-[radial-gradient(ellipse_at_50%_0%,#fffdf6,var(--paper)_70%)] tw:border tw:border-[rgba(214,164,64,0.4)] tw:rounded-2xl tw:[box-shadow:0_18px_44px_rgba(120,85,20,0.12)]";

export default function AboutPage() {
  return (
    <div className="font-zen-body">
      {/* Toàn cảnh Đại Phật ngồi giữa núi rừng nhìn từ trên cao; tượng sát mép trên ảnh nên hạ ảnh xuống dưới header */}
      <PhotoBanner
        size="tall"
        priority
        parallax
        clearHeader
        skyColor="#dfe6ec"
        headingLevel="h1"
        image="/storage/real/tian_tan_3.jpg"
        alt="Tượng Đại Phật bằng đồng ngồi trên đỉnh đồi giữa núi rừng xanh, xa xa là biển và trời mây"
        caption="Đại Phật Thiên Đàn · Lantau, Hồng Kông"
        imagePosition="52% 0%"
        eyebrow="Về Chép Kinh Online"
        title={
          <>
            Một tịnh thất nhỏ <em>cho người chép kinh giữa đời thường</em>
          </>
        }
        lead={
          <>
            Không cần giấy bút, không cần bàn kinh. Chỉ cần vài phút yên tĩnh, <strong>Chép Kinh Online</strong>{" "}
            mở ra một cuốn kinh giấy ngà mực nâu để quý vị chép từng chữ, chậm rãi và trọn vẹn.
          </>
        }
      />

      {/* ==================== Lời ngỏ: vì sao có trang này, bên cạnh là Thập pháp hành ==================== */}
      <section
        aria-labelledby="loi-ngo"
        className={`${CONTAINER} tw:grid tw:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] tw:gap-14 tw:items-center tw:pt-16 tw:pb-4 tw:upto-1024:grid-cols-[minmax(0,1fr)] tw:upto-1024:gap-10 tw:upto-768:pt-12`}
      >
        <div className="tw:flex tw:flex-col tw:gap-5">
          <span className={EYEBROW}>Lời ngỏ</span>
          <h2 id="loi-ngo" className={H2}>
            Chép kinh, <em>một pháp tu xưa cho nhịp sống nay</em>
          </h2>
          <p className={BODY}>
            Người xưa chép kinh bằng bút lông trên giấy dó, mỗi chữ là một lần thu tâm về. Ngày nay ít ai còn
            thời gian ngồi trước nghiên mực, nhưng ai cũng có vài phút trước màn hình. Chép Kinh Online ra đời để
            giữ lại tinh thần ấy: chậm lại, đọc kỹ, chép đúng từng chữ.
          </p>
          <p className={BODY}>
            Ở đây không có điểm số hay bảng xếp hạng. Chỉ có trang kinh, con trỏ nhấp nháy và tâm của người chép.
            Chép một câu hay trọn bộ kinh đều là một buổi chép trọn vẹn.
          </p>
        </div>

        {/* Thẻ giấy: mười pháp hành, biên chép đứng đầu được nhấn bằng nền vàng nhạt */}
        <figure className={`${PAPER} tw:m-0 tw:pt-7 tw:px-8 tw:pb-6 tw:upto-480:px-5`}>
          <figcaption className="tw:flex tw:flex-col tw:gap-1.5 tw:pb-4 tw:mb-5 tw:border-b tw:border-b-[rgba(214,164,64,0.35)]">
            <span className="tw:text-[0.68rem] tw:font-semibold tw:tracking-[0.18em] tw:uppercase tw:text-gold-700">
              Thập pháp hành · 十法行
            </span>
            <span className="tw:font-title tw:text-[1.15rem] tw:font-semibold tw:leading-[1.4] tw:text-brown-900">
              Mười cách thọ trì kinh điển, biên chép đứng đầu
            </span>
          </figcaption>
          <ol className="tw:grid tw:grid-cols-[repeat(2,minmax(0,1fr))] tw:gap-x-6 tw:gap-y-1 tw:m-0 tw:p-0 tw:list-none tw:upto-480:grid-cols-[minmax(0,1fr)]">
            {TEN_PRACTICES.map((practice, i) => (
              <li
                key={practice.han}
                className={`tw:flex tw:items-baseline tw:gap-3 tw:py-1.5 tw:px-2.5 tw:rounded-[10px] ${
                  i === 0 ? "tw:bg-gold-100 tw:ring-1 tw:ring-[rgba(214,164,64,0.45)]" : ""
                }`}
              >
                <span className="tw:w-5 tw:shrink-0 tw:font-title tw:text-[0.8rem] tw:italic tw:tabular-nums tw:text-gold-700">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className={`tw:text-[0.92rem] tw:text-brown-900 ${i === 0 ? "tw:font-semibold" : ""}`}>{practice.vi}</span>
                <span className="tw:ml-auto tw:font-hanzi tw:text-[0.85rem] tw:text-brown-800 tw:opacity-70" lang="zh-Hant">
                  {practice.han}
                </span>
              </li>
            ))}
          </ol>
        </figure>
      </section>

      <ZenDivider symbol="lotus" />

      {/* ==================== Một buổi chép kinh: bốn bước ==================== */}
      <section aria-labelledby="buoi-chep-kinh" className={`${CONTAINER} tw:pb-4`}>
        <div className="tw:flex tw:flex-col tw:items-center tw:gap-4 tw:max-w-[640px] tw:mx-auto tw:mb-12 tw:text-center">
          <span className={`${EYEBROW} tw:before:hidden`}>Cách chép kinh</span>
          <h2 id="buoi-chep-kinh" className={H2}>
            Một buổi chép kinh <em>diễn ra thế nào</em>
          </h2>
          <p className={BODY}>Bốn bước, từ lúc mở cuốn kinh đến khi hồi hướng.</p>
        </div>

        <ol className="tw:grid tw:grid-cols-[repeat(4,minmax(0,1fr))] tw:m-0 tw:p-0 tw:list-none tw:max-lg:grid-cols-[repeat(2,minmax(0,1fr))] tw:max-lg:gap-y-10 tw:upto-560:grid-cols-[minmax(0,1fr)] tw:upto-560:gap-y-8">
          {SESSION_STEPS.map((step, i) => (
            <li
              key={step.title}
              className="tw:relative tw:flex tw:flex-col tw:gap-2.5 tw:px-6 tw:not-first:border-l tw:not-first:border-l-[rgba(214,164,64,0.3)] tw:max-lg:odd:[border-left:0] tw:max-lg:odd:pl-0 tw:upto-560:px-0 tw:upto-560:not-first:[border-left:0]"
            >
              <span className="tw:inline-flex tw:items-center tw:justify-center tw:w-10 tw:h-10 tw:rounded-full tw:font-title tw:text-[1rem] tw:font-semibold tw:tabular-nums tw:text-brown-900 tw:bg-[linear-gradient(180deg,#fff0c2,#f5d98f)] tw:border tw:border-[rgba(214,164,64,0.55)] tw:[box-shadow:0_4px_12px_rgba(214,164,64,0.28)]">
                {i + 1}
              </span>
              <h3 className="tw:m-0 tw:mt-1 tw:font-title tw:text-[1.14rem] tw:font-semibold tw:leading-[1.35] tw:text-brown-900">
                {step.title}
              </h3>
              <p className="tw:m-0 tw:text-[0.9rem] tw:leading-[1.7] tw:text-brown-800">{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <ZenDivider symbol="wheel" />

      {/* ==================== Điều chúng tôi gìn giữ ==================== */}
      <section aria-labelledby="gin-giu" className={`${CONTAINER} tw:pb-16`}>
        <div className="tw:grid tw:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] tw:gap-14 tw:items-start tw:upto-1024:grid-cols-[minmax(0,1fr)] tw:upto-1024:gap-8">
          <div className="tw:flex tw:flex-col tw:gap-4 tw:sticky tw:top-28 tw:upto-1024:static">
            <span className={EYEBROW}>Điều chúng tôi gìn giữ</span>
            <h2 id="gin-giu" className={H2}>
              Mọi chi tiết <em>phục vụ một tâm yên</em>
            </h2>
            <p className={BODY}>
              Từ màu giấy đến nhịp lật trang, mỗi quyết định trên Chép Kinh Online đều trả lời cùng một câu hỏi: điều
              này có giúp người chép giữ tâm yên hơn không?
            </p>
          </div>

          <ul className="tw:grid tw:grid-cols-[repeat(2,minmax(0,1fr))] tw:gap-5 tw:m-0 tw:p-0 tw:list-none tw:upto-560:grid-cols-[minmax(0,1fr)]">
            {PRINCIPLES.map((principle) => (
              <li key={principle.title} className={`${PAPER} tw:flex tw:flex-col tw:gap-2 tw:pt-6 tw:px-6 tw:pb-6`}>
                <span className="tw:text-[0.68rem] tw:font-semibold tw:tracking-[0.18em] tw:uppercase tw:text-gold-700">
                  {principle.eyebrow}
                </span>
                <h3 className="tw:m-0 tw:font-title tw:text-[1.14rem] tw:font-semibold tw:text-brown-900">{principle.title}</h3>
                <p className="tw:m-0 tw:text-[0.9rem] tw:leading-[1.7] tw:text-brown-800">{principle.text}</p>
                {principle.link && (
                  <Link
                    href={principle.link.href}
                    className="tw:inline-flex tw:items-center tw:gap-1.5 tw:mt-auto tw:pt-2 tw:text-[0.88rem] tw:font-medium tw:text-brown-900 tw:no-underline tw:hover:underline tw:underline-offset-4 tw:decoration-gold-500"
                  >
                    {principle.link.label}
                    <IconArrowRight size={16} stroke={2} aria-hidden />
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ==================== Kết: câu dẫn trên cảnh bình minh, rồi lời mời chép (kệ hồi hướng đã có ở footer) ==================== */}
      <figure className="ck-parallax-frame tw:relative tw:m-0 tw:overflow-hidden tw:h-[clamp(340px,56vh,560px)] tw:[mask-image:linear-gradient(180deg,transparent_0,#000_120px,#000_calc(100%_-_120px),transparent_100%)] tw:upto-560:h-[360px]">
        <div className="ck-parallax tw:absolute tw:inset-x-0 tw:-top-[12%] tw:-bottom-[12%]">
          <Image
            src="/storage/real/banner_buddha_sunrise_1.jpg"
            alt="Mặt trời mọc sau rặng núi, sương sớm phủ rừng cây"
            fill
            sizes="100vw"
            className="tw:object-cover tw:object-[50%_70%]"
          />
        </div>
        <div
          aria-hidden
          className="tw:absolute tw:inset-0 tw:bg-[radial-gradient(ellipse_60%_55%_at_50%_50%,rgba(43,33,22,0.55),rgba(43,33,22,0.15)_70%,transparent)]"
        />
        <blockquote className="tw:absolute tw:inset-x-4 tw:top-1/2 tw:-translate-y-1/2 tw:m-0 tw:p-0 tw:[border:0] tw:flex tw:flex-col tw:items-center tw:gap-3 tw:text-center">
          <p className="tw:m-0 tw:max-w-[780px] tw:font-title tw:text-[clamp(1.6rem,3.6vw,2.6rem)] tw:italic tw:leading-[1.3] tw:text-[#fdf3dc] tw:[text-shadow:0_2px_18px_rgba(30,20,8,0.5)] tw:text-balance">
            Mỗi chữ chép xuống, một niệm an trở về.
          </p>
          <cite className="tw:text-[0.74rem] tw:not-italic tw:font-semibold tw:tracking-[0.18em] tw:uppercase tw:text-[#e8c77a]">
            Tâm an · Pháp lạc
          </cite>
        </blockquote>
      </figure>

      <section aria-labelledby="bat-dau" className={`${CONTAINER} tw:flex tw:flex-col tw:items-center tw:gap-5 tw:pt-6 tw:pb-20 tw:text-center`}>
        <h2 id="bat-dau" className={H2}>
          Bắt đầu với <em>vài dòng kinh</em>
        </h2>
        <p className={`${BODY} tw:max-w-[560px]`}>
          Bát Nhã Tâm Kinh chỉ hơn hai trăm chữ, đủ cho một buổi chép đầu tiên.
        </p>
        <div className="tw:flex tw:flex-wrap tw:justify-center tw:gap-3.5 tw:upto-480:flex-col tw:upto-480:self-stretch">
          <Link href="/chep-kinh/bat-nha-tam-kinh" className="ck-btn-gold tw:min-h-[48px] tw:px-6">
            Chép Bát Nhã Tâm Kinh
            <IconArrowRight size={18} stroke={2} className="ck-btn-arrow" aria-hidden />
          </Link>
          <Link href="/kinh-dien" className="ck-btn-ghost tw:min-h-[48px] tw:px-6">
            <IconBooks size={18} stroke={1.7} aria-hidden />
            Xem thư viện kinh
          </Link>
          <Link href="/lien-he" className="ck-btn-ghost tw:min-h-[48px] tw:px-6">
            <IconMail size={18} stroke={1.7} aria-hidden />
            Viết thư cho Ban biên tập
          </Link>
        </div>
      </section>
    </div>
  );
}
