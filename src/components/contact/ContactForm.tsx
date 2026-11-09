"use client";

import React, { useState, useSyncExternalStore } from "react";
import { IconSend, IconLoader2, IconAlertCircle } from "@tabler/icons-react";
import { fontDisplay } from "@/components/article/styles";
import { SHEET } from "@/components/contact/styles";
import {
  type ContactCategory,
  type ContactFormData,
  type FormErrors,
  CONTACT_CATEGORIES,
} from "@/types/contact";
import { ContactSuccessAlert } from "@/components/contact/ContactSuccessAlert";

export interface ContactFormProps {
  /** Class tuỳ biến cho vùng chứa biểu mẫu */
  className?: string;
  /** Callback tuỳ chọn khi biểu mẫu gửi thành công */
  onSuccess?: (data: ContactFormData) => void;
}

const INITIAL_FORM_VALUES: ContactFormData = {
  category: "sutra_edit",
  sutraReference: "",
  name: "",
  email: "",
  message: "",
};

/**
 * Biểu mẫu liên hệ dàn như một lá thư trên giấy ngà: ngày viết, lời "Kính gửi", việc cần thưa
 * (bốn lựa chọn ngắn, mỗi cái một chữ Hán trang trí), thân thư trên giấy kẻ dòng, rồi phần ký tên và email hồi âm.
 * Trường bài kinh chỉ mở ra khi việc cần thưa liên quan đến bản kinh.
 */
