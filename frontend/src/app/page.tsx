"use client";
import Image from "next/image";
import PostsList from "./components/posts/PostsList";
import { Button, Heading, Theme } from "@radix-ui/themes";
import * as Avatar from "@radix-ui/react-avatar";
import Footer from "./components/footer/Footer";
import { useEffect, useRef, useState } from "react";
import EventsList from "./components/events/EventsList";
import BikeWallpaper from "./assets/bike.webp";
import UbinKakisLogo from "./assets/logo.webp";
import {
  getAllCategories,
  getPostsPeek,
} from "./components/handlers/sanity/sanityHandlers";
import { PostPeek } from "./components/handlers/sanity/models/sanityTypes";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
export default function Home() {
  const journalRef = useRef<HTMLHeadingElement | null>(null);
  const scrollJournalIntoView = () => {
    journalRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const [categories, setCategories] = useState<string[]>([]);

  const [postPeeks, setPostPeeks] = useState<PostPeek[]>([]);
  useEffect(() => {
    const getAllPost = async () => {
      const peekResponse: PostPeek[] = await getPostsPeek();
      setPostPeeks(peekResponse);
    };
    getAllPost();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getAllCategories();
        setCategories(response);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchCategories();
  }, []);
  return (
    <Theme>
      <main className="flex min-h-screen flex-col items-center justify-between">
        <div className="relative w-full h-96 mb-10 ">
          <Image
            src={BikeWallpaper}
            alt="Gradient Background"
            className="absolute w-full h-96 z-10 inset-0 object-cover"
          />
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
        <Image
          src={UbinKakisLogo}
          alt="logo"
          className="-mt-48 mb-6 z-50 animate-fade-in w-32 h-32"
        >
        </Image>
        <h1 className="text-5xl sm:text-6xl md:text-7xl text-gray-600 select-none animate-fade-in">
          Ubin Kakis
        </h1>
        <div className="flex flex-col w-full sm:w-1/3 bg-transparent p-10 sm:p-0 -mt-6 sm:mt-4 animate-fade-in">
          <p className="text-center text-gray-400 ">
            Our goal for this project is to form meaningful connections with the
            communities on Pulau Ubin and share their cultures and kampung life
            with more Singaporeans.
          </p>
          <div className="flex flex-row m-auto gap-4 mt-6">
            <a href="/t">
              <Button color="orange" size="3" variant="soft">About Us</Button>
            </a>
            <Button
              color="orange"
              size="3"
              variant="classic"
              onClick={scrollJournalIntoView}
            >
              Journal
            </Button>
          </div>
        </div>
        <hr className="w-full my-12"></hr>
        <h1
          ref={journalRef}
          className="text-3xl sm:text-4xl md:text-5xl text-gray-600 select-none animate-fade-in"
        >
          Our Journal 📙
        </h1>
        <h1 className="text-3xs text-gray-400 my-2 mb-12 animate-fade-in">
          Stories, Reflections & More
        </h1>
        <div className="w-full flex flex-col m-auto">
          {categories && (
            <Tabs defaultValue={categories[0]} className="w-full">
              <div className="flex justify-center">
                <TabsList className="mb-10">
                  {categories.map((category) => {
                    return (
                      <TabsTrigger value={category}>{category}</TabsTrigger>
                    );
                  })}
                </TabsList>
              </div>
              {categories.map((category) => {
                const postPeeksInCategory = postPeeks.filter((postPeek) => {
                  if (postPeek.categories) {
                    return postPeek.categories.includes(category);
                  }
                });
                return (
                  <TabsContent value={category}>
                    <PostsList postPeeks={postPeeksInCategory} />
                  </TabsContent>
                );
              })}
            </Tabs>
          )}
        </div>
        {/* <PostsList postPeeks={postPeeks} /> */}
        <hr className="w-full my-12"></hr>
        <h1 className="text-3xl sm:text-4xl md:text-5xl text-gray-600 select-none animate-fade-in mb-12">
          Upcoming Events 📅
        </h1>
        <EventsList />
        <Footer />
      </main>
    </Theme>
  );
}
