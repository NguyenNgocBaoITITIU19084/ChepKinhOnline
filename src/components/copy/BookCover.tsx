import { LotusLogo } from "@/components/brand/LotusLogo";
import styles from "./copy.module.css";

type Props = {
  title: string;
  subtitle?: string;
};

// Bìa trước cuốn kinh: bọc vải vàng, viền dập nổi, hoa sen và tên kinh ở giữa
export function BookCover({ title, subtitle = "Chép Kinh Online" }: Props) {
  return (
    <div className={styles.coverFace}>
      <div className={styles.coverFrame}>
        <LotusLogo size={72} title="" />
        <p className={styles.coverTitle}>{title}</p>
        <span className={styles.coverRule} aria-hidden />
        <p className={styles.coverSub}>{subtitle}</p>
      </div>
    </div>
  );
}
