"use client"

import { useEffect, useState } from "react"
import { Event, EventPeek } from "../handlers/sanity/models/sanityTypes"
import { getEventsPeek } from "../handlers/sanity/sanityHandlers"
import EventCard from "../card/EventCard"
import { Skeleton } from "@radix-ui/themes"

const EventsList = () => {
  const [events, setEvents] = useState<EventPeek[]>([])
  useEffect(() => {
    const listEvents = async () => {
      const eventsList = await getEventsPeek()
      console.log(eventsList)
      setEvents(eventsList)
    }
    listEvents()
  }, [])
  return (<div className="max-w-3/5 flex flex-wrap gap-4">{events.map(item =>
    <Skeleton loading={item === undefined}>
      <EventCard
        eventSlug={item.eventSlug}
        name={item.eventName}
        startsAt={item.eventStartsAt}
        endsAt={item.eventEndsAt}
        image={item.image}
      />
    </Skeleton>
  )}
  </div>)
}

export default EventsList
