import React from "react";
import site from "@/components/layout/site.module.css";

export interface IconProps {
  size?: number;
  className?: string;
  strokeWidth?: number;
  color?: string;
  style?: React.CSSProperties;
}

/**
 * 1. Hoa Sen Thanh Khiết (Padma Lotus)
 * Biểu tượng tối cao của sự vô nhiễm, thức tỉnh và từ bi.
 */
export function LotusIcon({
  size = 24,
  className = "",
  strokeWidth = 1.4,
  color = "currentColor",
  style,
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
    >
      {/* Cánh trung tâm vươn thẳng */}
      <path d="M24 7C28 17 29 27 24 37C19 27 20 17 24 7Z" />
      {/* Hai cánh chính giữa */}
      <path d="M24 37C16 34 11 25 13 14C20 18 23 27 24 37Z" />
      <path d="M24 37C32 34 37 25 35 14C28 18 25 27 24 37Z" />
      {/* Hai cánh xòe rộng bên ngoài */}
      <path d="M24 38C13 37 6 30 3 22C13 22 20 29 24 38Z" />
      <path d="M24 38C35 37 42 30 45 22C35 22 28 29 24 38Z" />
      {/* Tòa sen / Làn sóng tịnh thủy bên dưới */}
      <path d="M14 42C19 44 29 44 34 42" />
      <path d="M19 45C22 46 26 46 29 45" opacity="0.65" />
    </svg>
  );
}

/**
 * 2. Bánh Xe Pháp Luân (Dharmachakra)
 * 8 nan hoa đại diện cho Bát Chánh Đạo (Chính kiến, Chính tư duy, Chính ngữ, Chính nghiệp,...)
 */
export function DharmaWheelIcon({
  size = 24,
  className = "",
  strokeWidth = 1.4,
  color = "currentColor",
  style,
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
    >
      {/* Trục tâm và vành trong */}
      <circle cx="24" cy="24" r="5" />
      <circle cx="24" cy="24" r="2" fill={color} stroke="none" />
      {/* Vành ngoài bánh xe kép */}
      <circle cx="24" cy="24" r="19" />
      <circle cx="24" cy="24" r="16" strokeDasharray="1 3" opacity="0.7" />
      {/* 8 Nan hoa Bát Chánh Đạo */}
      <line x1="24" y1="5" x2="24" y2="19" />
      <line x1="24" y1="29" x2="24" y2="43" />
      <line x1="5" y1="24" x2="19" y2="24" />
      <line x1="29" y1="24" x2="43" y2="24" />
      <line x1="10.57" y1="10.57" x2="20.46" y2="20.46" />
      <line x1="27.54" y1="27.54" x2="37.43" y2="37.43" />
      <line x1="10.57" y1="37.43" x2="20.46" y2="27.54" />
      <line x1="27.54" y1="20.46" x2="37.43" y2="10.57" />
      {/* Các điểm kim cương trên vành */}
      <circle cx="24" cy="3" r="1.2" fill={color} stroke="none" />
      <circle cx="24" cy="45" r="1.2" fill={color} stroke="none" />
      <circle cx="3" cy="24" r="1.2" fill={color} stroke="none" />
      <circle cx="45" cy="24" r="1.2" fill={color} stroke="none" />
    </svg>
  );
}

/**
 * 3. Lá Bồ Đề (Bodhi Leaf)
 * Biểu tượng của sự Giác Ngộ dưới cội Bồ Đề linh thiêng.
 */
export function BodhiLeafIcon({
  size = 24,
  className = "",
  strokeWidth = 1.4,
  color = "currentColor",
  style,
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
    >
      {/* Hình dáng chiếc lá bồ đề với chóp vuốt dài */}
      <path d="M24 4C24 4 11 16 11 26C11 34 17 40 24 40C31 40 37 34 37 26C37 16 24 4 24 4Z" />
      {/* Cuống uốn cong thanh thoát */}
      <path d="M24 40C24 40 24 44 21 46" />
      {/* Gân chính giữa */}
      <path d="M24 8V38" opacity="0.6" />
      {/* Gân lá tỏa hai bên */}
      <path d="M24 16C21 18 17 21 16 25" opacity="0.45" />
      <path d="M24 16C27 18 31 21 32 25" opacity="0.45" />
      <path d="M24 24C21 26 18 29 17 33" opacity="0.45" />
      <path d="M24 24C27 26 30 29 31 33" opacity="0.45" />
    </svg>
  );
}

/**
 * 4. Nút Thắt Vô Tận Cát Tường (Endless Knot / Srivatsa)
 * Tượng trưng cho trí tuệ và từ bi tương dung không có điểm khởi đầu hay kết thúc.
 */
export function EndlessKnotIcon({
  size = 24,
  className = "",
  strokeWidth = 1.4,
  color = "currentColor",
  style,
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
    >
      <path d="M24 8L34 18L30 22L24 16L18 22L14 18L24 8Z" />
      <path d="M24 40L14 30L18 26L24 32L30 26L34 30L24 40Z" />
      <path d="M8 24L18 14L22 18L16 24L22 30L18 34L8 24Z" />
      <path d="M40 24L30 34L26 30L32 24L26 18L30 14L40 24Z" />
    </svg>
  );
}

