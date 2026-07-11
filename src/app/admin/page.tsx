import type { Metadata } from "next";
import Link from "next/link";
import {
  IconEye,
  IconUsers,
  IconUserPlus,
  IconClock,
  IconDeviceDesktop,
  IconDeviceMobile,
  IconDeviceTablet,
  IconDeviceUnknown,
  IconFlame,
  IconHistory,
  IconAlertTriangle,
} from "@tabler/icons-react";
import { getPageViews, type PageView } from "@/lib/analytics/getPageViews";
import LogoutButton from "@/components/admin/LogoutButton";
import AutoRefresh from "@/components/admin/AutoRefresh";

export const metadata: Metadata = { title: "Admin | Analytics" };
export const dynamic = "force-dynamic";

const TIMEZONE = "Asia/Ho_Chi_Minh";
const DAYS_SHOWN = 14;

/* ---------- Tổng hợp dữ liệu ---------- */

const dayKey = (iso: string) =>
  new Date(iso).toLocaleDateString("sv-SE", { timeZone: TIMEZONE }); // YYYY-MM-DD

const hourOf = (iso: string) =>
  Number(
    new Intl.DateTimeFormat("en-GB", {
      hour: "numeric",
      hour12: false,
      timeZone: TIMEZONE,
    }).format(new Date(iso)),
  ) % 24;

const buildStats = (views: PageView[]) => {
  const todayKey = dayKey(new Date().toISOString());

  // Lượt xem theo ngày (14 ngày gần nhất, kể cả ngày trống)
  const byDay: { label: string; key: string; count: number }[] = [];
  for (let i = DAYS_SHOWN - 1; i >= 0; i--) {
    const d = new Date(Date.now() - i * 86_400_000);
    const key = dayKey(d.toISOString());
    byDay.push({
      key,
      label: d.toLocaleDateString("vi-VN", {
        day: "numeric",
        month: "numeric",
        timeZone: TIMEZONE,
      }),
      count: 0,
    });
  }
  const dayIndex = new Map(byDay.map((d, i) => [d.key, i]));

  const byHour = Array.from({ length: 24 }, () => 0);
  const pathCounts = new Map<string, number>();
  const deviceCounts = new Map<string, number>();
  const browserCounts = new Map<string, number>();
  // views đã sort DESC theo visitedAt → bản ghi đầu gặp là lần cuối ghé,
  // bản ghi sau cùng là lần đầu ghé
  const visitorMap = new Map<
    string,
    { views: number; lastSeen: string; firstSeen: string }
  >();

  for (const v of views) {
    const di = dayIndex.get(dayKey(v.visitedAt));
    if (di !== undefined) byDay[di].count++;
    byHour[hourOf(v.visitedAt)]++;
    pathCounts.set(v.path, (pathCounts.get(v.path) ?? 0) + 1);

    const device = v.deviceType ?? "không rõ";
    deviceCounts.set(device, (deviceCounts.get(device) ?? 0) + 1);
    const browserKey = v.browser
      ? `${v.browser}${v.os ? ` · ${v.os}` : ""}`
      : "Không rõ";
    browserCounts.set(browserKey, (browserCounts.get(browserKey) ?? 0) + 1);

    const visitor = visitorMap.get(v.visitorId);
    if (visitor) {
      visitor.views++;
      visitor.firstSeen = v.visitedAt;
    } else {
      visitorMap.set(v.visitorId, {
        views: 1,
        lastSeen: v.visitedAt,
        firstSeen: v.visitedAt,
      });
    }
  }

  return {
    totalViews: views.length,
    uniqueVisitors: new Set(views.map((v) => v.visitorId)).size,
    newVisitors: views.filter((v) => v.isNewVisitor).length,
    viewsToday: views.filter((v) => dayKey(v.visitedAt) === todayKey).length,
    byDay,
    byHour,
    topPages: Array.from(pathCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8),
    recent: views.slice(0, 12),
    // Sắp theo hoạt động gần nhất, map giữ thứ tự insert (DESC) sẵn rồi
    visitors: Array.from(visitorMap.entries()).slice(0, 30),
    devices: Array.from(deviceCounts.entries()).sort((a, b) => b[1] - a[1]),
    browsers: Array.from(browserCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8),
  };
};