export function ContactForm({ className = "", onSuccess }: ContactFormProps) {
  const [formData, setFormData] = useState<ContactFormData>(INITIAL_FORM_VALUES);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Kiểm tra xem chủ đề hiện tại có cần hiển thị trường kinh điển không
  const isSutraRelated =
    formData.category === "sutra_edit" || formData.category === "sutra_suggest";

  // Cập nhật giá trị trường dữ liệu và xoá lỗi tương ứng (nếu có)
  const updateField = (field: keyof ContactFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field as keyof FormErrors];
        return next;
      });
    }
  };

  // Chuyển đổi nhóm chủ đề
  const handleCategoryChange = (category: ContactCategory) => {
    setFormData((prev) => ({ ...prev, category }));
    // Nếu chuyển sang nhóm không liên quan kinh văn, xoá lỗi trường kinh điển
    if (
      errors.sutraReference &&
      category !== "sutra_edit" &&
      category !== "sutra_suggest"
    ) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next.sutraReference;
        return next;
      });
    }
  };

  // Kiểm tra tính hợp lệ của toàn bộ biểu mẫu
  const validateForm = (data: ContactFormData): FormErrors => {
    const errs: FormErrors = {};

    // 1. Kiểm tra Họ tên / Pháp danh: Tối thiểu 2 ký tự
    const trimmedName = data.name.trim();
    if (!trimmedName) {
      errs.name = "Xin ghi họ tên hoặc pháp danh";
    } else if (trimmedName.length < 2) {
      errs.name = "Họ tên hoặc pháp danh cần ít nhất 2 ký tự";
    }

    // 2. Kiểm tra Thư điện tử: Bắt buộc và đúng cú pháp email
    const trimmedEmail = data.email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!trimmedEmail) {
      errs.email = "Xin ghi email để Ban biên tập hồi âm";
    } else if (!emailRegex.test(trimmedEmail)) {
      errs.email = "Email chưa đúng dạng, ví dụ: ten@gmail.com";
    }

    // 3. Kiểm tra thông tin bài kinh (nếu liên quan bản kinh)
    if (data.category === "sutra_edit") {
      const trimmedRef = (data.sutraReference || "").trim();
      if (!trimmedRef) {
        errs.sutraReference =
          "Xin ghi tên bài kinh và câu hoặc đoạn bị sai";
      } else if (trimmedRef.length < 3) {
        errs.sutraReference = "Thông tin bài kinh cần ít nhất 3 ký tự";
      }
    } else if (data.category === "sutra_suggest") {
      const trimmedRef = (data.sutraReference || "").trim();
      if (trimmedRef && trimmedRef.length < 3) {
        errs.sutraReference = "Tên kinh đề xuất cần ít nhất 3 ký tự";
      }
    }

    // 4. Kiểm tra Nội dung lời nhắn: Tối thiểu 10 ký tự
    const trimmedMessage = data.message.trim();
    if (!trimmedMessage) {
      errs.message = "Xin viết nội dung thư";
    } else if (trimmedMessage.length < 10) {
      errs.message =
        "Nội dung thư cần ít nhất 10 ký tự";
    }

    return errs;
  };

  // Xử lý gửi biểu mẫu (mock submission với độ trễ 1000ms)
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formErrors = validateForm(formData);

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      // Giả lập trễ mạng 1000ms
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.info("[Contact Form] Submitted:", formData);
      setIsSubmitted(true);
      onSuccess?.(formData);
    } catch (err) {
      console.error("[Contact Form] Submit error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Đặt lại biểu mẫu về trạng thái ban đầu
  const handleReset = () => {
    setFormData(INITIAL_FORM_VALUES);
    setErrors({});
    setIsSubmitting(false);
    setIsSubmitted(false);
  };

  // Gửi xong: thay lá thư bằng lời cảm ơn
  if (isSubmitted) {
    return (
      <ContactSuccessAlert
        name={formData.name.trim()}
        email={formData.email.trim()}
        onReset={handleReset}
        className={className}
      />
    );
  }

  return (
    <div className={`${SHEET} ${className}`.trim()}>
      <form onSubmit={handleSubmit} noValidate className="tw:flex tw:flex-col tw:gap-8">
        {/* Đầu thư: ngày viết bên phải, lời kính gửi bên trái */}
        <div className="tw:flex tw:flex-col tw:gap-5">
          <LetterDate />
          <h2 className={`${fontDisplay} tw:m-0 tw:text-[1.35rem] tw:font-semibold tw:italic tw:leading-[1.35] tw:text-brown-900`}>
            Kính gửi Ban biên tập Chép Kinh Online,
          </h2>
        </div>

        {/* Việc cần thưa: radio gốc, nhãn đầy đủ, không cắt chữ */}
        <fieldset className="tw:m-0 tw:p-0 tw:border-0 tw:min-w-0">
          <legend className={LABEL}>Thư này về việc</legend>
          <div className="tw:grid tw:grid-cols-2 tw:gap-2.5 tw:mt-3 tw:upto-480:grid-cols-1">
            {CONTACT_CATEGORIES.map((cat) => {
              const isSelected = formData.category === cat.id;
              return (
                <label
                  key={cat.id}
                  className={`tw:grid tw:grid-cols-[2.25rem_minmax(0,1fr)] tw:items-center tw:gap-3 tw:p-2.5 tw:rounded-[10px] tw:border tw:cursor-pointer tw:[transition:background-color_0.2s_ease,border-color_0.2s_ease] tw:motion-reduce:transition-none tw:has-focus-visible:outline-2 tw:has-focus-visible:outline-solid tw:has-focus-visible:outline-gold-500 tw:has-focus-visible:outline-offset-2 ${
                    isSelected
                      ? "tw:bg-[#fff0c2] tw:border-gold-500"
                      : "tw:bg-[rgba(255,248,230,0.55)] tw:border-[rgba(214,164,64,0.35)] tw:hover:bg-[rgba(232,199,122,0.3)]"
                  }`}
                >
                  <input
                    type="radio"
                    name="category"
                    value={cat.id}
                    checked={isSelected}
                    onChange={() => handleCategoryChange(cat.id)}
                    className="tw:sr-only"
                  />
                  {/* Chữ Hán trong ô vuông viền vàng như con dấu nhỏ */}
                  <span
                    aria-hidden
                    lang="zh-Hant"
                    className={`font-zen-han tw:grid tw:place-items-center tw:w-9 tw:h-9 tw:rounded-[6px] tw:border tw:text-[1.1rem] tw:leading-none ${
                      isSelected
                        ? "tw:border-gold-700 tw:text-brown-900 tw:bg-[rgba(255,252,243,0.8)]"
                        : "tw:border-[rgba(214,164,64,0.5)] tw:text-gold-700"
                    }`}
                  >
                    {cat.han}
                  </span>
                  <span className={`tw:min-w-0 tw:text-[0.92rem] tw:leading-[1.4] tw:text-brown-900 ${isSelected ? "tw:font-semibold" : "tw:font-medium"}`}>
                    {cat.label}
                  </span>
                </label>
              );
            })}
          </div>
        </fieldset>

        {/* Trường điều kiện: Tên bài kinh & Vị trí câu/đoạn */}
        <div
          className={`tw:grid tw:transition-[grid-template-rows,opacity] tw:duration-300 tw:ease-out tw:motion-reduce:transition-none ${
            isSutraRelated
              ? "tw:grid-rows-[1fr] tw:opacity-100"
              : "tw:grid-rows-[0fr] tw:opacity-0 tw:pointer-events-none tw:-mt-8"
          }`}
        >
          <div className="tw:min-h-0 tw:overflow-hidden tw:px-1 tw:-mx-1">
            <div className="tw:flex tw:flex-col tw:gap-1 tw:pt-1 tw:pb-1">
              <label htmlFor="contact-sutra-reference" className={LABEL}>
                {formData.category === "sutra_edit" ? "Bài kinh và câu cần sửa" : "Tên bài kinh đề xuất"}
                {formData.category === "sutra_suggest" && <span className={OPTIONAL}> (không bắt buộc)</span>}
              </label>
              <input
                id="contact-sutra-reference"
                name="sutraReference"
                type="text"
                tabIndex={isSutraRelated ? undefined : -1}
                aria-hidden={!isSutraRelated}
                value={formData.sutraReference || ""}
                onChange={(e) => updateField("sutraReference", e.target.value)}
                placeholder={
                  formData.category === "sutra_edit"
                    ? "Chú Đại Bi, câu 12"
                    : "Kinh Kim Cang, bản HT. Trí Quang dịch"
                }
                aria-invalid={Boolean(errors.sutraReference)}
                aria-describedby={errors.sutraReference ? "sutra-ref-error" : undefined}
                className={lineInput(Boolean(errors.sutraReference))}
              />
              {errors.sutraReference && <FieldError id="sutra-ref-error">{errors.sutraReference}</FieldError>}
            </div>
          </div>
        </div>

        {/* Thân thư trên giấy kẻ dòng */}
        <div className="tw:flex tw:flex-col tw:gap-1">
          <label htmlFor="contact-message" className={LABEL}>
            Nội dung thư
          </label>
          <textarea
            id="contact-message"
            name="message"
            rows={7}
            value={formData.message}
            onChange={(e) => updateField("message", e.target.value)}
            placeholder="Viết điều bạn muốn thưa ở đây…"
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "message-error" : "message-hint"}
            className={`tw:w-full tw:m-0 tw:px-1 tw:py-0 tw:resize-y tw:min-h-[10.5rem] tw:font-[family-name:var(--font-book),Georgia,serif] tw:text-[1.02rem] tw:leading-[2.1rem] tw:text-ink tw:placeholder:text-[rgba(120,95,55,0.6)] tw:placeholder:italic tw:border-0 tw:rounded-none tw:[background:repeating-linear-gradient(180deg,transparent_0,transparent_calc(2.1rem_-_1px),var(--rule)_calc(2.1rem_-_1px),var(--rule)_2.1rem)] tw:[background-attachment:local] tw:focus:outline-none tw:focus-visible:outline-2 tw:focus-visible:outline-solid tw:focus-visible:outline-gold-500 tw:focus-visible:outline-offset-4 ${
              errors.message ? "tw:[--rule:rgba(180,83,9,0.55)]" : "tw:[--rule:rgba(214,164,64,0.4)]"
            }`}
          />
          {errors.message ? (
            <FieldError id="message-error">{errors.message}</FieldError>
          ) : (
            <p id="message-hint" className="tw:m-0 tw:mt-1 tw:text-[0.78rem] tw:text-brown-800">
              Ít nhất 10 ký tự.
            </p>
          )}
        </div>

        {/* Phần ký tên */}
        <div className="tw:flex tw:flex-col tw:gap-5 tw:pt-2">
          <p className={`${fontDisplay} tw:m-0 tw:text-[1.02rem] tw:italic tw:text-brown-900`}>Kính thư,</p>
          <div className="tw:grid tw:grid-cols-2 tw:gap-x-8 tw:gap-y-5 tw:upto-640:grid-cols-1">
            <div className="tw:flex tw:flex-col tw:gap-1">
              <label htmlFor="contact-name" className={LABEL}>
                Họ tên hoặc pháp danh
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                autoComplete="name"
                value={formData.name}
                onChange={(e) => updateField("name", e.target.value)}
                placeholder="Diệu Âm"
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "name-error" : undefined}
                className={lineInput(Boolean(errors.name))}
              />
              {errors.name && <FieldError id="name-error">{errors.name}</FieldError>}
            </div>

            <div className="tw:flex tw:flex-col tw:gap-1">
              <label htmlFor="contact-email" className={LABEL}>
                Email nhận hồi âm
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                value={formData.email}
                onChange={(e) => updateField("email", e.target.value)}
                placeholder="ten@example.com"
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "email-error" : undefined}
                className={lineInput(Boolean(errors.email))}
              />
              {errors.email && <FieldError id="email-error">{errors.email}</FieldError>}
            </div>
          </div>
        </div>

        {/* Cuối thư: ghi chú riêng tư và nút gửi */}
        <div className="tw:flex tw:items-center tw:justify-between tw:gap-6 tw:pt-6 tw:border-t tw:border-t-[rgba(214,164,64,0.35)] tw:upto-640:flex-col-reverse tw:upto-640:items-stretch tw:upto-640:gap-4">
          <p className="tw:m-0 tw:text-[0.8rem] tw:leading-[1.6] tw:text-brown-800 tw:upto-640:text-center">
            Email chỉ dùng để hồi âm.
          </p>
          <button
            type="submit"
            disabled={isSubmitting}
            className="ck-btn-gold tw:cursor-pointer tw:shrink-0 tw:justify-center tw:min-h-[44px] tw:px-6 tw:disabled:opacity-75 tw:disabled:cursor-wait"
          >
            {isSubmitting ? (
              <>
                <IconLoader2 size={18} className="tw:animate-spin tw:motion-reduce:animate-none" aria-hidden />
                <span>Đang gửi thư…</span>
              </>
            ) : (
              <>
                <IconSend size={18} aria-hidden />
                <span>Gửi thư</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

/** Ngày viết thư, theo giờ máy người đọc. Lúc prerender chưa có ngày nên để trống, giữ nguyên chiều cao dòng. */
const noopSubscribe = () => () => {};
function formatToday() {
  const d = new Date();
  return `Ngày ${d.getDate()} tháng ${d.getMonth() + 1} năm ${d.getFullYear()}`;
}
function LetterDate() {
  const text = useSyncExternalStore(noopSubscribe, formatToday, () => "");
  return (
    <p className="tw:m-0 tw:self-end tw:min-h-[1.5em] tw:text-[0.82rem] tw:italic tw:text-brown-800 tw:font-[family-name:var(--font-book),Georgia,serif]">
      {text}
    </p>
  );
}

const LABEL = "tw:block tw:text-[0.84rem] tw:font-semibold tw:text-brown-900";
const OPTIONAL = "tw:font-normal tw:text-brown-800";

/** Ô nhập một dòng: chỉ có gạch chân như dòng kẻ trên thư. */
function lineInput(hasError: boolean) {
  return `tw:w-full tw:m-0 tw:px-1 tw:py-2 tw:bg-transparent tw:border-0 tw:border-b tw:rounded-none tw:text-[1rem] tw:text-ink tw:placeholder:text-[rgba(120,95,55,0.6)] tw:placeholder:italic tw:font-[family-name:var(--font-book),Georgia,serif] tw:[transition:border-color_0.2s_ease] tw:motion-reduce:transition-none tw:focus:outline-none tw:focus-visible:outline-2 tw:focus-visible:outline-solid tw:focus-visible:outline-gold-500 tw:focus-visible:outline-offset-2 ${
    hasError
      ? "tw:border-b-[var(--ink-wrong)]"
      : "tw:border-b-[rgba(168,116,26,0.45)] tw:hover:border-b-gold-700 tw:focus:border-b-gold-700"
  }`;
}

/** Báo lỗi: màu ink-wrong kèm biểu tượng, không chỉ đổi màu. */
function FieldError({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <p id={id} role="alert" className="tw:flex tw:items-start tw:gap-1.5 tw:m-0 tw:mt-1.5 tw:text-[0.8rem] tw:font-medium tw:leading-[1.5] tw:text-[var(--ink-wrong)]">
      <IconAlertCircle size={15} className="tw:shrink-0 tw:mt-[2px]" aria-hidden />
      <span>{children}</span>
    </p>
  );
}
