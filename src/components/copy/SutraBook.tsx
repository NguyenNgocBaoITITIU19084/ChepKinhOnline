"use client";

import { useEffect, useEffectEvent, useMemo, useRef, useState, type CSSProperties } from "react";
import Link from "next/link";
import {
  IconBook2,
  IconCheck,
  IconChevronLeft,
  IconChevronRight,
  IconFile,
  IconMaximize,
  IconMinimize,
  IconMinus,
  IconPlus,
  IconRefresh,
} from "@tabler/icons-react";
import { LotusLogo } from "@/components/brand/LotusLogo";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { isContinued, paginate, type PageRange } from "@/lib/paginate";
import { matchCopy, type CopyProgress, type SutraChapter } from "@/lib/sutra";
import { useCopySession } from "@/stores/copy-session";
import { useCopySettings } from "@/stores/copy-settings";
import { BookCover } from "./BookCover";
import { BookPage } from "./BookPage";
import * as ui from "./panelClasses";

const FLIP_MS = 900;
// Kiểu tờ giấy: thời gian rút tờ trên cùng ra khỏi chồng giấy
const SHEET_MS = 700;
const PAGE_KEYS = ["ArrowLeft", "ArrowRight", "PageUp", "PageDown"];
// Thời điểm (giây) các tờ giấy bắt đầu lật theo sau bìa khi mở sách.
// Nối sát bìa để tờ cuối hạ xuống cùng lúc bìa mở xong, trang kinh hiện ra ngay không phải chờ.
const OPEN_LEAF_DELAYS = [0.26, 0.38, 0.5];

type Flip = { from: number; to: number };

// Trước khi đo được (lúc render trên server), tạm dùng cách chia trang trong dữ liệu
function initialRanges(pages: string[]): PageRange[] {
  let pos = 0;
  return pages.map((page) => {
    const range = { start: pos, end: pos + page.length };
    pos += page.length + 1;
    return range;
  });
}

// Tên class đầy đủ theo phía trang (src/styles/book.css)
const FLIP_SHADE = { left: "ck-flip-shade-left", right: "ck-flip-shade-right", single: "ck-flip-shade-single" };
const LEAF = { left: "ck-leaf-left", right: "ck-leaf-right", single: "ck-leaf-single" };

// Hộp hoàn thành (chép xong chương / cả bộ kinh)
const overlay =
  "tw:fixed tw:inset-0 tw:z-50 tw:grid tw:place-items-center tw:p-4 tw:bg-[rgba(70,50,15,0.32)] tw:backdrop-blur-[6px] tw:animate-[ck-fade-in_0.5s_ease]";
const meritCard =
  "ck-glass tw:w-full tw:max-w-[420px] tw:py-8 tw:px-7 tw:text-center tw:text-brown-900 tw:bg-transparent tw:bg-[linear-gradient(160deg,#fffdf6,#fbefd0)] tw:animate-[ck-rise_0.6s_cubic-bezier(0.2,0.7,0.2,1)]";
const meritTitle = "tw:mt-3 tw:mx-0 tw:mb-3.5 tw:font-title tw:font-bold tw:text-[1.9rem] tw:text-gold-700";
const meritVerse = "tw:m-0 tw:[font-family:var(--font-book),serif] tw:italic tw:text-[1.12rem] tw:leading-[1.8]";
const meritNamo = "tw:mt-3.5 tw:mx-0 tw:mb-[22px] tw:text-[0.9rem] tw:text-gold-700";
const meritActions = "tw:flex tw:flex-wrap tw:justify-center tw:gap-2.5";
const chapterDoneActions = `${meritActions} tw:flex-col tw:items-stretch tw:mt-[18px]`;

// Thanh chờ cao đúng một dòng chữ, đặt thay cho số liệu lúc chưa tải xong
function SkeletonText({ width }: { width: string }) {
  return <span className={ui.skeletonText} style={{ width }} aria-hidden />;
}

