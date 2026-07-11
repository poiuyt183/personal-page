import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  IconArrowLeft,
  IconEye,
  IconRoute,
  IconCalendar,
  IconStack2,
  IconDeviceDesktop,
  IconDeviceMobile,
  IconDeviceTablet,
  IconDeviceUnknown,
} from "@tabler/icons-react";
import { getPageViews, type PageView } from "@/lib/analytics/getPageViews";
import AutoRefresh from "@/components/admin/AutoRefresh";

export const metadata: Metadata = { title: "Admin | Chi tiết khách" };
export const dynamic = "force-dynamic";

const TIMEZONE = "Asia/Ho_Chi_Minh";
// Hai lượt xem cách nhau quá 30 phút thì tính là phiên mới
const SESSION_GAP_MS = 30 * 60 * 1000;

const CARD =
  "rounded-2xl border border-white/[0.06] bg-gradient-to-b from-white/[0.035] to-white/[0.008]";

type SessionStep = {
  path: string;
  visitedAt: string;
  /** Thời gian dừng ở trang, suy từ lượt xem kế tiếp; null nếu là trang cuối phiên */
  dwellMs: number | null;
};

type Session = { startedAt: string; steps: SessionStep[] };

const buildSessions = (views: PageView[]): Session[] => {
  const asc = [...views].sort(
    (a, b) => new Date(a.visitedAt).getTime() - new Date(b.visitedAt).getTime(),
  );

  const sessions: Session[] = [];
  for (const view of asc) {
    const t = new Date(view.visitedAt).getTime();
    const current = sessions[sessions.length - 1];
    const lastStep = current?.steps[current.steps.length - 1];

    if (!lastStep || t - new Date(lastStep.visitedAt).getTime() > SESSION_GAP_MS) {
      sessions.push({
        startedAt: view.visitedAt,
        steps: [{ path: view.path, visitedAt: view.visitedAt, dwellMs: null }],
      });
    } else {
      lastStep.dwellMs = t - new Date(lastStep.visitedAt).getTime();
      current.steps.push({
        path: view.path,
        visitedAt: view.visitedAt,
        dwellMs: null,
      });
    }
  }
  return sessions.reverse(); // phiên mới nhất lên đầu
};

const formatDateTime = (iso: string) =>
  new Date(iso).toLocaleString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: TIMEZONE,
  });

const formatClock = (iso: string) =>
  new Date(iso).toLocaleTimeString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: TIMEZONE,
  });

const formatDwell = (ms: number | null): string => {
  if (ms === null) return "—";
  const s = Math.round(ms / 1000);
  if (s < 60) return `${s} giây`;
  const m = Math.floor(s / 60);
  return `${m} phút ${s % 60 ? `${s % 60}s` : ""}`.trim();
};

const visitorHue = (id: string) => {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) % 360;
  return h;
};

const DEVICE_ICONS: Record<string, React.ReactNode> = {
  desktop: <IconDeviceDesktop size={14} />,
  mobile: <IconDeviceMobile size={14} />,
  tablet: <IconDeviceTablet size={14} />,
};

const StatChip = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}) => (
  <div className={`${CARD} p-4`}>
    <div className="mb-2 flex items-center gap-1.5 text-gray-500">
      <span className="text-primary/60">{icon}</span>
      <span className="text-[10px] font-semibold uppercase tracking-wider">
        {label}
      </span>
    </div>
    <p className="text-lg font-bold tabular-nums text-gray-100">{value}</p>
  </div>
);

