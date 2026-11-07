import Image from "next/image";

/**
 * Tôn tượng Phật mờ ẩn dưới nền danh mục kinh. Lớp `sticky` giữ tượng ở giữa màn hình khi cuộn
 * (không dùng background-attachment: fixed vì hỏng trên iOS). mask-image xoá mép ảnh (trời, cây quanh tượng),
 * mix-blend-multiply hoà tượng đá vào nền giấy kem.
 * Phần tử cha phải là `relative isolate`.
 */
export function SutraBuddhaBackdrop() {
  return (
    <div aria-hidden="true" className="tw:pointer-events-none tw:absolute tw:inset-0 tw:-z-10 tw:overflow-clip">
      <div className="tw:sticky tw:top-0 tw:h-screen tw:w-full tw:flex tw:items-center tw:justify-center">
        {/* Hào quang vàng phía sau tượng */}
        <div className="tw:absolute tw:w-[min(110vw,980px)] tw:aspect-square tw:rounded-full tw:bg-[radial-gradient(circle,rgba(236,190,96,0.22)_0%,rgba(236,190,96,0.08)_40%,transparent_68%)]" />
        <svg viewBox="0 0 600 600" className="tw:absolute tw:w-[min(100vw,860px)] tw:aspect-square tw:opacity-[0.22]">
          {[120, 170, 225, 285].map((r, i) => (
            <circle key={r} cx="300" cy="300" r={r} fill="none" stroke="#a8741a" strokeWidth="0.7" strokeDasharray={i % 2 ? "1.5 7" : undefined} />
          ))}
        </svg>
        <div className="tw:relative tw:h-[92vh] tw:aspect-[4/5] tw:max-w-[120vw] tw:opacity-[0.2] tw:mix-blend-multiply tw:[mask-image:radial-gradient(ellipse_40%_48%_at_50%_44%,#000_60%,transparent_100%)] tw:[-webkit-mask-image:radial-gradient(ellipse_40%_48%_at_50%_44%,#000_60%,transparent_100%)]">
          <Image
            src="/storage/real/tuong_phat_kamakura.jpg"
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 800px"
            className="tw:object-cover tw:object-[50%_22%] tw:[filter:grayscale(0.3)_sepia(0.7)_contrast(1.25)_brightness(1.05)]"
          />
        </div>
      </div>
    </div>
  );
}
