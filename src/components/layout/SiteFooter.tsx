import Link from "next/link";
import { BrandMark } from "@/components/brand/LotusLogo";
import { NAV } from "@/components/layout/SiteNav";
import site from "@/components/layout/site.module.css";

// Chân trang: lời hồi hướng, logo, danh mục (lấy chung dữ liệu với header), dòng bản quyền.
// Phải nằm trong `.scene` để có bảng màu --gold-*, --brown-*.
export function SiteFooter() {
  return (
    <footer className={site.footer}>
      <div className={site.footerInner}>
        <div className={site.dedication}>
          <span className={site.dedicationRule} aria-hidden />
          <p className={site.dedicationVerse}>
            {/* Màn rộng: hai dòng; điện thoại: mỗi câu năm chữ một dòng */}
            <span>Nguyện đem công đức này,</span> <span>hướng về khắp tất cả,</span>
            <br className={site.dedicationBreak} />
            <span>đệ tử và chúng sinh,</span> <span>đều trọn thành Phật đạo.</span>
          </p>
          <span className={site.dedicationRule} aria-hidden />
        </div>

        <div className={site.footerGrid}>
          <div className={site.footerBrand}>
            <Link href="/" className={site.footerBrandLink} aria-label="Chép Kinh Online - trang chủ">
              <BrandMark size={34} light={false} />
            </Link>
            <p>
              Chép kinh trên bàn phím như ngồi trước một cuốn kinh thật: chậm rãi, từng câu, giữ tâm yên trong
              từng nét chữ.
            </p>
          </div>

          {NAV.map((group) => (
            <nav key={group.label} className={site.footerCol} aria-label={group.label}>
              <h2 className={site.footerHeading}>{group.label}</h2>
              <ul>
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href}>{link.title}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className={site.footerBottom}>
          {/* Không dùng new Date(): cacheComponents prerender sẽ báo lỗi */}
          <span>© Chép Kinh Online</span>
        </div>
      </div>
    </footer>
  );
}
