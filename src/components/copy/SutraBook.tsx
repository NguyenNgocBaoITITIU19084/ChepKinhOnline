"use client";

import { useEffect, useEffectEvent, useMemo, useRef, useState, type CSSProperties } from "react";
import Link from "next/link";
import { IconCheck, IconChevronLeft, IconChevronRight, IconMinus, IconPlus, IconRefresh } from "@tabler/icons-react";
import { LotusLogo } from "@/components/brand/LotusLogo";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { isContinued, paginate, type PageRange } from "@/lib/paginate";
import { matchCopy, type CopyProgress, type SutraChapter } from "@/lib/sutra";
import { useCopySession } from "@/stores/copy-session";
import { useCopySettings } from "@/stores/copy-settings";
import { BookCover } from "./BookCover";
import { BookPage } from "./BookPage";
import styles from "./copy.module.css";

const FLIP_MS = 900;
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

// Thanh chờ cao đúng một dòng chữ, đặt thay cho số liệu lúc chưa tải xong
function SkeletonText({ width }: { width: string }) {
  return <span className={`${styles.skeleton} ${styles.skeletonText}`} style={{ width }} aria-hidden />;
}

type Props = {
  slug: string;
  title: string;
  chapters: SutraChapter[];
};

export function SutraBook({ slug, title, chapters }: Props) {
  const session = useCopySession();
  const { fontSize, showGuide, setFontSize } = useCopySettings();
  const isSpread = useMediaQuery("(min-width: 1024px)");
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const [flip, setFlip] = useState<Flip | null>(null);
  // null: mặt sách đi theo con trỏ; số: vị trí chữ đầu trang người dùng lật về xem lại
  const [browse, setBrowse] = useState<number | null>(null);
  // Mở bìa: đã đo xong trang lần đầu thì mới mở, mở xong thì gỡ bìa
  const [paginated, setPaginated] = useState(false);
  const [coverGone, setCoverGone] = useState(false);
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

  const ready = session.slug === slug;
  const isOpen = ready && paginated;
  // Ô thông tin chỉ hiện số thật khi đã lấy lại tiến độ/cỡ chữ đã lưu và chia trang xong;
  // trước đó hiện thanh chờ thay vì số mặc định (tránh "Phần 1/4 · 0%" rồi nhảy sang số thật)
  const panelReady = isOpen;
  // Giảm chuyển động: không có hiệu ứng nên bỏ bìa ngay khi mở
  const showCover = !coverGone && !(isOpen && reducedMotion);
  // Mở xong (hoặc bỏ qua hiệu ứng): gỡ hết animation/clip của sân khấu, sách đứng yên ở trạng thái cuối
  const opened = coverGone || (isOpen && reducedMotion);

  // Máy bật "Giảm chuyển động": không lật 3D, sách hiện ra nhẹ nhàng thay vì bật cái bụp
  useEffect(() => {
    if (opened && reducedMotion) {
      bookRef.current?.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 400, easing: "ease-out" });
    }
  }, [opened, reducedMotion]);
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
        const next = paginate(text, box, styles.verse, styles.continued);
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
    flipTimer.current = setTimeout(() => setFlip(null), FLIP_MS);
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
    <div className={styles.stage}>
      <section className={styles.bookArea} aria-label="Sách kinh">
        {/* Lúc đang tải: sách gấp, chỉ thấy bìa. Tải xong: bìa mở sang trái như mở cuốn kinh thật */}
        <div
          className={`${styles.bookStage} ${opened ? styles.stageDone : isOpen ? styles.stageOpen : styles.stageClosed} ${
            isSpread ? styles.stageSpread : ""
          }`}
        >
          <div ref={bookRef} className={`${styles.book} ${isSpread ? styles.bookSpread : styles.bookSingle}`}>
            <div ref={blockRef} className={styles.block}>
              {base.map((p, i) => renderPage(p, isSpread ? (i === 0 ? "left" : "right") : "single", !flip))}
              {isSpread && <div className={styles.gutter} aria-hidden />}

              {/* Trang ẩn cùng khổ để đo xem bao nhiêu chữ thì vừa kín một trang; khung bọc rộng đúng một trang
                để padding % của trang tính theo bề rộng trang như trang thật */}
              <div className={styles.measure} aria-hidden>
                <article className={`${styles.page} ${styles[isSpread ? "page_left" : "page_single"]}`}>
                  <div
                    ref={measureRef}
                    className={styles.pageText}
                    style={{ "--fs": fontSize / 22 } as CSSProperties}
                  />
                </article>
              </div>

              {/* Bóng tờ giấy đổ xuống trang bên dưới khi đang lật, cho cảm giác tờ giấy nhấc lên thật */}
              {leaf && (
                <div
                  key={`shade-${flip!.from}-${flip!.to}`}
                  className={`${styles.flipShade} ${styles[`flipShade_${leaf.side}`]}`}
                  style={{ animationDuration: `${FLIP_MS}ms` }}
                  aria-hidden
                />
              )}

              {leaf && (
                <div
                  key={`${flip!.from}-${flip!.to}`}
                  className={`${styles.leaf} ${styles[`leaf_${leaf.side}`]} ${forward ? styles.leafForward : styles.leafBackward}`}
                  style={{ animationDuration: `${FLIP_MS}ms` }}
                  aria-hidden
                >
                  <div className={styles.leafFace}>{renderPage(leaf.front, leaf.side, false)}</div>
                  <div className={`${styles.leafFace} ${styles.leafBack}`}>
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
              className={styles.hiddenInput}
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
              className={`${styles.corner} ${styles.cornerPrev}`}
              onClick={() => turnTo(view * perView - 1)}
              disabled={prevDisabled}
              aria-label="Lật về trang trước"
              title="Trang trước (PageUp)"
            >
              <IconChevronLeft size={16} />
            </button>
            <button
              type="button"
              className={`${styles.corner} ${styles.cornerNext}`}
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
                  className={styles.openLeaf}
                  style={{ "--leaf-delay": `${delay}s`, zIndex: 9 - i } as CSSProperties}
                  aria-hidden
                >
                  <div className={styles.openLeafFront} />
                  <div className={styles.openLeafBack} />
                </div>
              ))}
              {/* Bìa kết thúc sau cùng (các tờ giấy đã hạ xong trước đó): mở xong thì gỡ bìa và các tờ */}
              <div
                className={styles.coverLeaf}
                onAnimationEnd={(e) => {
                  if (e.target === e.currentTarget) setCoverGone(true);
                }}
                aria-hidden
              >
                <div className={styles.coverLeafFront}>
                  <BookCover title={title} />
                </div>
                <div className={styles.coverLeafBack} />
              </div>
            </>
          )}
        </div>

        {allDone && sutraDone && (
          <div className={styles.overlay} role="dialog" aria-modal="true" aria-labelledby="merit-title">
            <div className={`${styles.glass} ${styles.meritCard}`}>
              <LotusLogo size={64} />
              <h2 id="merit-title" className={styles.meritTitle}>
                Công Đức Viên Mãn
              </h2>
              <p className={styles.meritVerse}>
                Nguyện đem công đức này
                <br />
                Hướng về khắp tất cả
                <br />
                Đệ tử và chúng sinh
                <br />
                Đều trọn thành Phật đạo.
              </p>
              <p className={styles.meritNamo}>Nam Mô Bổn Sư Thích Ca Mâu Ni Phật</p>
              <div className={styles.meritActions}>
                <button type="button" className={styles.goldButton} onClick={restartAll}>
                  <IconRefresh size={18} /> Chép lại
                </button>
                <Link href="/" className={styles.ghostButton}>
                  Về trang chủ
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Xong một chương nhưng cả bộ kinh chưa xong: mời chép chương kế */}
        {allDone && !sutraDone && nextChapter !== undefined && (
          <div className={styles.overlay} role="dialog" aria-modal="true" aria-labelledby="chapter-done-title">
            <div className={`${styles.glass} ${styles.meritCard}`}>
              <LotusLogo size={52} />
              <h2 id="chapter-done-title" className={styles.meritTitle}>
                Đã chép xong
              </h2>
              <p className={styles.meritVerse}>{chapter.title}</p>
              <div className={`${styles.meritActions} ${styles.chapterDoneActions}`}>
                <button type="button" className={styles.goldButton} onClick={() => selectChapter(nextChapter)}>
                  Chép tiếp: {chapters[nextChapter].title} <IconChevronRight size={18} />
                </button>
                <button type="button" className={styles.ghostButton} onClick={restartChapter}>
                  <IconRefresh size={18} /> Chép lại chương này
                </button>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Cột phải: tên kinh, tiến độ, công cụ. Màn hình hẹp thì thành thanh gọn phía trên sách */}
      <aside className={`${styles.glass} ${styles.panel}`}>
        <div className={styles.info}>
          <p className={styles.eyebrow}>Đang chép</p>
          <h1 className={styles.titleVi}>{title}</h1>
          {hasChapters && (
            <p className={styles.chapterName}>
              {panelReady ? (
                <>
                  Phần {chapterIndex + 1}/{chapters.length} · {chapter.title}
                </>
              ) : (
                <SkeletonText width="70%" />
              )}
            </p>
          )}
          <div className={styles.progressRow}>
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
            className={styles.progressTrack}
            role="progressbar"
            aria-valuenow={percent}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Tiến độ chép kinh"
          >
            <div className={styles.progressBar} style={{ width: `${panelReady ? percent : 0}%` }} />
          </div>
        </div>

        <div className={styles.tools}>
          <div className={styles.stepper}>
            <span className={styles.toolLabel}>Cỡ chữ</span>
            <button
              type="button"
              className={styles.iconButton}
              onClick={() => setFontSize(fontSize - 2)}
              aria-label="Giảm cỡ chữ"
              title="Giảm cỡ chữ"
            >
              <IconMinus size={18} />
            </button>
            <span className={styles.fontSizeLabel} aria-live="polite">
              {panelReady ? `${Math.round((fontSize / 22) * 100)}%` : <SkeletonText width="2.6em" />}
            </span>
            <button
              type="button"
              className={styles.iconButton}
              onClick={() => setFontSize(fontSize + 2)}
              aria-label="Tăng cỡ chữ"
              title="Tăng cỡ chữ"
            >
              <IconPlus size={18} />
            </button>
          </div>
          <button
            type="button"
            className={styles.toolRow}
            onClick={restartChapter}
            title={hasChapters ? "Chép lại chương này" : "Chép lại từ đầu"}
          >
            <IconRefresh size={18} />
            <span className={styles.toolLabel}>{hasChapters ? "Chép lại chương này" : "Chép lại từ đầu"}</span>
          </button>
        </div>

        {hasChapters && (
          <nav className={styles.toc} aria-label="Mục lục">
            <p className={styles.eyebrow}>Mục lục</p>
            <ol className={styles.tocList}>
              {chapters.map((c, i) => (
                <li key={i}>
                  <button
                    type="button"
                    className={`${styles.tocItem} ${panelReady && i === chapterIndex ? styles.tocActive : ""}`}
                    onClick={() => selectChapter(i)}
                    aria-current={i === chapterIndex ? "true" : undefined}
                  >
                    <span className={styles.tocNo}>{i + 1}</span>
                    <span className={styles.tocTitle}>{c.title}</span>
                    <span className={styles.tocMeta}>
                      {!panelReady ? null : chapterPercents[i] === 100 ? (
                        <IconCheck size={16} aria-label="Đã chép xong" />
                      ) : chapterPercents[i] > 0 ? (
                        `${chapterPercents[i]}%`
                      ) : null}
                    </span>
                  </button>
                </li>
              ))}
            </ol>
            {/* Màn hình hẹp: mục lục gọn thành ô chọn */}
            <select
              className={styles.tocSelect}
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
        <details className={styles.tips}>
          <summary>Cách chép & phím tắt</summary>
          <p>
            Gõ theo chữ mờ, chữ đúng sẽ thấm mực hiện rõ. Không cần gõ dấu câu. Chữ đang gõ hiện phía trên con trỏ, gõ
            sai thì đổi màu báo sai.
          </p>
          <ul className={styles.shortcuts}>
            <li>
              <span>
                <kbd>←</kbd>
                <kbd>→</kbd>
              </span>
              Lật trang
            </li>
            <li>
              <span>
                <kbd>Dấu cách</kbd>
              </span>
              Cách chữ
            </li>
            <li>
              <span>
                <kbd>Enter</kbd>
              </span>
              Xuống dòng (hết câu)
            </li>
            <li>
              <span>
                <kbd>⌫</kbd>
              </span>
              Xóa chữ gõ sai
            </li>
          </ul>
        </details>
      </aside>
    </div>
  );
}