/* ---------- Helpers ---------- */

const DEVICE_META: Record<string, { label: string; icon: React.ReactNode }> = {
  desktop: { label: "Desktop", icon: <IconDeviceDesktop size={15} /> },
  mobile: { label: "Mobile", icon: <IconDeviceMobile size={15} /> },
  tablet: { label: "Tablet", icon: <IconDeviceTablet size={15} /> },
};

const deviceMeta = (key: string) =>
  DEVICE_META[key] ?? {
    label: "Không rõ",
    icon: <IconDeviceUnknown size={15} />,
  };

const formatTime = (iso: string) =>
  new Date(iso).toLocaleString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
    day: "2-digit",
    month: "2-digit",
    timeZone: TIMEZONE,
  });

// Màu định danh ổn định cho mỗi visitor, suy từ hash của id
const visitorHue = (id: string) => {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) % 360;
  return h;
};

/* ---------- UI primitives ---------- */

const CARD =
  "rounded-2xl border border-white/[0.06] bg-gradient-to-b from-white/[0.035] to-white/[0.008]";

const SectionCard = ({
  title,
  meta,
  children,
}: {
  title: string;
  meta?: React.ReactNode;
  children: React.ReactNode;
}) => (
  <section className={`${CARD} p-5`}>
    <div className="mb-4 flex items-baseline justify-between gap-3">
      <h2 className="text-sm font-semibold text-gray-200">{title}</h2>
      {meta && <span className="text-xs text-gray-600">{meta}</span>}
    </div>
    {children}
  </section>
);

const StatCard = ({
  icon,
  label,
  value,
  sub,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  sub?: string;
}) => (
  <div className={`${CARD} group p-5 transition-colors hover:border-primary/20`}>
    <div className="mb-4 flex items-center justify-between">
      <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-500">
        {label}
      </span>
      <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-primary/15 bg-primary/[0.07] text-primary/80 transition-colors group-hover:bg-primary/15 group-hover:text-primary">
        {icon}
      </span>
    </div>
    <p className="text-3xl font-bold tabular-nums tracking-tight text-gray-50">
      {value}
    </p>
    {sub && <p className="mt-1 text-xs text-gray-600">{sub}</p>}
  </div>
);

/* ---------- Charts (SVG, render từ server) ---------- */

