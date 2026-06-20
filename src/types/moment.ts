export type MediaType = "IMAGE" | "VIDEO" | "STATUS" | "MIXED";

export type Moment = {
    id: string;
    title?: string;
    content: {
        raw: any;
    };
    mediaType: MediaType;
    media: {
        url: string;
        mimeType: string;
        width: number;
        height: number;
    }[];
    tags: string | null;
    pinned: boolean;
    createdAt: string;
};

export const parseMomentTags = (tags: string | null | undefined): string[] =>
    tags
        ?.split(",")
        .map((tag) => tag.trim())
        .filter(Boolean) ?? [];
