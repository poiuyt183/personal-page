export type PageViewInput = {
  visitorId: string;
  path: string;
  isNewVisitor: boolean;
  deviceType: string;
  os: string;
  browser: string;
};

const CREATE_PAGE_VIEW = `
  mutation TrackPageView(
    $visitorId: String!
    $path: String!
    $isNewVisitor: Boolean!
    $visitedAt: DateTime!
    $deviceType: String
    $os: String
    $browser: String
  ) {
    createPageView(
      data: {
        visitorId: $visitorId
        path: $path
        isNewVisitor: $isNewVisitor
        visitedAt: $visitedAt
        deviceType: $deviceType
        os: $os
        browser: $browser
      }
    ) {
      id
    }
  }
`;

/**
 * Ghi một page view vào Hygraph. Chạy fire-and-forget từ middleware —
 * mọi lỗi đều được nuốt để không bao giờ ảnh hưởng request của người dùng.
 */
export const trackPageView = async (input: PageViewInput): Promise<void> => {
  const endpoint = process.env.HYGRAPH_MUTATION_ENDPOINT;
  const token = process.env.HYGRAPH_MUTATION_TOKEN;
  if (!endpoint || !token) return;

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        query: CREATE_PAGE_VIEW,
        variables: { ...input, visitedAt: new Date().toISOString() },
      }),
    });

    if (!res.ok) {
      console.error(`[analytics] Hygraph responded ${res.status}`);
      return;
    }
    const json = (await res.json()) as { errors?: { message: string }[] };
    if (json.errors?.length) {
      console.error("[analytics] Hygraph errors:", json.errors[0].message);
    }
  } catch (err) {
    console.error("[analytics] track failed:", err);
  }
};