const VisitorDetailPage = async ({ params }: { params: { id: string } }) => {
  const all = await getPageViews();
  const views = all.filter((v) => v.visitorId === params.id);
  if (views.length === 0) notFound();

  const sessions = buildSessions(views);
  const uniquePages = new Set(views.map((v) => v.path)).size;
  const firstSeen = views[views.length - 1].visitedAt;
  const lastSeen = views[0].visitedAt;

  // Một visitor có thể dùng nhiều thiết bị (cùng cookie chỉ khi cùng browser,
  // nhưng UA có thể đổi theo update) — gom các combo duy nhất
  const deviceCombos = Array.from(
    new Set(
      views.map((v) =>
        v.deviceType
          ? `${v.deviceType}|${v.browser ?? "?"} · ${v.os ?? "?"}`
          : "",
      ),
    ),
  ).filter(Boolean);

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-6 flex items-center justify-between">
        <Link
          href="/admin"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 transition-colors hover:text-primary"
        >
          <IconArrowLeft size={16} />
          Quay lại tổng quan
        </Link>
        <AutoRefresh />
      </div>

      {/* Identity */}
      <div className={`${CARD} mb-5 p-6`}>
        <div className="flex items-start gap-4">
          <span
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-sm font-bold text-black/80"
            style={{
              backgroundColor: `hsl(${visitorHue(params.id)} 65% 60%)`,
            }}
          >
            {params.id.slice(0, 2).toUpperCase()}
          </span>
          <div className="min-w-0">
            <p className="mb-0.5 text-[10px] font-semibold uppercase tracking-wider text-gray-500">
              Khách truy cập
            </p>
            <h1 className="break-all font-mono text-lg font-bold leading-snug text-gray-100">
              {params.id}
            </h1>

            {deviceCombos.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {deviceCombos.map((combo) => {
                  const [type, label] = combo.split("|");
                  return (
                    <span
                      key={combo}
                      className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 text-xs text-gray-400"
                    >
                      <span className="text-primary/70">
                        {DEVICE_ICONS[type] ?? <IconDeviceUnknown size={14} />}
                      </span>
                      {label}
                    </span>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="mb-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatChip
          icon={<IconEye size={13} />}
          label="Lượt xem"
          value={views.length}
        />
        <StatChip
          icon={<IconStack2 size={13} />}
          label="Trang khác nhau"
          value={uniquePages}
        />
        <StatChip
          icon={<IconRoute size={13} />}
          label="Số phiên"
          value={sessions.length}
        />
        <StatChip
          icon={<IconCalendar size={13} />}
          label="Ghé lần đầu"
          value={formatDateTime(firstSeen)}
        />
      </div>

      {/* Journey */}
      <div className="mb-4 flex items-baseline justify-between">
        <h2 className="text-base font-semibold text-gray-100">
          Hành trình duyệt trang
        </h2>
        <span className="text-xs text-gray-600">
          Hoạt động gần nhất: {formatDateTime(lastSeen)}
        </span>
      </div>

      <div className="space-y-4">
        {sessions.map((session, si) => (
          <div key={si} className={`${CARD} p-5`}>
            <div className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="rounded-full border border-primary/25 bg-primary/10 px-2.5 py-0.5 text-[11px] font-semibold text-primary">
                Phiên {sessions.length - si}
              </span>
              <span className="text-xs text-gray-500">
                {formatDateTime(session.startedAt)} · {session.steps.length}{" "}
                trang
              </span>
            </div>

            <ol className="relative space-y-0">
              {session.steps.map((step, i) => {
                const isLast = i === session.steps.length - 1;
                return (
                  <li key={i} className="flex gap-3">
                    {/* Timeline dot + line */}
                    <div className="flex w-4 flex-col items-center">
                      <span
                        className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${
                          isLast
                            ? "bg-primary shadow-[0_0_8px_rgba(67,208,76,0.6)]"
                            : "bg-gray-600"
                        }`}
                      />
                      {!isLast && (
                        <span className="w-px flex-1 bg-gradient-to-b from-white/[0.12] to-white/[0.04]" />
                      )}
                    </div>

                    <div className={`min-w-0 flex-1 ${isLast ? "" : "pb-4"}`}>
                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
                        <span className="font-mono text-sm text-gray-200">
                          {step.path}
                        </span>
                        <span className="text-xs tabular-nums text-gray-600">
                          {formatClock(step.visitedAt)}
                        </span>
                      </div>
                      <p className="mt-0.5 text-xs text-gray-600">
                        {step.dwellMs !== null
                          ? `Dừng lại ${formatDwell(step.dwellMs)}`
                          : "Trang cuối của phiên"}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VisitorDetailPage;
