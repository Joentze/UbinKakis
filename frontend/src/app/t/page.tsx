"use client"

import { Theme } from "@radix-ui/themes"
import Footer from "../components/footer/Footer"
import { getTeamsPeek } from "../components/handlers/sanity/sanityHandlers"
import { TeamPeek } from "../components/handlers/sanity/models/sanityTypes"
import { useState } from "react"
import TeamsList from "../components/team/TeamsList"
import BackButton from "../components/button/BackButton"

const TeamsPage = () => {
    const [teams, setTeams] = useState<TeamPeek[]>()
    return (<>
        <Theme>
            <main className="flex min-h-screen flex-col items-center justify-between">
                <div className="relative w-full h-96 mb-10 ">
                    <div
                        className="absolute z-10 inset-0 bg-cover bg-center"
                        style={{
                            //TODO: FIND A WAY TO LOAD IN BACKGROUND
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
                <h1

                    className="text-5xl sm:text-6xl md:text-7xl text-gray-600 select-none animate-fade-in "
                >
                    Our Teams
                </h1>
                <h1 className="text-3xs text-gray-400 my-2 mb-12 animate-fade-in">The People Who've Made This Possible</h1>
                <TeamsList />
                <div className="mt-12"><BackButton /></div>
                <Footer />
            </main>

        </Theme>
    </>)
}
export default TeamsPage