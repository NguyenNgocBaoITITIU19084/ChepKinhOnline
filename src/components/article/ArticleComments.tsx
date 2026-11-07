"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import {
  IconHeart,
  IconMessageCircle,
  IconMessagePlus,
  IconSend,
  IconSparkles,
} from "@tabler/icons-react";
import type { ArticleComment } from "@/types/article";
import { focusable, fontDisplay, paperPanel } from "./styles";
import { cx } from "./utils";

/** Nút tương tác nhỏ dưới bình luận (bỏ kiểu nút mặc định của trình duyệt). */
const actionButton = cx(
  "tw:appearance-none tw:inline-flex tw:items-center tw:gap-1.5 tw:h-8 tw:px-2.5 tw:rounded-full tw:border",
  "tw:text-[0.8rem] tw:font-medium tw:leading-none tw:cursor-pointer tw:transition-colors tw:motion-reduce:transition-none",
  focusable,
);

export interface ArticleCommentsProps {
  articleId: string;
  initialComments?: ArticleComment[];
  className?: string;
}

export function ArticleComments({
  articleId,
  initialComments = [],
  className,
}: ArticleCommentsProps) {
  const [comments, setComments] = useState<ArticleComment[]>(initialComments);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});
  const [successNotice, setSuccessNotice] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedContent = content.trim();

    if (!trimmedName || !trimmedContent) return;

    const newComment: ArticleComment = {
      id: `comment-${Date.now()}`,
      authorName: trimmedName,
      publishedAt: "Vừa xong",
      content: trimmedContent,
      likesCount: 0,
    };

    setComments((prev) => [newComment, ...prev]);
    setName("");
    setContent("");
    setSuccessNotice("Hoan hỷ! Lời cảm ngộ của bạn đã được đăng thành công.");

    setTimeout(() => {
      setSuccessNotice(null);
    }, 4000);
  };

  const handleToggleLike = (commentId: string) => {
    const wasLiked = !!likedMap[commentId];
    setLikedMap((prev) => ({ ...prev, [commentId]: !wasLiked }));
    setComments((prev) =>
      prev.map((c) =>
        c.id === commentId
          ? { ...c, likesCount: wasLiked ? Math.max(0, c.likesCount - 1) : c.likesCount + 1 }
          : c,
      ),
    );
  };

  const handleReply = (authorName: string) => {
    const mention = `@${authorName} `;
    setContent((prev) => (prev.startsWith(mention) ? prev : mention + prev));
    const textarea = document.getElementById("commenter-content") as HTMLTextAreaElement | null;
    if (!textarea) return;
    textarea.scrollIntoView({ behavior: "smooth", block: "center" });
    // Đợi React cập nhật giá trị rồi đặt con trỏ ở cuối
    requestAnimationFrame(() => {
      textarea.focus({ preventScroll: true });
      const end = textarea.value.length;
      textarea.setSelectionRange(end, end);
    });
  };

  return (
    <section
      id="binh-luan"
      aria-label="Cảm ngộ và bình luận"
      className={cx(
        paperPanel,
        "tw:p-8 tw:upto-768:p-5 tw:flex tw:flex-col tw:gap-8",
        className,
      )}
    >
      {/* Tiêu đề mục bình luận */}
      <div className="tw:flex tw:items-center tw:justify-between tw:gap-4 tw:border-b tw:border-b-[rgba(214,164,64,0.3)] tw:pb-4">
        <div className="tw:flex tw:items-center tw:gap-2.5">
          <IconMessageCircle size={22} className="tw:text-gold-700" stroke={2} aria-hidden />
          <h2 className={cx("tw:m-0 tw:text-[1.35rem] tw:font-semibold tw:text-brown-900", fontDisplay)}>
            Cảm ngộ & Bình luận
          </h2>
        </div>
        <span className="tw:text-[0.82rem] tw:font-semibold tw:text-gold-700 tw:bg-[#fff0c2] tw:px-3 tw:py-0.5 tw:rounded-full tw:border tw:border-gold-500/40">
          {comments.length} chia sẻ
        </span>
      </div>

      {/* Thông báo gửi thành công */}
      {successNotice && (
        <div
          role="status"
          className="tw:flex tw:items-center tw:gap-2.5 tw:p-3.5 tw:rounded-xl tw:bg-emerald-50 tw:border tw:border-emerald-300 tw:text-emerald-800 tw:text-[0.9rem]"
        >
          <IconSparkles size={18} className="tw:text-emerald-600 tw:shrink-0" aria-hidden />
          <span>{successNotice}</span>
        </div>
      )}

      {/* Form viết bình luận */}
      <form onSubmit={handleSubmit} className="tw:flex tw:flex-col tw:gap-4">
        <div className="tw:flex tw:flex-col tw:gap-1.5">
          <label htmlFor="commenter-name" className="tw:text-[0.84rem] tw:font-medium tw:text-brown-900">
            Họ tên hoặc Pháp danh <span className="tw:text-red-600">*</span>
          </label>
          <input
            id="commenter-name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ví dụ: Phật tử Diệu Thiện, Cư sĩ Minh Trí..."
            className={cx(
              "tw:w-full tw:h-11 tw:px-3.5 tw:text-[0.92rem] tw:text-brown-900 tw:bg-[rgba(255,255,255,0.7)] tw:border tw:border-[rgba(214,164,64,0.45)] tw:rounded-xl tw:placeholder:text-brown-800/50",
              focusable,
            )}
          />
        </div>

        <div className="tw:flex tw:flex-col tw:gap-1.5">
          <label htmlFor="commenter-content" className="tw:text-[0.84rem] tw:font-medium tw:text-brown-900">
            Lời chia sẻ cảm ngộ của bạn <span className="tw:text-red-600">*</span>
          </label>
          <textarea
            id="commenter-content"
            required
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Chia sẻ bài học tâm đắc hoặc cảm nhận của bạn sau khi đọc bài viết..."
            className={cx(
              "tw:w-full tw:p-3.5 tw:text-[0.92rem] tw:text-brown-900 tw:bg-[rgba(255,255,255,0.7)] tw:border tw:border-[rgba(214,164,64,0.45)] tw:rounded-xl tw:placeholder:text-brown-800/50 tw:resize-y",
              focusable,
            )}
          />
        </div>

        <div className="tw:flex tw:justify-end">
          <button
            type="submit"
            className={cx(
              "tw:inline-flex tw:items-center tw:gap-2 tw:px-6 tw:py-2.5 tw:text-[0.92rem] tw:font-semibold tw:rounded-xl tw:cursor-pointer tw:transition-all",
              "tw:text-brown-900 tw:bg-gradient-to-r tw:from-[#fce089] tw:to-[#e8c77a] tw:border tw:border-gold-500 tw:shadow-[0_4px_12px_rgba(214,164,64,0.25)]",
              "tw:hover:from-[#ffe89e] tw:hover:to-[#ebd08c] tw:hover:shadow-[0_6px_16px_rgba(214,164,64,0.35)]",
              focusable,
            )}
          >
            <IconSend size={16} stroke={2} aria-hidden />
            <span>Gửi cảm ngộ</span>
          </button>
        </div>
      </form>

      {/* Danh sách bình luận */}
      <div className="tw:flex tw:flex-col tw:gap-4 tw:pt-2">
        {comments.length === 0 ? (
          <div className="tw:text-center tw:py-8 tw:text-brown-800 tw:text-[0.92rem]">
            Chưa có bình luận nào. Hãy là người đầu tiên chia sẻ cảm ngộ của bạn!
          </div>
        ) : (
          comments.map((comment) => {
            const isLiked = !!likedMap[comment.id];
            return (
              <article
                key={comment.id}
                className="tw:flex tw:gap-3.5 tw:p-4 tw:rounded-xl tw:bg-[rgba(255,248,230,0.4)] tw:border tw:border-[rgba(214,164,64,0.25)]"
              >
                {/* Avatar thiền vị */}
                <div
                  aria-hidden
                  className="tw:w-10 tw:h-10 tw:rounded-full tw:bg-gradient-to-br tw:from-[#ffe7a3] tw:to-[#d6a440] tw:border tw:border-gold-500 tw:flex tw:items-center tw:justify-center tw:text-brown-900 tw:font-semibold tw:text-[0.95rem] tw:shrink-0 tw:shadow-sm"
                >
                  {comment.authorName.charAt(0).toUpperCase()}
                </div>

                {/* Nội dung bình luận */}
                <div className="tw:flex tw:flex-col tw:gap-1.5 tw:flex-1 tw:min-w-0">
                  <div className="tw:flex tw:items-center tw:justify-between tw:gap-2 tw:flex-wrap">
                    <span className="tw:font-semibold tw:text-[0.94rem] tw:text-brown-900">
                      {comment.authorName}
                    </span>
                    <time className="tw:text-[0.76rem] tw:text-brown-800/80">
                      {comment.publishedAt}
                    </time>
                  </div>

                  <p className="tw:m-0 tw:text-[0.92rem] tw:leading-relaxed tw:text-brown-800 tw:text-pretty">
                    {comment.content}
                  </p>

                  {/* Thanh nút bấm tương tác: Hoan hỷ & Phản hồi */}
                  <div className="tw:flex tw:items-center tw:gap-1 tw:pt-1 tw:-ml-2.5">
                    <button
                      type="button"
                      onClick={() => handleToggleLike(comment.id)}
                      aria-pressed={isLiked}
                      className={cx(
                        actionButton,
                        isLiked
                          ? "tw:text-rose-700 tw:bg-rose-50 tw:border-rose-200 tw:hover:bg-rose-100"
                          : "tw:text-brown-800 tw:bg-transparent tw:border-transparent tw:hover:text-gold-700 tw:hover:bg-[rgba(232,199,122,0.22)]",
                      )}
                    >
                      <IconHeart
                        size={16}
                        stroke={isLiked ? 2.2 : 1.8}
                        className={isLiked ? "tw:fill-rose-500 tw:text-rose-500" : ""}
                        aria-hidden
                      />
                      <span>Hoan hỷ</span>
                      {comment.likesCount > 0 && (
                        <span className="tw:tabular-nums tw:opacity-80">{comment.likesCount}</span>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleReply(comment.authorName)}
                      className={cx(
                        actionButton,
                        "tw:text-brown-800 tw:bg-transparent tw:border-transparent tw:hover:text-gold-700 tw:hover:bg-[rgba(232,199,122,0.22)]",
                      )}
                    >
                      <IconMessagePlus size={16} stroke={1.8} aria-hidden />
                      <span>Phản hồi</span>
                    </button>
                  </div>
                </div>
              </article>
            );
          })
        )}
      </div>
    </section>
  );
}
