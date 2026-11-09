"use client";

import { useEffect, useId, useLayoutEffect, useRef, useState, type KeyboardEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { IconArrowRight, IconCheck, IconChevronDown } from "@tabler/icons-react";
import { HOLY_FIGURES } from "@/data/buddhas";

const GROUPS = [
  { kind: "Đức Phật", label: "Chư Phật" },
  { kind: "Bồ Tát", label: "Chư Bồ Tát" },
] as const;

/** Tên gọn trên nút chọn: bỏ phần đuôi danh hiệu ("Phật", "Bồ Tát"...) */
function shortName(name: string) {
  return name.replace(/ (Mâu Ni Phật|Lưu Ly Quang Như Lai|Phật|Bồ Tát)$/, "");
}

/** Độ trễ cho từng dòng thông tin nổi lên lần lượt (sau khi tranh bắt đầu mở) */
function rise(step: number) {
  return { animationDelay: `${180 + step * 70}ms` };
}

const FOCUS =
  "tw:focus-visible:outline-2 tw:focus-visible:outline-solid tw:focus-visible:outline-gold-500 tw:focus-visible:outline-offset-2";

/**
 * Block "Chư Phật & Bồ Tát" ở trang chủ: bên trái là cột mục lục chữ chia hai nhóm Chư Phật / Chư Bồ Tát
 * (điện thoại: ô chọn), bên phải là tranh lớn treo như tranh cuộn (viền giấy, chỉ vàng) cạnh cột tên chữ Hán dọc
 * và thông tin ngắn: lời giới thiệu, hình tướng nhận biết, ngày vía, hồng danh, bài kinh để chép.
 * Mục lục là tablist dọc: phím mũi tên lên/xuống (hoặc trái/phải), Home, End để chuyển vị theo thứ tự trên màn hình.
 */
export function HolyFiguresBlock() {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const tablistRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<HTMLSpanElement>(null);

  // Đặt nét vàng đúng cạnh tên đang chọn; nét trượt nhờ transition của .ck-index-marker.
  // Đặt lại khi cột mục lục đổi kích thước (font tải xong, đổi bề rộng màn hình).
  useLayoutEffect(() => {
    const list = tablistRef.current;
    const place = () => {
      const tab = tabRefs.current[activeIndex];
      const marker = markerRef.current;
      if (!list || !tab || !marker) return;
      const top = tab.getBoundingClientRect().top - list.getBoundingClientRect().top;
      marker.style.transform = `translateY(${top}px)`;
      marker.style.height = `${tab.offsetHeight}px`;
    };
    place();
    if (!list) return;
    const observer = new ResizeObserver(place);
    observer.observe(list);
    return () => observer.disconnect();
  }, [activeIndex]);
  const figure = HOLY_FIGURES[activeIndex];

  // Thứ tự các nút trên màn hình (Chư Phật trước, Chư Bồ Tát sau): phím mũi tên đi theo thứ tự này
  const visualOrder = GROUPS.flatMap((g) =>
    HOLY_FIGURES.flatMap((f, i) => (f.kind === g.kind ? [i] : [])),
  );

  const select = (index: number) => {
    setActiveIndex(index);
    tabRefs.current[index]?.focus();
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const pos = visualOrder.indexOf(activeIndex);
    const n = visualOrder.length;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") select(visualOrder[(pos + 1) % n]);
    else if (e.key === "ArrowUp" || e.key === "ArrowLeft") select(visualOrder[(pos - 1 + n) % n]);
    else if (e.key === "Home") select(visualOrder[0]);
    else if (e.key === "End") select(visualOrder[n - 1]);
    else return;
    e.preventDefault();
  };

  const groups = GROUPS.map((g) => ({
    ...g,
    members: HOLY_FIGURES.map((f, i) => ({ f, i })).filter(({ f }) => f.kind === g.kind),
  })).filter((g) => g.members.length > 0);

  return (
    <div className="tw:grid tw:grid-cols-[11rem_minmax(0,1fr)] tw:gap-12 tw:items-start tw:upto-1024:grid-cols-[9.5rem_minmax(0,1fr)] tw:upto-1024:gap-8 tw:upto-768:grid-cols-[minmax(0,1fr)] tw:upto-768:gap-6">
      {/* Máy tính: cột mục lục chữ bên trái tranh, như trang mục lục một cuốn kinh.
          Không ảnh, không viền; vị đang chọn chỉ có nét vàng bên trái và chữ đậm. */}
      <div
        role="tablist"
        aria-label="Chọn vị Phật, Bồ Tát"
        aria-orientation="vertical"
        onKeyDown={onKeyDown}
        ref={tablistRef}
        className="tw:relative tw:flex tw:flex-col tw:gap-8 tw:pt-2 tw:upto-768:hidden"
      >
        <span
          ref={markerRef}
          aria-hidden
          className="ck-index-marker tw:absolute tw:left-0 tw:top-0 tw:z-1 tw:w-[2px] tw:h-0 tw:bg-gold-500 tw:rounded-full tw:pointer-events-none"
        />
        {groups.map((group) => (
          <div key={group.kind} role="none" className="tw:flex tw:flex-col tw:gap-3">
            <span aria-hidden className="tw:text-[0.68rem] tw:font-semibold tw:tracking-[0.18em] tw:uppercase tw:text-gold-700">
              {group.label}
            </span>
            <div role="none" className="tw:flex tw:flex-col tw:border-l tw:border-l-[rgba(214,164,64,0.35)]">
              {group.members.map(({ f, i }) => {
                const selected = i === activeIndex;
                return (
                  <button
                    key={f.id}
                    ref={(el) => {
                      tabRefs.current[i] = el;
                    }}
                    type="button"
                    role="tab"
                    id={`holy-tab-${f.id}`}
                    aria-selected={selected}
                    aria-controls="holy-panel"
                    aria-label={f.name}
                    tabIndex={selected ? 0 : -1}
                    onClick={() => setActiveIndex(i)}
                    className={`font-zen-title tw:-ml-px tw:py-1.5 tw:pl-4 tw:pr-1 tw:text-left tw:text-[1rem] tw:leading-[1.4] tw:bg-transparent tw:border-0 tw:border-l-2 tw:border-solid tw:cursor-pointer tw:rounded-r-[6px] tw:[transition:color_0.2s_ease,border-color_0.2s_ease] tw:motion-reduce:transition-none ${FOCUS} ${
                      selected
                        ? "tw:border-l-transparent tw:font-semibold tw:text-brown-900"
                        : "tw:border-l-transparent tw:font-normal tw:text-brown-800 tw:hover:text-brown-900 tw:hover:border-l-[rgba(214,164,64,0.5)]"
                    }`}
                  >
                    {shortName(f.name)}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Điện thoại: một ô chọn gọn, chia nhóm Chư Phật / Chư Bồ Tát.
          Tự dựng thay cho <select> vì danh sách xổ xuống của <select> do hệ điều hành vẽ, không theo được giao diện. */}
      <FigurePicker groups={groups} activeIndex={activeIndex} onChange={setActiveIndex} />

      {/* Tranh và thông tin của vị đang chọn */}
      <div
        id="holy-panel"
        role="tabpanel"
        aria-labelledby={`holy-tab-${figure.id}`}
        className="tw:grid tw:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] tw:gap-12 tw:items-center tw:upto-768:grid-cols-[minmax(0,1fr)] tw:upto-768:gap-8"
      >
        {/* Tranh treo như tranh cuộn: hai thanh trục gỗ, viền giấy ngà, chỉ vàng bên trong.
            Mỗi lần đổi vị, tranh mở cuộn từ trên xuống (.ck-unroll) và thanh trục dưới trượt theo mép tranh.
            Lớp "đặt chỗ" vô hình giữ sẵn chiều cao để cột thông tin bên cạnh không nhảy trong lúc tranh mở. */}
        <figure className="tw:m-0 tw:mx-auto tw:w-full tw:max-w-[400px] tw:upto-560:max-w-[300px]">
          <div className="tw:grid">
            <div aria-hidden className="tw:invisible tw:col-start-1 tw:row-start-1 tw:py-1.5">
              <div className="tw:p-3 tw:border">
                <div className="tw:aspect-[3/4]" />
              </div>
            </div>
            <div
              key={figure.id}
              className="tw:col-start-1 tw:row-start-1 tw:self-start tw:flex tw:flex-col tw:[filter:drop-shadow(0_18px_22px_rgba(120,85,20,0.28))]"
            >
              <span aria-hidden className="tw:relative tw:z-1 tw:h-3 tw:mx-[-14px] tw:rounded-full tw:bg-[linear-gradient(180deg,#8d6315,#5a3d0c)] tw:shadow-[0_2px_4px_rgba(74,50,10,0.35)] tw:-mb-1.5" />
              <div className="ck-unroll">
                <div className="tw:min-h-0 tw:overflow-hidden">
                  <div className="tw:p-3 tw:bg-[#fbf7ec] tw:border tw:border-[rgba(214,164,64,0.45)]">
                    <div className="tw:relative tw:aspect-[3/4] tw:overflow-hidden tw:outline tw:outline-1 tw:outline-[rgba(168,116,26,0.55)] tw:outline-offset-[3px]">
                      <Image
                        src={figure.image.src}
                        alt={figure.image.alt}
                        fill
                        sizes="(max-width: 768px) 90vw, 400px"
                        className="tw:object-cover"
                        style={{ objectPosition: figure.image.position }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <span aria-hidden className="tw:relative tw:z-1 tw:h-3 tw:mx-[-14px] tw:rounded-full tw:bg-[linear-gradient(180deg,#8d6315,#5a3d0c)] tw:shadow-[0_2px_4px_rgba(74,50,10,0.35)] tw:-mt-1.5" />
            </div>
          </div>
          {figure.image.caption && (
            <figcaption className="tw:mt-5 tw:text-center tw:text-[0.78rem] tw:tracking-[0.04em] tw:text-brown-800">
              {figure.image.caption}
            </figcaption>
          )}
        </figure>

        <div
          key={figure.id}
          className="tw:grid tw:grid-cols-[auto_minmax(0,1fr)] tw:gap-x-7 tw:upto-480:grid-cols-[minmax(0,1fr)]"
        >
          {/* Tên chữ Hán dọc, chỉ trang trí */}
          <div
            aria-hidden
            lang="zh-Hant"
            className="ck-brush font-zen-han tw:pr-6 tw:border-r tw:border-r-[rgba(214,164,64,0.45)] tw:text-[1.7rem] tw:leading-none tw:tracking-[0.28em] tw:text-gold-700 tw:[writing-mode:vertical-rl] tw:select-none tw:upto-480:hidden"
          >
            {figure.han}
          </div>

          <div className="tw:flex tw:flex-col tw:gap-5 tw:min-w-0">
            <div className="ck-rise tw:flex tw:flex-col tw:gap-1.5" style={rise(0)}>
              <span className="tw:text-[0.7rem] tw:font-semibold tw:tracking-[0.18em] tw:uppercase tw:text-gold-700">
                {figure.kind}
              </span>
              <h3 className="font-zen-title tw:m-0 tw:text-[clamp(1.6rem,3vw,2.2rem)] tw:font-semibold tw:leading-[1.2] tw:text-brown-900 tw:text-balance">
                {figure.name}
              </h3>
              <p className="tw:m-0 tw:text-[0.88rem] tw:text-brown-800">
                <span className="tw:sr-only">Tên tiếng Phạn: </span>
                <span lang="sa" className="font-zen-title tw:italic">
                  {figure.sanskrit}
                </span>
                <span
                  lang="zh-Hant"
                  className="font-zen-han tw:hidden tw:upto-480:inline"
                >
                  {" · "}
                  {figure.han}
                </span>
              </p>
            </div>

            <p style={rise(1)} className="ck-rise tw:m-0 tw:max-w-[56ch] tw:text-[0.98rem] tw:leading-[1.75] tw:text-brown-800 tw:text-pretty">
              {figure.intro}
            </p>

            <dl style={rise(2)} className="ck-rise tw:m-0 tw:grid tw:grid-cols-[7.5rem_minmax(0,1fr)] tw:gap-x-4 tw:gap-y-2.5 tw:text-[0.9rem] tw:leading-[1.6] tw:upto-480:grid-cols-[minmax(0,1fr)] tw:upto-480:gap-y-1">
              <dt className="tw:font-semibold tw:text-brown-900 tw:upto-480:hidden">Hình tướng</dt>
              <dd className="tw:m-0 tw:text-brown-800 tw:upto-480:hidden">
                {figure.appearance}
              </dd>
              <dt className="tw:font-semibold tw:text-brown-900">Ngày vía</dt>
              <dd className="tw:m-0 tw:text-brown-800 tw:tabular-nums">
                {figure.observance}
              </dd>
            </dl>

            <p style={rise(3)} className="ck-rise font-zen-title tw:m-0 tw:pl-5 tw:border-l tw:border-l-[rgba(214,164,64,0.6)] tw:text-[1.15rem] tw:italic tw:leading-[1.5] tw:text-brown-900">
              {figure.invocation}
            </p>

            {figure.sutra && (
              <div className="ck-rise" style={rise(4)}>
                <Link
                  href={`/chep-kinh/${figure.sutra.slug}`}
                  className="ck-btn-gold"
                >
                  <span>{figure.sutra.label}</span>
                  <IconArrowRight
                    size={18}
                    stroke={2}
                    className="ck-btn-arrow"
                    aria-hidden
                  />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

type FigureGroup = {
  kind: string;
  label: string;
  members: { f: (typeof HOLY_FIGURES)[number]; i: number }[];
};

/**
 * Ô chọn vị trên điện thoại (listbox tự dựng): nút mở giống ô nhập, danh sách là tờ giấy ngà như dropdown header.
 * Bàn phím: mũi tên lên/xuống, Home, End để di chuyển; Enter/Space để chọn; Esc để đóng và quay về nút.
 */
function FigurePicker({
  groups,
  activeIndex,
  onChange,
}: {
  groups: FigureGroup[];
  activeIndex: number;
  onChange: (index: number) => void;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const id = useId();
  const order = groups.flatMap((g) => g.members.map(({ i }) => i));
  const active = groups.flatMap((g) => g.members).find(({ i }) => i === activeIndex)?.f;

  // Mở ra thì đưa focus vào vị đang chọn; bấm ra ngoài thì đóng
  useEffect(() => {
    if (!open) return;
    optionRefs.current[activeIndex]?.focus({ preventScroll: true });
    const onPointer = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    return () => document.removeEventListener("pointerdown", onPointer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const close = () => {
    setOpen(false);
    buttonRef.current?.focus();
  };

  const choose = (index: number) => {
    onChange(index);
    close();
  };

  const onListKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const current = optionRefs.current.indexOf(document.activeElement as HTMLButtonElement);
    const pos = Math.max(0, order.indexOf(current));
    const n = order.length;
    let next: number | undefined;
    if (e.key === "ArrowDown") next = order[(pos + 1) % n];
    else if (e.key === "ArrowUp") next = order[(pos - 1 + n) % n];
    else if (e.key === "Home") next = order[0];
    else if (e.key === "End") next = order[n - 1];
    else if (e.key === "Escape") close();
    else if (e.key === "Tab") setOpen(false);
    else return;
    if (e.key !== "Tab") e.preventDefault();
    if (next !== undefined) optionRefs.current[next]?.focus();
  };

  return (
    <div ref={rootRef} className="tw:hidden tw:upto-768:flex tw:flex-col tw:gap-2">
      <span
        id={`${id}-label`}
        className="tw:text-[0.68rem] tw:font-semibold tw:tracking-[0.18em] tw:uppercase tw:text-gold-700"
      >
        Chọn vị
      </span>
      <div className="tw:relative">
        <button
          ref={buttonRef}
          type="button"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={`${id}-list`}
          aria-labelledby={`${id}-label ${id}-value`}
          onClick={() => setOpen((v) => !v)}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown" || e.key === "ArrowUp") {
              e.preventDefault();
              setOpen(true);
            }
          }}
          className={`ck-font-inherit tw:flex tw:items-center tw:justify-between tw:gap-3 tw:w-full tw:min-h-[46px] tw:pl-4 tw:pr-3.5 tw:text-left tw:text-brown-900 tw:bg-[rgba(255,248,230,0.7)] tw:border tw:border-solid tw:border-[rgba(214,164,64,0.45)] tw:rounded-[10px] tw:cursor-pointer tw:transition-colors tw:duration-200 tw:aria-expanded:border-gold-500 tw:aria-expanded:bg-[rgba(255,248,230,0.95)] ${FOCUS}`}
        >
          <span id={`${id}-value`} className="font-zen-title tw:truncate tw:text-[1rem]">
            {active?.name}
          </span>
          <IconChevronDown
            size={18}
            stroke={1.8}
            aria-hidden
            className={`tw:shrink-0 tw:text-gold-700 tw:transition-transform tw:duration-200 tw:motion-reduce:transition-none ${open ? "tw:rotate-180" : ""}`}
          />
        </button>

        <div
          id={`${id}-list`}
          role="listbox"
          aria-labelledby={`${id}-label`}
          aria-hidden={!open}
          onKeyDown={onListKeyDown}
          className={`ck-menu ck-menu-pop tw:top-[calc(100%+10px)] tw:inset-x-0 ${open ? "ck-menu-open" : ""}`}
        >
          {groups.map((group, gi) => (
            <div key={group.kind} role="group" aria-labelledby={`${id}-g${gi}`}>
              {gi > 0 && <div className="ck-menu-divider" aria-hidden />}
              <div id={`${id}-g${gi}`} className="ck-menu-eyebrow">
                {group.label}
              </div>
              {group.members.map(({ f, i }) => {
                const selected = i === activeIndex;
                return (
                  <button
                    key={f.id}
                    ref={(el) => {
                      optionRefs.current[i] = el;
                    }}
                    type="button"
                    role="option"
                    aria-selected={selected}
                    tabIndex={open ? (selected ? 0 : -1) : -1}
                    onClick={() => choose(i)}
                    className="ck-menu-item ck-menu-item-sm ck-font-inherit tw:min-h-11"
                  >
                    <span
                      className={`ck-menu-text font-zen-title tw:text-[1rem] ${selected ? "tw:font-semibold" : ""}`}
                    >
                      {f.name}
                    </span>
                    {selected && <IconCheck size={16} stroke={2} aria-hidden className="tw:text-gold-700" />}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