type Props = {
  slug: string;
  title: string;
  chapters: SutraChapter[];
};

export function SutraBook({ slug, title, chapters }: Props) {
  const session = useCopySession();
  const { fontSize, showGuide, layout, setFontSize, setLayout } = useCopySettings();
  const sheet = layout === "sheet";
  // Kiểu tờ giấy luôn chỉ một trang, kể cả màn hình rộng
  const isSpread = useMediaQuery("(min-width: 1024px)") && !sheet;
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const [flip, setFlip] = useState<Flip | null>(null);
  // null: mặt sách đi theo con trỏ; số: vị trí chữ đầu trang người dùng lật về xem lại
  const [browse, setBrowse] = useState<number | null>(null);
  // Mở bìa: đã đo xong trang lần đầu thì mới mở, mở xong thì gỡ bìa
  const [paginated, setPaginated] = useState(false);
  const [coverGone, setCoverGone] = useState(false);
  // Toàn màn hình: ẩn header và cột công cụ, sách phóng to giữa màn hình
  const [fullscreen, setFullscreen] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const bookRef = useRef<HTMLDivElement>(null);
  const blockRef = useRef<HTMLDivElement>(null);
  const flipTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  // Lấy lại tiến độ và cỡ chữ đã lưu trong trình duyệt (tải lại trang không mất chữ đã chép), rồi mở bộ kinh
  useEffect(() => {
    let cancelled = false;
    Promise.all([useCopySession.persist.rehydrate(), useCopySettings.persist.rehydrate()]).then(() => {
      if (!cancelled) useCopySession.getState().start(slug, chapters.length);
    });
    return () => {
      cancelled = true;
    };
  }, [slug, chapters.length]);

  useEffect(() => () => clearTimeout(flipTimer.current), []);

  // Thoát toàn màn hình bằng Esc của trình duyệt thì cũng bỏ chế độ toàn màn hình của trang
  useEffect(() => {
    const onChange = () => {
      if (!document.fullscreenElement) setFullscreen(false);
    };
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  // Máy không hỗ trợ toàn màn hình thật (iPhone): sách vẫn phủ kín trang, Esc để thoát
  useEffect(() => {
    if (!fullscreen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !document.fullscreenElement) setFullscreen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [fullscreen]);

  const ready = session.slug === slug;
  const isOpen = ready && paginated;
  // Ô thông tin chỉ hiện số thật khi đã lấy lại tiến độ/cỡ chữ đã lưu và chia trang xong;
  // trước đó hiện thanh chờ thay vì số mặc định (tránh "Phần 1/4 · 0%" rồi nhảy sang số thật)
  const panelReady = isOpen;
  // Giảm chuyển động hoặc kiểu tờ giấy (không có bìa): bỏ bìa ngay khi mở
  const skipCover = reducedMotion || sheet;
  // Kiểu tờ giấy không có bìa cả lúc đang tải: chỉ hiện tờ giấy trắng
  const showCover = !coverGone && !sheet && !(isOpen && reducedMotion);
  // Mở xong (hoặc bỏ qua hiệu ứng): gỡ hết animation/clip của sân khấu, sách đứng yên ở trạng thái cuối
  const opened = coverGone || (isOpen && skipCover);

  // Không có hiệu ứng mở bìa: sách/tờ giấy hiện ra nhẹ nhàng thay vì bật cái bụp
  useEffect(() => {
    if (opened && skipCover) {
      bookRef.current?.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 400, easing: "ease-out" });
    }
  }, [opened, skipCover]);
  const chapterIndex = ready ? Math.min(session.chapter, chapters.length - 1) : 0;
  const chapter = chapters[chapterIndex];
  const hasChapters = chapters.length > 1;

  // Mỗi chương là một dòng chữ liên tục; trang chỉ là cách cắt dòng chữ đó
  const chapterTexts = useMemo(() => chapters.map((c) => c.pages.join("\n")), [chapters]);
  const text = chapterTexts[chapterIndex];
  const [ranges, setRanges] = useState<PageRange[]>(() => initialRanges(chapters[0].pages));

  // Tiến độ từng chương cho mục lục
  const chapterPercents = useMemo(
    () =>
      chapterTexts.map((t, i) =>
        Math.round((matchCopy(t, (ready && session.typed[i]) || "").matched / t.length) * 100),
      ),
    [chapterTexts, ready, session.typed],
  );
  const sutraDone = chapterPercents.every((p) => p === 100);

  // Vào trang là gõ được ngay: ô nhập bị tắt khi chưa sẵn sàng nên autoFocus không ăn, focus lại khi bật
  useEffect(() => {
    if (ready) inputRef.current?.focus();
  }, [ready, chapterIndex]);

  // Chia lại trang mỗi khi đổi cỡ chữ, khổ màn hình hoặc font tải xong: chữ luôn trải kín trang
  useEffect(() => {
    const box = measureRef.current;
    if (!box) return;
    let frame = 0;
    const run = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const next = paginate(text, box, "ck-verse", "ck-continued");
        if (next) {
          setRanges(next);
          setPaginated(true);
        }
      });
    };
    run();
    const observer = new ResizeObserver(run);
    observer.observe(box);
    document.fonts.ready.then(run);
    document.fonts.addEventListener("loadingdone", run);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      document.fonts.removeEventListener("loadingdone", run);
    };
  }, [text, fontSize, isSpread]);

  const typed = (ready && session.typed[chapterIndex]) || "";
  const progress: CopyProgress = useMemo(() => matchCopy(text, typed), [text, typed]);
  // Chữ đang gõ dở (sau dấu cách/Enter cuối cùng), hiện trong ô nổi phía trên con trỏ
  const currentWord = typed.normalize("NFC").split(/\s/).pop() ?? "";
  const allDone = progress.matched === text.length;
  const percent = Math.round((progress.matched / text.length) * 100);

  // Trang chứa vị trí chữ thứ `pos` (vị trí ngắt giữa hai trang tính cho trang trước)
  const pageOf = (pos: number) => {
    const i = ranges.findIndex((r) => pos <= r.end);
    return i === -1 ? ranges.length - 1 : i;
  };

  const perView = isSpread ? 2 : 1;
  const caretPage = pageOf(progress.matched);
  const caretView = Math.floor(caretPage / perView);
  const lastView = Math.max(0, Math.ceil(ranges.length / perView) - 1);
  const view = browse === null ? caretView : Math.min(Math.floor(pageOf(browse) / perView), lastView);
  const pagesOf = (v: number) =>
    Array.from({ length: perView }, (_, i) => v * perView + i).map((p) => (p < ranges.length ? p : null));

  const animateTo = (nextView: number) => {
    if (nextView === view) return;
    // Giảm chuyển động: đổi trang bằng hiệu ứng mờ dần ngắn thay cho lật 3D
    if (reducedMotion) {
      blockRef.current?.animate([{ opacity: 0.3 }, { opacity: 1 }], { duration: 280, easing: "ease-out" });
      return;
    }
    clearTimeout(flipTimer.current);
    setFlip({ from: view, to: nextView });
    flipTimer.current = setTimeout(() => setFlip(null), sheet ? SHEET_MS : FLIP_MS);
  };

  // Lật xem trang trước/sau (xem lại hoặc đọc trước); gõ tiếp thì sách tự lật về trang đang chép
  const turnTo = (page: number) => {
    if (page < 0 || page >= ranges.length) return;
    const nextView = Math.min(Math.floor(page / perView), lastView);
    animateTo(nextView);
    setBrowse(nextView === caretView ? null : ranges[nextView * perView].start);
    inputRef.current?.focus();
  };

  const handleType = (value: string) => {
    session.setTyped(value);
    // Chép tới trang ở mặt sách khác thì lật tới đó (kể cả khi đang lật về xem lại)
    animateTo(Math.floor(pageOf(matchCopy(text, value).matched) / perView));
    setBrowse(null);
  };

  const selectChapter = (next: number) => {
    if (next === chapterIndex) return;
    session.setChapter(next);
    setRanges(initialRanges(chapters[next].pages));
    clearTimeout(flipTimer.current);
    setFlip(null);
    setBrowse(null);
  };

  // Chép lại chương đang mở (kinh không chia chương thì là cả bài)
  const restartChapter = () => {
    session.setTyped("");
    setBrowse(null);
    inputRef.current?.focus();
  };

  const toggleFullscreen = () => {
    if (fullscreen) {
      if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
      setFullscreen(false);
    } else {
      setFullscreen(true);
      if (document.fullscreenEnabled) stageRef.current?.requestFullscreen().catch(() => {});
    }
    inputRef.current?.focus();
  };

  // Chép lại cả bộ kinh từ chương đầu
  const restartAll = () => {
    session.reset(slug, chapters.length);
    setRanges(initialRanges(chapters[0].pages));
    setBrowse(null);
  };

  // Chương chưa xong kế tiếp (vòng lại từ đầu), để mời chép tiếp
  const nextChapter = chapters
    .map((_, i) => (chapterIndex + 1 + i) % chapters.length)
    .find((i) => chapterPercents[i] < 100);

  const renderPage = (p: number | null, side: "left" | "right" | "single", interactive = true) => {
    const range = p === null ? null : ranges[p];
    const pageText = range ? text.slice(range.start, range.end) : undefined;
    return (
      <BookPage
        key={`${side}-${p}`}
        index={p}
        text={pageText}
        continued={!!range && isContinued(text, range.start)}
        runsOn={!!range && text[range.end] === " "}
        progress={
          range && pageText !== undefined
            ? {
                matched: Math.min(Math.max(progress.matched - range.start, 0), pageText.length),
                wrong: p === caretPage ? progress.wrong : 0,
                rest: p === caretPage ? progress.rest : "",
              }
            : undefined
        }
        currentWord={p === caretPage ? currentWord : ""}
        active={interactive && p === caretPage && !allDone}
        fontSize={fontSize}
        showGuide={showGuide}
        side={side}
      />
    );
  };

  const prevDisabled = view === 0 || !!flip;
  const nextDisabled = view >= lastView || !!flip;

  // Phím lật trang: ← / PageUp về trước, → / PageDown về sau. Trả về true nếu đã xử lý phím.
  const handlePageKey = (key: string) => {
    if ((key === "ArrowRight" || key === "PageDown") && !nextDisabled) {
      turnTo((view + 1) * perView);
      return true;
    }
    if ((key === "ArrowLeft" || key === "PageUp") && !prevDisabled) {
      turnTo(view * perView - 1);
      return true;
    }
    return PAGE_KEYS.includes(key);
  };
  // Bộ nghe phím toàn trang đăng ký một lần nhưng luôn dùng trạng thái lật trang mới nhất
  const onPageKey = useEffectEvent(handlePageKey);

  // Lỡ bấm ra ngoài (cột công cụ, nền...) thì gõ phím vẫn vào trang sách, không cần bấm lại
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const input = inputRef.current;
      const target = e.target as HTMLElement;
      if (!input || input.disabled || target === input || e.metaKey || e.ctrlKey || e.altKey) return;
      if (target.closest("input, textarea, select, [contenteditable]")) return;
      // Mũi tên trái/phải lật trang cả khi đang bấm ở cột công cụ, menu...
      if (PAGE_KEYS.includes(e.key)) {
        if (onPageKey(e.key)) e.preventDefault();
        return;
      }
      // Dấu cách trên nút/liên kết là để bấm nút đó
      if (e.key === " " && target.closest("button, a")) return;
      if (e.key.length === 1 || e.key === "Backspace" || e.key === "Process") input.focus();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  // Khi đang lật: lớp dưới là các trang "lộ ra", tờ đang lật nằm phía trên
  const forward = flip ? flip.to > flip.from : true;
  let base: (number | null)[];
  let leaf: {
    front: number | null;
    back: number | null;
    side: "left" | "right" | "single";
  } | null = null;
  if (!flip) {
    base = pagesOf(view);
  } else if (isSpread) {
    const [fromL, fromR] = pagesOf(flip.from);
    const [toL, toR] = pagesOf(flip.to);
    base = forward ? [fromL, toR] : [toL, fromR];
    leaf = forward ? { front: fromR, back: toL, side: "right" } : { front: fromL, back: toR, side: "left" };
  } else {
    base = forward ? pagesOf(flip.to) : pagesOf(flip.from);
    leaf = { front: forward ? flip.from : flip.to, back: null, side: "single" };
  }

  return (
    <div ref={stageRef} className={`ck-stage ${fullscreen ? "ck-stage-fullscreen ck-scene-bg" : ""}`}>
      {/* Toàn màn hình: thanh nhỏ ở góc thay cho cột công cụ, xem tiến độ và thoát */}
      {fullscreen && (
        <div className="ck-glass tw:fixed tw:top-3 tw:right-3 tw:z-45 tw:flex tw:items-center tw:gap-1 tw:py-0.5 tw:pr-0.5 tw:pl-3.5 tw:rounded-xl">
          <span className="tw:text-[0.8rem] tw:tabular-nums tw:text-brown-800">
            Trang {caretPage + 1}/{ranges.length} · {percent}%
          </span>
          <button
            type="button"
            className={ui.iconButton}
            onClick={toggleFullscreen}
            aria-label="Thoát toàn màn hình"
            title="Thoát toàn màn hình (Esc)"
          >
            <IconMinimize size={18} />
          </button>
        </div>
      )}
      <section className={`ck-book-area ${sheet ? "ck-area-sheet" : ""}`} aria-label="Sách kinh">
        {/* Lúc đang tải: sách gấp, chỉ thấy bìa. Tải xong: bìa mở sang trái như mở cuốn kinh thật */}
        <div
          className={`ck-book-stage ${opened ? "ck-stage-done" : isOpen ? "ck-stage-open" : "ck-stage-closed"} ${
            isSpread ? "ck-stage-spread" : ""
          } ${sheet ? "ck-stage-sheet" : ""}`}
        >
          <div
            ref={bookRef}
            className={`ck-book ${isSpread ? "ck-book-spread" : "ck-book-single"} ${sheet ? "ck-book-sheet" : ""}`}
          >
            <div ref={blockRef} className="ck-block">
              {base.map((p, i) => renderPage(p, isSpread ? (i === 0 ? "left" : "right") : "single", !flip))}
              {isSpread && <div className="ck-gutter" aria-hidden />}

              {/* Trang ẩn cùng khổ để đo xem bao nhiêu chữ thì vừa kín một trang; khung bọc rộng đúng một trang
                để padding % của trang tính theo bề rộng trang như trang thật */}
              <div className="ck-measure" aria-hidden>
                <article className={`ck-page ${isSpread ? "ck-page-left" : "ck-page-single"}`}>
                  <div
                    ref={measureRef}
                    className="ck-page-text"
                    style={{ "--fs": fontSize / 22 } as CSSProperties}
                  />
                </article>
              </div>

              {/* Bóng tờ giấy đổ xuống trang bên dưới khi đang lật, cho cảm giác tờ giấy nhấc lên thật */}
              {/* Tờ giấy rời: tờ trên cùng được nhấc lên rút sang trái, lộ tờ kế bên dưới;
                lật về trước thì tờ đó đặt lại từ bên trái lên chồng giấy */}
              {leaf && sheet && (
                <div
                  key={`sheet-${flip!.from}-${flip!.to}`}
                  className={`ck-sheet-leaf ${forward ? "ck-sheet-out" : "ck-sheet-in"}`}
                  style={{ animationDuration: `${SHEET_MS}ms` }}
                  aria-hidden
                >
                  {renderPage(leaf.front, "single", false)}
                </div>
              )}

              {leaf && !sheet && (
                <div
                  key={`shade-${flip!.from}-${flip!.to}`}
                  className={`ck-flip-shade ${FLIP_SHADE[leaf.side]}`}
                  style={{ animationDuration: `${FLIP_MS}ms` }}
                  aria-hidden
                />
              )}

              {leaf && !sheet && (
                <div
                  key={`${flip!.from}-${flip!.to}`}
                  className={`ck-leaf ${LEAF[leaf.side]} ${forward ? "ck-leaf-forward" : "ck-leaf-backward"}`}
                  style={{ animationDuration: `${FLIP_MS}ms` }}
                  aria-hidden
                >
                  <div className="ck-leaf-face">{renderPage(leaf.front, leaf.side, false)}</div>
                  <div className="ck-leaf-face ck-leaf-back">
                    {renderPage(
                      leaf.back,
                      leaf.side === "right" ? "left" : leaf.side === "left" ? "right" : "single",
                      false,
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Ô nhập ẩn phủ lên trang sách: người dùng gõ trực tiếp trên sách */}
            <textarea
              ref={inputRef}
              className="ck-hidden-input"
              value={typed}
              onChange={(e) => handleType(e.target.value)}
              onKeyDown={(e) => {
                if (e.nativeEvent.isComposing) return;
                // ← → (và PageUp/PageDown) lật trang thay vì di con trỏ trong ô gõ ẩn
                if (PAGE_KEYS.includes(e.key)) {
                  e.preventDefault();
                  handlePageKey(e.key);
                }
                // Không cho di con trỏ ô gõ ẩn: chữ gõ sau đó sẽ chèn vào giữa phần đã chép
                if (["ArrowUp", "ArrowDown", "Home", "End"].includes(e.key)) e.preventDefault();
              }}
              disabled={!ready || allDone}
              autoFocus
              spellCheck={false}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              aria-label={`Chép kinh trang ${caretPage + 1}: gõ theo chữ mờ trên trang sách`}
            />

            {/* Góc trang để lật như sách thật */}
            <button
              type="button"
              className="ck-corner ck-corner-prev"
              onClick={() => turnTo(view * perView - 1)}
              disabled={prevDisabled}
              aria-label="Lật về trang trước"
              title="Trang trước (PageUp)"
            >
              <IconChevronLeft size={16} />
            </button>
            <button
              type="button"
              className="ck-corner ck-corner-next"
              onClick={() => turnTo((view + 1) * perView)}
              disabled={nextDisabled}
              aria-label="Lật sang trang sau"
              title="Trang sau (PageDown)"
            >
              <IconChevronRight size={16} />
            </button>
          </div>

          {showCover && (
            <>
              {/* Vài tờ giấy lật theo sau bìa, nối đuôi nhau như mở sách thật */}
              {OPEN_LEAF_DELAYS.map((delay, i) => (
                <div
                  key={i}
                  className="ck-open-leaf"
                  style={{ "--leaf-delay": `${delay}s`, zIndex: 9 - i } as CSSProperties}
                  aria-hidden
                >
                  <div className="ck-open-leaf-front" />
                  <div className="ck-open-leaf-back" />
                </div>
              ))}
              {/* Bìa kết thúc sau cùng (các tờ giấy đã hạ xong trước đó): mở xong thì gỡ bìa và các tờ */}
              <div
                className="ck-cover-leaf"
                onAnimationEnd={(e) => {
                  if (e.target === e.currentTarget) setCoverGone(true);
                }}
                aria-hidden
              >
                <div className="ck-cover-leaf-front">
                  <BookCover title={title} />
                </div>
                <div className="ck-cover-leaf-back" />
              </div>
            </>
          )}
        </div>

        {allDone && sutraDone && (
          <div className={overlay} role="dialog" aria-modal="true" aria-labelledby="merit-title">
            <div className={meritCard}>
              <LotusLogo size={64} />
              <h2 id="merit-title" className={meritTitle}>
                Công Đức Viên Mãn
              </h2>
              <p className={meritVerse}>
                Nguyện đem công đức này
                <br />
                Hướng về khắp tất cả
                <br />
                Đệ tử và chúng sinh
                <br />
                Đều trọn thành Phật đạo.
              </p>
              <p className={meritNamo}>Nam Mô Bổn Sư Thích Ca Mâu Ni Phật</p>
              <div className={meritActions}>
                <button type="button" className="ck-btn-gold" onClick={restartAll}>
                  <IconRefresh size={18} /> Chép lại
                </button>
                <Link href="/" className="ck-btn-ghost">
                  Về trang chủ
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Xong một chương nhưng cả bộ kinh chưa xong: mời chép chương kế */}
        {allDone && !sutraDone && nextChapter !== undefined && (
          <div className={overlay} role="dialog" aria-modal="true" aria-labelledby="chapter-done-title">
            <div className={meritCard}>
              <LotusLogo size={52} />
              <h2 id="chapter-done-title" className={meritTitle}>
                Đã chép xong
              </h2>
              <p className={meritVerse}>{chapter.title}</p>
              <div className={chapterDoneActions}>
                <button type="button" className="ck-btn-gold" onClick={() => selectChapter(nextChapter)}>
                  Chép tiếp: {chapters[nextChapter].title} <IconChevronRight size={18} />
                </button>
                <button type="button" className="ck-btn-ghost" onClick={restartChapter}>
                  <IconRefresh size={18} /> Chép lại chương này
                </button>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Cột phải: tên kinh, tiến độ, công cụ. Màn hình hẹp thì thành thanh gọn phía trên sách */}
      {/* Toàn màn hình: chỉ còn cuốn sách ở giữa */}
      <aside className={fullscreen ? `${ui.panel} tw:hidden!` : ui.panel}>
        <div className={ui.info}>
          <p className={ui.eyebrow}>Đang chép</p>
          <h1 className={ui.titleVi}>{title}</h1>
          {hasChapters && (
            <p className={ui.chapterName}>
              {panelReady ? (
                <>
                  Phần {chapterIndex + 1}/{chapters.length} · {chapter.title}
                </>
              ) : (
                <SkeletonText width="70%" />
              )}
            </p>
          )}
          <div className={ui.progressRow}>
            {panelReady ? (
              <>
                <span>
                  Trang {caretPage + 1}/{ranges.length}
                </span>
                <span>{percent}%</span>
              </>
            ) : (
              <>
                <SkeletonText width="4.5em" />
                <SkeletonText width="2.5em" />
              </>
            )}
          </div>
          <div
            className={ui.progressTrack}
            role="progressbar"
            aria-valuenow={percent}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Tiến độ chép kinh"
          >
            <div className={ui.progressBar} style={{ width: `${panelReady ? percent : 0}%` }} />
          </div>
        </div>

        <div className={ui.tools}>
          <div className={ui.stepper}>
            <span className={`${ui.toolLabel} tw:flex-1`}>Cỡ chữ</span>
            <button
              type="button"
              className={ui.iconButton}
              onClick={() => setFontSize(fontSize - 2)}
              aria-label="Giảm cỡ chữ"
              title="Giảm cỡ chữ"
            >
              <IconMinus size={18} />
            </button>
            <span className={ui.fontSizeLabel} aria-live="polite">
              {panelReady ? `${Math.round((fontSize / 22) * 100)}%` : <SkeletonText width="2.6em" />}
            </span>
            <button
              type="button"
              className={ui.iconButton}
              onClick={() => setFontSize(fontSize + 2)}
              aria-label="Tăng cỡ chữ"
              title="Tăng cỡ chữ"
            >
              <IconPlus size={18} />
            </button>
          </div>
          <button
            type="button"
            className={ui.toolRow}
            onClick={restartChapter}
            title={hasChapters ? "Chép lại chương này" : "Chép lại từ đầu"}
          >
            <IconRefresh size={18} />
            <span className={ui.toolLabel}>{hasChapters ? "Chép lại chương này" : "Chép lại từ đầu"}</span>
          </button>
          <button
            type="button"
            className={ui.toolRow}
            onClick={() => setLayout(sheet ? "book" : "sheet")}
            title={sheet ? "Chép kiểu sách mở" : "Chép kiểu tờ giấy"}
          >
            {sheet ? <IconBook2 size={18} /> : <IconFile size={18} />}
            <span className={ui.toolLabel}>{sheet ? "Kiểu sách mở" : "Kiểu tờ giấy"}</span>
          </button>
          <button type="button" className={ui.toolRow} onClick={toggleFullscreen} title="Toàn màn hình">
            <IconMaximize size={18} />
            <span className={ui.toolLabel}>Toàn màn hình</span>
          </button>
        </div>

        {hasChapters && (
          <nav className={ui.toc} aria-label="Mục lục">
            <p className={ui.eyebrow}>Mục lục</p>
            <ol className={ui.tocList}>
              {chapters.map((c, i) => {
                const active = panelReady && i === chapterIndex;
                return (
                <li key={i}>
                  <button
                    type="button"
                    className={active ? ui.tocItemActive : ui.tocItem}
                    onClick={() => selectChapter(i)}
                    aria-current={i === chapterIndex ? "true" : undefined}
                  >
                    <span className={active ? ui.tocNoActive : ui.tocNo}>{i + 1}</span>
                    <span className={ui.tocTitle}>{c.title}</span>
                    <span className={ui.tocMeta}>
                      {!panelReady ? null : chapterPercents[i] === 100 ? (
                        <IconCheck size={16} aria-label="Đã chép xong" />
                      ) : chapterPercents[i] > 0 ? (
                        `${chapterPercents[i]}%`
                      ) : null}
                    </span>
                  </button>
                </li>
                );
              })}
            </ol>
            {/* Màn hình hẹp: mục lục gọn thành ô chọn */}
            <select
              className={ui.tocSelect}
              value={chapterIndex}
              onChange={(e) => selectChapter(Number(e.target.value))}
              aria-label="Chọn chương"
            >
              {chapters.map((c, i) => (
                <option key={i} value={i}>
                  {i + 1}. {c.title}
                  {chapterPercents[i] === 100 ? " ✓" : ""}
                </option>
              ))}
            </select>
          </nav>
        )}

        {/* Hướng dẫn gập lại cho gọn, cần thì mở */}
        <details className={ui.tips}>
          <summary className={ui.tipsSummary}>Cách chép & phím tắt</summary>
          <p className={ui.tipsText}>
            Gõ theo chữ mờ, chữ đúng sẽ thấm mực hiện rõ. Không cần gõ dấu câu. Chữ đang gõ hiện phía trên con trỏ, gõ
            sai thì đổi màu báo sai.
          </p>
          <ul className={ui.shortcuts}>
            <li className={ui.shortcutRow}>
              <span className={ui.shortcutKeys}>
                <kbd className={ui.kbd}>←</kbd>
                <kbd className={ui.kbd}>→</kbd>
              </span>
              Lật trang
            </li>
            <li className={ui.shortcutRow}>
              <span className={ui.shortcutKeys}>
                <kbd className={ui.kbd}>Dấu cách</kbd>
              </span>
              Cách chữ
            </li>
            <li className={ui.shortcutRow}>
              <span className={ui.shortcutKeys}>
                <kbd className={ui.kbd}>Enter</kbd>
              </span>
              Xuống dòng (hết câu)
            </li>
            <li className={ui.shortcutRow}>
              <span className={ui.shortcutKeys}>
                <kbd className={ui.kbd}>⌫</kbd>
              </span>
              Xóa chữ gõ sai
            </li>
          </ul>
        </details>
      </aside>
    </div>
  );
}
