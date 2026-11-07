import Link from "next/link";
import { BrandMark } from "@/components/brand/LotusLogo";
import { NAV } from "@/components/layout/SiteNav";
import { LotusIcon } from "@/components/icons/BuddhistIcons";

// Hoa sen nằm lệch xuống trong khung vẽ của nó (đế sen dày hơn ngọn), kéo lên cho cân giữa huy hiệu
const LOTUS_NUDGE = "tw:[transform:translateY(-1.5px)]";

// Nét kẻ vàng mờ dần hai bên nhãn hồi hướng; bên phải là bản lật ngang
const EYEBROW_RULE =
  "tw:flex tw:items-center tw:gap-3 tw:before:flex-1 tw:before:min-w-5 tw:before:h-px tw:before:bg-[linear-gradient(90deg,transparent,rgba(168,116,26,0.7))]";
const EYEBROW_RULE_END =
  "tw:flex tw:items-center tw:gap-3 tw:after:content-[''] tw:after:flex-1 tw:after:min-w-5 tw:after:h-px tw:after:bg-[linear-gradient(90deg,transparent,rgba(168,116,26,0.7))] tw:after:[transform:scaleX(-1)]";

// Mỗi câu kệ một dòng; điện thoại thì tách đôi thành hai dòng
const VERSE_LINE =
  "tw:inline-flex tw:items-center tw:justify-center tw:gap-[0.32em] tw:upto-480:flex-col tw:upto-480:gap-0";

const FOCUS_RING =
  "tw:focus-visible:outline-2 tw:focus-visible:outline-solid tw:focus-visible:outline-gold-500 tw:focus-visible:outline-offset-2 tw:focus-visible:rounded-[4px]";

