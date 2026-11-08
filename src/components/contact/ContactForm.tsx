"use client";

import React, { useState } from "react";
import { IconSend, IconLoader2, IconAlertCircle } from "@tabler/icons-react";
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
 * Biểu Mẫu Liên Hệ & Đóng Góp Ý Kiến (ContactForm):
 * Cho phép đạo hữu chọn chủ đề phản hồi qua các tag pills, tự động mở rộng trường
 * thông tin bài kinh theo ngữ cảnh, kiểm tra tính hợp lệ và mô phỏng gửi dữ liệu.
 */
export function ContactForm({ className = "", onSuccess }: ContactFormProps) {
  const [formData, setFormData] = useState<ContactFormData>(INITIAL_FORM_VALUES);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Kiểm tra xem chủ đề hiện tại có cần hiển thị trường kinh điển không
  const isSutraRelated =
    formData.category === "sutra_edit" || formData.category === "sutra_suggest";

  const selectedCategoryOption = CONTACT_CATEGORIES.find(
    (c) => c.id === formData.category
  );

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
      errs.name = "Vui lòng nhập họ tên hoặc pháp danh của quý đạo hữu";
    } else if (trimmedName.length < 2) {
      errs.name = "Họ tên hoặc pháp danh cần tối thiểu 2 ký tự";
    }

    // 2. Kiểm tra Thư điện tử: Bắt buộc và đúng cú pháp email
    const trimmedEmail = data.email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!trimmedEmail) {
      errs.email = "Vui lòng nhập địa chỉ email để ban biên tập phản hồi";
    } else if (!emailRegex.test(trimmedEmail)) {
      errs.email = "Địa chỉ email không đúng định dạng (ví dụ: daohu@gmail.com)";
    }

    // 3. Kiểm tra thông tin bài kinh (nếu liên quan bản kinh)
    if (data.category === "sutra_edit") {
      const trimmedRef = (data.sutraReference || "").trim();
      if (!trimmedRef) {
        errs.sutraReference =
          "Vui lòng ghi rõ tên bài kinh và vị trí câu/đoạn phát hiện sai sót";
      } else if (trimmedRef.length < 3) {
        errs.sutraReference = "Thông tin bài kinh cần tối thiểu 3 ký tự";
      }
    } else if (data.category === "sutra_suggest") {
      const trimmedRef = (data.sutraReference || "").trim();
      if (trimmedRef && trimmedRef.length < 3) {
        errs.sutraReference = "Tên kinh điển đề xuất cần tối thiểu 3 ký tự";
      }
    }

    // 4. Kiểm tra Nội dung lời nhắn: Tối thiểu 10 ký tự
    const trimmedMessage = data.message.trim();
    if (!trimmedMessage) {
      errs.message = "Vui lòng nhập nội dung lời nhắn";
    } else if (trimmedMessage.length < 10) {
      errs.message =
        "Nội dung lời nhắn cần tối thiểu 10 ký tự để truyền tải trọn vẹn ý kiến";
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

  // Khi gửi thành công, trượt hiển thị khung cảm tạ hoan hỷ
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
    <div
      className={`ck-glass tw:relative tw:isolate tw:overflow-hidden tw:p-6 tw:sm:p-8 tw:rounded-2xl tw:border tw:border-[rgba(214,164,64,0.35)] tw:shadow-[0_12px_36px_-10px_rgba(150,105,25,0.12)] ${className}`.trim()}
    >
      {/* Vầng hào quang kim mềm mại trang trí góc trên */}
      <div
        className="tw:absolute tw:-top-20 tw:-left-20 tw:w-56 tw:h-56 tw:bg-[radial-gradient(circle,rgba(240,196,100,0.18)_0%,transparent_70%)] tw:pointer-events-none tw:-z-10"
        aria-hidden
      />

      {/* Đầu đề biểu mẫu */}
      <div className="tw:mb-6">
        <div className="tw:flex tw:items-center tw:gap-2 tw:text-gold-700 tw:mb-1.5">
          <span
            className="tw:w-2 tw:h-2 tw:rounded-full tw:bg-gold-500"
            aria-hidden
          />
          <span className="font-zen-body tw:text-[0.72rem] tw:font-semibold tw:tracking-[0.18em] tw:uppercase">
            Gửi Lời Nhắn
          </span>
        </div>
        <h2 className="font-zen-title tw:text-xl tw:sm:text-2xl tw:font-bold tw:text-brown-900 tw:tracking-tight tw:m-0">
          Đóng Góp Ý Kiến & Phản Hồi
        </h2>
        <p className="font-zen-body tw:text-[0.88rem] tw:text-brown-800/80 tw:mt-1.5 tw:mb-0 tw:leading-relaxed">
          Kính mong đạo hữu chia sẻ thiện tâm và phản ánh đóng góp qua biểu mẫu
          dưới đây.
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="tw:flex tw:flex-col tw:gap-5">
        {/* Nhóm Tag Pills chọn chủ đề */}
        <div>
          <label className="font-zen-body tw:text-[0.88rem] tw:font-semibold tw:text-brown-900 tw:block tw:mb-2">
            Chủ đề liên hệ <span className="tw:text-rose-600" aria-hidden>*</span>
          </label>
          <div
            role="radiogroup"
            aria-label="Chủ đề liên hệ"
            className="tw:grid tw:grid-cols-2 tw:sm:grid-cols-4 tw:gap-2.5"
          >
            {CONTACT_CATEGORIES.map((cat) => {
              const isSelected = formData.category === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`tw:cursor-pointer tw:flex tw:flex-col tw:sm:flex-row tw:items-center tw:justify-center tw:gap-1.5 tw:px-3 tw:py-2.5 tw:rounded-xl tw:border tw:text-xs tw:sm:text-[0.84rem] tw:font-medium tw:transition-all tw:duration-200 ${
                    isSelected
                      ? "tw:bg-gold-500 tw:text-white tw:border-gold-600 tw:shadow-[0_2px_8px_rgba(180,130,30,0.28)]"
                      : "tw:bg-[rgba(255,253,248,0.7)] tw:text-brown-800 tw:border-[rgba(214,164,64,0.28)] tw:hover:bg-[rgba(255,253,248,0.95)] tw:hover:border-[rgba(214,164,64,0.45)]"
                  }`}
                >
                  <span className="tw:text-base tw:leading-none" aria-hidden>
                    {cat.emoji}
                  </span>
                  <span className="font-zen-body tw:truncate">{cat.label}</span>
                </button>
              );
            })}
          </div>
          {selectedCategoryOption?.description && (
            <p className="font-zen-body tw:text-xs tw:text-brown-800/75 tw:mt-2 tw:mb-0 tw:italic">
              {selectedCategoryOption.description}
            </p>
          )}
        </div>

        {/* Trường điều kiện: Tên bài kinh & Vị trí câu/đoạn */}
        <div
          className={`tw:grid tw:transition-[grid-template-rows,opacity,margin] tw:duration-300 tw:ease-out ${
            isSutraRelated
              ? "tw:grid-rows-[1fr] tw:opacity-100"
              : "tw:grid-rows-[0fr] tw:opacity-0 tw:pointer-events-none"
          }`}
        >
          <div className="tw:min-h-0 tw:overflow-hidden">
            <div className="tw:flex tw:flex-col tw:gap-1.5 tw:pt-1">
              <label
                htmlFor="contact-sutra-reference"
                className="font-zen-body tw:text-[0.88rem] tw:font-semibold tw:text-brown-900 tw:flex tw:items-center tw:justify-between tw:gap-2"
              >
                <span>
                  {formData.category === "sutra_edit"
                    ? "Tên bài kinh / Vị trí câu hoặc đoạn kinh"
                    : "Tên bài kinh đề xuất"}
                  {formData.category === "sutra_edit" && (
                    <span className="tw:text-rose-600 tw:ml-0.5" aria-hidden>
                      *
                    </span>
                  )}
                </span>
                {formData.category === "sutra_suggest" && (
                  <span className="tw:text-xs tw:font-normal tw:text-brown-800/60 font-zen-body">
                    (Không bắt buộc)
                  </span>
                )}
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
                    ? "Ví dụ: Chú Đại Bi - Câu thứ 12 (phiên âm sai)..."
                    : "Ví dụ: Kinh Kim Cang bản dịch của HT. Thích Trí Quang..."
                }
                aria-invalid={Boolean(errors.sutraReference)}
                aria-describedby={
                  errors.sutraReference ? "sutra-ref-error" : undefined
                }
                className={`tw:w-full tw:px-3.5 tw:py-2.5 tw:rounded-xl font-zen-body tw:text-[0.92rem] tw:text-brown-900 tw:placeholder:text-brown-800/40 tw:transition-all tw:duration-150 tw:focus:outline-none ${
                  errors.sutraReference
                    ? "tw:border tw:border-red-400 tw:bg-[#fff9f8] tw:focus:border-red-500 tw:focus:ring-2 tw:focus:ring-red-400/20"
                    : "tw:border tw:border-[rgba(214,164,64,0.32)] tw:bg-[#fffdf8] tw:hover:border-[rgba(214,164,64,0.55)] tw:focus:border-gold-500 tw:focus:ring-2 tw:focus:ring-gold-500/20"
                }`}
              />
              {errors.sutraReference && (
                <p
                  id="sutra-ref-error"
                  role="alert"
                  className="tw:flex tw:items-center tw:gap-1.5 tw:mt-1 tw:mb-0 tw:text-xs tw:font-medium tw:text-rose-700 font-zen-body"
                >
                  <IconAlertCircle size={14} className="tw:shrink-0" aria-hidden />
                  <span>{errors.sutraReference}</span>
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Cụm 2 cột: Họ tên và Email */}
        <div className="tw:grid tw:grid-cols-1 tw:sm:grid-cols-2 tw:gap-4 tw:sm:gap-5">
          {/* Họ tên hoặc Pháp danh */}
          <div className="tw:flex tw:flex-col tw:gap-1.5">
            <label
              htmlFor="contact-name"
              className="font-zen-body tw:text-[0.88rem] tw:font-semibold tw:text-brown-900 tw:flex tw:items-center tw:gap-1"
            >
              Họ tên hoặc Pháp danh
              <span className="tw:text-rose-600" aria-hidden>
                *
              </span>
            </label>
            <input
              id="contact-name"
              name="name"
              type="text"
              autoComplete="name"
              value={formData.name}
              onChange={(e) => updateField("name", e.target.value)}
              placeholder="Ví dụ: Diệu Âm, Tuệ Tâm..."
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "name-error" : undefined}
              className={`tw:w-full tw:px-3.5 tw:py-2.5 tw:rounded-xl font-zen-body tw:text-[0.92rem] tw:text-brown-900 tw:placeholder:text-brown-800/40 tw:transition-all tw:duration-150 tw:focus:outline-none ${
                errors.name
                  ? "tw:border tw:border-red-400 tw:bg-[#fff9f8] tw:focus:border-red-500 tw:focus:ring-2 tw:focus:ring-red-400/20"
                  : "tw:border tw:border-[rgba(214,164,64,0.32)] tw:bg-[#fffdf8] tw:hover:border-[rgba(214,164,64,0.55)] tw:focus:border-gold-500 tw:focus:ring-2 tw:focus:ring-gold-500/20"
              }`}
            />
            {errors.name && (
              <p
                id="name-error"
                role="alert"
                className="tw:flex tw:items-center tw:gap-1.5 tw:mt-1 tw:mb-0 tw:text-xs tw:font-medium tw:text-rose-700 font-zen-body"
              >
                <IconAlertCircle size={14} className="tw:shrink-0" aria-hidden />
                <span>{errors.name}</span>
              </p>
            )}
          </div>

          {/* Địa chỉ Email */}
          <div className="tw:flex tw:flex-col tw:gap-1.5">
            <label
              htmlFor="contact-email"
              className="font-zen-body tw:text-[0.88rem] tw:font-semibold tw:text-brown-900 tw:flex tw:items-center tw:gap-1"
            >
              Địa chỉ Email
              <span className="tw:text-rose-600" aria-hidden>
                *
              </span>
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              autoComplete="email"
              value={formData.email}
              onChange={(e) => updateField("email", e.target.value)}
              placeholder="daohu@example.com"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "email-error" : undefined}
              className={`tw:w-full tw:px-3.5 tw:py-2.5 tw:rounded-xl font-zen-body tw:text-[0.92rem] tw:text-brown-900 tw:placeholder:text-brown-800/40 tw:transition-all tw:duration-150 tw:focus:outline-none ${
                errors.email
                  ? "tw:border tw:border-red-400 tw:bg-[#fff9f8] tw:focus:border-red-500 tw:focus:ring-2 tw:focus:ring-red-400/20"
                  : "tw:border tw:border-[rgba(214,164,64,0.32)] tw:bg-[#fffdf8] tw:hover:border-[rgba(214,164,64,0.55)] tw:focus:border-gold-500 tw:focus:ring-2 tw:focus:ring-gold-500/20"
              }`}
            />
            {errors.email && (
              <p
                id="email-error"
                role="alert"
                className="tw:flex tw:items-center tw:gap-1.5 tw:mt-1 tw:mb-0 tw:text-xs tw:font-medium tw:text-rose-700 font-zen-body"
              >
                <IconAlertCircle size={14} className="tw:shrink-0" aria-hidden />
                <span>{errors.email}</span>
              </p>
            )}
          </div>
        </div>

        {/* Nội dung lời nhắn */}
        <div className="tw:flex tw:flex-col tw:gap-1.5">
          <label
            htmlFor="contact-message"
            className="font-zen-body tw:text-[0.88rem] tw:font-semibold tw:text-brown-900 tw:flex tw:items-center tw:gap-1"
          >
            Nội dung lời nhắn
            <span className="tw:text-rose-600" aria-hidden>
              *
            </span>
          </label>
          <textarea
            id="contact-message"
            name="message"
            rows={4}
            value={formData.message}
            onChange={(e) => updateField("message", e.target.value)}
            placeholder="Kính bạch quý thầy, ban biên tập Chép Kinh Online..."
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "message-error" : undefined}
            className={`tw:w-full tw:px-3.5 tw:py-2.5 tw:rounded-xl font-zen-body tw:text-[0.92rem] tw:text-brown-900 tw:placeholder:text-brown-800/40 tw:transition-all tw:duration-150 tw:focus:outline-none tw:resize-y ${
              errors.message
                ? "tw:border tw:border-red-400 tw:bg-[#fff9f8] tw:focus:border-red-500 tw:focus:ring-2 tw:focus:ring-red-400/20"
                : "tw:border tw:border-[rgba(214,164,64,0.32)] tw:bg-[#fffdf8] tw:hover:border-[rgba(214,164,64,0.55)] tw:focus:border-gold-500 tw:focus:ring-2 tw:focus:ring-gold-500/20"
            }`}
          />
          <div className="tw:flex tw:items-center tw:justify-between tw:gap-3 tw:mt-0.5">
            {errors.message ? (
              <p
                id="message-error"
                role="alert"
                className="tw:flex tw:items-center tw:gap-1.5 tw:text-xs tw:font-medium tw:text-rose-700 font-zen-body tw:m-0"
              >
                <IconAlertCircle size={14} className="tw:shrink-0" aria-hidden />
                <span>{errors.message}</span>
              </p>
            ) : (
              <span className="tw:text-xs tw:text-brown-800/60 font-zen-body">
                Tối thiểu 10 ký tự
              </span>
            )}
            <span
              className={`tw:text-xs font-zen-body tw:ml-auto ${
                formData.message.trim().length >= 10
                  ? "tw:text-gold-700"
                  : "tw:text-brown-800/50"
              }`}
            >
              {formData.message.length} ký tự
            </span>
          </div>
        </div>

        {/* Nút gửi lời nhắn */}
        <div className="tw:pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="ck-btn-gold tw:cursor-pointer tw:w-full tw:justify-center tw:py-3.5 tw:px-6 tw:rounded-xl tw:text-base tw:font-semibold tw:shadow-md tw:hover:shadow-lg tw:transition-all tw:duration-200 tw:disabled:opacity-75 tw:disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <IconLoader2
                  size={19}
                  className="tw:animate-spin"
                  aria-hidden
                />
                <span>Đang gửi lời nhắn...</span>
              </>
            ) : (
              <>
                <IconSend size={18} aria-hidden />
                <span>Gửi Lời Nhắn Đến Ban Biên Tập</span>
              </>
            )}
          </button>
        </div>

        {/* Lời nhắn nhủ thanh tịnh chân trang */}
        <p className="font-zen-body tw:text-center tw:text-xs tw:text-brown-800/70 tw:m-0 tw:leading-relaxed">
          Mọi lời nhắn gửi về đều được ban biên tập đón nhận bằng tâm thành kính,
          bảo mật thông tin và hồi đáp kịp thời qua thư điện tử.
        </p>
      </form>
    </div>
  );
}
