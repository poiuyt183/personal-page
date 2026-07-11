export type PageView = {
  visitorId: string;
  path: string;
  isNewVisitor: boolean;
  visitedAt: string;
  // Null với các record cũ được ghi trước khi có tracking thiết bị
  deviceType: string | null;
  os: string | null;
  browser: string | null;
};

const PAGE_SIZE = 100;
// Chặn trên để dashboard không kéo vô hạn khi dữ liệu phình to
const MAX_RECORDS = 5000;

const PAGE_VIEWS_QUERY = `
  query PageViews($first: Int!, $skip: Int!) {
    pageViews(stage: DRAFT, first: $first, skip: $skip, orderBy: visitedAt_DESC) {
      visitorId
      path
      isNewVisitor
      visitedAt
      deviceType
      os
      browser
    }
  }
`;

/**
 * Kéo toàn bộ page views từ Hygraph (phân trang 100 record/lượt).
 * Query ở stage DRAFT vì record được tạo từ middleware không qua bước publish.
 */
export const getPageViews = async (): Promise<PageView[]> => {
  const endpoint = process.env.HYGRAPH_MUTATION_ENDPOINT;
  const token = process.env.HYGRAPH_MUTATION_TOKEN;
  if (!endpoint || !token) {
    throw new Error(
      "Thiếu HYGRAPH_MUTATION_ENDPOINT hoặc HYGRAPH_MUTATION_TOKEN trong env",
    );
  }

  const all: PageView[] = [];

  while (all.length < MAX_RECORDS) {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        query: PAGE_VIEWS_QUERY,
        variables: { first: PAGE_SIZE, skip: all.length },
      }),
      cache: "no-store",
    });

    if (!res.ok) throw new Error(`Hygraph responded ${res.status}`);

    const json = (await res.json()) as {
      data?: { pageViews: PageView[] };
      errors?: { message: string }[];
    };
    if (json.errors?.length) throw new Error(json.errors[0].message);

    const batch = json.data?.pageViews ?? [];
    all.push(...batch);
    if (batch.length < PAGE_SIZE) break;
  }

  return all;
};
