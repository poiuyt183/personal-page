import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getLikeStates, toggleLike } from "@/lib/likes";

const VISITOR_COOKIE = "aid";
const ONE_YEAR = 60 * 60 * 24 * 365;

// GET /api/likes?ids=id1,id2 → { [momentId]: { count, liked } }
export async function GET(req: NextRequest) {
  const idsParam = req.nextUrl.searchParams.get("ids") ?? "";
  const ids = idsParam.split(",").filter(Boolean).slice(0, 100);
  if (ids.length === 0) {
    return NextResponse.json({ error: "Thiếu tham số ids" }, { status: 400 });
  }

  try {
    const states = await getLikeStates(
      ids,
      req.cookies.get(VISITOR_COOKIE)?.value,
    );
    return NextResponse.json(states);
  } catch (err) {
    console.error("[likes] GET failed:", err);
    return NextResponse.json(
      { error: "Không tải được lượt thích" },
      { status: 502 },
    );
  }
}

// POST /api/likes { momentId } → { count, liked }
export async function POST(req: NextRequest) {
  let momentId: unknown;
  try {
    ({ momentId } = await req.json());
  } catch {
    return NextResponse.json({ error: "Body không hợp lệ" }, { status: 400 });
  }
  if (typeof momentId !== "string" || !momentId) {
    return NextResponse.json({ error: "Thiếu momentId" }, { status: 400 });
  }

  // Bình thường cookie đã được middleware set từ lượt xem trang đầu tiên;
  // nếu vì lý do nào đó chưa có thì tạo mới tại đây
  let visitorId = req.cookies.get(VISITOR_COOKIE)?.value;
  const needCookie = !visitorId;
  if (!visitorId) visitorId = crypto.randomUUID();

  try {
    const state = await toggleLike(momentId, visitorId);
    const res = NextResponse.json(state);
    if (needCookie) {
      res.cookies.set(VISITOR_COOKIE, visitorId, {
        maxAge: ONE_YEAR,
        httpOnly: true,
        sameSite: "lax",
        path: "/",
      });
    }
    return res;
  } catch (err) {
    console.error("[likes] toggle failed:", err);
    return NextResponse.json(
      { error: "Không xử lý được lượt thích" },
      { status: 502 },
    );
  }
}
