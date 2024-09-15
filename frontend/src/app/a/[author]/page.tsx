"use client"
import AuthorPage from "@/app/components/author/AuthorPage"
import Footer from "@/app/components/footer/Footer";
import { Theme } from "@radix-ui/themes";
import { useParams } from "next/navigation";

const Page = () => {
    const params = useParams<{ author: string }>();
    return (
        <Theme>
            <main className="flex min-h-screen flex-col items-center justify-between">
                <>{params ? <AuthorPage slug={params.author} /> : <>Loading</>}</>
                <Footer />
            </main>
        </Theme>
    );
}
export default Page