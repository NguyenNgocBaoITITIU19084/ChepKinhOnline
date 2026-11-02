// Một trang sách là đoạn [start, end) của bản kinh (các câu kinh nối bằng "\n")
export type PageRange = { start: number; end: number };

const escapeHtml = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// Đoạn bắt đầu giữa một câu kinh (câu bị ngắt từ trang trước) thì không thụt đầu dòng
export const isContinued = (text: string, start: number) => start > 0 && text[start - 1] !== "\n";

/**
 * Chia bản kinh thành các trang vừa khít khung chữ `box` (đo thật bằng DOM),
 * nên cỡ chữ nào thì chữ cũng trải kín từng trang. Chỉ ngắt trang ở dấu cách hoặc
 * cuối câu; ký tự ngắt đó nằm giữa hai trang, không thuộc trang nào.
 */
export function paginate(
  text: string,
  box: HTMLElement,
  verseClass: string,
  noIndentClass: string,
): PageRange[] | null {
  if (box.clientHeight === 0 || box.clientWidth === 0) return null;

  // Các vị trí được phép ngắt trang, cộng thêm cuối bản kinh
  const breaks: number[] = [];
  for (let i = 0; i < text.length; i++) if (text[i] === " " || text[i] === "\n") breaks.push(i);
  breaks.push(text.length);

  const fits = (start: number, end: number) => {
    const continued = isContinued(text, start);
    box.innerHTML = text
      .slice(start, end)
      .split("\n")
      .map(
        (line, i) =>
          `<p class="${verseClass}${i === 0 && continued ? ` ${noIndentClass}` : ""}">${escapeHtml(line)}</p>`,
      )
      .join("");
    return box.scrollHeight <= box.clientHeight + 1;
  };

  const ranges: PageRange[] = [];
  let start = 0;
  let first = 0; // chỉ số trong `breaks` của điểm ngắt đầu tiên sau `start`
  while (start < text.length) {
    while (breaks[first] <= start && first < breaks.length - 1) first++;
    // Tìm nhị phân điểm ngắt xa nhất mà đoạn vẫn vừa trang; tối thiểu một từ để luôn tiến lên
    let lo = first;
    let hi = breaks.length - 1;
    while (lo < hi) {
      const mid = Math.ceil((lo + hi) / 2);
      if (fits(start, breaks[mid])) lo = mid;
      else hi = mid - 1;
    }
    const end = breaks[lo];
    ranges.push({ start, end });
    start = end + 1;
  }
  box.innerHTML = "";
  return ranges;
}
