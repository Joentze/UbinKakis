"use client";
import Image from "next/image";
import PostsList from "./components/posts/PostsList";
import { Button, Heading, Theme } from "@radix-ui/themes";
import * as Avatar from "@radix-ui/react-avatar";
import Footer from "./components/footer/Footer";
import { useRef } from "react";
import EventsList from "./components/events/EventsList";


export default function Home() {
  const journalRef = useRef<HTMLHeadingElement | null>(null);
  const scrollJournalIntoView = () => {
    journalRef.current?.scrollIntoView({ behavior: "smooth" })
  }
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
        <Avatar.Root className="-mt-48 mb-6 z-50 animate-fade-in">
          <Avatar.AvatarImage
            className="m-auto w-64"
            src="https://www.ubinkakis.com/_next/image?url=https%3A%2F%2Fstrapi-ubin-cms.s3.ap-southeast-1.amazonaws.com%2FUbin_Kakis_Logo_c1157050f0.png&w=2048&q=75"
          ></Avatar.AvatarImage>
        </Avatar.Root>
        <h1
          className="text-5xl sm:text-6xl md:text-7xl text-gray-600 select-none animate-fade-in"
        >
          Ubin Kakis
        </h1>
        <div className="flex flex-col w-full sm:w-1/3 bg-transparent p-10 sm:p-0 -mt-6 sm:mt-4 animate-fade-in">
          <p className="text-center text-gray-400 ">
            Our goal for this project is to form meaningful connections with the communities on Pulau Ubin and share their cultures and kampung life with more Singaporeans.
          </p>
          <div className="flex flex-row m-auto gap-4 mt-6">
            <a href="/t"><Button color="orange" size="3" variant="soft">About Us</Button></a>
            <Button color="orange" size="3" variant="classic" onClick={scrollJournalIntoView}>Journal</Button>
          </div>
        </div>
        <hr className="w-full my-12"></hr>
        <h1
          ref={journalRef}
          className="text-3xl sm:text-4xl md:text-5xl text-gray-600 select-none animate-fade-in"
        >
          Our Journal 📙
        </h1>
        <h1 className="text-3xs text-gray-400 my-2 mb-12 animate-fade-in">Stories, Reflections & More</h1>
        <PostsList />
        <hr className="w-full my-12"></hr>
        <h1
          ref={journalRef}
          className="text-3xl sm:text-4xl md:text-5xl text-gray-600 select-none animate-fade-in mb-12"
        >
          Upcoming Events 📅
        </h1>
        <EventsList />
        <Footer />
      </main>
    </Theme>
  );
}
