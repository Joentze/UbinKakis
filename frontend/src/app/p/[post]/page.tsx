"use client"
import { Theme } from "@radix-ui/themes"
import Footer from "../../components/footer/Footer"
import PostPage from "../../components/posts/PostPage"
import { useParams } from "next/navigation"

const Page = () => {
    const params = useParams<{ post: string }>()
    return (
        <Theme>
            <main className="flex min-h-screen flex-col items-center justify-between">
                <PostPage slug={params.post} />
                <Footer />
            </main>
        </Theme>)
}

export default Page