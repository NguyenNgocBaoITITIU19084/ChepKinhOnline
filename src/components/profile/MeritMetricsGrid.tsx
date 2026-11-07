import { IconWriting, IconFlame, IconClock, IconAward } from "@tabler/icons-react";
import type { MeritMetrics } from "@/types/profile";

interface MeritMetricsGridProps {
  metrics: MeritMetrics;
}

export function MeritMetricsGrid({ metrics }: MeritMetricsGridProps) {
  const numberFormat = new Intl.NumberFormat("vi-VN");

  const statItems = [
    {
      id: "chars",
      label: "Chữ Đã Chép",
      value: numberFormat.format(metrics.totalCharsTyped),
      unit: "ký tự",
      desc: "Từng nét chữ định tâm",
      icon: <IconWriting size={22} stroke={1.8} />,
      colorClass: "tw:from-amber-400 tw:to-amber-600",
      bgClass: "tw:bg-amber-100/60 tw:text-amber-800",
    },
    {
      id: "completed",
      label: "Kinh Hoàn Thành",
      value: metrics.completedSutrasCount,
      unit: "biến kinh",
      desc: "Viên mãn công đức",
      icon: <IconAward size={22} stroke={1.8} />,
      colorClass: "tw:from-gold-400 tw:to-gold-600",
      bgClass: "tw:bg-gold-100/70 tw:text-gold-800",
    },
    {
      id: "streak",
      label: "Chuỗi Chuyên Cần",
      value: metrics.streakDays,
      unit: "ngày liên tục",
      desc: "Ngọn đèn chánh niệm",
      icon: <IconFlame size={22} stroke={1.8} />,
      colorClass: "tw:from-orange-400 tw:to-rose-500",
      bgClass: "tw:bg-orange-100/70 tw:text-orange-800",
    },
    {
      id: "hours",
      label: "Thời Gian Công Phu",
      value: metrics.totalHoursSpent,
      unit: "giờ tu tập",
      desc: "Lắng đọng thân tâm",
      icon: <IconClock size={22} stroke={1.8} />,
      colorClass: "tw:from-emerald-400 tw:to-teal-600",
      bgClass: "tw:bg-emerald-100/70 tw:text-emerald-800",
    },
  ];

  return (
    <div className="tw:grid tw:grid-cols-2 tw:sm:grid-cols-4 tw:gap-3.5">
      {statItems.map((item) => (
        <div
          key={item.id}
          className="ck-glass tw:relative tw:overflow-hidden tw:p-4 tw:rounded-2xl tw:bg-[rgba(255,253,246,0.95)] tw:border tw:border-[rgba(214,164,64,0.3)] tw:shadow-[0_4px_16px_rgba(107,74,18,0.04)] tw:hover:border-gold-500/60 tw:transition-all tw:duration-200"
        >
          <div className="tw:flex tw:items-center tw:justify-between tw:mb-2.5">
            <span className={`tw:p-2 tw:rounded-xl ${item.bgClass}`}>{item.icon}</span>
          </div>

          <div className="tw:space-y-0.5">
            <p className="tw:text-[0.72rem] tw:font-semibold tw:uppercase tw:tracking-wider tw:text-brown-600">
              {item.label}
            </p>
            <div className="tw:flex tw:items-baseline tw:gap-1">
              <span className="tw:text-2xl tw:font-extrabold tw:text-brown-900 tw:font-serif">
                {item.value}
              </span>
              <span className="tw:text-[0.7rem] tw:font-medium tw:text-brown-500">{item.unit}</span>
            </div>
            <p className="tw:text-[0.7rem] tw:text-brown-600/90 tw:italic">{item.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
