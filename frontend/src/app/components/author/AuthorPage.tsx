"use client";

import PortableTextRenderer from "@/app/components/text/PortableTextRenderer";
import { getAuthor } from "@/app/components/handlers/sanity/sanityHandlers";
import { useEffect, useState } from "react";
import * as Avatar from "@radix-ui/react-avatar";
import BackButton from "../button/BackButton";
import { Author } from "@/app/components/handlers/sanity/models/sanityTypes";

interface IAuthorPage {
    slug: string;
}
function generateInitials(fullName: string): string {
    const names = fullName.split(" ");
    let initials = "";

    for (const name of names) {
        initials += name.charAt(0).toUpperCase();
    }

    return initials;
}
const AuthorPage: React.FC<IAuthorPage> = ({ slug }) => {
    const [author, setAuthor] = useState<Author>();
    useEffect(() => {
        const getCurrAuthor = async () => {
            try {
                let currAuthor: Author = await getAuthor(slug);
                setAuthor(currAuthor);
            } catch (e) {
                // TODO: add some notification function
                //       when page fails
                console.error(e);
            }
        };
        getCurrAuthor();
    }, [slug]);
    return (
        <>
            <div className="relative w-full h-64 mb-10 ">
                <div
                    className="absolute z-10 inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage:
                            `url("https://cdn.sanity.io/images/n34jpwpp/production/0a391cbabc1e60c76e8b261bd9ffebb392c31f51-2560x1440.webp")`,
                    }}
                >
                </div>
                <div
                    style={{
                        width: "100%",
                        height: "100%",
                        background:
                            "linear-gradient(to bottom, transparent, white)",
                        zIndex: 10,
                        position: "absolute",
                    }}
                >
                </div>
            </div>

            <Avatar.Root className="AvatarRoot  -mt-32 w-32 h-32 sm:w-64 sm:h-64 z-50">
                <Avatar.Image
                    className="AvatarImage"
                    src={author?.image}
                />
                <Avatar.Fallback className="AvatarFallback" delayMs={600}>
                    {author ? generateInitials(author?.name as string) : "XX"}
                </Avatar.Fallback>
            </Avatar.Root>
            <br></br>
            <h1 className="text-6xl font-bold text-gray-600">{author?.name}</h1>

            <div className="flex flex-col w-full sm:w-3/5 bg-transparent p-10 sm:p-0">
                <PortableTextRenderer value={author?.bio} />
                <div className="m-auto mt-6">
                    <BackButton />
                </div>
            </div>
        </>
    );
};
export default AuthorPage;
