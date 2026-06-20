import { gql } from "graphql-request";

const momentFields = `
  id
  title
  content {
    raw
  }
  mediaType
  media {
    url
    mimeType
    width
    height
  }
  tags
  pinned
  createdAt
`;

export const GET_MOMENTS = gql`
  query GetMoments($visibility: MomentVisibility) {
    moments(where: { visibility: $visibility }, orderBy: createdAt_DESC) {
      ${momentFields}
    }
  }
`;

export const GET_MOMENT_BY_ID = gql`
  query GetMomentById($id: ID!) {
    moment(where: { id: $id }) {
      ${momentFields}
    }
  }
`;
