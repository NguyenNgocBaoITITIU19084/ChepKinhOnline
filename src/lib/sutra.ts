// Nội dung kinh: các trang cách nhau bởi một dòng trống, mỗi câu kinh một dòng
export function splitSutraPages(content: string): string[] {
  return content
    .normalize("NFC")
    .replace(/\r\n/g, "\n")
    .split(/\n\s*\n/)
    .map((page) => page.trim())
    .filter(Boolean);
}

export type SutraChapter = {
  title: string | null; // null: kinh không chia chương
  pages: string[];
};

// Mỗi chương mở đầu bằng một dòng "# Tên chương"; kinh không có dòng nào như vậy là một chương duy nhất
export function splitSutraChapters(content: string): SutraChapter[] {
  const chapters: { title: string | null; lines: string[] }[] = [];
  for (const line of content.normalize("NFC").replace(/\r\n/g, "\n").split("\n")) {
    const heading = line.match(/^#\s+(.+)$/);
    if (heading) {
      chapters.push({ title: heading[1].trim(), lines: [] });
      continue;
    }
    if (chapters.length === 0) chapters.push({ title: null, lines: [] });
    chapters[chapters.length - 1].lines.push(line);
  }
  return chapters
    .map((chapter) => ({ title: chapter.title, pages: splitSutraPages(chapter.lines.join("\n")) }))
    .filter((chapter) => chapter.pages.length > 0);
}

const SKIPPABLE = /[.,;:!?…“”"'()\-–—]/;

const isSpace = (ch: string) => ch === " " || ch === "\n";

function sameChar(typed: string, target: string) {
  // Dấu cách và Enter dùng thay nhau được, cả giữa câu lẫn cuối câu
  if (isSpace(target)) return isSpace(typed);
  return typed.toLocaleLowerCase("vi") === target.toLocaleLowerCase("vi");
}

// Ký tự người dùng không cần gõ: dấu câu và chỗ xuống dòng cuối câu kinh
const isSkippable = (ch: string) => SKIPPABLE.test(ch) || ch === "\n";

export type CopyProgress = {
  matched: number; // số ký tự của bản kinh đã chép đúng
  wrong: number; // số ký tự gõ sai sau vị trí đúng cuối cùng
  rest: string; // phần người dùng gõ sai, hiển thị ngay tại vị trí đang chép
};

/**
 * So khớp phần người dùng đã gõ với bản kinh.
 * Không phân biệt hoa thường, dấu câu được bỏ qua nếu người dùng không gõ.
 * Hết câu thì gõ dấu cách hoặc Enter để xuống dòng; gõ thẳng chữ câu sau cũng được, dấu cách/Enter
 * gõ thừa ở đầu câu mới được bỏ qua.
 */
export function matchCopy(target: string, typed: string): CopyProgress {
  const text = typed.normalize("NFC");
  let i = 0;

  for (let t = 0; t < text.length; t++) {
    const ch = text[t];
    while (i < target.length && isSkippable(target[i]) && !sameChar(ch, target[i])) {
      i++;
    }
    // Đã tự xuống dòng mà người dùng vẫn gõ dấu cách/Enter theo thói quen: bỏ qua
    if (isSpace(ch) && !sameChar(ch, target[i] ?? "") && (i === 0 || target[i - 1] === "\n")) continue;
    if (i < target.length && sameChar(ch, target[i])) {
      i++;
    } else {
      return { matched: i, wrong: text.length - t, rest: text.slice(t) };
    }
  }

  // Dấu câu ngay sau chữ cuối cùng được tính là đã chép.
  // Không tự nhảy qua chỗ xuống dòng: bộ gõ Telex/VNI (Unikey, EVKey, bộ gõ macOS) chỉ chốt một chữ khi
  // gặp dấu cách/Enter. Tự xuống dòng khiến người dùng gõ luôn chữ câu sau, bộ gõ gộp hai chữ làm một
  // ("ngooj" + "ngax" thành "ngoojngax" thay vì "ngộ" "ngã"). Nên chờ người dùng gõ dấu cách/Enter.
  while (i < target.length && SKIPPABLE.test(target[i])) i++;

  return { matched: i, wrong: 0, rest: "" };
}
