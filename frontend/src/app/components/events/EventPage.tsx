"use client"
import { getEvent } from "../handlers/sanity/sanityHandlers";
import { useEffect, useState } from "react";
import { Event } from "../handlers/sanity/models/sanityTypes";
import BackButton from "../button/BackButton";
import GradientImage from "../background/GradientImage";
import PortableTextRenderer from "../text/PortableTextRenderer";

interface IEventPage {
    slug: string
}
const EventPage = ({ slug }: IEventPage) => {

    const [event, setEvent] = useState<Event | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvent = async () => {
            if (slug) {
                const fetchedEvent = await getEvent(slug);
                console.log(fetchedEvent)
                setEvent(fetchedEvent);
                setLoading(false);
            }
        };
        fetchEvent();
    }, [slug]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!event) {
        return <div>Event not found</div>;
    }

    return (
        <div>
            <GradientImage imageUrl={event.image} />
            <div className="w-full text-center">
                <h1 className="text-4xl text-center">{event.eventName}</h1>
                <p className="text-center">
                    <strong>Starts At:</strong> {event.eventStartsAt.toLocaleString()}
                </p>
                <p className="text-center">
                    <strong>Ends At:</strong> {event.eventEndsAt.toLocaleString()}
                </p>
                <PortableTextRenderer value={event.bio} />
                <div className="flex justify-center mt-10"><BackButton /></div>
            </div>

        </div >
    );
};

export default EventPage;
