import { BookCover } from "./BookCover";
import styles from "./copy.module.css";

// Khung tạm lúc dữ liệu kinh đang tải: cùng bố cục với SutraBook (sách gấp ở giữa, ô thông tin bên phải)
// để khi trang thật hiện ra không có gì nhảy chỗ
export function SutraBookSkeleton() {
  return (
    <div className={styles.stage} role="status" aria-label="Đang mở sách kinh">
      <div className={styles.bookArea}>
        <div className={styles.coverLoading}>
          <BookCover title="Đang mở sách kinh…" />
        </div>
      </div>

      <aside className={`${styles.glass} ${styles.panel}`} aria-hidden>
        <div className={styles.info}>
          <p className={styles.eyebrow}>Đang chép</p>
          <span className={`${styles.skeleton} ${styles.skeletonTitle}`} />
          <span className={`${styles.skeleton} ${styles.skeletonTitle} ${styles.skeletonShort}`} />
          <span className={`${styles.skeleton} ${styles.skeletonLine}`} />
          <div className={styles.progressTrack} />
        </div>
        <div className={styles.tools}>
          <span className={`${styles.skeleton} ${styles.skeletonRow}`} />
          <span className={`${styles.skeleton} ${styles.skeletonRow}`} />
        </div>
        <div className={styles.toc}>
          <p className={styles.eyebrow}>Mục lục</p>
          <div className={styles.tocList}>
            {[0, 1, 2, 3].map((i) => (
              <span key={i} className={`${styles.skeleton} ${styles.skeletonRow}`} />
            ))}
          </div>
          {/* Màn hình hẹp: ô chọn chương */}
          <span className={`${styles.skeleton} ${styles.skeletonRow} ${styles.tocSelect}`} />
        </div>
        <div className={styles.tips}>
          <span className={`${styles.skeleton} ${styles.skeletonLine}`} />
        </div>
      </aside>
    </div>
  );
}
