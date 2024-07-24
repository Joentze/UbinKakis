"use client";
import { getPost } from "@/app/handlers/sanity/sanityHandlers";
import { PortableText } from "@portabletext/react";
import { useEffect, useState } from "react";
import YouTubePlayer from "react-player/youtube";

const components = {
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

    youtube: (node: any) => {
      const { url } = node.value;
      return (
        <div className="my-8">
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
      <div className="m-auto list-disc">
        <PortableText value={post?.body as any} components={components} />
      </div>
    </div>
  );
};
export default PostPage;
