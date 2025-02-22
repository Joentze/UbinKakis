"use client";
import { getPost } from "@/app/components/handlers/sanity/sanityHandlers";
import { useEffect, useState } from "react";
import { Badge, IconButton, Skeleton } from "@radix-ui/themes";
import Script from "next/script";
import PortableTextRenderer from "../text/PortableTextRenderer";
import BackButton from "../button/BackButton";
import { AuthorNameSlug, Post } from "../handlers/sanity/models/sanityTypes";

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
      console.log(response);
      setPost(response);
    };
    getCurrPost();
  }, [slug]);
  return (
    <>
      <div className="relative w-full h-64 mb-10 ">
        <div
          className="absolute z-10 inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${post?.image})`,
          }}
        >
        </div>
        <div
          style={{
            width: "100%",
            height: "100%",
            background: "linear-gradient(to bottom, transparent, white)",
            zIndex: 10,
            position: "absolute",
          }}
        >
        </div>
      </div>
      <div className="flex flex-col w-full sm:w-3/5 bg-transparent p-10 sm:p-0">
        <BackButton />
        <div className="flex flex-row mt-8">
          <Skeleton loading={post === undefined}>
            <h1 className="text-2xl md:text-5xl grow h-10">{post?.title}</h1>
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
          <>
            <span className="font-bold">Written by:</span>{" "}
            <a className="text-gray-600 hover:underline active:text-gray-500" // href={`/a/${item.slug}`}
            >
              {post?.authorRealName}
            </a>
          </>
        </p>

        {
          /* <>
          <span className="font-bold">Written by:</span>{" "}
          <a className="text-gray-600 hover:underline active:text-gray-500"// href={`/a/${item.slug}`}
          >
            {post?.authorRealName}
          </a>
        </> */
        }
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