const AreaChart = ({ data }: { data: { label: string; count: number }[] }) => {
  const W = 600;
  const H = 190;
  const PAD_X = 6;
  const PAD_TOP = 14;
  const PAD_BOTTOM = 22;

  const max = Math.max(...data.map((d) => d.count), 1);
  const stepX = (W - PAD_X * 2) / (data.length - 1);
  const y = (count: number) =>
    H - PAD_BOTTOM - (count / max) * (H - PAD_TOP - PAD_BOTTOM);

  const points = data.map((d, i) => ({
    x: PAD_X + i * stepX,
    y: y(d.count),
    ...d,
  }));

  const line = points
    .map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`)
    .join(" ");
  const area = `${line} L${points[points.length - 1].x},${H - PAD_BOTTOM} L${points[0].x},${H - PAD_BOTTOM} Z`;

  const gridYs = [0.25, 0.5, 0.75].map(
    (r) => H - PAD_BOTTOM - r * (H - PAD_TOP - PAD_BOTTOM),
  );

  return (
    <div>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full"
        role="img"
        aria-label="Biểu đồ lượt xem theo ngày"
      >
        <defs>
          <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#43d04c" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#43d04c" stopOpacity="0" />
          </linearGradient>
        </defs>

        {gridYs.map((gy) => (
          <line
            key={gy}
            x1={PAD_X}
            x2={W - PAD_X}
            y1={gy}
            y2={gy}
            stroke="rgba(255,255,255,0.05)"
            strokeDasharray="4 6"
          />
        ))}

        <path d={area} fill="url(#areaFill)" />
        <path
          d={line}
          fill="none"
          stroke="#43d04c"
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {points.map((p) => (
          <g key={p.label} className="group/dot">
            <circle
              cx={p.x}
              cy={p.y}
              r="10"
              fill="transparent"
              className="cursor-default"
            >
              <title>{`${p.label}: ${p.count} lượt xem`}</title>
            </circle>
            <circle
              cx={p.x}
              cy={p.y}
              r="3"
              fill="#0e0e11"
              stroke="#43d04c"
              strokeWidth="1.5"
              className="pointer-events-none"
            />
          </g>
        ))}
      </svg>
      <div className="mt-1 flex justify-between px-1 text-[10px] text-gray-600">
        <span>{data[0]?.label}</span>
        <span>{data[Math.floor(data.length / 2)]?.label}</span>
        <span>{data[data.length - 1]?.label}</span>
      </div>
    </div>
  );
};

const HourBars = ({ data }: { data: number[] }) => {
  const max = Math.max(...data, 1);
  return (
    <div>
      <div className="flex h-40 items-end gap-[3px]">
        {data.map((count, h) => (
          <div
            key={h}
            className="group relative flex flex-1 flex-col items-center justify-end self-stretch"
          >
            <div
              className="w-full rounded-sm bg-gradient-to-t from-primary/25 to-primary/70 transition-all group-hover:to-primary"
              style={{
                height: `${Math.max((count / max) * 100, count > 0 ? 5 : 2)}%`,
                opacity: count > 0 ? 1 : 0.25,
              }}
            />
            <span className="pointer-events-none absolute -top-6 z-10 hidden whitespace-nowrap rounded-md border border-white/[0.08] bg-[#1a1a1e] px-1.5 py-0.5 text-[10px] text-gray-200 group-hover:block">
              {h}h · {count}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-1.5 flex justify-between text-[10px] text-gray-600">
        <span>0h</span>
        <span>6h</span>
        <span>12h</span>
        <span>18h</span>
        <span>23h</span>
      </div>
    </div>
  );
};

/* ---------- Page ---------- */

const AdminPage = async () => {
  let views: PageView[];
  try {
    views = await getPageViews();
  } catch (err) {
    return (
      <div className="mx-auto max-w-2xl py-16">
        <div className={`${CARD} border-red-500/20 p-6`}>
          <div className="mb-3 flex items-center gap-2 text-red-300">
            <IconAlertTriangle size={18} />
            <h1 className="font-semibold">Không tải được dữ liệu</h1>
          </div>
          <p className="mb-3 break-all font-mono text-xs text-red-300/80">
            {err instanceof Error ? err.message : String(err)}
          </p>
          <p className="text-sm text-gray-500">
            Kiểm tra model <code className="text-gray-400">PageView</code> trên
            Hygraph và env{" "}
            <code className="text-gray-400">HYGRAPH_MUTATION_ENDPOINT</code>,{" "}
            <code className="text-gray-400">HYGRAPH_MUTATION_TOKEN</code>.
          </p>
        </div>
      </div>
    );
  }

  const stats = buildStats(views);

  return (
    <div className="space-y-5">
      {/* Heading */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-50">
            Tổng quan
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Số liệu truy cập website · múi giờ Việt Nam
          </p>
        </div>
        <div className="flex items-center gap-2">
          <AutoRefresh />
          <LogoutButton />
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          icon={<IconEye size={16} />}
          label="Page views"
          value={stats.totalViews}
          sub={`${stats.viewsToday} lượt hôm nay`}
        />
        <StatCard
          icon={<IconUsers size={16} />}
          label="Khách truy cập"
          value={stats.uniqueVisitors}
          sub="visitor id duy nhất"
        />
        <StatCard
          icon={<IconUserPlus size={16} />}
          label="Khách mới"
          value={stats.newVisitors}
          sub="lần đầu ghé site"
        />
        <StatCard
          icon={<IconClock size={16} />}
          label="Hôm nay"
          value={stats.viewsToday}
          sub="page views trong ngày"
        />
      </div>

      {/* Charts */}
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <SectionCard
            title={`Lượt xem ${DAYS_SHOWN} ngày gần nhất`}
            meta={`tổng ${stats.byDay.reduce((s, d) => s + d.count, 0)} lượt`}
          >
            <AreaChart data={stats.byDay} />
          </SectionCard>
        </div>
        <SectionCard title="Theo giờ trong ngày">
          <HourBars data={stats.byHour} />
        </SectionCard>
      </div>

      {/* Devices & Browsers */}
      <div className="grid gap-4 lg:grid-cols-2">
        <SectionCard title="Loại thiết bị">
          {stats.devices.length === 0 ? (
            <p className="text-sm text-gray-600">Chưa có dữ liệu</p>
          ) : (
            <ul className="space-y-3.5">
              {stats.devices.map(([key, count]) => {
                const meta = deviceMeta(key);
                const percent = Math.round((count / stats.totalViews) * 100);
                return (
                  <li key={key} className="flex items-center gap-3 text-sm">
                    <span className="flex w-28 shrink-0 items-center gap-2 text-gray-300">
                      <span className="text-primary/70">{meta.icon}</span>
                      {meta.label}
                    </span>
                    <div className="h-2 min-w-0 flex-1 overflow-hidden rounded-full bg-white/[0.05]">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-primary/50 to-primary"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                    <span className="w-20 shrink-0 text-right text-xs tabular-nums text-gray-400">
                      {count} · {percent}%
                    </span>
                  </li>
                );
              })}
            </ul>
          )}
        </SectionCard>

        <SectionCard title="Trình duyệt & hệ điều hành">
          {stats.browsers.length === 0 ? (
            <p className="text-sm text-gray-600">Chưa có dữ liệu</p>
          ) : (
            <ul className="space-y-3">
              {stats.browsers.map(([key, count]) => (
                <li key={key} className="flex items-center gap-3 text-sm">
                  <span className="min-w-0 flex-1 truncate text-xs text-gray-400">
                    {key}
                  </span>
                  <div className="h-2 w-28 shrink-0 overflow-hidden rounded-full bg-white/[0.05]">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-secondary/40 to-secondary/80"
                      style={{
                        width: `${(count / stats.browsers[0][1]) * 100}%`,
                      }}
                    />
                  </div>
                  <span className="w-8 shrink-0 text-right text-xs tabular-nums text-gray-300">
                    {count}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </SectionCard>
      </div>

      {/* Top pages & Recent */}
      <div className="grid gap-4 lg:grid-cols-2">
        <SectionCard
          title="Trang được xem nhiều"
          meta={
            <span className="inline-flex items-center gap-1">
              <IconFlame size={13} className="text-primary/60" />
              top {stats.topPages.length}
            </span>
          }
        >
          {stats.topPages.length === 0 ? (
            <p className="text-sm text-gray-600">Chưa có dữ liệu</p>
          ) : (
            <ul className="space-y-1">
              {stats.topPages.map(([path, count], i) => (
                <li
                  key={path}
                  className="flex items-center gap-3 rounded-lg px-2 py-1.5 text-sm transition-colors hover:bg-white/[0.03]"
                >
                  <span className="w-5 shrink-0 text-center text-xs font-bold tabular-nums text-gray-600">
                    {i + 1}
                  </span>
                  <span className="min-w-0 flex-1 truncate font-mono text-xs text-gray-300">
                    {path}
                  </span>
                  <div className="h-1.5 w-20 shrink-0 overflow-hidden rounded-full bg-white/[0.05]">
                    <div
                      className="h-full rounded-full bg-primary/60"
                      style={{
                        width: `${(count / stats.topPages[0][1]) * 100}%`,
                      }}
                    />
                  </div>
                  <span className="w-8 shrink-0 text-right text-xs tabular-nums text-gray-200">
                    {count}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </SectionCard>

        <SectionCard
          title="Truy cập gần đây"
          meta={
            <span className="inline-flex items-center gap-1">
              <IconHistory size={13} />
              {stats.recent.length} lượt mới nhất
            </span>
          }
        >
          {stats.recent.length === 0 ? (
            <p className="text-sm text-gray-600">Chưa có dữ liệu</p>
          ) : (
            <ul className="space-y-0.5">
              {stats.recent.map((v, i) => (
                <li
                  key={i}
                  className="flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-xs transition-colors hover:bg-white/[0.03]"
                >
                  <span
                    className="h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{
                      backgroundColor: `hsl(${visitorHue(v.visitorId)} 65% 60%)`,
                    }}
                  />
                  <span className="w-20 shrink-0 tabular-nums text-gray-600">
                    {formatTime(v.visitedAt)}
                  </span>
                  <span className="min-w-0 flex-1 truncate font-mono text-gray-300">
                    {v.path}
                  </span>
                  {v.isNewVisitor && (
                    <span className="shrink-0 rounded-full border border-primary/25 bg-primary/10 px-1.5 py-0.5 text-[10px] font-semibold leading-none text-primary">
                      mới
                    </span>
                  )}
                  <Link
                    href={`/admin/visitors/${v.visitorId}`}
                    className="shrink-0 font-mono text-gray-600 transition-colors hover:text-primary"
                  >
                    {v.visitorId.slice(0, 8)}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </SectionCard>
      </div>

      {/* Visitors table */}
      <SectionCard
        title="Khách truy cập"
        meta={`${stats.uniqueVisitors} visitor`}
      >
        {stats.visitors.length === 0 ? (
          <p className="text-sm text-gray-600">Chưa có dữ liệu</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-[10px] uppercase tracking-wider text-gray-600">
                  <th className="pb-3 pr-4 font-semibold">Visitor</th>
                  <th className="pb-3 pr-4 text-right font-semibold">
                    Lượt xem
                  </th>
                  <th className="pb-3 pr-4 font-semibold">Ghé lần đầu</th>
                  <th className="pb-3 pr-4 font-semibold">Hoạt động cuối</th>
                  <th className="pb-3 font-semibold" />
                </tr>
              </thead>
              <tbody>
                {stats.visitors.map(([id, v]) => (
                  <tr
                    key={id}
                    className="border-t border-white/[0.04] text-gray-400 transition-colors hover:bg-white/[0.02]"
                  >
                    <td className="py-2.5 pr-4">
                      <span className="flex items-center gap-2.5">
                        <span
                          className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-black/80"
                          style={{
                            backgroundColor: `hsl(${visitorHue(id)} 65% 60%)`,
                          }}
                        >
                          {id.slice(0, 2).toUpperCase()}
                        </span>
                        <span className="font-mono text-gray-300">
                          {id.slice(0, 13)}…
                        </span>
                      </span>
                    </td>
                    <td className="py-2.5 pr-4 text-right tabular-nums text-gray-200">
                      {v.views}
                    </td>
                    <td className="py-2.5 pr-4 tabular-nums text-gray-500">
                      {formatTime(v.firstSeen)}
                    </td>
                    <td className="py-2.5 pr-4 tabular-nums text-gray-500">
                      {formatTime(v.lastSeen)}
                    </td>
                    <td className="py-2.5 text-right">
                      <Link
                        href={`/admin/visitors/${id}`}
                        className="rounded-md border border-white/[0.08] px-2 py-1 font-medium text-gray-400 transition-colors hover:border-primary/40 hover:text-primary"
                      >
                        Chi tiết
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </SectionCard>
    </div>
  );
};

export default AdminPage;
