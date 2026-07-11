/**
 * Hệ thống like tự xây trên Hygraph: mỗi like là một record MomentLike
 * (momentId + visitorId). Chỉ chạy phía server (API route) — token không lộ.
 * Query ở stage DRAFT vì record tạo qua mutation không qua bước publish.
 */

type LikeRecord = { id: string; momentId: string; visitorId: string };

const PAGE_SIZE = 100;
const MAX_RECORDS = 5000;

const getConfig = () => {
  const endpoint = process.env.HYGRAPH_MUTATION_ENDPOINT;
  const token = process.env.HYGRAPH_MUTATION_TOKEN;
  if (!endpoint || !token) {
    throw new Error(
      "Thiếu HYGRAPH_MUTATION_ENDPOINT hoặc HYGRAPH_MUTATION_TOKEN trong env",
    );
  }
  return { endpoint, token };
};

const gqlRequest = async <T>(
  query: string,
  variables: Record<string, unknown>,
): Promise<T> => {
  const { endpoint, token } = getConfig();
  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ query, variables }),
    cache: "no-store",
  });

  if (!res.ok) throw new Error(`Hygraph responded ${res.status}`);

  const json = (await res.json()) as {
    data?: T;
    errors?: { message: string }[];
  };
  if (json.errors?.length) throw new Error(json.errors[0].message);
  return json.data as T;
};

/** Lấy toàn bộ like của một tập moment (phân trang 100 record/lượt) */
const fetchLikes = async (momentIds: string[]): Promise<LikeRecord[]> => {
  const all: LikeRecord[] = [];

  while (all.length < MAX_RECORDS) {
    const data = await gqlRequest<{ momentLikes: LikeRecord[] }>(
      `query Likes($momentIds: [String!], $first: Int!, $skip: Int!) {
        momentLikes(
          stage: DRAFT
          where: { momentId_in: $momentIds }
          first: $first
          skip: $skip
        ) {
          id
          momentId
          visitorId
        }
      }`,
      { momentIds, first: PAGE_SIZE, skip: all.length },
    );

    const batch = data.momentLikes;
    all.push(...batch);
    if (batch.length < PAGE_SIZE) break;
  }

  return all;
};

export type LikeState = { count: number; liked: boolean };

/** Đếm like + trạng thái đã like của visitor hiện tại cho từng moment */
export const getLikeStates = async (
  momentIds: string[],
  visitorId: string | undefined,
): Promise<Record<string, LikeState>> => {
  const likes = await fetchLikes(momentIds);

  const states: Record<string, LikeState> = {};
  for (const id of momentIds) states[id] = { count: 0, liked: false };

  for (const like of likes) {
    const state = states[like.momentId];
    if (!state) continue;
    state.count++;
    if (visitorId && like.visitorId === visitorId) state.liked = true;
  }

  return states;
};

/** Toggle like — trả về trạng thái mới sau khi toggle */
export const toggleLike = async (
  momentId: string,
  visitorId: string,
): Promise<LikeState> => {
  // Tìm like hiện có của visitor này (nếu có)
  const data = await gqlRequest<{
    momentLikes: { id: string }[];
    momentLikesConnection: { aggregate: { count: number } };
  }>(
    `query Existing($momentId: String!, $visitorId: String!) {
      momentLikes(
        stage: DRAFT
        where: { momentId: $momentId, visitorId: $visitorId }
        first: 1
      ) {
        id
      }
      momentLikesConnection(stage: DRAFT, where: { momentId: $momentId }) {
        aggregate {
          count
        }
      }
    }`,
    { momentId, visitorId },
  );

  const existing = data.momentLikes[0];
  const currentCount = data.momentLikesConnection.aggregate.count;

  if (existing) {
    await gqlRequest(
      `mutation Unlike($id: ID!) {
        deleteMomentLike(where: { id: $id }) { id }
      }`,
      { id: existing.id },
    );
    return { count: Math.max(currentCount - 1, 0), liked: false };
  }

  await gqlRequest(
    `mutation Like($momentId: String!, $visitorId: String!) {
      createMomentLike(data: { momentId: $momentId, visitorId: $visitorId }) {
        id
      }
    }`,
    { momentId, visitorId },
  );
  return { count: currentCount + 1, liked: true };
};
