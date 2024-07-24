"use client";

import { getPosts, getPostsPeek } from "@/app/handlers/sanity/sanityHandlers";
import React, { useEffect, useState } from "react";

const PostsList = () => {
  // lists all posts on front page
  const [postPeeks, setPostPeeks] = useState<PostPeek[]>([]);
  useEffect(() => {
    const getAllPost = async () => {
      const peekResponse: PostPeek[] = await getPostsPeek();
      setPostPeeks(peekResponse);
    };
    getAllPost();
  }, []);
  return <></>;
};

export default PostsList;
