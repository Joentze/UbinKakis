"use client";
import Image from "next/image";
import PostsList from "./components/posts/PostsList";
import PostPage from "./components/posts/PostPage";
import { Heading, Theme } from "@radix-ui/themes";
import * as Avatar from "@radix-ui/react-avatar";
import Footer from "./components/footer/Footer";
import Script from "next/script";
import { gsap } from "gsap/gsap-core";
import { useEffect, useRef } from "react";

export default function Home() {
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  useEffect(() => {}, []);
  return (
    <Theme>
      <main className="flex min-h-screen flex-col items-center justify-between">
        <div className="relative w-full h-96 mb-10 ">
          <div
            className="absolute z-10 inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url("https://www.ubinkakis.com/_next/image?url=https://strapi-ubin-cms.s3.ap-southeast-1.amazonaws.com/Bicycle_Rental1_61b2d63156.png&w=3840&q=75")`,
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
        <Avatar.Root className="-mt-32 mb-6 z-50">
          <Avatar.AvatarImage
            className="m-auto w-64"
            src="
https://www.ubinkakis.com/_next/image?url=https%3A%2F%2Fstrapi-ubin-cms.s3.ap-southeast-1.amazonaws.com%2FUbin_Kakis_Logo_c1157050f0.png&w=2048&q=75"
          ></Avatar.AvatarImage>
        </Avatar.Root>
        <h1
          ref={titleRef}
          className="text-5xl sm:text-7xl md:text-8xl text-gray-600 select-none duration-75"
        >
          Ubin Kakis
        </h1>

        <Footer />
      </main>
    </Theme>
  );
}
