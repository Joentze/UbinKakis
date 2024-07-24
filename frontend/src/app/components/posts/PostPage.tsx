"use client";
import { getPost } from "@/app/handlers/sanity/sanityHandlers";
import { PortableText } from "@portabletext/react";
import { useEffect, useState } from "react";
import YouTubePlayer from "react-player/youtube";
import urlBuilder from "@sanity/image-url";
import { client } from "@/app/handlers/sanity/sanityBase";
import InstagramEmbed from "react-instagram-embed";
import { Badge, IconButton } from "@radix-ui/themes";

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
    instagram: (node: any) => {
      const { value } = node;
      return (
        <InstagramEmbed
          url={value.url}
          // TODO: add in ubinkakis token
          clientAccessToken=""
        />
      );
    },
    image: (node: any) => {
      const { value, isInline } = node;
      const src = urlBuilder(client)
        .image(value)
        .width(isInline ? 100 : 800)
        .fit("max")
        .auto("format")
        .url();

      return <img className="m-auto rounded-lg w-full" src={src} />;
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
    <>
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
          <h1 className="text-3xl md:text-5xl grow">{post?.title}</h1>
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
    </>
  );
};
export default PostPage;
