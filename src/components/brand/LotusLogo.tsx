import { useId } from "react";

type Props = {
  size?: number;
  className?: string;
  title?: string;
};

// Logo hoa sen trắng, đầu cánh ửng đỏ, viền vàng
export function LotusLogo({ size = 40, className, title = "Chép Kinh Online" }: Props) {
  const id = useId();
  const petal = `${id}-petal`;
  const inner = `${id}-inner`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      className={className}
      role="img"
      aria-label={title}
    >
      <defs>
        <linearGradient id={petal} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="55%" stopColor="#fff4f2" />
          <stop offset="100%" stopColor="#f2a3a0" />
        </linearGradient>
        <linearGradient id={inner} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="60%" stopColor="#ffe9e6" />
          <stop offset="100%" stopColor="#e2615c" />
        </linearGradient>
      </defs>
      <g stroke="#d6a440" strokeWidth="1.1" strokeLinejoin="round">
        {/* Cánh ngoài */}
        <path d="M32 47 C20 47 8 41 3 30 C16 28 26 36 32 47 Z" fill={`url(#${petal})`} />
        <path d="M32 47 C44 47 56 41 61 30 C48 28 38 36 32 47 Z" fill={`url(#${petal})`} />
        {/* Cánh giữa hai bên */}
        <path d="M32 46 C21 42 13 31 14 17 C25 21 31 32 32 46 Z" fill={`url(#${petal})`} />
        <path d="M32 46 C43 42 51 31 50 17 C39 21 33 32 32 46 Z" fill={`url(#${petal})`} />
        {/* Cánh chính */}
        <path d="M32 6 C41 17 42 33 32 46 C22 33 23 17 32 6 Z" fill={`url(#${inner})`} />
      </g>
      {/* Mặt nước */}
      <path d="M12 52 Q32 58 52 52" fill="none" stroke="#d6a440" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M20 57 Q32 61 44 57" fill="none" stroke="#d6a440" strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />
    </svg>
  );
}

export function BrandMark({ size = 36, light = true }: { size?: number; light?: boolean }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
      <LotusLogo size={size} />
      {/* Khoảng hở giữa tên và khẩu hiệu: chân chữ "p" không chạm dấu mũ của "TÂM" */}
      <span style={{ display: "flex", flexDirection: "column", gap: size * 0.1 }}>
        <span
          style={{
            fontFamily: "var(--font-display), serif",
            fontWeight: 600,
            fontSize: size * 0.62,
            lineHeight: 1.15,
            letterSpacing: "0.02em",
            whiteSpace: "nowrap",
            color: light ? "#fdf3dc" : "#6b4a12",
          }}
        >
          Chép Kinh Online
        </span>
        <span
          style={{
            fontSize: size * 0.27,
            lineHeight: 1.3,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            whiteSpace: "nowrap",
            color: light ? "#e8c77a" : "#a8741a",
          }}
        >
          Tâm an · Pháp lạc
        </span>
      </span>
    </span>
  );
}
