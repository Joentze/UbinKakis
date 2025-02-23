"use client";

import { useEffect, useState } from "react";
import { getTeam } from "../handlers/sanity/sanityHandlers";
import { Team } from "../handlers/sanity/models/sanityTypes";
import GradientImage from "../background/GradientImage";
import { Skeleton, Text } from "@radix-ui/themes";
import PortableTextRenderer from "../text/PortableTextRenderer";
import BackButton from "../button/BackButton";

interface ITeamPage {
    slug: string;
}

const TeamPage: React.FC<ITeamPage> = ({ slug }) => {
    const [team, setTeam] = useState<Team>();
    useEffect(() => {
        const getTeamContent = async () => {
            const response = await getTeam(slug);
            setTeam(response);
        };
        getTeamContent();
    }, [slug]);

    return (
        <>
            <GradientImage imageUrl={team?.image as string} />
            <Skeleton loading={team === undefined}>
                <h1 className="text-6xl font-bold text-gray-600 mb-8 z-50 select-none">
                    {team?.team}
                </h1>
            </Skeleton>
            <PortableTextRenderer value={team?.bio}></PortableTextRenderer>
            <div className="mt-4">
                <BackButton />
            </div>
        </>
    );
};

export default TeamPage;
