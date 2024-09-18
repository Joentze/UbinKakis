"use client";

import {
    getTeamsPeek,
} from "@/app/components/handlers/sanity/sanityHandlers";
import React, { useEffect, useState } from "react";
import TeamCard from "../card/TeamCard";
import { Skeleton } from "@radix-ui/themes";

const TeamsList = () => {
    // lists all posts on front page
    const [teamPeeks, setTeamPeeks] = useState<TeamPeek[]>([]);
    useEffect(() => {
        const getAllTeams = async () => {
            const peekResponse: TeamPeek[] = await getTeamsPeek();
            setTeamPeeks(peekResponse);
        };
        getAllTeams();
    }, []);
    return (<div className="max-w-3/5 flex flex-wrap gap-4">{teamPeeks.map(item =>
        <Skeleton loading={item === undefined}>
            <TeamCard
                slug={item.teamSlug}
                team={item.team}
                image={item.image}
            />
        </Skeleton>
    )}
    </div>);
};

export default TeamsList;
