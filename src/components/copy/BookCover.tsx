import { LotusLogo } from "@/components/brand/LotusLogo";

type Props = {
  title: string;
  subtitle?: string;
};

// Bìa trước cuốn kinh: bọc vải vàng, viền dập nổi, hoa sen và tên kinh ở giữa
export function BookCover({ title, subtitle = "Chép Kinh Online" }: Props) {
  return (
    <div className="ck-cover-face">
      <div className="ck-cover-frame">
        <LotusLogo size={72} title="" />
        <p className="ck-cover-title">{title}</p>
        <span className="ck-cover-rule" aria-hidden />
        <p className="ck-cover-sub">{subtitle}</p>
      </div>
    </div>
  );
}
