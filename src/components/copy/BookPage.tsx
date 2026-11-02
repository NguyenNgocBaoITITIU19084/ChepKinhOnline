import { useLayoutEffect, useRef, type CSSProperties } from "react";
import type { CopyProgress } from "@/lib/sutra";
import styles from "./copy.module.css";

type Props = {
  index: number | null; // null: trang trắng (mặt sau tờ cuối)
  text?: string;
  continued?: boolean; // trang bắt đầu giữa câu kinh của trang trước
  runsOn?: boolean; // câu cuối trang còn tiếp sang trang sau
  progress?: CopyProgress;
  currentWord?: string; // chữ người dùng đang gõ (sau dấu cách cuối cùng), hiện trong ô nổi
  active?: boolean;
  fontSize: number;
  showGuide: boolean;
  side: "left" | "right" | "single";
};

export function BookPage({
  index,
  text,
  continued = false,
  runsOn = false,
  progress,
  currentWord = "",
  active = false,
  fontSize,
  showGuide,
  side,
}: Props) {
  return (
    <article className={`${styles.page} ${styles[`page_${side}`]}`} aria-hidden={!active}>
      {index !== null && text && progress && (
        <>
          <PageText
            text={text}
            continued={continued}
            runsOn={runsOn}
            progress={progress}
            currentWord={currentWord}
            active={active}
            fontSize={fontSize}
            showGuide={showGuide}
          />
          <footer className={styles.folio}>{index + 1}</footer>
        </>
      )}
    </article>
  );
}

// Bỏ dấu tiếng Việt, đ -> d, không phân biệt hoa thường
const stripMarks = (s: string) =>
  s.normalize("NFD").replace(/\p{M}/gu, "").replace(/[đĐ]/g, "d").toLocaleLowerCase("vi");

type PageTextProps = {
  text: string;
  continued: boolean;
  runsOn: boolean;
  progress: CopyProgress;
  currentWord: string;
  active: boolean;
  fontSize: number;
  showGuide: boolean;
};

function PageText({ text, continued, runsOn, progress, currentWord, active, fontSize, showGuide }: PageTextProps) {
  const lines = text.split("\n");
  // Vị trí bắt đầu của từng câu trong cả trang (+1 cho ký tự xuống dòng)
  const starts = lines.map((_, i) => lines.slice(0, i).reduce((sum, l) => sum + l.length + 1, 0));

  // Gõ tiếng Việt (Telex/VNI) thì chữ hiện ra chưa có dấu trước, vd. "Tai" rồi mới thành "Tại".
  // Phần đầu của chữ đang gõ mà khớp mặt chữ (bỏ dấu đi) được coi là "đang gõ": tô mực nhạt ngay trên
  // chữ kinh và đặt con trỏ sau nó, để con trỏ không lùi về chữ đúng trước đó.
  const { matched, rest } = progress;
  let pendingLen = 0;
  while (
    pendingLen < rest.length &&
    !/\s/.test(rest[pendingLen]) &&
    matched + pendingLen < text.length &&
    stripMarks(rest[pendingLen]) === stripMarks(text[matched + pendingLen])
  ) {
    pendingLen++;
  }
  const caretAt = matched + pendingLen;
  // Cả phần gõ thêm đều khớp mặt chữ: đang gõ dở, chưa báo sai
  const typingWord = pendingLen === rest.length;
  // Đã gõ hết chữ (có dấu cách/Enter sau) mà dấu vẫn sai, vd. gõ "đăc" cho "đắc"
  const wrongMarks = !typingWord && pendingLen > 0 && /\s/.test(rest[pendingLen] ?? "");
  // Ô nổi báo đúng phần sai: sai dấu thì hiện chữ vừa gõ ("ăc") để so với chữ kinh, không hiện chữ gõ tiếp
  // sau đó; sai chữ cái thì hiện phần sai. ␣: gõ dấu cách vào chỗ cần chữ.
  const wrongText = typingWord
    ? ""
    : wrongMarks
      ? rest.slice(0, pendingLen)
      : rest.slice(pendingLen).trim() || rest.trim() || "␣";
  // Ô nổi luôn hiện chữ đang gõ để người dùng thấy mình vừa gõ gì; sai thì đổi sang màu báo sai.
  // Sai lan sang chữ sau (đã gõ dấu cách) thì hiện phần sai thay vì chữ cuối.
  const isWrong = rest !== "" && !typingWord;
  const tipText = isWrong && /\s/.test(rest) ? wrongText : currentWord;
  const showRest = !!tipText;

  // Ô chữ gõ ở gần mép phải (sát gáy sách hoặc mép ngoài) thì dịch sang trái cho nằm gọn trong khung chữ
  const floatRef = useRef<HTMLSpanElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const el = floatRef.current;
    const box = boxRef.current;
    if (!el || !box) return;
    el.style.translate = "";
    const r = el.getBoundingClientRect();
    const b = box.getBoundingClientRect();
    if (r.left < b.left) el.style.translate = `${b.left - r.left}px 0`;
    else if (r.right > b.right) el.style.translate = `${b.right - r.right}px 0`;
  }, [tipText, caretAt, fontSize]);

  // Con trỏ không chiếm chỗ; chữ gõ sai (hoặc đang ghép dấu) nổi phía trên con trỏ
  // để dòng chữ kinh đứng yên, không xô lệch khi gõ
  const cursor = active ? (
    <span className={styles.caret} aria-hidden>
      {showRest && (
        <span ref={floatRef} className={`${styles.typedFloat} ${isWrong ? styles.typedWrong : styles.typedPending}`}>
          {tipText}
        </span>
      )}
    </span>
  ) : null;

  return (
    <div
      ref={boxRef}
      className={`${styles.pageText} ${showGuide ? "" : styles.noGuide}`}
      // Cỡ chữ co giãn theo bề rộng trang; cài đặt cỡ chữ là hệ số nhân (22 = mặc định)
      style={{ "--fs": fontSize / 22 } as CSSProperties}
    >
      {lines.map((line, lineIndex) => {
        const start = starts[lineIndex];
        const chars = Array.from(line);
        return (
          <p
            key={lineIndex}
            className={`${styles.verse} ${lineIndex === 0 && continued ? styles.continued : ""} ${lineIndex === lines.length - 1 && runsOn ? styles.runOn : ""}`}
          >
            {chars.map((ch, i) => {
              const g = start + i;
              return (
                <span key={i}>
                  {g === caretAt && cursor}
                  <span
                    className={
                      g < matched
                        ? styles.ink
                        : g < caretAt
                          ? typingWord
                            ? styles.pending
                            : styles.pendingWrong
                          : styles.ghost
                    }
                  >
                    {ch}
                  </span>
                </span>
              );
            })}
            {caretAt === start + chars.length && cursor}
          </p>
        );
      })}
    </div>
  );
}
