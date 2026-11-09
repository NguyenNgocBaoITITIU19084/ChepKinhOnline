import { BUDDHIST_EVENTS, type BuddhistEvent } from "@/data/buddhist-events";
import { canChiYear, jdFromDate, lunarMonthLength, lunarToSolar, solarToLunar, type SolarDate } from "@/lib/lunar";

const WEEKDAYS = ["Chủ nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"];
const LUNAR_MONTH_NAMES = ["Giêng", "Hai", "Ba", "Tư", "Năm", "Sáu", "Bảy", "Tám", "Chín", "Mười", "Mười Một", "Chạp"];
/** Tên tháng âm lịch chữ Hán: 正月 tháng Giêng, 臘月 tháng Chạp */
const LUNAR_MONTH_HAN = ["正月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "臘月"];

export interface EventOccurrence {
  event: BuddhistEvent;
  solar: SolarDate;
  /** Ngày âm lịch thực làm lễ (ngày 30 gặp tháng thiếu thì là 29) */
  lunarDay: number;
  lunarYear: number;
  daysLeft: number;
  weekday: string;
}

/** "Mùng 8 tháng Hai", "Rằm tháng Bảy", "19 tháng Chín" */
export function lunarDateLabel(day: number, month: number): string {
  const d = day === 15 ? "Rằm" : day <= 10 ? `Mùng ${day}` : `${day}`;
  return `${d} tháng ${LUNAR_MONTH_NAMES[month - 1]}`;
}

export function lunarMonthHan(month: number): string {
  return LUNAR_MONTH_HAN[month - 1];
}

function weekdayOf(d: SolarDate): string {
  return WEEKDAYS[(jdFromDate(d.day, d.month, d.year) + 1) % 7];
}

/** Lần tới (tính cả hôm nay) của từng ngày lễ, xếp theo ngày gần nhất */
export function upcomingEvents(today: SolarDate): EventOccurrence[] {
  const todayJd = jdFromDate(today.day, today.month, today.year);
  const lunarYearNow = solarToLunar(today.day, today.month, today.year).year;

  return BUDDHIST_EVENTS.map((event) => {
    for (const lunarYear of [lunarYearNow, lunarYearNow + 1]) {
      const day = Math.min(event.lunarDay, lunarMonthLength(event.lunarMonth, lunarYear));
      const solar = lunarToSolar(day, event.lunarMonth, lunarYear);
      if (!solar) continue;
      const daysLeft = jdFromDate(solar.day, solar.month, solar.year) - todayJd;
      if (daysLeft >= 0) {
        return { event, solar, lunarDay: day, lunarYear, daysLeft, weekday: weekdayOf(solar) };
      }
    }
    return null;
  })
    .filter((o): o is EventOccurrence => o !== null)
    .sort((a, b) => a.daysLeft - b.daysLeft);
}

/** "mùng 1 tháng Mười năm Bính Ngọ" và Phật lịch (tăng một năm vào ngày Phật Đản, rằm tháng Tư) */
export function todayLabels(today: SolarDate) {
  const l = solarToLunar(today.day, today.month, today.year);
  const afterVesak = l.month > 4 || (l.month === 4 && l.day >= 15);
  return {
    lunar: `${lunarDateLabel(l.day, l.month)}${l.leap ? " (nhuận)" : ""} năm ${canChiYear(l.year)}`,
    buddhistEra: l.year + (afterVesak ? 544 : 543),
  };
}
