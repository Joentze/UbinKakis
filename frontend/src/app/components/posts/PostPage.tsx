"use client";
import { getPost } from "@/app/components/handlers/sanity/sanityHandlers";
import { useEffect, useState } from "react";
import { Badge, IconButton, Skeleton } from "@radix-ui/themes";
import Script from "next/script";
import PortableTextRenderer from "../text/PortableTextRenderer";

const convertDateTimeString = (dateTimeStr: string | undefined): string => {
  if (dateTimeStr) {
    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    return new Date(dateTimeStr).toLocaleDateString("en-US", options);
  }
  return "";
};

interface IPostPage {
  slug: string;
}
const PostPage: React.FC<IPostPage> = ({ slug }) => {
  const [post, setPost] = useState<Post>();
  useEffect(() => {
    const getCurrPost = async () => {
      const response: Post = await getPost(slug);
      setPost(response);
    };
    getCurrPost();
  }, []);
  return (
    <>
      <Script
        strategy="beforeInteractive"
        src="//www.instagram.com/embed.js"
        onLoad={() => {
          (window as any).instgrm?.Embeds.process();
        }}
      ></Script>
      <div className="relative w-full h-64 mb-10 ">
        <div
          className="absolute z-10 inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${post?.image})`,
          }}
        ></div>
        <div
          style={{
            width: "100%",
            height: "100%",
            background: "linear-gradient(to bottom, transparent, white)",
            zIndex: 10,
            position: "absolute",
          }}
        ></div>
      </div>
      <div className="flex flex-col w-full sm:w-3/5 bg-transparent p-10 sm:p-0">
        <IconButton variant="soft" color="orange" className="z-100">
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.84182 3.13514C9.04327 3.32401 9.05348 3.64042 8.86462 3.84188L5.43521 7.49991L8.86462 11.1579C9.05348 11.3594 9.04327 11.6758 8.84182 11.8647C8.64036 12.0535 8.32394 12.0433 8.13508 11.8419L4.38508 7.84188C4.20477 7.64955 4.20477 7.35027 4.38508 7.15794L8.13508 3.15794C8.32394 2.95648 8.64036 2.94628 8.84182 3.13514Z"
              fill="currentColor"
              fill-rule="evenodd"
              clip-rule="evenodd"
            ></path>
          </svg>
        </IconButton>
        <div className="flex flex-row mt-8">
          <Skeleton loading={post === undefined}>
            <h1 className="text-3xl md:text-5xl grow h-10">{post?.title}</h1>
          </Skeleton>
          <>
            {post?.categories.map((item) => {
              return (
                <Badge
                  size={"3"}
                  color="orange"
                  variant="surface"
                  className="my-auto"
                >
                  {item.title}
                </Badge>
              );
            })}
          </>
        </div>
        <p className="text-sm text-gray-500 ">
          {convertDateTimeString(post?.publishedAt as string)}
        </p>
        <p className="text-sm text-gray-800 ">
          {post?.authorName.map((item: AuthorNameSlug, idx) => {
            return (
              <>
                <span className="font-bold">Written by:</span>{" "}
                <a
                  className="text-gray-600 hover:underline active:text-gray-500"
                  href="#"
                >
                  {item.name} {idx !== post?.authorName.length - 1 ? "," : ""}
                </a>
              </>
            );
          })}
        </p>
        <Skeleton loading={post === undefined}>
          <div className="m-auto list-disc min-w-full min-h-96">
            <PortableTextRenderer value={post?.body as any} />
          </div>
        </Skeleton>
      </div>
    </>
  );
};
export default PostPage;