// Chân trang: lời hồi hướng, logo, danh mục (lấy chung dữ liệu với header), dòng bản quyền.
export function SiteFooter({ showDedication = true }: { showDedication?: boolean }) {
  return (
    <footer className="tw:mt-6 tw:px-5 tw:pt-0 tw:pb-7 tw:bg-[linear-gradient(180deg,transparent,rgba(246,230,190,0.55)_60%)] tw:upto-480:px-4 tw:upto-480:pb-6">
      <div className="tw:max-w-[1152px] tw:mx-auto tw:my-0">
        {/* Lời hồi hướng: huy hiệu hoa sen, nhãn "Hồi hướng · 迴向", bốn câu kệ chia hai dòng (điện thoại: bốn dòng).
            Một khối căn giữa, có quầng sáng giấy kem phía sau (::before) che bớt hoa văn nền. */}
        {showDedication && (
          <div className="tw:relative tw:isolate tw:flex tw:flex-col tw:items-center tw:pt-16 tw:px-0 tw:pb-[52px] tw:text-center tw:before:content-[''] tw:before:absolute tw:before:[inset:10px_8%_0] tw:before:-z-1 tw:before:bg-[radial-gradient(ellipse_50%_60%_at_50%_50%,rgba(255,253,246,0.95),rgba(255,253,246,0)_72%)] tw:before:pointer-events-none tw:upto-480:pt-12 tw:upto-480:pb-10">
            <span
              className="tw:grid tw:place-items-center tw:w-12 tw:h-12 tw:rounded-[50%] tw:text-[#8a5c14] tw:bg-[radial-gradient(circle_at_50%_35%,#fffdf6_0%,#fbf1d8_100%)] tw:border tw:border-[rgba(168,116,26,0.5)] tw:[box-shadow:0_0_0_4px_#fffdf8,0_0_0_5px_rgba(214,164,64,0.3),0_8px_18px_-8px_rgba(122,80,14,0.35)]"
              aria-hidden
            >
              <LotusIcon size={22} strokeWidth={1.3} className={LOTUS_NUDGE} />
            </span>
            {/*
             * Nhãn "Hồi hướng · 迴向": lưới 3 cột 1fr | chấm | 1fr để dấu chấm nằm đúng trục giữa,
             * thẳng với huy hiệu và câu kệ (chữ Việt rộng hơn chữ Hán nên căn cả cụm sẽ lệch).
             * Đường kẻ hai bên (::before / ::after) giãn lấp phần còn lại nên hai mép ngoài cũng đối xứng.
             */}
            <p className="tw:grid tw:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] tw:items-center tw:gap-x-3 tw:w-[min(100%,360px)] tw:mt-[22px] tw:mx-0 tw:mb-0 tw:leading-none">
              {/* letter-spacing để thừa một khoảng sau chữ cuối: margin-right âm kéo lại cho nhãn cân giữa */}
              <span className={`${EYEBROW_RULE} tw:before:content-[''] tw:[font-family:var(--font-sans),sans-serif] tw:text-[0.72rem] tw:font-semibold tw:tracking-[0.24em] tw:mr-[-0.24em] tw:uppercase tw:text-gold-700`}>
                Hồi hướng
              </span>
              <span className="tw:w-[3px] tw:h-[3px] tw:rounded-[50%] tw:bg-[rgba(168,116,26,0.6)]" aria-hidden />
              <span
                className={`${EYEBROW_RULE_END} tw:font-hanzi tw:text-[0.82rem] tw:tracking-[0.08em] tw:mr-[-0.08em] tw:text-[#9b2c1a]`}
                lang="zh-Hant"
              >
                迴向
              </span>
            </p>
            {/* Hai câu kệ, mỗi câu một dòng căn giữa như thơ; hai câu dài gần bằng nhau nên khối chữ cân đối */}
            <p className="tw:flex tw:flex-col tw:items-center tw:gap-0.5 tw:mt-5 tw:mx-0 tw:mb-0 tw:font-title tw:text-[clamp(1.1rem,0.9vw+0.8rem,1.32rem)] tw:italic tw:leading-[1.75] tw:text-brown-900">
              <span className={VERSE_LINE}>
                <span>Nguyện đem công đức này,</span>
                <span>hướng về khắp tất cả,</span>
              </span>
              <span className={VERSE_LINE}>
                <span>đệ tử và chúng sinh,</span>
                <span>đều trọn thành Phật đạo.</span>
              </span>
            </p>
          </div>
        )}

        <div className="tw:grid tw:grid-cols-[minmax(0,1.6fr)_repeat(4,minmax(0,1fr))] tw:gap-8 tw:py-8 tw:px-0 tw:border-t tw:border-t-[rgba(214,164,64,0.35)] tw:max-lg:grid-cols-[repeat(2,minmax(0,1fr))] tw:upto-480:gap-x-4 tw:upto-480:gap-y-6">
          <div className="tw:flex tw:flex-col tw:gap-3.5 tw:max-lg:col-[1/-1]">
            <Link
              href="/"
              className={`tw:inline-flex tw:self-start tw:no-underline ${FOCUS_RING}`}
              aria-label="Chép Kinh Online - trang chủ"
            >
              <BrandMark size={34} light={false} />
            </Link>
            <p className="tw:max-w-[22rem] tw:m-0 tw:text-[0.88rem] tw:leading-[1.7] tw:text-brown-800">
              Chép kinh trên bàn phím như ngồi trước một cuốn kinh thật: chậm rãi, từng câu, giữ tâm yên trong
              từng nét chữ.
            </p>
          </div>

          {NAV.map((group) => (
            <nav key={group.label} aria-label={group.label}>
              <h2 className="tw:mt-0 tw:mx-0 tw:mb-3 tw:[font-family:var(--font-sans),sans-serif] tw:text-[0.7rem] tw:font-semibold tw:tracking-[0.2em] tw:uppercase tw:text-gold-700">
                {group.label}
              </h2>
              <ul className="tw:flex tw:flex-col tw:gap-2 tw:m-0 tw:p-0 tw:list-none">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`tw:text-[0.88rem] tw:text-brown-800 tw:no-underline tw:[transition:color_0.2s_ease] tw:hover:text-brown-900 tw:hover:underline tw:hover:decoration-gold-500 tw:hover:underline-offset-[3px] ${FOCUS_RING}`}
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="tw:flex tw:flex-wrap tw:justify-between tw:gap-x-6 tw:gap-y-2 tw:pt-[18px] tw:text-[0.78rem] tw:tracking-[0.04em] tw:text-brown-800 tw:opacity-80 tw:border-t tw:border-t-[rgba(214,164,64,0.25)]">
          {/* Không dùng new Date(): cacheComponents prerender sẽ báo lỗi */}
          <span>© Chép Kinh Online</span>
        </div>
      </div>
    </footer>
  );
}
