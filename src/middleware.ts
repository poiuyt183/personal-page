import { NextResponse, userAgent } from "next/server";
import type { NextFetchEvent, NextRequest } from "next/server";
import { trackPageView } from "@/lib/analytics/track";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/adminAuth";

export const config = {
  // Chỉ match các trang thật: bỏ qua mọi thứ dưới _next (asset, HMR...),
  // API route, và mọi file tĩnh có đuôi (ảnh, font, favicon...).
  // `missing` chặn prefetch của <Link> ngay từ tầng routing — bắt buộc phải
  // làm ở đây vì Next strip các header này trước khi vào hàm middleware.
  matcher: [
    {
      source: "/((?!_next|api|.*\\..*).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};

const COOKIE_NAME = "aid";
const ONE_YEAR = 60 * 60 * 24 * 365;

const BOT_PATTERN =
  /bot|crawler|spider|crawl|slurp|bingpreview|lighthouse|headless|facebookexternalhit|whatsapp|telegram|preview/i;

// Dedupe ngắn hạn: Next 14.x ở dev mode gọi middleware 2 lần cho cùng một
// navigation (cách nhau vài chục ms). Nhớ các hit gần nhất theo
// visitorId+path và bỏ qua bản trùng trong cửa sổ ngắn.
const DEDUPE_WINDOW_MS = 3_000;
const recentHits = new Map<string, number>();

const isDuplicateHit = (visitorId: string, path: string): boolean => {
  const now = Date.now();
  const key = `${visitorId}:${path}`;

  const last = recentHits.get(key);
  if (last !== undefined && now - last < DEDUPE_WINDOW_MS) return true;

  // Dọn các entry đã quá hạn để map không phình vô hạn
  if (recentHits.size > 500) {
    recentHits.forEach((ts, k) => {
      if (now - ts >= DEDUPE_WINDOW_MS) recentHits.delete(k);
    });
  }

  recentHits.set(key, now);
  return false;
};

const isAdminAuthorized = (req: NextRequest): Promise<boolean> =>
  // Chưa cấu hình ADMIN_PASSWORD thì verify luôn fail → khóa hẳn khu admin
  verifySessionToken(
    req.cookies.get(SESSION_COOKIE)?.value,
    process.env.ADMIN_PASSWORD,
  );

export async function middleware(req: NextRequest, event: NextFetchEvent) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/admin")) {
    const authorized = await isAdminAuthorized(req);

    if (pathname === "/admin/login") {
      // Đã đăng nhập rồi thì khỏi hiện form nữa
      return authorized
        ? NextResponse.redirect(new URL("/admin", req.url))
        : NextResponse.next();
    }

    return authorized
      ? NextResponse.next()
      : NextResponse.redirect(new URL("/admin/login", req.url));
  }

  const res = NextResponse.next();

  let visitorId = req.cookies.get(COOKIE_NAME)?.value;
  const isNewVisitor = !visitorId;
  if (!visitorId) {
    visitorId = crypto.randomUUID();
    res.cookies.set(COOKIE_NAME, visitorId, {
      maxAge: ONE_YEAR,
      httpOnly: true,
      sameSite: "lax",
      path: "/",
    });
  }

  const uaRaw = req.headers.get("user-agent") ?? "";
  const isBot = uaRaw === "" || BOT_PATTERN.test(uaRaw);

  if (!isBot && !isDuplicateHit(visitorId, pathname)) {
    // userAgent() là helper sẵn có của Next (ua-parser-js):
    // device.type chỉ có giá trị với mobile/tablet, undefined nghĩa là desktop
    const { device, os, browser } = userAgent(req);

    // Fire-and-forget: mutation chạy sau khi response đã trả về,
    // trang không bị chậm dù Hygraph có latency
    event.waitUntil(
      trackPageView({
        visitorId,
        path: pathname,
        isNewVisitor,
        deviceType: device.type ?? "desktop",
        os: os.name ?? "Không rõ",
        browser: browser.name ?? "Không rõ",
      }),
    );
  }

  return res;
}
