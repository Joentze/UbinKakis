"use client"

import { useEffect, useState } from "react"
import { Event } from "../handlers/sanity/models/sanityTypes"
import { getEventsPeek } from "../handlers/sanity/sanityHandlers"

const EventsList = () => {
    const [events, setEvents] = useState<Event[]>([])
    useEffect(() => {
        const listEvents = async () => {
            const eventsList = await getEventsPeek()
            console.log(eventsList)
            setEvents(eventsList)
        }
        listEvents()
    }, [])
    return <></>
}

export default EventsList