/**
 * 5. Chuông Xoay Tĩnh Tâm (Tibetan Singing Bowl / Chuông Gia Trì)
 * Âm thanh khai mở tâm thức, chánh niệm trong từng khoảnh khắc chép kinh.
 */
export function SingingBowlIcon({
  size = 24,
  className = "",
  strokeWidth = 1.4,
  color = "currentColor",
  style,
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
    >
      {/* Miệng bát xoay */}
      <ellipse cx="24" cy="16" rx="17" ry="5" />
      {/* Thân bát chuông tròn đầy */}
      <path d="M7 16C7 29 14 36 24 36C34 36 41 29 41 16" />
      {/* Đế chuông */}
      <path d="M18 36C18 38 21 39 24 39C27 39 30 38 30 36" />
      {/* Sóng âm thanh ngân vang mờ ảo */}
      <path d="M3 13C1 16 1 19 3 22" opacity="0.5" strokeDasharray="2 2" />
      <path d="M45 13C47 16 47 19 45 22" opacity="0.5" strokeDasharray="2 2" />
    </svg>
  );
}

/**
 * 6. Lư Hương & Khói Trầm (Incense Burner)
 * Hương trầm giới đức tỏa khắp mười phương.
 */
export function IncenseBurnerIcon({
  size = 24,
  className = "",
  strokeWidth = 1.4,
  color = "currentColor",
  style,
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
    >
      {/* Lư hương 3 chân */}
      <path d="M12 28C12 35 17 38 24 38C31 38 36 35 36 28H12Z" />
      {/* Vành miệng lư */}
      <path d="M9 28H39" />
      {/* Chân lư hương */}
      <path d="M16 38L14 43" />
      <path d="M32 38L34 43" />
      <path d="M24 38V43" />
      {/* Làn khói trầm uốn lượn bay bổng */}
      <path d="M24 25C22 21 26 17 24 13C22 9 26 5 24 3" opacity="0.8" />
      <path d="M19 24C18 21 21 18 19 15C17 12 20 9 19 7" opacity="0.5" />
      <path d="M29 24C30 21 27 18 29 15C31 12 28 9 29 7" opacity="0.5" />
    </svg>
  );
}

/**
 * 7. Ngọn Nến / Đèn Tuệ (Sacred Candle Light)
 * "Hãy tự mình thắp đuốc lên mà đi" - Ánh sáng soi đường vô minh.
 */
export function CandleLightIcon({
  size = 24,
  className = "",
  strokeWidth = 1.4,
  color = "currentColor",
  style,
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
    >
      {/* Ngọn lửa trí tuệ thanh mảnh */}
      <path d="M24 5C24 5 19 12 19 16C19 18.76 21.24 21 24 21C26.76 21 29 18.76 29 16C29 12 24 5 24 5Z" />
      {/* Tim đèn */}
      <line x1="24" y1="21" x2="24" y2="24" />
      {/* Thân nến */}
      <rect x="18" y="24" width="12" height="18" rx="2" />
      {/* Vầng hào quang nến */}
      <circle cx="24" cy="15" r="8" strokeDasharray="2 3" opacity="0.35" />
    </svg>
  );
}

/**
 * 8. Tràng Hạt Niệm Phật (Mala Beads)
 * 108 phiền não hóa bồ đề.
 */
export function MalaBeadsIcon({
  size = 24,
  className = "",
  strokeWidth = 1.4,
  color = "currentColor",
  style,
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
    >
      <circle cx="24" cy="20" r="14" strokeDasharray="3 4" strokeWidth={strokeWidth * 1.5} />
      {/* Hạt mẹ (Guru bead) */}
      <circle cx="24" cy="34" r="3" fill={color} stroke="none" />
      {/* Tua chỉ cát tường */}
      <line x1="24" y1="37" x2="24" y2="45" />
      <line x1="22" y1="41" x2="26" y2="41" />
      <line x1="21" y1="45" x2="27" y2="45" />
    </svg>
  );
}

/**
 * 9. Dải Phân Cách Hoa Văn Cát Tường (Zen Decorative Divider)
 * Hai nét vàng mảnh nhạt dần ra hai đầu, hạt thoi nhỏ, biểu tượng vàng đồng ở giữa
 * trên quầng giấy kem che hoa văn nền. Dùng biến màu của `.scene`.
 */
export function ZenDivider({
  className = "",
  symbol = "lotus",
}: {
  className?: string;
  symbol?: "lotus" | "wheel" | "knot";
}) {
  return (
    <div role="separator" className={`${site.divider} ${className}`}>
      <span className={site.dividerLine} />
      <span className={site.dividerDot} />
      <span className={site.dividerMark}>
        {symbol === "lotus" && <LotusIcon size={26} strokeWidth={1.3} />}
        {symbol === "wheel" && <DharmaWheelIcon size={24} strokeWidth={1.3} />}
        {symbol === "knot" && <EndlessKnotIcon size={24} strokeWidth={1.3} />}
      </span>
      <span className={site.dividerDot} />
      <span className={`${site.dividerLine} ${site.dividerLineEnd}`} />
    </div>
  );
}
