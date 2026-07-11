/**
 * Phiên đăng nhập admin dạng token tự ký: "<expiresMs>.<hmacHex>".
 * Dùng Web Crypto (crypto.subtle) nên chạy được cả Edge runtime (middleware)
 * lẫn Node runtime (route handler). Khóa ký derive từ ADMIN_PASSWORD.
 */

export const SESSION_COOKIE = "admin_session";
export const SESSION_MAX_AGE_S = 60 * 60 * 24 * 7; // 7 ngày

const encoder = new TextEncoder();

const getKey = (secret: string) =>
  crypto.subtle.importKey(
    "raw",
    encoder.encode(`admin-session:${secret}`),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );

const toHex = (buf: ArrayBuffer) =>
  Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

export const createSessionToken = async (secret: string): Promise<string> => {
  const expires = Date.now() + SESSION_MAX_AGE_S * 1000;
  const key = await getKey(secret);
  const sig = await crypto.subtle.sign("HMAC", key, encoder.encode(String(expires)));
  return `${expires}.${toHex(sig)}`;
};

export const verifySessionToken = async (
  token: string | undefined,
  secret: string | undefined,
): Promise<boolean> => {
  if (!token || !secret) return false;

  const dot = token.indexOf(".");
  if (dot === -1) return false;

  const expires = token.slice(0, dot);
  const sigHex = token.slice(dot + 1);
  if (Number(expires) < Date.now() || !/^[0-9a-f]+$/.test(sigHex)) return false;

  const sigBytes = new Uint8Array(
    sigHex.match(/.{2}/g)?.map((h) => parseInt(h, 16)) ?? [],
  );

  const key = await getKey(secret);
  return crypto.subtle.verify("HMAC", key, sigBytes, encoder.encode(expires));
};
