export type CurrentUser = {
  name: string | null;
  email: string;
};

// Chưa có hệ thống đăng nhập: luôn coi là khách.
// Khi lắp auth (Auth.js...), đọc session ở đây để mọi nơi dùng chung.
export async function getCurrentUser(): Promise<CurrentUser | null> {
  return null;
}
