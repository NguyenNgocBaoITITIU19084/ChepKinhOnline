/**
 * Chuẩn hóa chuỗi tiếng Việt để tìm kiếm không dấu
 */
export function normalizeSearchString(str: string): string {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "d")
    .trim();
}

/**
 * Kiểm tra xem text có chứa query hay không (không phân biệt dấu và hoa thường)
 */
export function searchNormalized(text: string, query: string): boolean {
  if (!query.trim()) return true;
  const normText = normalizeSearchString(text);
  const normQuery = normalizeSearchString(query);
  return normText.includes(normQuery);
}
