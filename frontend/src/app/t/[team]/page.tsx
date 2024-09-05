"use client";
import { Theme } from "@radix-ui/themes";
import Footer from "../../components/footer/Footer";
import PostPage from "../../components/posts/PostPage";
import { useParams } from "next/navigation";
import TeamPage from "@/app/components/team/TeamPage";

const Page = () => {
    const params = useParams<{ team: string }>();
    return (
        <Theme>
            <main className="flex min-h-screen flex-col items-center justify-between">
                <>{params ? <TeamPage slug={params.team as string} /> : <>Loading</>}</>
                <Footer />
            </main>
        </Theme>
    );
};

export default Page;
