import type { Metadata } from "next";
import copyStyles from "@/components/copy/copy.module.css";
import { LotusLogo } from "@/components/brand/LotusLogo";
import { LoginForm } from "@/components/auth/LoginForm";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Đăng nhập – Chép Kinh Online",
  description: "Đăng nhập vào không gian chép kinh trực tuyến Chép Kinh Online",
};

export default function LoginPage() {
  return (
    <div className={styles.loginContainer}>
      <div className={`${copyStyles.glass} ${styles.loginCard}`}>
        <header className={styles.cardHeader}>
          <div className={styles.headerEmblem} aria-hidden>
            <LotusLogo size={32} />
          </div>
          <h1 className={styles.cardTitle}>Đăng Nhập</h1>
          <p className={styles.cardSubtitle}>Trở về án thư · Lắng lòng chép kinh</p>
        </header>

        <LoginForm />
      </div>
    </div>
  );
}
