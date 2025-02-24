"use client";

import {
  getPosts,
  getPostsPeek,
} from "@/app/components/handlers/sanity/sanityHandlers";
import React, { useEffect, useState } from "react";
import JournalCard from "../card/JournalCard";
import { Skeleton } from "@radix-ui/themes";
import { PostPeek } from "../handlers/sanity/models/sanityTypes";

interface IPostList {
  postPeeks: PostPeek[];
}

const PostsList = ({ postPeeks }: IPostList) => {
  // lists all posts on front page
  // const [postPeeks, setPostPeeks] = useState<PostPeek[]>([]);
  // useEffect(() => {
  //   const getAllPost = async () => {
  //     const peekResponse: PostPeek[] = await getPostsPeek();
  //     setPostPeeks(peekResponse);
  //   };
  //   getAllPost();
  // }, []);
  return (
    <div className="max-w-3/5 flex flex-wrap gap-4">
      {postPeeks.map((item) => (
        <Skeleton loading={item === undefined}>
          <JournalCard
            slug={item.slug}
            authorName={item.authorRealName}
            title={item.title}
            date={item.publishedAt}
            image={item.image}
          />
        </Skeleton>
      ))}
    </div>
  );
};

export default PostsList;
