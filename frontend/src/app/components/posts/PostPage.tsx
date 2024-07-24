"use client";
import { getPost } from "@/app/handlers/sanity/sanityHandlers";
import { PortableText } from "@portabletext/react";
import { useEffect, useState } from "react";
import YouTubePlayer from "react-player/youtube";
import urlBuilder from "@sanity/image-url";
import { client } from "@/app/handlers/sanity/sanityBase";

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

const components = {
  block: {
    h1: (node: any) => {
      const { children } = node;
      return <h1 className="text-3xl -mb-6">{children}</h1>;
    },
  },
  list: {
    // Ex. 1: customizing common list types
    bullet: (node: any) => {
      const { children } = node;
      return <ul className="mt-xl list-disc list-inside">{children}</ul>;
    },
    number: (node: any) => {
      const { children } = node;
      return <ol className="mt-lg">{children}</ol>;
    },

    // Ex. 2: rendering custom lists
    checkmarks: (node: any) => {
      const { children } = node;
      return <ol className="m-auto text-lg">{children}</ol>;
    },
  },
  marks: {
    // Ex. 1: custom renderer for the em / italics decorator
    em: (node: any) => {
      const { children } = node;
      return <em className="text-gray-600 font-semibold">{children}</em>;
    },

    // Ex. 2: rendering a custom `link` annotation
    link: (node: any) => {
      const { value, children } = node.value;
      const target = (value?.href || "").startsWith("http")
        ? "_blank"
        : undefined;
      return (
        <a href={value?.href} target={target}>
          {children}
        </a>
      );
    },
  },
  types: {
    image: (node: any) => {
      const { value, isInline } = node;
      const src = urlBuilder(client)
        .image(value)
        .width(isInline ? 100 : 800)
        .fit("max")
        .auto("format")
        .url();

      return <img className="m-auto" src={src} />;
    },
    youtube: (node: any) => {
      const { url } = node.value;
      return (
        <div className="my-8 ">
          <YouTubePlayer url={url} width={"100%"} />
        </div>
      );
    },
  },
};

const PostPage = () => {
  const [post, setPost] = useState<Post>();
  useEffect(() => {
    const getCurrPost = async () => {
      const response: Post = await getPost("pulau-ubin-s-nature");
      console.log(response);
      setPost(response);
    };
    getCurrPost();
  }, []);
  return (
    <div className="flex flex-col w-full sm:w-3/5">
      <h1 className="text-3xl sm:text-5xl">{post?.title}</h1>
      <p className="text-sm text-gray-500 ">
        {convertDateTimeString(post?.publishedAt as string)}
      </p>
      <p className="text-sm text-gray-800 ">
        <span className="font-bold">Written by:</span>{" "}
        {post?.authorName.map((item: AuthorNameSlug, idx) => {
          return (
            <a
              className="text-gray-600 hover:underline active:text-gray-500"
              href="#"
            >
              {item.name} {idx !== post?.authorName.length - 1 ? "," : ""}
            </a>
          );
        })}
      </p>

      <div className="m-auto list-disc">
        <PortableText value={post?.body as any} components={components} />
      </div>
    </div>
  );
};
export default PostPage;
