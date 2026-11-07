import { BookCover } from "./BookCover";
import { eyebrow, info, panel, progressTrack, skeleton, tips, toc, tocList, tools } from "./panelClasses";

const title = `${skeleton} tw:w-full tw:h-[1.35rem]`;
const titleShort = `${skeleton} tw:w-[60%] tw:h-[1.35rem] tw:max-lg:hidden`;
const line = `${skeleton} tw:w-1/2 tw:h-[0.85rem]`;
const row = `${skeleton} tw:h-9`;
// Thanh chờ thay cho ô chọn chương (màn hình hẹp)
const selectRow = `${row} tw:w-full tw:min-h-9 tw:px-2.5 tw:py-0 tw:border tw:border-solid tw:border-[rgba(214,164,64,0.5)]`;

// Khung tạm lúc dữ liệu kinh đang tải: cùng bố cục với SutraBook (sách gấp ở giữa, ô thông tin bên phải)
// để khi trang thật hiện ra không có gì nhảy chỗ
export function SutraBookSkeleton() {
  return (
    <div className="ck-stage" role="status" aria-label="Đang mở sách kinh">
      <div className="ck-book-area">
        <div className="ck-cover-loading">
          <BookCover title="Đang mở sách kinh…" />
        </div>
      </div>

      <aside className={panel} aria-hidden>
        <div className={info}>
          <p className={eyebrow}>Đang chép</p>
          <span className={title} />
          <span className={titleShort} />
          <span className={line} />
          <div className={progressTrack} />
        </div>
        <div className={tools}>
          <span className={row} />
          <span className={row} />
        </div>
        <div className={toc}>
          <p className={eyebrow}>Mục lục</p>
          <div className={tocList}>
            {[0, 1, 2, 3].map((i) => (
              <span key={i} className={row} />
            ))}
          </div>
          {/* Màn hình hẹp: ô chọn chương */}
          <span className={selectRow} />
        </div>
        <div className={tips}>
          <span className={line} />
        </div>
      </aside>
    </div>
  );
}
