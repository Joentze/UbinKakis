"use client"
import { Theme } from "@radix-ui/themes";
import Footer from "../../components/footer/Footer";
import { useParams } from "next/navigation";
import EventPage from "@/app/components/events/EventPage";

const Page = () => {
    const params = useParams<{ event: string }>();
    return (
        <Theme>
            <main className="flex min-h-screen flex-col items-center justify-between">
                <>{params ? <EventPage slug={params.event} /> : <>Loading</>}</>
                <Footer />
            </main>
        </Theme>)
};

export default Page;
