import React from "react";
import ArticleCard from "./ArticleCard";
import { Post } from "@/types";
import { gql } from "graphql-request";
import { graphQLClient } from "@/query/graphql";

const fetcher = async ([url, query]: [url: string, query: string]) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  });
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return response.json();
};

const getPosts = async (): Promise<Post[]> => {
  const query = gql`
   query Posts {
        posts {
          date
          excerpt
          id
          slug
          title
          coverImage {
            url
          }
        }
      } 
  `;
  const response = await graphQLClient.request<{ posts: Post[] }>(query).then(({ posts }) => posts)
  return response;
};

const ListArticles = async () => {
  await new Promise(r => setTimeout(r, 2000))
  const posts = await getPosts()
  return (

    <>
      {posts.length ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post: Post) => (
            <ArticleCard
              key={post.slug}
              coverImage={post.coverImage}
              title={post.title}
              excerpt={post.excerpt}
              date={post.date}
              slug={post.slug}
            ></ArticleCard>
          ))}
        </div>
      ) : (
        <div className="text-white">Không có bài viết nào!</div>
      )}

    </>
  );
};

export default ListArticles;
